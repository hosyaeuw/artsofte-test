import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from './company.types';
import { Observable, catchError, map, of, shareReplay, tap } from 'rxjs';
import { Company as CompanyEntity } from './company.entity';
import { ICache } from '../cache/cache.types';
import {
  CompanyCache,
  CacheType as CacheFactoryType,
} from '../cache/CompanyCacheFactory';
import { getIdenticalKeys, pickTruthy } from '../../utils/iteratees';

const localStorageCacheType = 'cache_type';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private _companyUrl = new URL(
    '/api/company/random_company',
    'https://random-data-api.com'
  );

  private _cache: ICache<CompanyEntity>;

  constructor(private http: HttpClient) {
    this._cache = CompanyCache.create(
      (localStorage.getItem(localStorageCacheType) as CacheFactoryType) ?? 'app'
    );
  }

  setChacheType(type: CacheFactoryType) {
    this._cache = CompanyCache.create(type);
    localStorage.setItem(localStorageCacheType, type);
  }

  getCompanies(size = 100): Observable<CompanyEntity[]> {
    const url = this._companyUrl;

    url.searchParams.set('size', `${size}`);

    const companies$ = this._cache.getValue(url.toString());

    if (!companies$) {
      const newCompanies = this.http.get<Company[]>(url.toString()).pipe(
        catchError(this.handleError<Company[]>('getCompanies', [])),
        map((companies) =>
          companies.map((company) => new CompanyEntity(company))
        ),
        shareReplay(1)
      );

      this._cache.setValue(url.toString(), newCompanies);

      return newCompanies;
    }

    return companies$;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error); // log to console instead

      return of(result as T);
    };
  }

  getCompanyById(id: number): Observable<CompanyEntity | undefined> {
    return this.getCompanies().pipe(
      map((companies) => {
        const company = companies.find((c) => c.id === id);
        if (company) {
          return new CompanyEntity(company);
        }

        return;
      })
    );
  }

  sortCompanies(field: keyof CompanyEntity) {
    if (!field) {
      return this.getCompanies();
    }

    return this.getCompanies().pipe(
      map((companies) => {
        return [...companies].sort(compare);
      })
    );

    function compare(a: CompanyEntity, b: CompanyEntity) {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;

      return 0;
    }
  }

  getIndustries() {
    return this.getCompanies().pipe(
      map((companies) => getUniqCompanyValues(companies, 'industry'))
    );
  }

  getTypes() {
    return this.getCompanies().pipe(
      map((companies) => getUniqCompanyValues(companies, 'type'))
    );
  }

  filterCompanies(fields: Partial<Record<keyof CompanyEntity, any>>) {
    const fieldFilter: Partial<
      Record<
        keyof CompanyEntity,
        (company: CompanyEntity, field: keyof CompanyEntity) => void
      >
    > = {
      business_name: strSearch,
      type: selectSeatch,
      industry: selectSeatch,
    };

    const fieldsTruthy = pickTruthy(
      fields,
      Object.keys(fields) as (keyof CompanyEntity)[]
    );

    const filteredKeys = getIdenticalKeys(fieldsTruthy, fieldFilter);

    const companies$ = this.getCompanies();

    if (filteredKeys.length > 0) {
      return companies$.pipe(
        map((companies) =>
          companies.filter((company) =>
            filteredKeys.every((key) => {
              // @ts-ignore
              const func = fieldFilter[key];
              if (!!func) {
                return func(company, key);
              }

              return false;
            })
          )
        )
      );
    }

    return companies$;

    function strSearch(company: CompanyEntity, field: keyof CompanyEntity) {
      const template = new RegExp(fieldsTruthy[field], 'gi');
      const value = company[field];

      return template.test(value.toString());
    }

    function selectSeatch(company: CompanyEntity, field: keyof CompanyEntity) {
      return company[field] === fieldsTruthy[field];
    }
  }
}

function getUniqCompanyValues(
  companies: CompanyEntity[],
  field: keyof CompanyEntity
) {
  return [
    ...companies.reduce(
      (acc, company) => acc.add(company[field].toString()),
      new Set<string>()
    ),
  ];
}

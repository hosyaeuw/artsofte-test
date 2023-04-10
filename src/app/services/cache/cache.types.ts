import { Observable } from 'rxjs';

export type CacheType<T> = {
  url: string;
  value: Observable<T[]>;
};

export interface ICache<T> {
  getValue(url: CacheType<T>['url']): CacheType<T>['value'] | undefined;

  setValue(url: CacheType<T>['url'], value: CacheType<T>['value']): void;

  clearCache(): void;
}

import { Observable } from 'rxjs';
import { CacheType, ICache } from './cache.types';

export class AppCacheService<T> implements ICache<T> {
  _cache: Map<string, Observable<T[]>> = new Map<
    CacheType<T>['url'],
    CacheType<T>['value']
  >();

  getValue(url: CacheType<T>['url']): CacheType<T>['value'] | undefined {
    return this._cache.get(url);
  }

  setValue(url: CacheType<T>['url'], value: CacheType<T>['value']) {
    this._cache.set(url, value);
  }

  clearCache() {
    this._cache.clear();
  }
}

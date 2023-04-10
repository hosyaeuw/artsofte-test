import { of } from 'rxjs';
import { CacheType, ICache } from './cache.types';

export class LocalstorageCacheService<T> implements ICache<T> {
  getValue(url: CacheType<T>['url']): CacheType<T>['value'] | undefined {
    const value = localStorage.getItem(url);

    if (!value) {
      return;
    }

    return of(JSON.parse(value));
  }

  setValue(url: CacheType<T>['url'], value: CacheType<T>['value']) {
    value.subscribe((data) => {
      localStorage.setItem(url, JSON.stringify(data));
    });
  }

  clearCache() {
    localStorage.clear();
  }
}

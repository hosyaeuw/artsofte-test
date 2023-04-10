import { Company } from '../company/company.entity';
import { AppCacheService } from './AppCacheService';
import { LocalstorageCacheService } from './LocalstorageCacheService';
import { ICache } from './cache.types';

export type CacheType = 'app' | 'localhost';

class CacheFactory<T> {
  create(type: CacheType) {
    const caches = {
      app: new AppCacheService(),
      localhost: new LocalstorageCacheService(),
    } as Record<CacheType, ICache<T>>;

    return caches[type];
  }
}

export const CompanyCache = new CacheFactory<Company>();

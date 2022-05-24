import {Module} from "@nuxt/types";

type DataCacheKey = string | {
  key: string,
  secret?: string,
}

interface DataCache {
  getAll(): Promise<Data | null>;

  fetch<Data = any>(key: DataCacheKey, dataSource: any, seconds?: number): Promise<Data | null>;

  set(key: DataCacheKey, data: any, seconds?: number): Promise<boolean>;

  get<Data = any>(key: DataCacheKey): Promise<Data | null>;

  remove(key: DataCacheKey): Promise<boolean>;
}

interface ModuleOptions {
  disabled?: boolean;
  apiEndpoint?: string;
}

type ICacheModule = Module<ModuleOptions>

declare module '@nuxt/vue-app' {
  interface Context {
    $cmsEngine: DataCache
  }

  interface NuxtAppOptions {
    $cmsEngine: DataCache
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    $cmsEngine: DataCache
  }

  interface NuxtAppOptions {
    $cmsEngine: DataCache
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $cmsEngine: DataCache
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $cmsEngine: DataCache
  }
}

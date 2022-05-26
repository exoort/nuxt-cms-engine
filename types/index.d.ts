import {Module} from "@nuxt/types";

export type ICmsColors = Record<string, string>

export type ICmsEnv = Record<string, any>

export interface ICmsConfig {
  colors: ICmsColors;
  env: ICmsEnv;
}

export interface ICmsMeta {
  hid: string;
  name: string;
  content: string;
}

export interface ICmsSeo {
  title: string;
  meta: ICmsMeta[];
}

export type ICmsStyles = Record<string, any>

export interface ICmsCss {
  styles: ICmsStyles;
}

export type ICmsData = Record<string, any>

export interface ICmsStructure {
  component: string;
  data: ICmsData;
  css: ICmsCss;
}

export interface ICmsPageConfig {
  layout: string;
  middleware: string | string[];
  seo: ICmsSeo;
}

export interface ICmsPage {
  detectBy: string[];
  url: string;
  config: ICmsPageConfig;
  css: ICmsCss;
  structure: ICmsStructure[];
}

export interface ICms {
  config: ICmsConfig;
  pages: Record<string, ICmsPage>;
}

export interface CmsEngine {
  viewer: any,
  middlewares: Record<string, Function>
  getCmsConfig: (...params: any) => Promise<ICms>
}

interface ModuleOptions {
  route?: {
    name: string,
    path: string
  };
}

type ICacheModule = Module<ModuleOptions>

declare module '@nuxt/vue-app' {
  interface Context {
    $cmsEngine: CmsEngine
  }

  interface NuxtAppOptions {
    $cmsEngine: CmsEngine
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    $cmsEngine: CmsEngine
  }

  interface NuxtAppOptions {
    $cmsEngine: CmsEngine
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $cmsEngine: CmsEngine
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $cmsEngine: CmsEngine
  }
}

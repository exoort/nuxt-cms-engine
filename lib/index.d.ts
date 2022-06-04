import Vue from 'vue'

declare class CmsEnginePage extends Vue {
  components: Record<string, any>;
}
import {ICms, ICmsPage} from "../types";

declare class CmsEngineUtils {
  static getPageConfig(url: string, config: string): ICmsPage;
  static getRouteParams(url: string, cmsUrl: string): Record<string, string>;
  static getDetectBy(url: string): string[];
  static getDefaultPage(): ICmsPage;
  static getDefaultCmsFile(): ICms;
}

export {
  CmsEngineUtils,
  CmsEnginePage
}
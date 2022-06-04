import Vue from "vue";
import {ICms, ICmsPage} from "../../types";

export declare class CmsEnginePage extends Vue {
  components: Record<string, any>;
}

export declare class CmsEngineUtils {
  static getPageConfig(url: string, config: string): ICmsPage;
  static getRouteParams(url: string, cmsUrl: string): Record<string, string>;
  static getDetectBy(url: string): string[];
  static getDefaultPage(): ICmsPage;
  static getDefaultCmsFile(): ICms;
}

import {ICms, ICmsPage} from "../../../types";

declare class CmsEngineUtils {
  static getPageConfig(url: string, config: string): ICmsPage;
  static getRouteParams(url: string, cmsUrl: string): Record<string, string>;
  static getDetectBy(url: string): string[];
  static getDefaultPage(): ICmsPage;
  static getDefaultCmsFile(): ICms;
}

export default CmsEngineUtils

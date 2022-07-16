import {ICms, ICmsLayout, ICmsPage, ICmsRoute, ICmsStructure} from "../../types";

declare class CmsEngineUtils {
  static getPageConfig(url: string, config: ICms): ICmsPage;
  static getRouteParams(url: string, cmsUrl: string): Record<string, string>;
  static getDetectBy(url: string): string[];
  static getFullUrlParts (url: string, limit?: number): string[];
  static getDefaultPage(): ICmsPage;
  static getDefaultCmsFile(): ICms;
  static getDefaultCmsLayout (): ICmsLayout;
  static getDefaultCmsStructure (): ICmsStructure;
  static toUrl (url: ICmsRoute): string
}

export default CmsEngineUtils;

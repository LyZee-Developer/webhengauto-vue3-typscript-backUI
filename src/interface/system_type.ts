import type { Country } from "./country_type";

export interface SystemType {
  isDark: boolean,
  isCollapseLeft: boolean,
  isShowMobileMenuSlide: boolean,
  viewType: string,
  language: Record<string, string>,
  country:Country
}
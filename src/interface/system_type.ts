import type { Country } from "./country_type";
import type { ToastType } from "./toast_type";

export interface SystemType {
  isDark: boolean,
  isCollapseLeft: boolean,
  isShowMobileMenuSlide: boolean,
  viewType: string,
  PathImage: string,
  IsShowImage: boolean,
  language: Record<string, string>,
  country:Country,
  IsShowToast:boolean,
  toastData:ToastType
}
import { defineStore } from "pinia";
import { getLanguage } from "../utils/system_data";
import type { SystemType } from "../interface/system_type";
import type { Country } from "../interface/country_type";
import type { ToastType } from "../interface/toast_type";
import { isEmptyData } from "../utils/global_helper";

export const useSystem = defineStore("system",{
    state:()=>({
        isDark:false,
        isCollapseLeft:false,
        isShowMobileMenuSlide:false,
        viewType:"",
        PathImage:"",
        IsShowImage:false,
        language:{},
        country:{},
        IsShowToast:false,
        toastData:{
            delay:2500,
            detail:"Message detail",
            label:"Successfully",
            position:"bottom-right",
            type:"success" //info error success warn
        }
    } as SystemType),
    getters:{
        getIsDark:(state)=>state.isDark
    },
    actions:{
        setIsDark(isDark:boolean){
            this.isDark = isDark;
        },
        setIsCollapseLeft(isCollapse:boolean){
            this.isCollapseLeft = isCollapse;
        },
        setIsShowMobileMenuSlide(isShowMobileMenuSlide:boolean){
            this.isShowMobileMenuSlide = isShowMobileMenuSlide;
        },
        setViewType(viewType:string){
            this.viewType = viewType;
        },
        setLanguage(code:string){
            console.log("code",code)
            this.language = getLanguage(code);
        },
        setCountry(country:Country){
            this.country = country;
        },
        setToast(toast:ToastType){
            console.log("toast",toast)
            if(!isEmptyData(toast.delay)) this.toastData.delay = toast.delay;
            if(!isEmptyData(toast.detail)) this.toastData.detail = toast.detail;
            if(!isEmptyData(toast.type)) {
                if(toast.type=="success") this.toastData.label = "Successfully";
                if(toast.type=="info") this.toastData.label = "Information";
                if(toast.type=="warn") this.toastData.label = "Warning";
                if(toast.type=="error") this.toastData.label = "Error";
                this.toastData.type=toast.type;
            }
            if(!isEmptyData(toast.position)) this.toastData.position = toast.position;
        },
        setIsShowToast(IsShowToast:boolean){
            this.IsShowToast = IsShowToast;
        },
        setPathImage(pathImage:string){
            this.PathImage = pathImage;
        },
        setIsShowImage(isShowImage:boolean){
            this.IsShowImage = isShowImage;
        }
    }
})
import { defineStore } from "pinia";
import { getLanguage } from "../utils/system_data";
import type { SystemType } from "../interface/system_type";
import type { Country } from "../interface/country_type";

export const useSystem = defineStore("system",{
    state:()=>({
        isDark:false,
        isCollapseLeft:false,
        isShowMobileMenuSlide:false,
        viewType:"",
        language:{},
        country:{}
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
            this.language = getLanguage(code);
        },
        setCountry(country:Country){
            this.country = country;
        }
    }
})
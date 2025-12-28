import type { ToastType } from "../interface/toast_type";
import { useSystem } from "../store/system";

const translate=(kh:string,en:string)=>{
    var lang = localStorage.getItem("lang");
    var value = kh;
    if(lang==null || lang=="") return kh;
    var obj = JSON.parse(lang);
    if(obj.code !=="kh") value = en;
    return value;
}
const isEmptyData=(data:any)=>{
    return Object?.keys(data||"").length === 0 || data=="" || data==null || data==undefined || data.length==0;
}
const ToastMessage=(message:ToastType)=>{
    const system=useSystem();
    system.setToast({
        type:message.type,
        detail:message.detail,
        position:message.position || ''
    })
    system.setIsShowToast(true) 
}


export {translate,isEmptyData,ToastMessage};
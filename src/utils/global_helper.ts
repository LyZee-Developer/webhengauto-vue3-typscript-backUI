import type { ToastType } from "../interface/toast_type";
import { useSystem } from "../store/system";
import noimage from '../assets/system/no-image.jpg'
import {GlobalText} from './data_global/global'
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

const onErrorImage=(e:any)=>{
    e.target.src  = noimage;
}
// const convertToBase64 = (file:Blob) => {
// if (file && file.type.startsWith('image/')) {
//     const reader = new FileReader();
//     var base64Image:String = "";
//         // This event handler is called when the read operation is successfully completed
//         reader.onload = (e) => {
//             // The result attribute contains the data as a data: URL (base64 encoded string)
//             base64Image = e.target?.result as string;
//         };
//         // This event handler is called if an error occurs
//         reader.onerror = (error) => {
//             console.error("FileReader error: ", error);
//         };
//         // Read the file content as a Data URL (which is a Base64 string)
//         reader.readAsDataURL(file);
//         console.log(file)
//         console.log(base64Image)
//         return {
//             base64:base64Image,
//             file:file
//         }
        
//   } else {
//     ToastMessage({type:"error",detail:"Please select a valid image file."})
//   }
  
// };


export {translate,isEmptyData,ToastMessage,onErrorImage ,GlobalText};
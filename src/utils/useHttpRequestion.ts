import axios from "axios"
import { GlobalText, isEmptyData, ToastMessage } from "./global_helper"

export const useHttp=async({url,data,responseResult,method}:{url:string,data?:object,responseResult:(data:any)=>void,method?:string})=>{
    try{
        if(!url.startsWith('/',0)) url = '/'+url;

        if(!isEmptyData(method) && method?.toLowerCase()=="post"){
            const res = await axios.post(GlobalText.url.hostUrl+url,{...data});
            console.log("res",res)
            if(res.status==405){
                ToastMessage({type:"error",detail: res?.statusText || ""})
                return ;
            }
            responseResult(res);
        }else{
            const res = await axios.get(GlobalText.url.hostUrl+url);
            if(res.status==405){
                ToastMessage({type:"error",detail: res?.statusText || ""})
                return ;
            }
            responseResult(res);
        }
    }catch(error:unknown){
        console.log(error,"23")
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 405) {
                    ToastMessage({
                        type: "error",
                        detail: "Method Not Allowed"
                    });
                }
            if(error.code=="ERR_NETWORK"){
                ToastMessage({
                        type: "error",
                        detail: "Your cloud server doesn't work!"
                    });
            }
            if(!error.response?.data.IsSuccess){
                ToastMessage({
                        type: "error",
                        detail: error.response?.data.Message
                    });
            }
            
        } else if (error instanceof Error) {
            ToastMessage({
                type: "error",
                detail: error.message
            });
        }
    }
}
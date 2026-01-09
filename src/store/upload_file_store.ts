import { defineStore } from "pinia";
import type { UploadFileType } from "../interface/upload_file_type";

export const useUploadFileStore = defineStore("uploadFileStore",{  
        state:()=>({
            pathImage:""
        } as UploadFileType),
        actions:{
            setPathImage(pathImage:string){
                this.pathImage = pathImage;
            }
        }
})

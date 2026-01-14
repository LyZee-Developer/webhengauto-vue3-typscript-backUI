import {  RiAccountCircleLine, RiBarChartFill, RiBookAiLine,  RiCarLine, RiGalleryView2, RiLockPasswordLine, RiText, RiToolsLine, RiUserCommunityFill, RiUserLine } from "@remixicon/vue";
import type { MenuType } from "../interface/menu_type";
import type { Country } from "../interface/country_type";

import kh from '../assets/flag/Flag_of_Cambodia.svg.webp'
import br from '../assets/flag/Flag_of_Brazil.svg.webp'
import la from '../assets/flag/Flag_of_Laos.svg.png'
import vn from '../assets/flag/Flag_of_Vietnam.svg.webp'
import ch from '../assets/flag/Flag_of_the_Peoples_Republic_of_China.webp'
import ida from '../assets/flag/Flag_of_India.svg.webp'
import ind from '../assets/flag/Flag_of_Indonesia.svg.webp'
import my from '../assets/flag/Flag_of_Myanmar.svg.webp'
import us from '../assets/flag/Flag_of_the_United_States_(DDD-F-416E_specifications).svg.webp'

//langauge
import lang_ca from '../locales/km.json';
import lang_en from '../locales/us.json';
import lang_br from '../locales/br.json';
import lang_lao from '../locales/lao.json';
import lang_vn from '../locales/vn.json';
import lang_ch from '../locales/ch.json';
import lang_my from '../locales/my.json';
import lang_ind from '../locales/ind.json';
import lang_ida from '../locales/ida.json';

const menu_data:MenuType[] = [
    {
        code:"setting",
        title:"setting",
        subMenu:[
            {
                code:"owner",
                title:"Owner",
                icon:RiAccountCircleLine
            },
            {
                code:"partner",
                title:"Partner",
                 icon:RiUserCommunityFill
            },
            {
                code:"service",
                title:"Service",
                 icon:RiToolsLine
            },
            {
                code:"car",
                title:"Car",
                icon:RiCarLine
            },
            {
                code:"portfolio",
                title:"Portfolio",
                icon:RiGalleryView2
            }
        ]
    },
    {
        code:"user",
        title:"user",
        subMenu:[
            {
                code:"user",
                title:"User",
                   icon:RiUserLine
            },
            {
                code:"security_password",
                title:"Security Password",
                icon:RiLockPasswordLine
            }
        ]
    },
    {
        code:"content",
        title:"content",
        subMenu:[
            {
                code:"content",
                title:"Content",
                   icon:RiText
            }
        ]
    },
    {
        code:"booking",
        title:"booking_appointment",
        subMenu:[
            {
                code:"booking_appointment",
                title:"Booking Appointment",
                   icon:RiBookAiLine
            }
        ]
    },
     {
        code:"chart",
        title:"chart",
        subMenu:[
            {
                code:"chart",
                title:"chart",
                icon:RiBarChartFill
            }
        ]
    },
   
]

const countrys:Country[] = [
    {
        code:"kh",
        name:"ខ្មែរ",
        englishName:"Cambodia",
        image:kh
    },
     {
        code:"us",
        name:"អង់គ្លេស",
        englishName:"U.S.A",
        image:us
    },
     {
        code:"ch",
        name:"ចិន",
        englishName:"China",
        image:ch
    },
    {
        code:"vn",
        name:"វៀតណាម",
        englishName:"Vietnam",
        image:vn
    },
    {
        code:"br",
        name:"ប្រេហ្ស៊ីល",
        englishName:"Brazil",
        image:br
    },
    {
        code:"lao",
        name:"ឡាវ",
        englishName:"Lao",
        image:la
    },
    {
        code:"ind",
        name:"ឥណ្ឌូនេស៊ី",
        englishName:"Indonesia",
        image:ind
    },
    {
        code:"ida",
        name:"ឥណ្ឌា",
        englishName:"India",
        image:ida
    },
    {
        code:"my",
        name:"មីយ៉ាន់ម៉ា",
        englishName:"Myanmar",
        image:my
    }
]
const getLanguage = (code:string) : Record<string, string> =>{
    var translate = {};
    if(code=="us") translate = lang_en;
    else if(code=="kh") translate = lang_ca;
    else if(code=="vn") translate = lang_vn;
    else if(code=="br") translate = lang_br;
    else if(code=="lao") translate = lang_lao;
    else if(code=="ch") translate = lang_ch;
    else if(code=="my") translate = lang_my;
    else if(code=="ind") translate = lang_ind;
    else if(code=="ida") translate = lang_ida;
    return translate;
}
export {menu_data,countrys,getLanguage}
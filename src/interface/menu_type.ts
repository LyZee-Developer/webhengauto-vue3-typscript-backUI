export interface MenuType{
    code:string,
    title:string
    subMenu:SubMenu[]
}
export interface SubMenu{
    code:string,
    title:string,
    icon:any,
}
export namespace layout{
    export interface meunType{
        key:string,
        name:string,
        parentKey?:string,
        children?:meunType[],
        isSubMenu?:boolean,
        isItemGroup?:boolean,
        iconPath?:JSX.Element
    }
    export interface MenuInfo {
        key: React.Key;
        keyPath: React.Key[];
        item: React.ReactInstance;
        domEvent: React.MouseEvent<HTMLElement>;
    }
}
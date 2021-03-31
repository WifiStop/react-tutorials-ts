export namespace home {
    export interface cardType {
        key: string,
        title: string,
        tagColor: string,
        tagValue: string,
        currency: number,
        aliasCurrency: keyof headerBannerType,
        desc: string,
        count: string,
        icon: string
    }
    export interface headerBannerType {
        activeUser: any[]
        download: any[]
        income: any[]
        visit: any[]

    }
    export interface echartsDataType {
        averageVisits: number[]
        download: number[]
        monthDownload: number
        monthIncome: number
        monthVisit: number
        visit: number[]
    }
}
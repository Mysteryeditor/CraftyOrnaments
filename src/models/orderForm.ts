import { UserData } from "./UserData";

export interface orderForm {
    metalId: number;
    ornamentId: number;
    weight: number;
    length: number;
    width: number;
    sizeId: number;
    estimatedAmount:number;
    advanceAmount:number;
    remainingAmount:number;
    TotalAmount:number;
    quantity:number;
    userId:number;
}

export interface orderResponse{
    orderId:number;
    metalId: number;
    ornamentId: number;
    weight: number;
    length: number;
    width: number;
    sizeId: number;
    statusId:number;
    estimatedAmount:number;
    advanceAmount:number;
    remainingAmount:number;
    wastage:number;
    TotalAmount:number;
    quantity:number;
    userId:number;
    createdDate:Date;
    dueDate:Date;
    isCustomised:boolean;
}


    export interface orderInformation {
    userId: number;
    userName: string | null;
    email?: string | null;
    orderId: number;
    metalName?: string | null;
    weight: number;
    ornamentName: string;
    image?: Uint8Array | null;
    createdDate?: Date | null;
    dueDate?: Date | null;
    length?: number | null;
    width?: number | null;
    size?: number | null;
    sizeName?: string | null;
    sizeValue?: number | null;
    advanceAmount?: number | null;
    remainingAmount?: number | null;
    totalamount: number;
    finalamount:number;
    isCustomized?: boolean | null;
    fullAmountPaid?: boolean | null;
    statusId:number;
    statusName: string;
    finalWeight:number
    }

    export interface orderStatus{
        statusId:number;
        statusName:string;
    }

    export interface OrderStatsModel {
        metalName: string;
        orderCount: number;
      }
      



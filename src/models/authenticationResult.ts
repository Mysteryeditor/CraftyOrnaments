export interface AuthenticationSuccess{
    userId:number;
    role:string;
}

export interface OtpVerifier{
    otp: string;
    email:string;
}
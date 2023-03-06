export interface User {
    userId: number;
    emailAddress: string;
    password: string;
    firstName: string;
    lastName: string;
    userStatus: string;
    roleList:string;
    provider:string;
}
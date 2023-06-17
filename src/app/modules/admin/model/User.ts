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

export interface UserFilterType {
    emailAddress?: string;
    firstName?: string;
    lastName?: string;
}
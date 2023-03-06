export interface LoginForm {
  email: string;
  password: string;
}


export interface LoginResult {
  userId: number;
  token: string;
  account: AccountDTO;
  
}

export interface AccountRegistrationDTO {
  emailAddress: string;
  password: string;
  firstName: string;
  lastName: string;
  loginSourceType?: string;
  gender?: string;
  groupTypeList: string[];
}


export interface AccountDTO {
  uuid: string;
  userId: number;
  emailAddress: EmailAddress;
  firstName: string;
  lastName:string
  userStatus: string;
  note: string | undefined;
  roleList: string;
  provider: string;
}

export interface PersonInfo {
  firstName: string;
  lastName: string;
}


export interface EmailAddress {
  emailAddress: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirm_password: string;
  firstName: string;
  lastName: string;
}


export interface LoginForm {
    email: string;
    password: string;
  }

  export interface LoginResult {
    userId: number;
    token: string ;
    account: AccountDTO ;
  }

  export interface AccountDTO{
      uuid: String; 
      userId: number ;
      emailAddress: EmailAddress;
      personInfo: PersonInfo ;
      userStatus: string; 
      userGroups: string;
      note: string | undefined ;
      active: boolean ;
      roleList: string ;
      disable: boolean ;
      pending: boolean ;
  }
  
  export interface PersonInfo{
    firstName: string;
    lastName: string;
  }


  export interface EmailAddress{
    emailAddress: string ;
  }
  
  export interface RegisterForm {
    email: string;
    password: string;
    confirm_password: string;
    firstName: string;
    lastName: string ;
  }

    
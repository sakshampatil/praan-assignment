export interface IUser {
  email: string;
  password: string;
  active?: boolean;
}

export interface ISignupDTO {
  email: string;
  password: string;
}

export interface ILoginDTO {
  email: string;
  password: string;
}

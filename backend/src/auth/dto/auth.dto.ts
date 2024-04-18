export interface RegisterDto {
  name: string;
  lastname: string;
  email: string;
  username: string;
  pswd: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

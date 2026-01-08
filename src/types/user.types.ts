export interface User {
  userName: string;
  email: string;
}

export interface SignUpData {
  userName: string;
  email: string;
  password: string;
}

export interface LogInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

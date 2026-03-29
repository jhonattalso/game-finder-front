export interface UserCredentials {
  username: string;
  password?: string; // Opcional para certas respostas
}

export interface TokenResponse {
  token: string;
}

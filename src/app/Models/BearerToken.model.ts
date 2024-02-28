export interface BearerToken {
  accessToken: string;
  expiresIn: string;
  TokenType: string;
  refreshToken?: string;
}

export interface Claim {
  email: string;
  role: string;
}

export class RefreshTokenDTO {
    accessToken: string
}

export class GenerateTokensDTO extends RefreshTokenDTO {
    refreshToken: string
}

export class DecodedToken {
    iat: number;
    exp: number
}
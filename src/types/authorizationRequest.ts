export interface reqQuery{
    code: string
    referer: string
    platform: string
    client_id: string
    from_widget: string
}

export interface OauthResponse {
token_type: string,
  expires_in: number,
  access_token: string
  refresh_token: string
}
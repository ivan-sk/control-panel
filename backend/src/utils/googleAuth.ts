import { OAuth2Client, TokenPayload } from "google-auth-library";
import axios from "axios";

import log from "./logger";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USER_INFO_URL = "https://www.googleapis.com/oauth2/v1/userinfo";

const client = new OAuth2Client();

export const verifyGoogleToken = async (
  token: string
): Promise<TokenPayload | null> => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload()!;
    const userid = payload["sub"];
    // If the request specified a Google Workspace domain:
    // const domain = payload['hd'];
    return payload;
  } catch (error) {
    log.error(error);
    return null;
  }
};

interface GoogleTokenResponse {
  access_token: string;
  id_token: string;
  expires_in: number;
  token_type: string;
  refresh_token?: string;
}

export const getGoogleTokens = async (
  code: string
): Promise<GoogleTokenResponse> => {
  const response = await axios.post(GOOGLE_TOKEN_URL, null, {
    params: {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    },
  });

  return response.data;
};

export const getGoogleUserInfo = async (accessToken: string) => {
  const response = await axios.get(GOOGLE_USER_INFO_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

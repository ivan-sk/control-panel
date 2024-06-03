
import axios from 'utils/axios';


const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v1/userinfo';

interface GoogleTokenResponse {
  access_token: string;
  id_token: string;
  expires_in: number;
  token_type: string;
  refresh_token?: string;
}


export const getGoogleOAuthURL = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    redirect_uri: process.env.REACT_APP_GOOGLE_CALLBACK_URL as string,
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID as string,
    access_type: "online",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  
  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
}



export const getGoogleTokens = async (code: string): Promise<GoogleTokenResponse> => {
  const response = await axios.post(GOOGLE_TOKEN_URL, null, {
    params: {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
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

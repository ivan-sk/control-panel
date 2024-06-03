// src/controllers/authController.ts
import { Request, Response } from "express";
import { getGoogleTokens, verifyGoogleToken } from "@utils/googleAuth";
import log from "@utils/logger";

export const googleAuthLogin = async (req: Request, res: Response) => {
  const { code } = req.body;

  try {
    const { id_token } = await getGoogleTokens(code);
    const payload = await verifyGoogleToken(id_token);

    let user;
    if(payload) {
      const { email, name, picture, sub, iat, exp } = payload
      user = {
        id: sub,
        email,
        name,
        picture,
        exp
      }
      req.session.user = {
        id: sub,
        email,
        name,
        picture,
      }

      const maxAge = exp - iat

      req.session.cookie.maxAge = maxAge * 1000; //ms
    }
    res.json({ user });
  } catch (error) {
    log.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      log.error('Error destroying session:', err);
      return res.status(500).json({ message: 'Failed to log out' });
    }
    res.clearCookie('connect.sid', { path: '/' });
    res.status(200).json({ message: 'Logged out successfully' });
  });
};
import jwt from "jsonwebtoken";

const generateAccessToken = (_id: unknown, email: string) => {
  return jwt.sign({ _id, email }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: process.env.ACCESS_TOKEN_LIFETIME,
  });
};

const generateRefreshToken = (_id: unknown, email: string) => {
  return jwt.sign({ _id, email }, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: process.env.REFRESH_TOKEN_LIFETIME,
  });
};

const helpers = { generateAccessToken, generateRefreshToken };

export default helpers;

import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../utils/httpErrors";

export const checkProfileParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.name) {
    throw new HTTP400Error("Missing name parameter");
  } else {
    next();
  }
};

export const checkPostRequestBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body) {
    throw new HTTP400Error("Missing request body");
  } else {
    next();
  }
};


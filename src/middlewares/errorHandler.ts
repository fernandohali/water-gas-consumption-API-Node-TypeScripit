import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).send({
    error_code: "INTERNAL_ERROR",
    error_description: "Ocorreu um erro inesperado no servidor",
  });
};

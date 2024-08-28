import { Request, Response } from "express";

export const getReading = async (req: Request, res: Response) => {
  // Implemente a lógica para obter a leitura aqui
  res.status(200).send({ message: "Leitura recebida!" });
};

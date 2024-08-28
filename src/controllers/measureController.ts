import { Request, Response } from "express";
import { validateUploadRequest } from "../utils/validation";
import { getMeasureFromImage } from "../services/geminiService";
import { v4 as uuidv4 } from "uuid";

export const uploadMeasure = async (req: Request, res: Response) => {
  try {
    // Validação dos parâmetros
    const validationErrors = validateUploadRequest(req.body);
    if (validationErrors.length > 0) {
      return res
        .status(400)
        .json({
          error_code: "INVALID_DATA",
          error_description: validationErrors,
        });
    }

    const { image, customer_code, measure_datetime, measure_type } = req.body;

    // Simulação de verificação se já existe uma leitura no mês
    const alreadyExists = false; // Implementar a lógica real aqui
    if (alreadyExists) {
      return res.status(409).json({
        error_code: "DOUBLE_REPORT",
        error_description: "Leitura do mês já realizada",
      });
    }

    // Chamada ao serviço da Gemini API
    const measureResult = await getMeasureFromImage(image);

    // Criação de um GUID único para a leitura
    const measure_uuid = uuidv4();

    // Resposta bem-sucedida
    res.status(200).json({
      image_url: measureResult.image_url,
      measure_value: measureResult.measure_value,
      measure_uuid: measure_uuid,
    });
  } catch (error) {
    console.error("Error processing the upload:", error);
    res
      .status(500)
      .json({
        error_code: "INTERNAL_ERROR",
        error_description: "Ocorreu um erro ao processar a leitura.",
      });
  }
};

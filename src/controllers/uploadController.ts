import { Request, Response } from "express";
import { validateUploadRequest } from "../utils/validation";
import { GeminiService } from "../services/geminiService";
import { v4 as uuidv4 } from "uuid";

export class UploadController {
  static async uploadImage(req: Request, res: Response) {
    try {
      // Valida os dados da requisição
      const validationErrors = validateUploadRequest(req.body);
      if (validationErrors.length > 0) {
        return res.status(400).json({
          error_code: "INVALID_DATA",
          error_description: validationErrors.join(", "),
        });
      }

      let { image, customer_code, measure_datetime, measure_type } = req.body;

      // Remove o prefixo data:image/png;base64, se existir
      const base64Prefix = "data:image/png;base64,";
      if (image.startsWith(base64Prefix)) {
        image = image.replace(base64Prefix, "");
      }

      // Verifica se a string base64 parece válida
      if (!image || !/^[A-Za-z0-9+/=]+$/.test(image)) {
        return res.status(400).json({
          error_code: "INVALID_DATA",
          error_description: "Imagem inválida ou não base64",
        });
      }

      // Verifica se já existe uma leitura no mês
      const existingMeasure = false; // Substituir por lógica real de verificação no banco de dados
      if (existingMeasure) {
        return res.status(409).json({
          error_code: "DOUBLE_REPORT",
          error_description:
            "Já existe uma leitura para este tipo no mês atual",
        });
      }

      // Chama a API do Gemini para obter o valor
      const measureValue = await GeminiService.getMeasureValueFromImage(image);

      // Gera um UUID para a leitura
      const measureUuid = uuidv4();

      // Retorna a resposta
      return res.status(200).json({
        image_url: `https://i.pinimg.com/originals/ff/1d/51/ff1d51249c2fe45c1aecdd3cf7a116a7.jpg${measureUuid}`,
        measure_value: measureValue,
        measure_uuid: measureUuid,
      });
    } catch (error) {
      return res.status(500).json({
        error_code: "INTERNAL_ERROR",
        error_description: "Ocorreu um erro ao processar a solicitação",
      });
    }
  }
}

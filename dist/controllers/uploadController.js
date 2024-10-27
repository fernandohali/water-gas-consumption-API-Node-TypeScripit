"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const validation_1 = require("../utils/validation");
const geminiService_1 = require("../services/geminiService");
const uuid_1 = require("uuid");
class UploadController {
    static uploadImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validationErrors = (0, validation_1.validateUploadRequest)(req.body);
                if (validationErrors.length > 0) {
                    return res.status(400).json({
                        error_code: "INVALID_DATA",
                        error_description: validationErrors.join(", "),
                    });
                }
                const { image, customer_code, measure_datetime, measure_type } = req.body;
                // Verificar se já existe uma leitura no mês
                const existingMeasure = false; // Aqui você conectaria com o banco de dados para fazer essa verificação
                if (existingMeasure) {
                    return res.status(409).json({
                        error_code: "DOUBLE_REPORT",
                        error_description: "Leitura do mês já realizada",
                    });
                }
                // Chamar a API do Gemini para obter o valor
                const measureValue = yield geminiService_1.GeminiService.getMeasureValueFromImage(image);
                // Gerar um UUID para a leitura
                const measureUuid = (0, uuid_1.v4)();
                // Retornar a resposta
                return res.status(200).json({
                    image_url: `https://your-storage-service.com/images/${measureUuid}`,
                    measure_value: measureValue,
                    measure_uuid: measureUuid,
                });
            }
            catch (error) {
                return res.status(500).json({
                    error_code: "INTERNAL_ERROR",
                    error_description: "Ocorreu um erro ao processar a solicitação",
                });
            }
        });
    }
}
exports.UploadController = UploadController;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiService = void 0;
const axios_1 = __importDefault(require("axios"));
class GeminiService {
    static getMeasureValueFromImage(base64Image) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiKey = process.env.GEMINI_API_KEY;
            const response = yield axios_1.default.post("https://api.google.dev/gemini/v1/vision", {
                image: base64Image,
            }, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
            });
            const measureValue = response.data.measure_value;
            return measureValue;
        });
    }
}
exports.GeminiService = GeminiService;
exports.default = GeminiService;

"use strict";
"use server";
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
exports.recognizeImageByUrl = recognizeImageByUrl;
const gemini_1 = require("../lib/gemini");
function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(path).toString("base64"),
            mimeType,
        },
    };
}
function recognizeImageByUrl(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = gemini_1.genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        const prompt = "Describe the image in a sentence. Answer in portuguese.";
        const image = yield fetch(url, {
            mode: "no-cors",
        });
        const imageBuffer = yield image.arrayBuffer();
        const imageParts = [fileToGenerativePart(imageBuffer, "image/png")];
        const imageBase64 = Buffer.from(imageBuffer).toString("base64");
        const result = yield model.generateContent([prompt, ...imageParts]);
        const response = result.response;
        const resultText = response.text();
        return { image: imageBase64, result: resultText };
    });
}

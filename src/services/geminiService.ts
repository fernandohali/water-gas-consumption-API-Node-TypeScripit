import axios from 'axios';

export class GeminiService {
  static async getMeasureValueFromImage(base64Image: string): Promise<number> {
    const apiKey = process.env.GEMINI_API_KEY;
    const response = await axios.post(
      'https://api.google.dev/gemini/v1/vision',
      {
        image: base64Image,
        // Se necessário, adicione outros parâmetros aqui conforme o exemplo do repositório
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Ajuste conforme a resposta real da API
    const measureValue = response.data.measure_value;
    return measureValue;
  }
}

export default GeminiService;

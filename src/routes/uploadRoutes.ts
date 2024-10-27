import { Router } from "express";
import { UploadController } from "../controllers/uploadController";

// Cria uma instância do roteador, que será usada para definir as rotas específicas
const router = Router();

// Define uma rota POST para o caminho '/upload' que chama o método 'uploadImage' do controlador de upload
// Quando uma requisição POST é feita para '/upload', a função 'uploadImage' é executada para lidar com o upload da imagem
router.post("/upload", UploadController.uploadImage);

// Exporta o roteador para que ele possa ser usado em outras partes da aplicação, como no arquivo principal de configuração de rotas
export default router;

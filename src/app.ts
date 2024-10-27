import express from "express";
import uploadRoutes from "./routes/uploadRoutes";
import { errorHandler } from "./middlewares/errorHandler";

// Cria uma instância do aplicativo Express
const app = express();

// Middleware para interpretar requisições com corpo em formato JSON
app.use(express.json());

// Define o caminho base "/api" para as rotas de upload, ou seja, todas as rotas dentro de 'uploadRoutes' estarão sob "/api"
app.use("/api", uploadRoutes);

// Middleware global para lidar com erros, deve ser o último middleware definido
app.use(errorHandler);

// Define a porta em que o servidor irá escutar. Se uma porta não estiver definida nas variáveis de ambiente, ele usará a porta 3000
const PORT = process.env.PORT || 3000;

// Inicia o servidor e faz com que ele comece a escutar na porta definida. Exibe uma mensagem no console quando o servidor está em execução
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Exporta a instância do aplicativo para que possa ser usada em outros módulos
export default app;
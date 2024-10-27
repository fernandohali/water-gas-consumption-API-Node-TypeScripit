"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        error_code: 'INTERNAL_ERROR',
        error_description: 'Ocorreu um erro inesperado no servidor',
    });
};
exports.errorHandler = errorHandler;

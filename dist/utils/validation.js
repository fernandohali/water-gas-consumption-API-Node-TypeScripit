"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUploadRequest = void 0;
const class_validator_1 = require("class-validator");
const class_validator_2 = require("class-validator");
class UploadRequest {
}
__decorate([
    (0, class_validator_1.IsBase64)(),
    __metadata("design:type", String)
], UploadRequest.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UploadRequest.prototype, "customer_code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UploadRequest.prototype, "measure_datetime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["WATER", "GAS"]),
    __metadata("design:type", String)
], UploadRequest.prototype, "measure_type", void 0);
const validateUploadRequest = (body) => {
    const request = new UploadRequest();
    Object.assign(request, body);
    const errors = (0, class_validator_2.validateSync)(request);
    if (errors.length > 0) {
        return errors.map((err) => Object.values(err.constraints || {}).join(", "));
    }
    return [];
};
exports.validateUploadRequest = validateUploadRequest;

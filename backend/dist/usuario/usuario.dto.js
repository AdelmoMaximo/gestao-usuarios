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
exports.UpdateUsuarioDto = exports.CreateUsuarioDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateUsuarioDto {
}
exports.CreateUsuarioDto = CreateUsuarioDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Nome do usuário (apenas letras)" }),
    (0, class_validator_1.IsString)({ message: "O nome deve ser uma string" }),
    (0, class_validator_1.Matches)(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
        message: "O nome deve conter apenas letras e espaços",
    }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Email do usuário" }),
    (0, class_validator_1.IsEmail)({}, { message: "O email fornecido não é válido" }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Matrícula do usuário (apenas números)" }),
    (0, class_validator_1.IsNumberString)({}, { message: "A matrícula deve conter apenas números" }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "matricula", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Senha do usuário (alfanumérica, 6 dígitos)" }),
    (0, class_validator_1.IsString)({ message: "A senha deve ser uma string" }),
    (0, class_validator_1.Length)(6, 6, { message: "A senha deve ter exatamente 6 caracteres" }),
    (0, class_validator_1.Matches)(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6}$/, {
        message: "A senha deve ser alfanumérica (conter letras e números) e ter 6 caracteres",
    }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "senha", void 0);
class UpdateUsuarioDto extends CreateUsuarioDto {
}
exports.UpdateUsuarioDto = UpdateUsuarioDto;
//# sourceMappingURL=usuario.dto.js.map
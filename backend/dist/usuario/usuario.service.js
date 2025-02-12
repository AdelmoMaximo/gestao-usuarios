"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const common_1 = require("@nestjs/common");
let UsuarioService = class UsuarioService {
    constructor() {
        this.usuarios = [];
        this.idCounter = 1;
    }
    async create(createUsuarioDto) {
        const existingEmail = this.usuarios.find((u) => u.email === createUsuarioDto.email);
        if (existingEmail) {
            throw new common_1.ConflictException("Email já cadastrado");
        }
        const existingMatricula = this.usuarios.find((u) => u.matricula === createUsuarioDto.matricula);
        if (existingMatricula) {
            throw new common_1.ConflictException("Matrícula já cadastrada");
        }
        const newUser = {
            id: this.idCounter++,
            ...createUsuarioDto,
        };
        this.usuarios.push(newUser);
        return newUser;
    }
    async findAll() {
        return this.usuarios;
    }
    async findOne(id) {
        const usuario = this.usuarios.find((u) => u.id === id);
        if (!usuario) {
            throw new common_1.NotFoundException("Usuário não encontrado");
        }
        return usuario;
    }
    async update(id, updateUsuarioDto) {
        const index = this.usuarios.findIndex((u) => u.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException("Usuário não encontrado");
        }
        const existingUser = this.usuarios[index];
        if (updateUsuarioDto.email && updateUsuarioDto.email !== existingUser.email) {
            const existingEmail = this.usuarios.find((u) => u.email === updateUsuarioDto.email);
            if (existingEmail) {
                throw new common_1.ConflictException("Email já cadastrado");
            }
        }
        if (updateUsuarioDto.matricula && updateUsuarioDto.matricula !== existingUser.matricula) {
            const existingMatricula = this.usuarios.find((u) => u.matricula === updateUsuarioDto.matricula);
            if (existingMatricula) {
                throw new common_1.ConflictException("Matrícula já cadastrada");
            }
        }
        this.usuarios[index] = { ...existingUser, ...updateUsuarioDto };
        return this.usuarios[index];
    }
    async remove(id) {
        const index = this.usuarios.findIndex((u) => u.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException("Usuário não encontrado");
        }
        this.usuarios.splice(index, 1);
    }
};
exports.UsuarioService = UsuarioService;
exports.UsuarioService = UsuarioService = __decorate([
    (0, common_1.Injectable)()
], UsuarioService);
//# sourceMappingURL=usuario.service.js.map
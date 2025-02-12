import { Injectable, ConflictException, NotFoundException } from "@nestjs/common"
import type { CreateUsuarioDto, UpdateUsuarioDto } from "./usuario.dto"

@Injectable()
export class UsuarioService {
  private usuarios: any[] = []
  private idCounter = 1

  async create(createUsuarioDto: CreateUsuarioDto) {
    // Verificar email existente
    const existingEmail = this.usuarios.find((u) => u.email === createUsuarioDto.email)
    if (existingEmail) {
      throw new ConflictException("Email já cadastrado")
    }

    // Verificar matrícula existente
    const existingMatricula = this.usuarios.find((u) => u.matricula === createUsuarioDto.matricula)
    if (existingMatricula) {
      throw new ConflictException("Matrícula já cadastrada")
    }

    const newUser = {
      id: this.idCounter++,
      ...createUsuarioDto,
    }

    this.usuarios.push(newUser)
    return newUser
  }

  async findAll() {
    return this.usuarios
  }

  async findOne(id: number) {
    const usuario = this.usuarios.find((u) => u.id === id)
    if (!usuario) {
      throw new NotFoundException("Usuário não encontrado")
    }
    return usuario
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const index = this.usuarios.findIndex((u) => u.id === id)
    if (index === -1) {
      throw new NotFoundException("Usuário não encontrado")
    }

    const existingUser = this.usuarios[index]

    // Verificar email existente (se estiver sendo atualizado)
    if (updateUsuarioDto.email && updateUsuarioDto.email !== existingUser.email) {
      const existingEmail = this.usuarios.find((u) => u.email === updateUsuarioDto.email)
      if (existingEmail) {
        throw new ConflictException("Email já cadastrado")
      }
    }

    // Verificar matrícula existente (se estiver sendo atualizada)
    if (updateUsuarioDto.matricula && updateUsuarioDto.matricula !== existingUser.matricula) {
      const existingMatricula = this.usuarios.find((u) => u.matricula === updateUsuarioDto.matricula)
      if (existingMatricula) {
        throw new ConflictException("Matrícula já cadastrada")
      }
    }

    this.usuarios[index] = { ...existingUser, ...updateUsuarioDto }
    return this.usuarios[index]
  }

  async remove(id: number) {
    const index = this.usuarios.findIndex((u) => u.id === id)
    if (index === -1) {
      throw new NotFoundException("Usuário não encontrado")
    }
    this.usuarios.splice(index, 1)
  }
}


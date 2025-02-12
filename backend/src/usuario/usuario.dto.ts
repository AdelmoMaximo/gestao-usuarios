import { IsString, IsEmail, IsNumberString, Length, Matches } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateUsuarioDto {
  @ApiProperty({ description: "Nome do usuário (apenas letras)" })
  @IsString({ message: "O nome deve ser uma string" })
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
    message: "O nome deve conter apenas letras e espaços",
  })
  nome: string

  @ApiProperty({ description: "Email do usuário" })
  @IsEmail({}, { message: "O email fornecido não é válido" })
  email: string

  @ApiProperty({ description: "Matrícula do usuário (apenas números)" })
  @IsNumberString({}, { message: "A matrícula deve conter apenas números" })
  matricula: string

  @ApiProperty({ description: "Senha do usuário (alfanumérica, 6 dígitos)" })
  @IsString({ message: "A senha deve ser uma string" })
  @Length(6, 6, { message: "A senha deve ter exatamente 6 caracteres" })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6}$/, {
    message: "A senha deve ser alfanumérica (conter letras e números) e ter 6 caracteres",
  })
  senha: string
}

export class UpdateUsuarioDto extends CreateUsuarioDto {}


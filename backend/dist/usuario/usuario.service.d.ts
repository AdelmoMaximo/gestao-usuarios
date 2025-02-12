import type { CreateUsuarioDto, UpdateUsuarioDto } from "./usuario.dto";
export declare class UsuarioService {
    private usuarios;
    private idCounter;
    create(createUsuarioDto: CreateUsuarioDto): Promise<{
        nome: string;
        email: string;
        matricula: string;
        senha: string;
        id: number;
    }>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<any>;
    remove(id: number): Promise<void>;
}

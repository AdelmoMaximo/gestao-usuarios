import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from './usuario.dto';
export declare class UsuarioController {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
    create(createUsuarioDto: CreateUsuarioDto): Promise<{
        nome: string;
        email: string;
        matricula: string;
        senha: string;
        id: number;
    }>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<any>;
    remove(id: string): Promise<void>;
}

import type {VentasRepository} from '../repositories/ventas.repository.js'

export class VentasService {
    constructor(private repository: VentasRepository) {}

    async findAll(){
        return this.repository.findAll();
    }

    async create(id_usuario: number){
        return this.repository.create(id_usuario);
    }

    async update(id: number){
        return this.repository.update(id);
    }
}


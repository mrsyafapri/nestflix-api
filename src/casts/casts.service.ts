import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { CreateCastDto } from './dto/create-cast.dto';
import { UpdateCastDto } from './dto/update-cast.dto';
import { Cast } from './entities/cast.entity';

@Injectable()
export class CastsService {
  constructor(
    @InjectRepository(Cast)
    private castRepository: Repository<Cast>,
  ) {}

  create(createCastDto: CreateCastDto): Promise<CreateCastDto> {
    return this.castRepository.save(createCastDto);
  }

  findAll(): Promise<Cast[]> {
    return this.castRepository.find();
  }

  findOne(id: number): Promise<Cast> {
    return this.castRepository.findOne({ where: { id } });
  }

  update(id: number, updateCastDto: UpdateCastDto): Promise<UpdateResult> {
    return this.castRepository.update(id, updateCastDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.castRepository.delete(id);
  }
}

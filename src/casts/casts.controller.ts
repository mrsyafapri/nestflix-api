import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CastsService } from './casts.service';
import { CreateCastDto } from './dto/create-cast.dto';
import { UpdateCastDto } from './dto/update-cast.dto';
import { Cast } from './entities/cast.entity';

@Controller('casts')
export class CastsController {
  constructor(private readonly castsService: CastsService) {}

  @Post()
  create(@Body() createCastDto: CreateCastDto): Promise<CreateCastDto> {
    return this.castsService.create(createCastDto);
  }

  @Get()
  findAll(): Promise<Cast[]> {
    return this.castsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Cast> {
    return this.castsService.findOne(+id);
  }

  @Get('language/:id')
  getLanguagesForHighRatedMovies(@Param('id') id: string): Promise<any[]> {
    return this.castsService.getLanguagesForHighRatedMovies(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCastDto: UpdateCastDto,
  ): Promise<UpdateResult> {
    return this.castsService.update(+id, updateCastDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.castsService.remove(+id);
  }
}

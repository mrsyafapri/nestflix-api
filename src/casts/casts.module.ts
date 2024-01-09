import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CastsService } from './casts.service';
import { CastsController } from './casts.controller';
import { Cast } from './entities/cast.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cast])],
  controllers: [CastsController],
  providers: [CastsService],
})
export class CastsModule {}

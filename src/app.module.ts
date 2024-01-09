import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { join } from 'path';
import { CastsModule } from './casts/casts.module';
import { MovieCastsModule } from './movie-casts/movie-casts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // your username
      password: '', // your password
      database: 'nestflix', // your database
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
    MoviesModule,
    CastsModule,
    MovieCastsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { CreateCastDto } from './dto/create-cast.dto';
import { UpdateCastDto } from './dto/update-cast.dto';
import { Cast } from './entities/cast.entity';
import { MovieCast } from 'src/movie-casts/entities/movie-cast.entity';

@Injectable()
export class CastsService {
  constructor(
    @InjectRepository(Cast)
    private castRepository: Repository<Cast>,
    @InjectRepository(MovieCast)
    private movieCastRepository: Repository<MovieCast>,
  ) {}

  create(createCastDto: CreateCastDto): Promise<CreateCastDto> {
    return this.castRepository.save(createCastDto);
  }

  async findAll(): Promise<Cast[]> {
    const casts = await this.castRepository.find();
    casts.forEach((cast) => {
      cast.horoscope = this.getHoroscope(cast.birthday);
      cast.isLeap = this.isLeap(cast.birthday);
    });
    return casts;
  }

  findOne(id: number): Promise<Cast> {
    const cast = this.castRepository.findOne({ where: { id } });
    cast.then((cast) => {
      cast.horoscope = this.getHoroscope(cast.birthday);
      cast.isLeap = this.isLeap(cast.birthday);
    });
    return cast;
  }

  async getLanguagesForHighRatedMovies(id: number): Promise<string[]> {
    const movieCasts = await this.movieCastRepository.find({
      where: { cast: { id } },
      relations: ['movie'],
    });
    const languages = Array.from(
      new Set(
        movieCasts
          .filter((movieCast) => movieCast.movie.rating >= 4.5)
          .map((movieCast) => movieCast.movie.language),
      ),
    );
    return languages;
  }

  update(id: number, updateCastDto: UpdateCastDto): Promise<UpdateResult> {
    return this.castRepository.update(id, updateCastDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.castRepository.delete(id);
  }

  private getHoroscope(birthDate: Date): string {
    /** Horoscope is a map of month and date to zodiac sign. */
    const month = birthDate.getMonth() + 1;
    const date = birthDate.getDate();
    if ((month === 3 && date >= 21) || (month === 4 && date <= 19)) {
      return 'aries';
    } else if ((month === 4 && date >= 20) || (month === 5 && date <= 20)) {
      return 'taurus';
    } else if ((month === 5 && date >= 21) || (month === 6 && date <= 20)) {
      return 'gemini';
    } else if ((month === 6 && date >= 21) || (month === 7 && date <= 22)) {
      return 'cancer';
    } else if ((month === 7 && date >= 23) || (month === 8 && date <= 22)) {
      return 'leo';
    } else if ((month === 8 && date >= 23) || (month === 9 && date <= 22)) {
      return 'virgo';
    } else if ((month === 9 && date >= 23) || (month === 10 && date <= 22)) {
      return 'libra';
    } else if ((month === 10 && date >= 23) || (month === 11 && date <= 21)) {
      return 'scorpio';
    } else if ((month === 11 && date >= 22) || (month === 12 && date <= 21)) {
      return 'sagittarius';
    } else if ((month === 12 && date >= 22) || (month === 1 && date <= 19)) {
      return 'capricorn';
    } else if ((month === 1 && date >= 20) || (month === 2 && date <= 18)) {
      return 'aquarius';
    } else if ((month === 2 && date >= 19) || (month === 3 && date <= 20)) {
      return 'pisces';
    }
    return '';
  }

  private isLeap(birthDate: Date): boolean {
    /** A leap year is exactly divisible by 4 except for century years (years ending with 00). */
    const year = birthDate.getFullYear();
    if (year % 4 === 0) {
      if (year % 100 === 0) {
        return year % 400 === 0;
      }
      return true;
    }
    return false;
  }
}

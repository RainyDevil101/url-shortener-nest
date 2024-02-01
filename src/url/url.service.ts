import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Url } from './entities/url.entity';
import { Model } from 'mongoose';
import { UrlHasher } from '../utils/urlHasher';

@Injectable()
export class UrlService {
  constructor(
    @InjectModel(Url.name)
    private readonly urlModel: Model<Url>,
  ) {}

  async create(createUrlDto: CreateUrlDto) {
    try {
      const { originalUrl } = createUrlDto;
      if (!originalUrl) throw new BadRequestException('Url needed!');

      const response = await this.originalUrlExists(originalUrl);

      if (response) return response;

      const shortUrl = UrlHasher.hash(originalUrl);
      const currentDate = new Date();
      const expiresAt = new Date(currentDate);
      expiresAt.setDate(expiresAt.getDate() + 30);

      const product = await this.urlModel.create({
        originalUrl,
        shortUrl,
        createdAt: currentDate,
        expiresAt,
        lastUsedAt: currentDate,
      });

      return product.shortUrl;
    } catch (error) {
      console.log(error);
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all url`;
  }

  async findOne(url: string) {
    // let originalUrl;
    const originalUrl = await this.urlModel.findOne({
      originalUrl: url,
    });

    if (!originalUrl) throw new NotFoundException(`Url already exists`);

    return originalUrl;
  }

  async originalUrlExists(url: string) {
    const originalUrl: Url = await this.urlModel.findOne(
      {
        originalUrl: url,
      },
      {
        shortUrl: 1,
        _id: 0,
      },
    );

    if (!originalUrl) return false;

    return originalUrl;
  }

  update(id: number, updateUrlDto: UpdateUrlDto) {
    return `This action updates a #${id} url`;
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Url exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create url - Check server log`,
    );
  }
}

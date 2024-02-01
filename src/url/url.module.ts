import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from './entities/url.entity';

@Module({
  controllers: [UrlController],
  providers: [UrlService],
  imports: [MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }])],
})
export class UrlModule {}

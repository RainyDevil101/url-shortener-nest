import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from './entities/url.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UrlController],
  providers: [UrlService],
  imports: [
    MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }]),
    AuthModule,
  ],
  exports: [MongooseModule],
})
export class UrlModule {}

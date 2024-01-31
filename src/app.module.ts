import { Module } from '@nestjs/common';
import { UrlModule } from './url/url.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration, JoiValidationSchema } from './config';

@Module({
  imports: [
    UrlModule,
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
  ],
})
export class AppModule {}

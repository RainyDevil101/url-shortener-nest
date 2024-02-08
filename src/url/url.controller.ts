import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  create(@Body() createUrlDto: CreateUrlDto) {
    console.log(createUrlDto);
    return this.urlService.create(createUrlDto);
  }

  @Get()
  findAll() {
    return this.urlService.findAll();
  }

  @Get(':url')
  getOriginalUrl(@Param('url') url: string) {
    return this.urlService.getOriginalUrl(url);
  }

  @Get('short/:url')
  getClicks(@Param('url') url: string) {
    return this.urlService.getClicks(url);
  }

  @Delete(':id')
  @Auth(ValidRoles.user)
  remove(@Param('id') id: string) {
    return;
    return this.urlService.remove(+id);
  }
}

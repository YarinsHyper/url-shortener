import { Controller, Post, Body, Get, Param, Redirect } from '@nestjs/common';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  async shortenUrl(@Body('originalUrl') originalUrl: string) {
    return { shortUrl: await this.urlService.shortenUrl(originalUrl) };
  }

  @Post('expand')
  async expandUrl(@Body('shortUrl') shortUrl: string) {
    return { originalUrl: await this.urlService.getOriginalUrl(shortUrl) };
  }

  @Get(':shortUrl')
  @Redirect()
  async redirectToOriginal(@Param('shortUrl') shortUrl: string) {
    const originalUrl = await this.urlService.getOriginalUrl(shortUrl);
    return { url: originalUrl };
  }
}

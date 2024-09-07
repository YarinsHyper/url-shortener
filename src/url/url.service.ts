import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from './url.schema';

@Injectable()
export class UrlService {
  private readonly baseUrl: string;

  constructor(@InjectModel('Url') private urlModel: Model<Url>) {
    // Define the base URL where the shortened URLs will be served from
    this.baseUrl = "https://localhost:3001";
  }

  async shortenUrl(originalUrl: string): Promise<string> {
    if (!this.isValidUrl(originalUrl)) {
      throw new Error('Invalid URL');
    }
    const shortUrlCode = this.generateShortUrl();
    const newUrl = new this.urlModel({ originalUrl, shortUrl: shortUrlCode });
    await newUrl.save();
    // Return the full shortened URL including the base URL
    return `${this.baseUrl}/${shortUrlCode}`;
  }

  async getOriginalUrl(shortUrlCode: string): Promise<string> {
    const url = await this.urlModel.findOne({ shortUrl: shortUrlCode });
    if (!url) {
      throw new Error('URL not found');
    }
    return url.originalUrl;
  }

  private generateShortUrl(): string {
    return Math.random().toString(36).substring(2, 8);
  }

  private isValidUrl(url: string): boolean {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url);
  }
}

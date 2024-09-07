import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';

describe('UrlService', () => {
  let service: UrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlService],
    }).compile();

    service = module.get<UrlService>(UrlService);
  });

  it('should shorten and expand a URL', async () => {
    const originalUrl = 'https://example.com';
    const shortUrl = await service.shortenUrl(originalUrl);
    const expandedUrl = await service.getOriginalUrl(shortUrl);
    expect(expandedUrl).toEqual(originalUrl);
  });
});

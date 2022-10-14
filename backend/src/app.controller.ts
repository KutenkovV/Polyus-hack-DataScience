import { Controller, Get, Res, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/video-example')
  getFile(@Res({ passthrough: true }) res): StreamableFile {
    console.log('ASPD:OAPHNS:FOUJBGALHUJ');
    const file = createReadStream(join(process.cwd(), 'videos/video.mp4'));
    res.set({
      'Content-Type': 'video/mp4',
      'Content-Disposition': 'attachment; filename="video.mp4"',
    });
    return new StreamableFile(file);
  }
}

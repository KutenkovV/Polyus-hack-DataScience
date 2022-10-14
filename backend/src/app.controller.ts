import { Controller, Get } from '@nestjs/common';
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
    const file = createReadStream(join(process.cwd(), 'videos/video.mp4'));
    res.set({
      'Content-Type': 'video/mp4',
      'Content-Disposition': 'attachment; filename="video.mp4"',
    });
    return new StreamableFile(file);
}
}

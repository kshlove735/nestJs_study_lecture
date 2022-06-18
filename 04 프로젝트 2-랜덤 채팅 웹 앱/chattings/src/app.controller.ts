import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index') // app.setBaseViewsDir() 에서 설정한 폴더의 index 파일
  root() {
    return {
      data: {
        title: 'Chattings',
        copyright: 'kim seung hyun',
      },
    };
  }
}

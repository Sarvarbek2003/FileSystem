import { Module, Global } from '@nestjs/common';
import { MyLogger } from './create-log';

@Global()
@Module({
  providers: [MyLogger],
  exports: [MyLogger]
})
export class LoggerModule {}
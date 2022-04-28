import { Module } from '@nestjs/common';
import { CancatController } from './cancat.controller';
import { CancatService } from './cancat.service';

@Module({
  controllers: [CancatController],
  providers: [CancatService]
})
export class CancatModule {}

import { Module } from '@nestjs/common';
import { cancat } from './cancat';
import { CancatController } from './cancat.controller';
import { CancatService } from './cancat.service';

@Module({
  controllers: [CancatController],
  providers: [CancatService, cancat]
})
export class CancatModule {}

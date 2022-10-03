import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RiskLocation,
  RiskLocationSchema,
} from './schemas/riskLocation.schema';
import { RiskLocationsController } from './riskLocations.controller';
import { RiskLocationsService } from './riskLocations.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RiskLocation.name, schema: RiskLocationSchema },
    ]),
  ],
  controllers: [RiskLocationsController],
  providers: [RiskLocationsService],
})
export class RiskLocationModule {}

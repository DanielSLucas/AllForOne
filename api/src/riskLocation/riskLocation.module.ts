import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RiskLocation,
  RiskLocationSchema,
} from './schemas/riskLocation.schema';
import { RiskLocationsController } from './riskLocations.controller';
import { RiskLocationsService } from './riskLocations.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RiskLocation.name, schema: RiskLocationSchema },
    ]),
    UsersModule,
  ],
  controllers: [RiskLocationsController],
  providers: [RiskLocationsService],
})
export class RiskLocationModule {}

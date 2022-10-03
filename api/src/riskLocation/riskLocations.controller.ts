import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateRiskLocationDTO } from './dtos/create-risk-location.dto';
import { RiskLocationsService } from './riskLocations.service';
import { RiskLocationDocument } from './schemas/riskLocation.schema';

@Controller('riskLocation')
export class RiskLocationsController {
  constructor(private riskLocationsService: RiskLocationsService) {}

  @Post()
  async create(
    @Body() createRiskLocationDTO: CreateRiskLocationDTO,
  ): Promise<RiskLocationDocument> {
    return this.riskLocationsService.create(createRiskLocationDTO);
  }

  @Get()
  async findAll(): Promise<RiskLocationDocument[]> {
    return this.riskLocationsService.findAll();
  }
}

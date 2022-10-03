import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { CreateRiskLocationDTO } from './dtos/create-risk-location.dto';
import { SearchNearToDTO } from './dtos/search-near-to.dto';
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

  @Get('nearTo')
  async findNearTo(
    @Query() query: SearchNearToDTO,
  ): Promise<RiskLocationDocument[]> {
    return this.riskLocationsService.findNearTo(query);
  }
}

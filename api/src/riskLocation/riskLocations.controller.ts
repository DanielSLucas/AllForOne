import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { CreateRiskLocationDTO } from './dtos/create-risk-location.dto';
import { SearchNearToDTO } from './dtos/search-near-to.dto';
import { RiskLocationsService } from './riskLocations.service';
import { RiskLocationDocument } from './schemas/riskLocation.schema';

@Controller('riskLocation')
export class RiskLocationsController {
  constructor(private riskLocationsService: RiskLocationsService) {}

  @UseGuards(JwtAuthGuard)
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

  @Get(':id')
  async findById(@Param('id') id: string): Promise<RiskLocationDocument> {
    return this.riskLocationsService.findById(id);
  }
}

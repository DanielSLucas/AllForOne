import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { CreateRiskLocationDTO } from './dtos/create-risk-location.dto';
import { SearchNearToDTO } from './dtos/search-near-to.dto';
import { UpdateRiskLocationDTO } from './dtos/update-risk-location.dto';
import { RiskLocationsService } from './riskLocations.service';
import {
  RiskLocation,
  RiskLocationDocument,
} from './schemas/riskLocation.schema';

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

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRiskLocationDTO: UpdateRiskLocationDTO,
  ): Promise<RiskLocation> {
    return this.riskLocationsService.update(id, updateRiskLocationDTO);
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

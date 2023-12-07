import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { SectorsService } from './sectors.service';
import { MySector } from './interfaces/sector.interface';

@Controller('sectors')
export class SectorsController {
  constructor(private readonly sectorsService: SectorsService) {}

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async getSectors(): Promise<MySector[]> {
    return await this.sectorsService.getSectors();
  }
}

import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { SectorsService } from './sectors.service';

@Controller('sectors')
export class SectorsController {
  constructor(private readonly sectorsService: SectorsService) {}

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async getSectors() {
    return await this.sectorsService.getSectors();
  }
}

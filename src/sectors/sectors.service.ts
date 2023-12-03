import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SectorsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSectors() {
    return await this.prisma.sector.findMany({});
  }
}

import { Injectable } from '@nestjs/common';
import { Sector } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { MySector } from './interfaces/sector.interface';

@Injectable()
export class SectorsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSectors(): Promise<MySector[]> {
    const sectors = await this.prisma.sector.findMany();
    const example = await this.formatSectors(sectors);
    console.log(example);
    return example;
  }

  private async formatSectors(sectors: Sector[]): Promise<MySector[]> {
    const formattedSectors: MySector[] = [];

    for (const sector of sectors) {
      const formattedSector = await this.formatSector(sector);
      formattedSectors.push(formattedSector);
    }

    return formattedSectors;
  }

  private async formatSector(sector: Sector): Promise<MySector> {
    const subcategories = await this.prisma.sector.findMany({
      where: { parentId: sector.id },
    });

    const formattedSector: MySector = {
      id: sector.id,
      name: sector.name,
      parentId: sector.parentId,
    };

    if (subcategories.length > 0) {
      formattedSector.subcategories = await this.formatSectors(subcategories);
    }

    return formattedSector;
  }
}

import { Injectable } from '@nestjs/common';
import { Sector } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { MySector } from './interfaces/sector.interface';

@Injectable()
export class SectorsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSectors(): Promise<MySector[]> {
    const sectors = await this.prisma.sector.findMany();
    return this.formatSectors(sectors, 1); // Start hierarchy level at 1
  }

  private async formatSectors(
    sectors: Sector[],
    hierarchy: number,
  ): Promise<MySector[]> {
    const formattedSectors: MySector[] = [];

    for (const sector of sectors) {
      const formattedSector = await this.formatSector(sector, hierarchy);
      formattedSectors.push(formattedSector);
    }

    return formattedSectors;
  }

  private async formatSector(
    sector: Sector,
    hierarchy: number,
  ): Promise<MySector> {
    const subcategories = await this.prisma.sector.findMany({
      where: { parentId: sector.id },
    });

    const formattedSector: MySector = {
      key: hierarchy, // Assign hierarchy level
      text: sector.name, // Map 'name' to 'text'
      value: sector.id, // Map 'id' to 'value'
    };

    if (subcategories.length > 0) {
      formattedSector.children = await this.formatSectors(
        subcategories,
        hierarchy + 1,
      ); // Increment hierarchy for subcategories
    }

    return formattedSector;
  }
}

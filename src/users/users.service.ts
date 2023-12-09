import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from '@prisma/client';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async registerUser(dto: RegisterUserDto): Promise<User | undefined> {
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        terms: dto.terms,
        sectors: {
          connect: dto.sectorIds.map((id) => ({ id })), // Connect sectors by their IDs
        },
      },
      // Include sectors in the returned user object if needed
      include: {
        sectors: true,
      },
    });

    return user;
  }

  async editUser(id: number, dto: EditUserDto): Promise<User | undefined> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        name: dto.name || undefined,
        terms: dto.terms || undefined,
        sectors: {
          connect: dto.sectorIds.map((id) => ({ id: id || undefined })),
        },
      },
      include: {
        sectors: true,
      },
    });

    if (user) return user;
    return undefined;
  }
}

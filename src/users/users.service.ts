import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async registerUser(dto: RegisterUserDto) {
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
}

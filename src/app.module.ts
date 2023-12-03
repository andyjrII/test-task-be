import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { SectorsModule } from './sectors/sectors.module';

@Module({
  imports: [PrismaModule, UsersModule, SectorsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}

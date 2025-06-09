import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { LastSeenService } from './last.seen.service';
import { EnableRoles, Protected } from 'src/guards/decorators';
import { Roles } from '@prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('last-seen')
export class LastSeenController {
  constructor(private readonly service: LastSeenService) {}

  @Protected(true)
  @EnableRoles([Roles.ALL])
  @Get(':userId')
  async getAllLastSeenAnnouncement(
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return await this.service.getLastSeen(userId);
  }
}

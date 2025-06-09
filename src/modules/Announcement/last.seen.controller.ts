import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { LastSeenService } from './last.seen.service';

@Controller('last-seen')
export class LastSeenController {
  constructor(private readonly service: LastSeenService) {}

  @Get(':userId')
  async getAllLastSeenAnnouncement(
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return await this.service.getLastSeen(userId);
  }
}

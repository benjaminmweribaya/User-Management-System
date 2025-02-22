import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { RateLimiterService } from './rate-limiter.service';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService, RateLimiterService],
})
export class WebhookModule {}

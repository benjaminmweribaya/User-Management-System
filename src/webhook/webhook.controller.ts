import { Controller, Post, Body, Headers, BadRequestException, ForbiddenException } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookMessageDto } from './dto/webhook-message.dto';
import { RateLimiterService } from './rate-limiter.service';

@Controller('webhook')
export class WebhookController {
  private readonly SECRET_TOKEN = process.env.WEBHOOK_SECRET_TOKEN || 'default-secret-token';

  constructor(
    private readonly webhookService: WebhookService,
    private readonly rateLimiterService: RateLimiterService,
  ) {}

  @Post()
  async handleWebhook(
    @Body() webhookMessageDto: WebhookMessageDto,
    @Headers('Authorization') authHeader: string,
  ) {
    if (!authHeader || authHeader !== `Bearer ${this.SECRET_TOKEN}`) {
      throw new ForbiddenException('Invalid token');
    }

    const { message, phone } = webhookMessageDto;

    if (!message || !phone) {
      throw new BadRequestException('Invalid payload');
    }

    // Rate limiting 
    this.rateLimiterService.validateRateLimit(phone);

    // Store message in Firestore
    const timestamp = Date.now();
    const reply = this.webhookService.generateAutoReply(message);

    await this.webhookService.storeMessage({ phone, message, timestamp, reply });

    return reply ? { reply } : { success: true };
  }
}

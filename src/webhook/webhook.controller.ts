import { Controller, Post, Body, Headers, BadRequestException, ForbiddenException } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookMessageDto } from './dto/webhook-message.dto';
import { RateLimiterService } from './rate-limiter.service';

@Controller('webhook')
export class WebhookController {
  private readonly SECRET_TOKEN = process.env.WEBHOOK_SECRET_TOKEN;

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

    // Rate limiting (5 requests per minute per phone number)
    const allowed = await this.rateLimiterService.checkRateLimit(phone);
    if (!allowed) {
      throw new BadRequestException('Rate limit exceeded');
    }

    // Store message in Firestore
    await this.webhookService.storeMessage(phone, message);

    // Auto-reply logic
    if (message.toLowerCase().includes('help')) {
      return { reply: 'Support contact: support@company.com' };
    }

    return { success: true };
  }
}

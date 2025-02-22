import { WebhookService } from './webhook.service';
import { WebhookMessageDto } from './dto/webhook-message.dto';
import { RateLimiterService } from './rate-limiter.service';
export declare class WebhookController {
    private readonly webhookService;
    private readonly rateLimiterService;
    private readonly SECRET_TOKEN;
    constructor(webhookService: WebhookService, rateLimiterService: RateLimiterService);
    handleWebhook(webhookMessageDto: WebhookMessageDto, authHeader: string): Promise<{
        reply: string;
        success?: undefined;
    } | {
        success: boolean;
        reply?: undefined;
    }>;
}

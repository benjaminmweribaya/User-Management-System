import { Test, TestingModule } from '@nestjs/testing';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { RateLimiterService } from './rate-limiter.service';
import { ForbiddenException } from '@nestjs/common';

describe('WebhookController', () => {
  let controller: WebhookController;
  let webhookService: WebhookService;
  let rateLimiterService: RateLimiterService;

  const SECRET_TOKEN = process.env.SECRET_TOKEN || 'VALID_TOKEN';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebhookController],
      providers: [
        { provide: WebhookService, useValue: { storeMessage: jest.fn(), generateAutoReply: jest.fn() } },
        { provide: RateLimiterService, useValue: { validateRateLimit: jest.fn().mockResolvedValue(true) } },
      ],
    }).compile();

    controller = module.get<WebhookController>(WebhookController);
    webhookService = module.get<WebhookService>(WebhookService);
    rateLimiterService = module.get<RateLimiterService>(RateLimiterService);
  });

  it('should reject requests with an invalid token', async () => {
    await expect(
      controller.handleWebhook({ message: 'Hello', phone: '+1234567890' }, 'InvalidToken')
    ).rejects.toThrow(ForbiddenException);
  });

  it('should reject requests that exceed rate limit', async () => {
    jest.spyOn(rateLimiterService, 'validateRateLimit').mockImplementation(() => {
      throw new ForbiddenException('Rate limit exceeded.');
    });
    await expect(
      controller.handleWebhook({ message: 'Hello', phone: '+1234567890' }, `Bearer ${SECRET_TOKEN}`)
    ).rejects.toThrow(ForbiddenException);    
  });

  it('should store the message and return an auto-reply if applicable', async () => {

    jest.spyOn(rateLimiterService, 'validateRateLimit').mockImplementation(() => {});

    jest.spyOn(webhookService, 'generateAutoReply').mockReturnValue('Support contact: support@company.com');

    const response = await controller.handleWebhook(
      { message: 'help', phone: '+1234567890' }, 
      `Bearer ${SECRET_TOKEN}`
    );

    expect(webhookService.storeMessage).toHaveBeenCalledWith('+1234567890', 'help');
    expect(response).toEqual({ reply: 'Support contact: support@company.com' });
  });
});

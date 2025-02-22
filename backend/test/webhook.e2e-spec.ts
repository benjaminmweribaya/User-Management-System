import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { WebhookService } from '../src/webhook/webhook.service';

describe('WebhookController (e2e)', () => {
  let app: INestApplication;
  let webhookService: WebhookService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    webhookService = moduleFixture.get<WebhookService>(WebhookService);
  });

  it('should reject unauthorized webhook requests', async () => {
    return request(app.getHttpServer())
      .post('/webhook')
      .send({ message: 'Hello', phone: '+1234567890' })
      .expect(403);
  });

  it('should handle a valid webhook request and store the message', async () => {
    jest.spyOn(webhookService, 'storeMessage').mockResolvedValue();
    jest.spyOn(webhookService, 'generateAutoReply').mockReturnValue(null);

    return request(app.getHttpServer())
      .post('/webhook')
      .set('Authorization', 'Bearer VALID_TOKEN')
      .send({ message: 'Hello', phone: '+1234567890' })
      .expect(201)
      .expect({ success: true });
  });

  it('should return an auto-reply when "help" is sent', async () => {
    return request(app.getHttpServer())
      .post('/webhook')
      .set('Authorization', 'Bearer VALID_TOKEN')
      .send({ message: 'help', phone: '+1234567890' })
      .expect(201)
      .expect({ reply: 'Support contact: support@company.com' });
  });

  afterAll(async () => {
    await app.close();
  });
});

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookController = void 0;
const common_1 = require("@nestjs/common");
const webhook_service_1 = require("./webhook.service");
const webhook_message_dto_1 = require("./dto/webhook-message.dto");
const rate_limiter_service_1 = require("./rate-limiter.service");
let WebhookController = class WebhookController {
    webhookService;
    rateLimiterService;
    SECRET_TOKEN = process.env.WEBHOOK_SECRET_TOKEN || 'default-secret-token';
    constructor(webhookService, rateLimiterService) {
        this.webhookService = webhookService;
        this.rateLimiterService = rateLimiterService;
    }
    async handleWebhook(webhookMessageDto, authHeader) {
        if (!authHeader || authHeader !== `Bearer ${this.SECRET_TOKEN}`) {
            throw new common_1.ForbiddenException('Invalid token');
        }
        const { message, phone } = webhookMessageDto;
        if (!message || !phone) {
            throw new common_1.BadRequestException('Invalid payload');
        }
        this.rateLimiterService.validateRateLimit(phone);
        const timestamp = Date.now();
        const reply = this.webhookService.generateAutoReply(message);
        await this.webhookService.storeMessage({ phone, message, timestamp, reply });
        return reply ? { reply } : { success: true };
    }
};
exports.WebhookController = WebhookController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [webhook_message_dto_1.WebhookMessageDto, String]),
    __metadata("design:returntype", Promise)
], WebhookController.prototype, "handleWebhook", null);
exports.WebhookController = WebhookController = __decorate([
    (0, common_1.Controller)('webhook'),
    __metadata("design:paramtypes", [webhook_service_1.WebhookService,
        rate_limiter_service_1.RateLimiterService])
], WebhookController);
//# sourceMappingURL=webhook.controller.js.map
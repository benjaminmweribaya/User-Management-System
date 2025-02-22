"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiterService = void 0;
const common_1 = require("@nestjs/common");
let RateLimiterService = class RateLimiterService {
    requestLog = new Map();
    limit = 5;
    windowMs = 60 * 1000;
    validateRateLimit(phone) {
        const now = Date.now();
        const timestamps = this.requestLog.get(phone) || [];
        const filteredTimestamps = timestamps.filter(timestamp => now - timestamp < this.windowMs);
        filteredTimestamps.push(now);
        if (filteredTimestamps.length > this.limit) {
            throw new common_1.ForbiddenException('Rate limit exceeded. Try again later.');
        }
        this.requestLog.set(phone, filteredTimestamps);
    }
};
exports.RateLimiterService = RateLimiterService;
exports.RateLimiterService = RateLimiterService = __decorate([
    (0, common_1.Injectable)()
], RateLimiterService);
//# sourceMappingURL=rate-limiter.service.js.map
import { Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class RateLimiterService {
  private requestLog = new Map<string, number[]>();
  private readonly limit = 5;
  private readonly windowMs = 60 * 1000; // 1 minute

  validateRateLimit(phone: string): void {
    const now = Date.now();
    const timestamps = this.requestLog.get(phone) || [];

    // Remove timestamps older than 1 minute
    const filteredTimestamps = timestamps.filter(timestamp => now - timestamp < this.windowMs);
    filteredTimestamps.push(now);

    if (filteredTimestamps.length > this.limit) {
      throw new ForbiddenException('Rate limit exceeded. Try again later.');
    }

    this.requestLog.set(phone, filteredTimestamps);
  }
}

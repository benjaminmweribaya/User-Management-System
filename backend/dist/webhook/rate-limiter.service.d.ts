export declare class RateLimiterService {
    private requestLog;
    private readonly limit;
    private readonly windowMs;
    validateRateLimit(phone: string): void;
}

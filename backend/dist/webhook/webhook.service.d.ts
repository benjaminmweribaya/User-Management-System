import { OnModuleInit } from '@nestjs/common';
export declare class WebhookService implements OnModuleInit {
    private readonly firestore;
    private readonly messagesCollection;
    constructor();
    storeMessage({ phone, message, timestamp, reply }: {
        phone: string;
        message: string;
        timestamp: number;
        reply?: string;
    }): Promise<void>;
    generateAutoReply(message: string): string | undefined;
    onModuleInit(): void;
}

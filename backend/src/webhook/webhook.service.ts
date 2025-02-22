import { Injectable, OnModuleInit } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import { Message } from './entities/message.entity';

@Injectable()
export class WebhookService implements OnModuleInit{
  private readonly firestore: Firestore;
  private readonly messagesCollection: FirebaseFirestore.CollectionReference;

  constructor() {
    this.firestore = new Firestore();
    this.messagesCollection = this.firestore.collection('messages');
  }

  async storeMessage({ phone, message, timestamp, reply }: { phone: string; message: string; timestamp: number; reply?: string }): Promise<void> {
    await this.messagesCollection.add({ phone, message, timestamp, reply });
  }

  generateAutoReply(message: string): string | undefined {
    return message.toLowerCase().includes('help') ? 'Support contact: support@company.com' : undefined;
  }

  onModuleInit() {
    this.messagesCollection.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          console.log(`New message received:`, change.doc.data());
        }
      });
    });
  }
}

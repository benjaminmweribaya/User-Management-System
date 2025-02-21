import { Injectable } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import { Message } from './entities/message.entity';

@Injectable()
export class WebhookService {
  private firestore: Firestore;
  private messagesCollection = 'messages';

  constructor() {
    this.firestore = new Firestore();
  }

  async storeMessage(messageData: Message): Promise<void> {
    const docRef = this.firestore.collection(this.messagesCollection).doc();
    await docRef.set({ ...messageData, id: docRef.id });
  }

  generateAutoReply(message: string): string | null {
    return message.toLowerCase().includes('help') ? 'Support contact: support@company.com' : null;
  }
}

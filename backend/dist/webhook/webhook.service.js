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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookService = void 0;
const common_1 = require("@nestjs/common");
const firestore_1 = require("@google-cloud/firestore");
let WebhookService = class WebhookService {
    firestore;
    messagesCollection;
    constructor() {
        this.firestore = new firestore_1.Firestore();
        this.messagesCollection = this.firestore.collection('messages');
    }
    async storeMessage({ phone, message, timestamp, reply }) {
        await this.messagesCollection.add({ phone, message, timestamp, reply });
    }
    generateAutoReply(message) {
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
};
exports.WebhookService = WebhookService;
exports.WebhookService = WebhookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], WebhookService);
//# sourceMappingURL=webhook.service.js.map
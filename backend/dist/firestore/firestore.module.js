"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreModule = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
const config_1 = require("@nestjs/config");
let FirestoreModule = class FirestoreModule {
};
exports.FirestoreModule = FirestoreModule;
exports.FirestoreModule = FirestoreModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot()],
        providers: [
            {
                provide: 'FIRESTORE',
                useFactory: () => {
                    const app = admin.initializeApp({
                        credential: admin.credential.cert({
                            projectId: process.env.FIREBASE_PROJECT_ID,
                            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                        }),
                    });
                    return app.firestore();
                },
            },
        ],
        exports: ['FIRESTORE'],
    })
], FirestoreModule);
//# sourceMappingURL=firestore.module.js.map
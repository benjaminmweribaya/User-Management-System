import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
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
export class FirestoreModule {}

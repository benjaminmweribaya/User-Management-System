import { Injectable, Inject } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@Inject('FIRESTORE') private firestore: Firestore) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userRef = this.firestore.collection('users').doc();
    const user = { id: userRef.id, ...createUserDto };
    await userRef.set(user);
    return user;
  }
}
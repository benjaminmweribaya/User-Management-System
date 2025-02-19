import { Injectable, Inject } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private firestore = new Firestore();
  private usersCollection = this.firestore.collection('users');

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.usersCollection.add(createUserDto);
    return { id: newUser.id, ...createUserDto };
  }

  async findAll() {
    const snapshot = await this.usersCollection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findOne(id: string) {
    const userDoc = await this.usersCollection.doc(id).get();
    if (!userDoc.exists) return null;
    return { id: userDoc.id, ...userDoc.data() };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userRef = this.usersCollection.doc(id);
    const userDoc = await userRef.get();
    if (!userDoc.exists) return null;
    
    await userRef.update(updateUserDto);
    return { id, ...updateUserDto };
  }
  
}
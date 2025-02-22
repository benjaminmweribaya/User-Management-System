"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const firestore_1 = require("firebase-admin/firestore");
let UsersService = class UsersService {
    firestore = new firestore_1.Firestore();
    usersCollection = this.firestore.collection('users');
    async create(createUserDto) {
        const newUser = await this.usersCollection.add(createUserDto);
        return { id: newUser.id, ...createUserDto };
    }
    async findAll(cursor) {
        let query = this.usersCollection.orderBy('name');
        if (cursor) {
            const snapshot = await this.usersCollection.doc(cursor).get();
            if (snapshot.exists) {
                query = query.startAfter(snapshot);
            }
        }
        const snapshot = await query.limit(10).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    async findOne(id) {
        const userDoc = await this.usersCollection.doc(id).get();
        if (!userDoc.exists)
            return null;
        return { id: userDoc.id, ...userDoc.data() };
    }
    async update(id, updateUserDto) {
        const userRef = this.usersCollection.doc(id);
        const userDoc = await userRef.get();
        if (!userDoc.exists)
            return null;
        const updateData = JSON.parse(JSON.stringify(updateUserDto));
        await userRef.update(updateData);
        return { id, ...updateData };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map
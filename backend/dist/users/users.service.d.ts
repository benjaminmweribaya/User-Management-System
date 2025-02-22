import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private firestore;
    private usersCollection;
    create(createUserDto: CreateUserDto): Promise<{
        name: string;
        email: string;
        phone: string;
        id: string;
    }>;
    findAll(cursor?: string): Promise<{
        id: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
    } | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<any>;
}

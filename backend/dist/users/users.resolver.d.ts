import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<{
        id: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
    } | null>;
    createUser(input: CreateUserDto): Promise<{
        name: string;
        email: string;
        phone: string;
        id: string;
    }>;
}

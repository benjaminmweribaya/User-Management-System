import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<any>;
}

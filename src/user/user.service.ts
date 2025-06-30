import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<{
    count: number;
    statusCode: number;
    data: User[];
  }> {
    const users = await this.usersRepository.find();
    return {
      count: users.length,
      statusCode: 200,
      data: users,
    };
  }

  async findOne(userId: number): Promise<{
    statusCode: number;
    status: string;
    data: User;
  }> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return {
      statusCode: 200,
      status: 'Success',
      data: user,
    };
  }

  async remove(userId: number): Promise<{
    statusCode: number;
    status: string;
    message: string;
  }> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    await this.usersRepository.delete(userId);

    return {
      statusCode: 200,
      status: 'Success',
      message: 'User deleted successfully',
    };
  }

  async updateMyProfile(
    updateUserDto: Partial<User>,
    currentUser: User,
  ): Promise<{
    statusCode: number;
    status: string;
    data: User;
  }> {
    const user = await this.usersRepository.findOneBy({ id: currentUser.id });
    if (!user) {
      throw new NotFoundException(`User with ID ${currentUser.id} not found`);
    }

    // Update user properties
    Object.assign(user, updateUserDto);
    const updatedUser = await this.usersRepository.save(user);

    return {
      statusCode: 200,
      status: 'Success',
      data: updatedUser,
    };
  }

  async deleteMyProfile(currentUser: User): Promise<{
    statusCode: number;
    status: string;
    message: string;
  }> {
    const user = await this.usersRepository.findOneBy({ id: currentUser.id });
    if (!user) {
      throw new NotFoundException(`User with ID ${currentUser.id} not found`);
    }

    await this.usersRepository.remove(user);

    return {
      statusCode: 200,
      status: 'Success',
      message: 'User deleted successfully',
    };
  }
}

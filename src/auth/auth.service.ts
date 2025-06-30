import { Injectable, NotFoundException } from '@nestjs/common';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserSignInDto } from './dto/user-signin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(
    userSignUpDto: UserSignUpDto,
  ): Promise<{
    statusCode: number;
    data: Omit<User, 'password'>;
    accessToken: string;
  }> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: userSignUpDto.email },
    });
    if (existingUser) {
      throw new NotFoundException('User already exists');
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(userSignUpDto.password, 10);
    const newUser = this.userRepository.create({
      name: userSignUpDto.name,
      email: userSignUpDto.email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await this.userRepository.save(newUser);

    // Generate JWT token By Payload
    const payload = {
      id: savedUser.id,
      email: savedUser.email,
      roles: savedUser.roles,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    });

    // Return the user data without password
    const { password, ...userData } = savedUser;
    return {
      statusCode: 201,
      data: userData,
      accessToken,
    };
  }

  async signIn(
    userSignInDto: UserSignInDto,
  ): Promise<{
    statusCode: number;
    data: Omit<User, 'password'>;
    accessToken: string;
  }> {
    const { email, password } = userSignInDto;
    // Find the user by email
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'roles'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if the password is correct
    const hashedPassword = user.password;
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      throw new NotFoundException('Invalid credentials');
    }

    // Generate JWT token By Payload
    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET_KEY,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    });

    // Return the user data without password
    const { password: _, ...userData } = user;

    return {
      statusCode: 201,
      data: userData,
      accessToken,
    };
  }
}

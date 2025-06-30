import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { isArray } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/user/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (
      !authHeader ||
      isArray(authHeader) ||
      !authHeader.startsWith('Bearer ')
    ) {
      req.currentUser = undefined;
      next();
      return;
    } else {
      try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.decode(token);
        if (!decoded || typeof decoded !== 'object' || !('id' in decoded)) {
          throw new Error('Invalid token payload');
        }

        const userId = decoded.id;
        // console.log(userId);
        const currentUser = await this.userService.findOne(userId);
        req.currentUser = currentUser.data;
        // console.log(currentUser.data);
        next();
      } catch (error) {
        req.currentUser = undefined;
        next();
      }
    }
  }
}

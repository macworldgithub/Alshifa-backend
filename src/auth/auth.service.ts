// // src/auth/auth.service.ts
// import { Injectable } from '@nestjs/common';
// import { UsersService } from '../users/users.service';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class AuthService {
//   constructor(
//     private usersService: UsersService,
//     private jwtService: JwtService,
//   ) {}

//   async validateUser(username: string, pass: string): Promise<any> {
//     const user = await this.usersService.findByUsername(username);
//     if (user && (await bcrypt.compare(pass, user.password))) {
//       const { password, ...result } = user.toObject();
//       return result;
//     }
//     return null;
//   }

//   async login(user: any) {
//     const payload = { username: user.username, sub: user._id, role: user.role };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
// }
// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(identifier: string, pass: string): Promise<any> {
    let user = await this.usersService.findByUsername(identifier);
    if (!user) {
      user = await this.usersService.findByEmail(identifier);
    }
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
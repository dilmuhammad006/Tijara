import {
  BadRequestException,
  ConflictException,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaService } from '../Prisma';
import { LoginDto, RegisterDto } from './dtos';
import * as bcrypt from 'bcryptjs';
import { Roles } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { FsHelper } from 'src/helpers';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly fs: FsHelper,
  ) {}

  async onModuleInit() {
    try {
      await this.#_seedUsers();
      await this.fs.ensureUploadDirExists();
      console.log('✅');
    } catch (error) {
      console.log(error.message);
      console.log('❌');
    }
  }
  async register(payload: RegisterDto) {
    const founded = await this.prisma.user.findFirst({
      where: { email: payload.email },
    });

    if (founded) {
      throw new BadRequestException('User with this email already exists!');
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
        role: Roles.USER,
      },
    });

    const accesToken = await this.jwt.signAsync({
      id: user.id,
      role: user.role,
    });

    return {
      message: 'success',
      data: {
        token: accesToken,
        user,
      },
    };
  }
  async login(payload: LoginDto) {
    const founded = await this.prisma.user.findFirst({
      where: { email: payload.email },
    });

    if (!founded) {
      throw new ConflictException('Incorrect email or password!');
    }

    const isMatchPassword = await bcrypt.compare(
      payload.password,
      founded.password,
    );

    if (!isMatchPassword) {
      throw new BadRequestException('Incorrect email or password!');
    }

    const accesToken = await this.jwt.signAsync({
      id: founded.id,
      role: founded.role,
    });

    return {
      message: 'success',
      data: {
        token: accesToken,
        founded,
      },
    };
  }
  async #_seedUsers() {
    const user = {
      name: 'Dilmuhammad',
      email: 'dilmuhammadabdumalikov06@gmail.com',
      password: '20060524',
      role: Roles.ADMIN,
    };

    const founded = await this.prisma.user.findFirst({
      where: { email: user.email },
    });

    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!founded) {
      await this.prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          role: user.role,
          password: hashedPassword,
        },
      });
    }
  }
}

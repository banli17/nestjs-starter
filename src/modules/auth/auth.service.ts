import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByName(username);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, username: user.username };

    // 如果已经有accessToken, 则直接返回
    if (user.accessToken) {
      return {
        accessToken: user.accessToken,
      };
    }

    // 如果没有登录, 则生成新的accessToken
    const accessToken = await this.jwtService.signAsync(payload);
    // 持久化
    await this.usersService.update(user.id, { accessToken });

    return {
      accessToken,
    };
  }

  async checkLogin(userId: string) {
    const user = await this.usersService.findById(userId);
    if (user?.accessToken) {
      return true;
    }
    return false;
  }
}

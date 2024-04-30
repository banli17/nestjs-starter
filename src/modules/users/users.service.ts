import { Injectable, Inject } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class UsersService {
  private users = [
    {
      id: "-10000",
      username: "admin",
      password: "aa123456",
      roles: ["admin"],
      accessToken: "",
    }
  ];

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.initUsers();
  }

  /**
   * 初始化用户数据, 从缓存中获取
   */
  async initUsers() {
    const users: any = await this.cacheManager.get("users");
    if (users?.length) {
      this.users = users;
    } else {
      this.cacheManager.set("users", this.users);
    }
  }

  async findByName(username: string) {
    return this.users.find((user) => user.username === username);
  }

  async findById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async update(id: string, data: any) {
    const user = this.users.find((u) => u.id === id);
    Object.assign(user, data);

    this.cacheManager.set("users", this.users);
  }
}

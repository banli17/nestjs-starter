import { join } from "path";
import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ServeStaticModule } from "@nestjs/serve-static";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AedesModule } from "./modules/aedes/aedes.module";
import { UsersModule } from "./modules/users/users.module";
import { CacheModule } from "@nestjs/cache-manager";
import * as fsStore from "cache-manager-fs-hash";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),
    EventEmitterModule.forRoot(),
    CacheModule.register({
      store: fsStore,
      options: {
        path: "./_cache",
        ttl: 60 * 60 * 24 * 3650,
        subdirs: true, // 创建子目录, 减少单个文件夹中的文件数量
      },
      ttl: 0, // 缓存不过期
      isGlobal: true, // 全局缓存
    }),
    UsersModule,
    AuthModule,
    AedesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

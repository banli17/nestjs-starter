import { Module } from "@nestjs/common";
import { APP_GUARD } from '@nestjs/core';
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { jwtConstants } from "./constants";
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1y" }, // token 过期时效, 1y = 1 year
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // 全局身份验证
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}

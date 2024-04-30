import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { SignInDto } from "./dto/index.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { Public } from "@/common/decorators/public.decorator";

@ApiTags("鉴权")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: "登录" })
  @Public()
  @Post("/login")
  async login(@Body() signInDto: SignInDto) {
    return this.authService.login(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
}

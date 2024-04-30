import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  Query,
  Injectable,
  Headers,
  Param,
  createParamDecorator,
  Request,
} from "@nestjs/common";
import { UserLoginDto, UserInfoDto } from "./dto/index.dto";
import {
  ApiTags,
  ApiOperation,
  ApiHeader,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { UsersService } from "./users.service";
import * as _ from "lodash";

@ApiTags("用户")
@Controller("user")
@Injectable()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: "获取用户信息" })
  @Get("/detail")
  async detail(@Request() req: any) {
    const user = await this.usersService.findById(req.user.id);
    return _.pickBy(user, (_, k) => k !== "password" && k !== "accessToken");
  }
}

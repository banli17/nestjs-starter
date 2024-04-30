import { ApiProperty, ApiBody } from "@nestjs/swagger";

export class UserLoginDto {
  @ApiProperty({ description: "用户名", default: "user1" })
  username: string;

  @ApiProperty({ description: "密码", default: "123456" })
  password: string;
}

export class UserInfoDto {
  @ApiProperty({ description: "用户名", default: "user1" })
  username: string;

  @ApiProperty({ description: "角色", default: "" })
  roles: Array<string>;

  @ApiProperty({ description: "密码", default: "123456" })
  password?: string;
}

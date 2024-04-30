import { ApiProperty, ApiBody } from "@nestjs/swagger";

export class SignInDto {
  @ApiProperty({ description: "用户名", default: "user1" })
  username: string;

  @ApiProperty({ description: "密码", default: "123456" })
  password: string;
}

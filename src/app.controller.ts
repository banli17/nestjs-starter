import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags, ApiHeader, ApiOperation } from "@nestjs/swagger";

@ApiTags("App")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: "Hello World" })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

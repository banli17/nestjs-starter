import { Module } from "@nestjs/common";
import { AedesService } from "./aedes.service";
import config from "../../config";
import { HelperModule } from "src/common/helper/helper.module";

@Module({
  imports: [HelperModule],
  providers: [AedesService],
  exports: [AedesService],
})
export class AedesModule {
  constructor(private readonly aedesService: AedesService) {}

  onApplicationBootstrap() {
    this.aedesService.listen(config.aedes.port);
  }

  onApplicationShutdown() {
    this.aedesService.close();
  }
}

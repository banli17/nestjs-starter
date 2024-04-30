import { Injectable, Inject } from "@nestjs/common";
import { createServer } from "aedes-server-factory";
import { Server } from "net";
import Aedes, { createBroker } from "aedes";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { HelperService } from "../../common/helper/helper.service";
import config from "../../config";

@Injectable()
export class AedesService {
  private readonly aedes: Aedes;
  private readonly server: Server;

  constructor(
    private readonly helperService: HelperService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {
    this.aedes = createBroker();
    this.server = createServer(this.aedes, { ws: true });

    this.initAedesEvent();
  }

  async initAedesEvent() {
    //身份验证
    this.aedes.authenticate = function (client, username, password, callback) {
      callback(
        null,
        username === config.aedes.username &&
          password.toString() === config.aedes.password
      );
    };

    // 客户端连接
    this.aedes.on("clientReady", async (client: any) => {});

    // 收到消息
    this.aedes.on("publish", (packet, client: any) => {
      this.onReceiveMessage(packet, client);
    });

    // 客户端断开
    this.aedes.on("clientDisconnect", (client: any) => {
      console.log("客户端断开了.......", client.uuid, client.userData);
    });

    // 客户端错误
    this.aedes.on("clientError", (client: any, error: Error) => {
      console.error(`Client error: ${error.message}`, error);
    });
  }

  // 给客户端发送消息
  publishMessageToClient(client: any, topic: string, payload: any = {}) {
    console.log(`给客户端发送消息......., ${topic}`, payload);
    client.publish(
      {
        topic,
        payload: JSON.stringify(payload),
      },
      () => {}
    );
  }

  onReceiveMessage(packet: any, client: any) {
    if (packet.topic === "state") {
      const data = JSON.parse(packet.payload.toString());
      console.log("收到消息了.......", packet.topic, data);
    }
  }

  listen(port: number) {
    this.server.listen(port, () => {
      console.log(`Aedes server listening on: ws://localhost:${port}`);
    });
  }

  close() {
    this.server.close();
  }
}

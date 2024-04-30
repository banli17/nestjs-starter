import { Cache } from "cache-manager";
import { Request } from "express";

declare module "express" {
  interface Request {
    $$client: {
      uuid: string;
      service: any;
      mqtt: any;
    };
  }
}

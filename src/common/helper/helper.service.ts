import * as path from "path";
import * as url from "url";
import { Injectable } from "@nestjs/common";

@Injectable()
export class HelperService {
  resolvePath(...args: string[]) {
    return path.join(__dirname, "../../../", ...args);
  }
}

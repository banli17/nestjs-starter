import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import * as dayjs from "dayjs";

import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    let { message, statusCode } = exception.getResponse() as any;
    // 用于接收主动发错的错误信息
    const expRes = exception.getResponse();
    if (typeof expRes === "string") {
      message = expRes;
    }

    response.status(status).json({
      code: status,
      timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      path: request.url,
      error: "Bad Request",
      message,
    });
  }
}

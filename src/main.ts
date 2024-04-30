import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { HttpStatusSuccess } from "./common/interceptors/transform.interceptor";
import { ValidationPipe } from "./common/pipes/validation.pipe";
import { urlencoded, json } from "express";
import config from "./config";
import "./nestjs-extensions";

async function bootstrap() {
  // 创建 nest 应用 （引入跟模块）
  const app = await NestFactory.create(AppModule);

  // 项目数据过大, 需要设置请求体大小
  app.use(json({ limit: "1mb" }));
  app.use(urlencoded({ extended: true, limit: "1mb" }));

  // 跨域设置
  app.enableCors({});

  // 设置 api 前缀
  app.setGlobalPrefix(config.apiPrefix);

  // 全局注册错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 全局拦截器请求成功
  app.useGlobalInterceptors(new HttpStatusSuccess());

  // 全局管道验证
  app.useGlobalPipes(new ValidationPipe());

  // 创建swagger 接口文档及接口测试应用
  const options = new DocumentBuilder()
    // .addBearerAuth()
    .setTitle("接口文档")
    .setDescription("描述")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("docs", app, document, {
    swaggerOptions: {
      // persistAuthorization: true,
    },
  });

  // 关闭端口, 再启动, 解决端口占用问题
  await import("kill-port")
    .then((killPort) => {
      return killPort(config.httpPort);
    })
    .catch((e) => {
      console.warn(e);
    });
  app.listen(config.httpPort, () => {
    console.log(`http listen on http://localhost:${config.httpPort}`);
  });
}
bootstrap();

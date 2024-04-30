# nestjs-starter

## 开发模式

1、安装依赖

```
npm i 
```

2、启动服务

```
npm run start:dev // 监听模式
npm run start:debug // debug 模式
```


3、使用 Chrome 查看 log 或调试: 启动服务后, 在浏览器打开url `chrome://inspect/#devices`, 配置 Discover network target 的 configure, 添加 localhost:8090。然后点击链接 "Open dedicated DevTools for Node" 按钮。


## 生产模式

1、打包项目后，部署 dist 目录

```
npm run build
```

2、安装依赖 pm2

```sh
npm install pm2 -g
```

3. 启动服务

```sh
pm2 start ecosystem.config.js
```

> 配置文件中已经加了 watch 参数，修改文件后自动重启

3. 查看日志

```sh
pm2 logs --out --lines 100
```

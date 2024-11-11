```bash
npm install
running:
npm start
# or
npm start:dev
# or
npm start:prod
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 上线部署

```bash
启动：
	pm2 start ecosystem.config.js --env production

保存运行：
  pm2 save


其他命令：
  停止所有：
    pm2 delete all

  查看当前运行实例：
    pm2 list

  停止应用程序：
    pm2 stop app.js
```

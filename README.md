### 依赖安装

```bash
npm install
```

### 开发环境启动项目

```bash
npm run dev
```

Open [http://localhost:3020](http://localhost:3020) with your browser to see the result.

### 上线部署

```bash
启动：
  npm run pm2
  # 或者
	pm2 start ecosystem.config.js --env production

保存运行：
  pm2 save

其他命令：
  停止所有：
    pm2 delete all

  查看当前运行实例：
    pm2 list

  停止应用程序：
    pm2 stop <id或名称>
```

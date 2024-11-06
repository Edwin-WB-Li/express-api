```bash
启动：
	pm2 start ecosystem.config.js

停止所有：
	pm2 delete all

查看当前运行实例：
	pm2 list

停止应用程序：
	pm2 stop app.js
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm start
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

ngOnChanges()
输入属性发生变化时，会调用
首次渲染前，以及后续每次输入属性更新时，都会调用
ngOnInit()
初始化组件、指令（只调用一次），通常用于执行一次性的初始化操作，如订阅服务、加载数据等
ngDoCheck（）
检测组件、指令（每次变更检测时调用）
ngAfterContentInit()
初始化内容（只调用一次）
ngAfterContentChecked()
初始化内容（每次变更检测时调用）

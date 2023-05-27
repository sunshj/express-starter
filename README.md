# express-starter

## 一、运行项目

1. 安装依赖

    ```bash
    npm install
    ```

2. 环境变量

    .env.development 或 .env.production

    ```dotenv
    DATABASE_URL="mysql://root:root@localhost:33
    ```

3. 启动项目

    ```bash
    # 开发环境启动
    npm run start
    # 生产环境启动
    npm run start:prod
    ```

## 二、其他配置

### prisma 操作

1. migrate
    ```bash
    npx prisma migrate dev --name init
    ```
2. generate
    ```bash
    npx prisma generate
    ```

### Nodejs 开发引用路径使用别名

1. 安装 `module-alias`

    ```bash
    npm install module-alias --save
    ```

2. package.json 里面配置一下**\_moduleAlias**项

    ```json
    "_moduleAliases" : {
      "@": "./"
    }
    ```

3. 入口 app.js 第一行引用

    ```js
    require('module-alias/register')
    ```

4. 让 webstorm 辅助识别 module-alias 设置的别名

    - 先在项目根目录下创建配置文件如`server.config.js`，并写入以下内容

        ```js
        const path = require('path')

        function resolve(dir) {
            return path.join(__dirname, '.', dir)
        }

        module.exports = {
            context: path.resolve(__dirname, './'),
            resolve: {
                extensions: ['.js', '.vue', '.json'],
                alias: {
                    '@': resolve(''),
                },
            },
        }
        ```

    - 在 webstorm **设置**->**语言框架**->**Javascript**->**Webpack**->手动选择`server.config.js`配置文件

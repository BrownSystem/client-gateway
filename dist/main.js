"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("./config");
const common_1 = require("@nestjs/common");
const common_2 = require("./common");
async function bootstrap() {
    const logger = new common_1.Logger('Main-Gateway');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.enableCors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.use((req, res, next) => {
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            return res.sendStatus(200);
        }
        next();
    });
    app.useGlobalFilters(new common_2.RpcCustomExceptionFilter());
    await app.listen(config_1.envs.port);
    logger.log(`Gateway runnig on port ${config_1.envs.port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map
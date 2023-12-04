"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const connect_mongo_1 = __importDefault(require("connect-mongo"));
require("dotenv/config");
const express_session_1 = __importDefault(require("express-session"));
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    app.use((0, helmet_1.default)({ contentSecurityPolicy: false }));
    app.enableCors({
        origin: '*',
    });
    app.use((0, express_session_1.default)({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 },
        store: connect_mongo_1.default.create({
            mongoUrl: process.env.MONGO_URL,
            crypto: { secret: process.env.MONGO_SECRET },
        }),
    }));
    await app.listen(process.env.PORT || 3000);
    console.log(`Serving on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map
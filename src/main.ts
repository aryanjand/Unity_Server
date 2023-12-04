import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import MongoStore from "connect-mongo";
import "dotenv/config";
import session from "express-session";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.use(helmet({ contentSecurityPolicy: false }));

  // TODO: set origin to the frontend url once it's deployed.
  app.enableCors({
    origin: "*",
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 },
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        crypto: { secret: process.env.MONGO_SECRET },
      }),
    })
  );

  await app.listen(process.env.PORT || 3000);

  console.log(`Serving on: ${await app.getUrl()}`);
}
bootstrap();

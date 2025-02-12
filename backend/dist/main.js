"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle("User CRUD API")
        .setDescription("API for managing users")
        .setVersion("1.0")
        .addTag("users")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("", app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map
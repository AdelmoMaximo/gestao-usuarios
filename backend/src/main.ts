import { NestFactory } from "@nestjs/core"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Configuração do CORS
  app.enableCors({
    origin: ["http://localhost:5000", "http://127.0.0.1:5000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true, // Permite envio de cookies e credenciais
    allowedHeaders: ["Content-Type", "Authorization"],
  })


  const config = new DocumentBuilder()
    .setTitle("User CRUD API")
    .setDescription("API for managing users")
    .setVersion("1.0")
    .addTag("users")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("", app, document)

  await app.listen(3000)
}
bootstrap()


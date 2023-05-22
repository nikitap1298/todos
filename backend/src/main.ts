import { NestFactory } from "@nestjs/core"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle("Todos example")
    .setDescription("The Todos API description")
    .setVersion("1.0")
    .addTag("todos")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)

  app.enableCors()
  await app.listen(8000)
}
bootstrap()

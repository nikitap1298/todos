import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { ListController } from "./controllers/list.controller"
import { TaskController } from "./controllers/task.controller"
import { ListService } from "./services/list.service"
import { TaskService } from "./services/task.service"
import { ListSchema } from "./schemas/list.schema"
import { TaskSchema } from "./schemas/task.schema"
import cors from "cors"

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/todos", {
      useNewUrlParser: true,
    }),
    MongooseModule.forFeature([{ name: "List", schema: ListSchema }]),
    MongooseModule.forFeature([{ name: "Task", schema: TaskSchema }]),
  ],
  controllers: [ListController, TaskController],
  providers: [ListService, TaskService],
})

// There are errors if I didn't use Cors here
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes("*")
  }
}

import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { ListController } from "../list/list.controller"
import { TaskController } from "../task/task.controller"
import { ListService } from "../list/list.service"
import { TaskService } from "../task/task.service"
import { ListSchema } from "../list/list.schema"
import { TaskSchema } from "../task/task.schema"

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/todos"),
    MongooseModule.forFeature([{ name: "List", schema: ListSchema }]),
    MongooseModule.forFeature([{ name: "Task", schema: TaskSchema }]),
  ],
  controllers: [ListController, TaskController],
  providers: [ListService, TaskService],
})
export class TodosModule {}

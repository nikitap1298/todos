import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { ListController } from "./list.controller"
import { ListService } from "./list.service"
import { ListSchema } from "./list.schema"
import { TaskSchema } from "../task/task.schema"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "List", schema: ListSchema }]),
    MongooseModule.forFeature([{ name: "Task", schema: TaskSchema }]),
  ],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}

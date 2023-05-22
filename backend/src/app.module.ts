import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { ListModule } from "./list/list.module"
import { TaskModule } from "./task/task.module"

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost:27017/todos"), ListModule, TaskModule],
})
export class AppModule {}

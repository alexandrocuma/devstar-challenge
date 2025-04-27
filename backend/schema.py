from graphene import ObjectType, String, Schema, Field, List, Mutation
from mutations import create_task, update_task, delete_task
from interfaces import task 

from database import db

class Mutation(ObjectType):
  create_task = create_task.CreateTask.Field()
  update_task = update_task.UpdateTask.Field()
  delete_task = delete_task.DeleteTask.Field()


class Query(ObjectType):
  task_by_id = Field(task.Task, id=String(required=False))
  tasks = List(task.Task)
  migrate = String()

  def resolve_migrate(root, info):
    db.migrate()
    return f'Migration Succeeded'
  
  def resolve_task_by_id(root, info, id):
    item = db.get_record(id)
    return item
  
  def resolve_tasks(root, info):
    data = db.get_records()
    items = data["Items"]
    return items


schema = Schema(query=Query, mutation=Mutation)
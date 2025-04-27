from graphene import String, Field, Mutation
from interfaces.task import Task
from database import db 

import uuid

class CreateTask(Mutation):
  class Arguments: 
    title = String()
    step = String()
    description = String()

  task = Field(Task)

  def mutate(self, info, title, description=None, step="PENDING"):      
    task_id = str(uuid.uuid4())
    
    task = {
        'id': task_id,
        'title': title,
        'description': description,
        'step': step,
    }
    
    db.table.put_item(Item=task)
    return CreateTask(task=task)


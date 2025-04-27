from graphene import String, Field, Mutation
from interfaces.task import Task
from database import db 

class UpdateTask(Mutation):
  class Arguments: 
    id = String(required=True)
    title = String()
    step = String()
    description = String()

  task = Field(Task)

  def mutate(self, info, id, title=None, description=None, step=None): 
    update_query = []
    query_values = {}
    
    if title:
        update_query.append("title = :title")
        query_values[':title'] = title
    if description:
        update_query.append("description = :desc")
        query_values[':desc'] = description
    if step:
        update_query.append("step = :step")
        query_values[':step'] = step
        
    if not update_query:
        raise Exception("No fields to update")     
    
    response = db.table.update_item(
      Key={ 'id': id },
      UpdateExpression="SET " + ", ".join(update_query),
      ExpressionAttributeValues=query_values,
      ReturnValues="ALL_NEW"
    )
    return UpdateTask(task=response['Attributes'])


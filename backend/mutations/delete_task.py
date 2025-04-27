from graphene import Boolean, Mutation, String
from database import db 

class DeleteTask(Mutation):
  class Arguments:
    id = String(required=True)
  
  success = Boolean()
    
  def mutate(self, info, id):
    db.table.delete_item(Key={'id': id})
    return DeleteTask(success=True)


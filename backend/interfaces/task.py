from graphene import ObjectType, String

class Task(ObjectType): 
  id = String()
  title = String()
  description = String()
  step = String()
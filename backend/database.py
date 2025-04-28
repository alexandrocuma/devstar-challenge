import boto3

class Database: 
    def __init__(self):
        db = boto3.resource('dynamodb', endpoint_url="http://dynamodb-local:8000")
        self.db = db
        self.table = db.Table("Tasks")
     
    def migrate(self):
        self.table = self.db.create_table(
            TableName='Tasks',
            KeySchema=[
                {
                    'AttributeName': 'id',
                    'KeyType': 'HASH'
                }
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'id',
                    'AttributeType': 'S' 
                }
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5
            }
        )

    def get_records(self):
        self.table = self.db.Table("Tasks")
        return self.table.scan()
    
    def get_record(self, id):
        self.table = self.db.Table("Tasks")
        task = self.table.get_item(Key={'id': id}).get('Item')
        print(task)
        return task
        
db = Database()

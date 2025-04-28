## Getting Started

First, run the docker containers:

> You should see 3 containers DynamoDB, Frontend and Backend

```bash
docker-compose up --build
```

After getting the 3 containers running we need to run the query in the URL. (This will enable and create the initial table for task).

> http://localhost:3001/graphql

```bash
query {
  migrate
}
```

If everything work succefully you should see:

```bash
{
  "data": {
    "migrate": "Migration Succeeded"
  }
}
```

After you can run normally the frontend part.

> http://localhost:3000

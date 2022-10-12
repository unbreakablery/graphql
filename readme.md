# Getting Started with GraphQL

- first clone the application
- Install nodejs
- setup mongodb , you can follow the guide from the official mongodb documentation
- to setup backend and do **npm install**
- to run backend **node ./app.js** in backend directory (You can also run **PORT='5000' node ./app.js** or **NODE_ENV='test' node ./app.js** to change *port* or *NODE_ENV*)

## Checking Result

* To get the following in the graphiql interface, visit ***http://localhost:{your_port}/graphql***
* On front-end, We can retrieve data from a GraphQL server using our standard data retrieval tools like **fetch** or **axios**
```
fetch('/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({ query: "{ courses { name } }" })
})
    .then(r => r.json())
    .then(data => console.log('data returned:', data));
```

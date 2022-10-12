const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const visual = true;
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema
} = require("graphql");

const RootQueryType = require("./graphql/root.js");

const courses = require("./models/courses.js");
const database = require("./db/database.js");

const app = express();

app.use(cors());
app.options('*', cors());

app.disable('x-powered-by');

app.set("view engine", "ejs");

const port = process.env.PORT || 8181;

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

const schema = new GraphQLSchema({
    query: RootQueryType
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: visual,
}));

app.get("/", (req, res) => courses.getAll(res));

database.resetCollection();

const server = app.listen(port, () => console.log('Order api listening on port ' + port));

module.exports = server;

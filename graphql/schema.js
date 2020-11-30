const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    input UserInputData {
        name: String
        username: String
        email: String!
        password: String!
        image: String
    }

    type User {
        _id: String!
        name: String
        username: String
        email: String!
        password: String
        image: String!
        createdAt: String!
        updatedAt: String!
    }

    type RootMutation {
        createUser(data:UserInputData): User!
    }

    type RootQuery {
        hello: String!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

const { graphqlHTTP } = require("express-graphql");

const schema = require("./schema");
const resolvers = require("./resolvers");

const customFormatErrorFn = (err) => {
    // console.log({ ...err, originalErr: { ...err.originalError }, data: { ...err.data } });
    if (!err.originalError.data) {
        return err;
    }
    const error = {
        data: err.originalError.data,
        code: err.originalError.code,
    };
    return error;
};

const configs = {
    schema,
    rootValue: resolvers,
    customFormatErrorFn,
};

module.exports = {
    graphQLHttpForPost: graphqlHTTP(configs),
    graphQLHttpForGet: graphqlHTTP({
        ...configs,
        graphiql: true,
    }),
};

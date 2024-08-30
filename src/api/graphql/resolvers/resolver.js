const queryResolvers = require('./query-resolvers');
const mutationResolvers = require('./mutation-resolvers');

const resolvers = {
  ...queryResolvers,
  ...mutationResolvers,
};

module.exports = resolvers;

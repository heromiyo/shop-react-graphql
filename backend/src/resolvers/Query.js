// this Query file is connected to src/schema.graphql in the createServer file
/*
 return new GraphQLServer({
        typeDefs: 'src/schema.graphql',
        resolvers: {
            Mutation,
            Query
        },
 */

// for how it connects to the prisma database and query data see the comment in src/resolvers/Mutation.js
const { forwardTo } = require('prisma-binding')
const Query = {
    // async items(parent, args, ctx, info) {
    //     const item = await ctx.db.query.items()
    //     return item
    // }
    /*
    if fetching items from db does not require special logic ie authentication etc
    we can just grab the data directly from prisma by using forwardTo
     */
    items: forwardTo('db'),
    item: forwardTo('db')
}

module.exports = Query

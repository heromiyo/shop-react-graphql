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
const Query = {
    async items(parent, args, ctx, info) {
        const item = await ctx.db.query.items()
        return item
    }
}

module.exports = Query

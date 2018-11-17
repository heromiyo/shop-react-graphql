// this Mutation file is connected to src/schema.graphql in the createServer file
/*
 return new GraphQLServer({
        typeDefs: 'src/schema.graphql',
        resolvers: {
            Mutation,
            Query
        },
 */
const Mutations = {
    async createItem(parent, args, ctx, info) {
        /*
        here we start to interface with the prisma API
        for mutations we target the Mutation field in prisma.graphql
        excerpt of the file -->
        type Mutation {
                   createUser(data: UserCreateInput!): User!
                   createItem(data: ItemCreateInput!): Item!
                   updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
                   updateItem(data: ItemUpdateInput!, where: ItemWhereUniqueInput!): Item
         */
        const item = await  ctx.db.mutation.createItem({
            data: { ...args }
        }, info  /* makes sure that the actual item we created is returned */)
        return item
    }
}

module.exports = Mutations

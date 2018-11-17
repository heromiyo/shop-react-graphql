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
    },
    async updateItem(parent, args, ctx, info) {
        // make copy of the data user passed in
        const updates = { ...args }
        // remove the id because it doesnt need to be updated
        delete updates.id
        // check prisma API for update in prisma.graphql
        return ctx.db.mutation.updateItem({
            data: updates,
            where: {
                 id: args.id
            }
        }, info )
    }
}

module.exports = Mutations

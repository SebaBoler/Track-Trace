const Query = {
    users: (_, args, ctx, info) => {
        return ctx.authorizationApi.query.users(
          {},
          info,
        )
      },
      user: (_, { email }, ctx, info) => {
        return ctx.authorizationApi.query.user(
            { 
                email: email,
            },
            info,)
      },
    me: async (_, { id }, ctx, info) => {
        return ctx.authorizationApi.query.user( {where:{ id }}, info);
    },
};

module.exports = { Query };


/*
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  contractors(where: ContractorWhereInput, orderBy: ContractorOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Contractor]!
  user(where: UserWhereUniqueInput!): User
  contractor(where: ContractorWhereUniqueInput!): Contractor

*/
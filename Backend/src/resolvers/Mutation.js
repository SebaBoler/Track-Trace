import bcrypt,{ hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

const Mutation = {
     createUser: async(parent, args, ctx, info) => {
        const emailTaken = await ctx.authorizationApi.user({ email })

        if (emailTaken) {
            throw new Error('Email taken')
        }

        args.data.email = args.data.email.toLowerCase();
        args.data.password = await hash(args.data.password, 10)
        const hashedPassword = await hash(args.data.password, 10)
        const user = ctx.authorizationApi.mutation.createUser({
            password: hashedPassword,
            ...args,
        },
          info,
        )
        return user
    },   
    login: async (parent, { email, password }, ctx, info) => {
        const user = await ctx.authorizationApi.user({ email })

        if (!user) {
            throw new Error(`No such found for email: ${email}`)
        }

        const validPassword = await compare(password, user.password)
        if (!validPassword) {
            throw new Error(`Invalid password`)
        }

        return {
            token: sign({ userId: user.id }, process.env.SERVER_SECRET),
            user,
        }
    },
};

module.exports = { Mutation };

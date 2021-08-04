const { AuthenticationError } = require('apollo-server-express');
const { User,Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
Query: {
    users: async () => {
        return User.find().populate('users');
      },
      user: async (parent, { username }) => {
        return User.findOne({ username }).populate('users');
      },
},

Mutation:{
    
}
}


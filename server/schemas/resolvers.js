const { AuthenticationError } = require('apollo-server-express');
const { User,Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
Query: {
    users: async () => {
        return User.find().populate('users');
      },
      getSingleUser: async (parent, { username }) => {
        return User.findOne({ username }).populate('users');
      },
},

Mutation:{
  createUser: async (parent, { username, email, password }) => {
    const user = await User.create({ username, email, password });
    const token = signToken(user);
    return { token, user };
  },
  login: async (parent, { email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new AuthenticationError('No user found with this email address');
    }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      throw new AuthenticationError('Incorrect credentials');
    }

    const token = signToken(user);

    return { token, user };
  },
  saveBook: async(parent, { user },context) => {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $addToSet: { savedBooks: context.bookId } }
    );
    return updatedUser;
  }
  
    
},
deleteBook: async(parent, { user }, context) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id },
    { $pull: { savedBooks: { bookId: context.bookId } } }
  );
  return updatedUser;
}
}

module.exports = resolvers;

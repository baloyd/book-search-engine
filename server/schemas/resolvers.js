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
  saveBook: async (parent, { bookData }, context) => {
    if (context.user) {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $push: { savedBooks: bookData } },
        { new: true }
      );

      return updatedUser;
    }

    throw new AuthenticationError('You need to be logged in!');
  },
  deleteBook: async (parent, { bookId }, context) => {
    if (context.user) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );

      return updatedUser;
    }

    throw new AuthenticationError('You need to be logged in!');
  },
},
};

module.exports = resolvers;

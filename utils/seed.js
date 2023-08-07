const mongoose = require('mongoose');
const data = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUsers, getRandomThoughts } = require('./data');

data.once('open', async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = await User.create(getRandomUsers(10));
    const thoughts = await Thought.create(getRandomThoughts(users, 20));

    console.log('Seeded');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
const {User} = require("../models");

const userController = {
    async getAllUsers(req, res) {
      try {
        const users = await User.find({})
          .populate({ path: "thoughts", select: "-__v" })
          .select("-__v");
        res.json(users);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
  
    async getUserById({ params }, res) {
      try {
        const users = await User.findOne({ _id: params.id })
          .populate({ path: "thoughts", select: "-__v" })
          .select("-__v");
  
        if (!users) {
          res.status(404).json({ message: "No user has this id!" });
          return;
        }
        res.json(users);
      } catch (err) {
        console.log(err);
        res.status(400).json(err);
      }
    },
  
    async createUser({ body }, res) {
      try {
        const users = await User.create(body);
        res.json(users);
      } catch (err) {
        console.log(err);
        res.status(400).json(err);
      }
    },
  
    async updateUser({ params, body }, res) {
      try {
        const users = await User.findOneAndUpdate({ _id: params.id }, body, {
          new: true,
          runValidators: true,
        });
  
        if (!users) {
          res.status(404).json({ message: "No user has this id!" });
          return;
        }
  
        res.json(users);
      } catch (err) {
        console.log(err);
        res.status(400).json(err);
      }
    },
  
    async deleteUser({ params }, res) {
      try {
        const users = await User.findOneAndDelete({ _id: params.id });
  
        if (!users) {
          res.status(404).json({ message: "No user has this id!" });
          return;
        }
  
        res.json(users);
      } catch (err) {
        console.log(err);
        res.status(400).json(err);
      }
    },
  
    async addFriend({ params }, res) {
      try {
        const users = await User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { friends: params.friendId } },
          { new: true, runValidators: true }
        );
  
        if (!users) {
          res.status(404).json({ message: "No user has this id!" });
          return;
        }
  
        res.json(users);
      } catch (err) {
        console.log(err);
        res.status(400).json(err);
      }
    },
  
    async removeFriend({ params }, res) {
      try {
        const users = await User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { friends: params.friendId } },
          { new: true }
        );
  
        if (!users) {
          res.status(404).json({ message: "No user has this id!" });
          return;
        }
  
        res.json(users);
      } catch (err) {
        console.log(err);
        res.status(400).json(err);
      }
    },
  };
  
  module.exports = userController;
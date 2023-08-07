const { Thought, User} = require("../models");

const thoughtsController = {
    async getAllThoughts(req, res) {
      try {
        const thoughts = await Thought.find({});
        res.json(thoughts);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
  
    async getThoughtById({ params }, res) {
      try {
        const thoughts = await Thought.findOne({ _id: params.id });
        if (!thoughts) {
          res.status(404).json({ message: "No thought has this id!" });
          return;
        }
        res.json(thoughts);
      } catch (err) {
        console.log(err);
        res.status(400).json(err);
      }
    },
  
    async createThought({ params, body }, res) {
      try {
        const { _id } = await Thought.create(body);
        const users = await User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
  
        if (!users) {
          res.status(404).json({ message: "No user has this id!" });
          return;
        }
  
        res.json(users);
      } catch (err) {
        res.json(err);
      }
    },
  
    async updateThought({ params, body }, res) {
      try {
        const thoughts = await Thought.findOneAndUpdate(
          { _id: params.id },
          body,
          { new: true, runValidators: true }
        );
        if (!thoughts) {
          res.status(404).json({ message: "No thought has this id!" });
          return;
        }
        res.json(thoughts);
      } catch (err) {
        res.json(err);
      }
    },
  
    async deleteThought({ params }, res) {
      try {
        const thoughts = await Thought.findOneAndDelete({ _id: params.id });
        if (!thoughts) {
          res.status(404).json({ message: "No thought has this id!" });
          return;
        }
        res.json(thoughts);
      } catch (err) {
        res.json(err);
      }
    },
  
    async addReaction({ params, body }, res) {
      try {
        const thoughts = await Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: body } },
          { new: true, runValidators: true }
        );
  
        if (!thoughts) {
          res.status(404).json({ message: "No thought has this id!" });
          return;
        }
  
        res.json(thoughts);
      } catch (err) {
        res.json(err);
      }
    },
  
    async removeReaction({ params }, res) {
      try {
        const thoughts = await Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: { reactionId: params.reactionId } } },
          { new: true }
        );
        res.json(thoughts);
      } catch (err) {
        res.json(err);
      }
    },
  };
  
  module.exports = thoughtsController;
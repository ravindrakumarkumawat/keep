const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  firstName: {
    type: String, 
    required: true
  },
  lastName: {
    type: String, 
    required: true
  },
  lists: [
    {
      listName: {
        type: String,
        required: true
      },
      tasks: [{
        taskName: {
          type: String,
          required: true
        },
        completed: {
          type: Boolean,
          default: false
        }
      }],
      createdOn: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdOn: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model("user", userSchema)
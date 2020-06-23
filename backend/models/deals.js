const mongoose = require("mongoose");
const { string } = require("yargs");

mongoose.set("useFindAndModify", false);

const dealSchema = new mongoose.Schema({
  dealType: {
    type: String,
    required: true,
  },
  dealText: {
    type: String,
    required: true,
    max: 10,
  },
  dealAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
  },
});

dealSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Deal", dealSchema);

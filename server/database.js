const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);
mongoose
  .connect(
    "mongodb+srv://jark:Chillan1982@cluster0-u6kca.mongodb.net/test?retryWrites=true&w=majority",
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )
  .then(db => console.log("DB is connected"))
  .catch(err => console.error(err));

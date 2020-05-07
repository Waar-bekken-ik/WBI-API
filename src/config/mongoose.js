const mongoose = require("mongoose");

const uri = `mongodb+srv://0972416:0972416@thomas-fqkpq.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => console.log(`🚀 Connected to mongo at ${uri}`));

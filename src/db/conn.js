const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/inventory", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connection made successfully");
})
.catch((e) => {
    console.log(e);
});
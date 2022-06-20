const mongoose = require("mongoose");
// connect

mongoose
  .connect(
    "mongodb+srv://tepela:ZAS0706x@cluster0.ns3va.mongodb.net/rahisi?retryWrites=true&w=majority"
  )
  .then(console.log("mongodb connected"))
  .catch((err) => console.log(err));

export {};

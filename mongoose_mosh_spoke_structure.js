console.log(":::::::::::::::::::::::::::::::::::::::");

var mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/blackbox")
  .then(() => console.log("Connected to database"))
  .catch(err => console.error("Could not connect :: ", err));

const docSchema = new mongoose.Schema({
  name: String,
  data: String,
  connector: String
});

const Document = mongoose.model("Document", docSchema);

async function createDocument() {
  const document = new Document({
    name: "TRIRIGA Connector",
    data: "Data here",
    connector: ["TRIDEV"]
  });

  const result = await document.save();
  console.log(result);
}

async function getDocuments() {
  const pageNumber = 1;
  const pageSize = 10;

  // const documents = await Document
  //   .find()
  //   .skip((pageNumber - 1) * pageSize)
  //   .limit(pageSize)
  //   .sort({name:1})
  //   .select({name: 1, data: 1})
  // ;
  const documents = await Document.find()
    .where("name")
    .equals("TRIRIGA Connector")
    .limit(10)
    .select("name data")
    .exec(function() {
      console.log("hey");
    });

  console.log(documents);
}

getDocuments();
//createDocument();

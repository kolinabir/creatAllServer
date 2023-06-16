//to index.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5023;
require("dotenv").config();
// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z0ckcxg.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
const learnCollection = client.db("LearnAll").collection("popularClass");
const instructorCollection = client
  .db("LearnAll")
  .collection("popularInstructor");
const instructorsCollection = client.db("LearnAll").collection("instructors");
const classListCollection = client.db("LearnAll").collection("classList");
const StudentSelectedClassCollection = client
  .db("LearnAll")
  .collection("StudentSelectedClass");
app.get("/popularClass", async (req, res) => {
  const result = await learnCollection.find().toArray();
  console.log(result);
  res.send(result);
});
app.get("/popularInstructor", async (req, res) => {
  const result = await instructorCollection.find().toArray();
  console.log(result);
  res.send(result);
});
app.get("/instructors", async (req, res) => {
  const result = await instructorsCollection.find().toArray();
  console.log(result);
  res.send(result);
});
app.get("/classList", async (req, res) => {
  const result = await classListCollection.find().toArray();
  console.log(result);
  res.send(result);
});
app.post("/selectedClass", async (req, res) => {
  const user = req.body;
  //if (!user {
  //     return res.status(404).send({message:"body data not found"})
  //   }
  console.log("new user", user);
  const result = await StudentSelectedClassCollection.insertOne(user);
  res.send(result);
});
app.get("/selectedClass/:email", async (req, res) => {
  console.log(req.params.email);
  const result = await StudentSelectedClassCollection.find({
    userMail: req.params.email,
  }).toArray();
  res.send(result);
});
app.delete("/selectedClass/:id", async (req, res) => {
  const id = req.params.id;
  const query = { name: id };
  const result = await StudentSelectedClassCollection.deleteOne(query);
  res.send(result);
});
app.get("/", (req, res) => {
  res.send("simple card is running");
});

app.listen(port, () => {
  console.log(`card is running on port : ${port}`);
});

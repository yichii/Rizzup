const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const path = require("path");

app.use(express.static(path.join(__dirname, "frontend")));
app.use(express.json());
app.use(cors());

console.log("Attempting to connect to MongoDB");

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://afc:rizzup@cluster0.adituwi.mongodb.net/?retryWrites=true&w=majority";

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
    await client.close();
  }
}
run().catch(console.dir);

// const posts = require("./frontend/routes/posts");
// app.use("/posts", posts);

// const users = require("./frontend/routes/users");
// app.use("/users", users);

// const comments = require("./frontend/routes/comments");
// app.use("/comments", comments);

// const notifications = require("./frontend/routes/notifications");
// app.use("/notifications", notifications);

const port = 3001;
app.listen(port, () => console.log(`Rizz app listening on port ${port}`));

//test message
app.get("/message", (req, res) => {
  const message = "Hello!";
  res.json({ message });
});

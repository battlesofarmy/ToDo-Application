require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 3000;


// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://muntasir3301.xyz/',
    'https://www.muntasir3301.xyz'
  ], 
  credentials: true,
}));
app.use(express.json());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
        },
    })
);

// MongoDB connection setup
const uri = `mongodb+srv://todo:yBcFt77J5DJehPCX@cluster0.whohm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.whohm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

// Connect to MongoDB
async function run() {
    try {
        await client.connect();
        const todoCollection = client.db('ToDoWebApp').collection('todos');
        console.log("Connected to MongoDB");

        // Routes

        // Delete a todo by value
        app.delete('/todos/:todo', async (req, res) => {
            try {
                const todoValue = req.params.todo;
                const result = await todoCollection.deleteOne({ todo: todoValue });
                if (result.deletedCount === 1) {
                    res.send({ success: true, message: 'Document deleted successfully.' });
                } else {
                    res.status(404).send({ success: false, message: 'Document not found.' });
                }
            } catch (error) {
                console.error('Error deleting document:', error);
                res.status(500).send({ success: false, message: 'Server error.' });
            }
        });

        // Insert a todo
        app.post('/todos', async (req, res) => {
            try {
                const insertTodo = req.body;
                const result = await todoCollection.insertOne(insertTodo);
                res.send(result);
            } catch (error) {
                console.error('Error inserting todo:', error);
                res.status(500).send({ success: false, message: 'Server error.' });
            }
        });

        // Get todos by email
        app.get('/todos/email/:em', async (req, res) => {
            try {
                const reqEmail = req.params.em;
                const cursor = todoCollection.find({ email: reqEmail });
                const result = await cursor.toArray();
                res.send(result);
            } catch (error) {
                console.error('Error fetching todos by email:', error);
                res.status(500).send({ success: false, message: 'Server error.' });
            }
        });

        // Get all todos
        app.get('/todos', async (req, res) => {
            try {
                const cursor = todoCollection.find();
                const result = await cursor.toArray();
                res.send(result);
            } catch (error) {
                console.error('Error fetching todos:', error);
                res.status(500).send({ success: false, message: 'Server error.' });
            }
        });

        // Confirm MongoDB connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Leave client open for persistent server
    }
}
run().catch(console.dir);



// Basic route
app.get('/', (req, res) => {
    res.send('Hello');
    console.log('World');
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Closing MongoDB connection...');
    await client.close();
    process.exit(0);
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

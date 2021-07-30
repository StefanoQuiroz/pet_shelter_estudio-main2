require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const cookieParser = require('cookie-parser');

//connect mongoDB with Mongoose
const connectDB = require('./server/config/config.mongo');
connectDB()

//middlewares
app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.use('/api', require('./server/routes/pet.route'));


const server = app.listen(PORT, ()=>{
    console.log(` 1 : Server Lock and Loading on PORT: ${PORT} `);
})

const io = require('socket.io')(server);

io.on("connection", socket => {
    socket.on("event_from_client", data => {
        socket.broadcast.emit("send_data_to_all_other_clients", data);
    })
})

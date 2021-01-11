const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser')
const http = require('http').Server(app);
const io = require('socket.io')(http);

require('dotenv').config();




app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

/* Setup mongoose/mongoDB connection */ 
mongoose.connect(process.env.uri
, {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => console.log('Connected to database'))
.catch(err => console.log(`Failed to connect to database - Error: ${err.message}`));

/* Import server/API routes */
const LoginRouter = require('./routes/login');
const RegisterRouter = require('./routes/register');
const ChannelsRouter = require('./routes/channels');
const UsersRouter = require('./routes/users');
const MessagesRouter = require('./routes/messages');


/* Import server/API routes */ 

/* Setting server to use our API routes */ 
app.use('/api', require('./routes/profile'));
app.use('/login', LoginRouter); 
app.use('/register', RegisterRouter);
app.use('/channels', ChannelsRouter);
app.use('/messages', MessagesRouter);
app.use('/users', UsersRouter);


 


http.listen(port, () => console.log(`Client listening on port ${port}!`));

module.exports = app;

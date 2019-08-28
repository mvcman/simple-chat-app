const http = require('http').createServer();
const io = require('socket.io')(http);
const port = 3000;
const repl = require('repl');
const chalk = require('chalk');
let username = 'server';
let allusers = {};
timestamp = 15;
let usercount = 0;
let question = [
  {
    question: "What is the capital of India?",
    option1: "Delhi",
    option2: "Mumbai",
    option3: "Kolkata",
    option4: "Jaipur",
    correctAnswer: "Delhi"
  },
  {
    question: "What is the capital of India?",
    option1: "Delhi",
    option2: "Mumbai",
    option3: "Kolkata",
    option4: "Jaipur",
    correctAnswer: "Delhi"
  },
  {
    question: "What is the capital of Pakistan?",
    option1: "Islamabad",
    option2: "Karachi",
    option3: "Kolkata",
    option4: "Jaipur",
    correctAnswer: "Karachi"
  },
  {
    question: "Addition of (5 + 2) will be equal to ?",
    option1: "9",
    option2: "10",
    option3: "7",
    option4: "8",
    correctAnswer: "7"
  },
  {
    question: "_____ is event base lanuage",
    option1: "java",
    option2: "C++",
    option3: "JS",
    option4: "C",
    correctAnswer: "JS"
  }
];
let i = 0;

http.listen(port, () => console.log(`Server listening on port: ${port}`))

io.on('connection', (socket) => {
    // console.log('connected');
  socket.on('addClient', (username) => {
    allusers[username] = username;
    usercount ++;
    console.log('User ' + username + ' is connected!');
    console.log('All users: ', allusers);
    console.log(usercount);
    if(usercount === 3){
      socket.broadcast.emit('getQuestion', question, timestamp);
    }
    // if(allusers.length)
    // socket.
  });

  socket.on('message', (evt) => {
  	  console.log(evt);
      
  	   // socket.broadcast.emit('message', evt, question, timestamp);
      // console.log("question" + question[i] + " send!");
      // socket.emit('getQuestion', question[i]);
      // i++;
  });
  //
  // repl.start({
  //     prompt: '',
  //     eval: (cmd) => {
  //       if(cmd === 'ss'){
  //         socket.emit('getQuestion', question[i]);
  //         i++;
  //       }
  // }
  // });
  // socket.on('getQuestion', () => {
  //
  // });

  // socket.on('disconnect', (username) => {
  //   console.log('User ' + username + ' Disconnected!');
  //   // socket.broadcast.emit('message', evt);
  // });

});

// io.on('disconnect', (socket) => {
//     console.log('Some people left');
// });

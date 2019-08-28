var socket = require('socket.io-client')('http://localhost:3000');
const repl = require('repl');
const chalk = require('chalk');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

var username = null;
let i;
let score = 0;
let u_answer = [];
let q_answer = [];

function getResult(q_answer, u_answer) {
  var s = 0;
  for(j=0; j<= q_answer.length; j++){
    if(q_answer[j] == u_answer[j]){
      s = s + 5;
    }else {
      s = s;
    }
  }
  return new Promise((resolve) => resolve(s));
}

socket.on('connect', () => {
   //  repl.start({ prompt: '', eval: (cmd) => { socket.send({ username })} });
    username = process.argv[2];
    socket.emit('addClient', username);
    console.log(chalk.red('You are now connnected! \n ---- Start chatting ----'));
});

socket.on('message', (question, time) => {
    // const { cmd, username } = data;
    // console.log(cmd, username);
    // console.log(chalk.green(username + ': ' + cmd.split('\n')[0]));

});

// socket.on('result', (score) => {
//
// });

socket.on('getQuestion', (data, time) => {
    console.log('Your quiz will start in 10 seconds!');
    i=0;
    ti = setInterval(() => {
      if(i<5){
        console.log(data[i].question);
        console.log(`1) ${data[i].option1}\n2) ${data[i].option2}\n3) ${data[i].option3}\n4) ${data[i].option4}\n`);
        q_answer.push(data[i].correctAnswer);
        readline.question(`Enter your answer please:-\n`, (ans) => {
          u_answer.push(ans);
      });
      }
      i++;
      if(i == 6)
      {
        readline.close();
        clearInterval(ti);
        getResult(q_answer, u_answer)
        .then((score) => {
          if(score >= 10 ){
            console.log("Yehhh u r pass your score is ", score);
            process.exit(0);
          }
          else {
            console.log('Sorry u r fail!');
            process.exit(0);
          }
        });
      }
    },10000);
});

socket.on('disconnect', function(){
  console.log("Disconnected!");
});

// repl.start({
//     prompt: '',
//     eval: (cmd) => {
// 	socket.send({ cmd, username })
// }
// });

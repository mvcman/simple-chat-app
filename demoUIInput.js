const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
var answer;
readline.question(`Enter your answer please`, (ans) => {
  // console.log(ans);
  answer = ans;
  // readline.close()
});
setTimeout(() => console.log(answer), 3000);
// process.exit(0);

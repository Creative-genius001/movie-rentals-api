// Import the express library here
const express = require('express')
// const { Octokit } = require("@octokit/core");
const app = express();

console.log('before');

async function displayResult(){
  const user = await getCustomer(1);
    console.log('Customer: ', user);
  if (user.isGold) {
    const movie = await  getTopMovies(); 
      console.log(movie);
    const emailMsg = await sendEmail();
        console.log('Email sent...');
}
}
displayResult()
  
function getCustomer(id) {
  return new Promise ((resolve, reject)=>{
    setTimeout(() => {
     resolve({ 
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      });
    }, 4000);  
  })
}

function getTopMovies() {
  return new Promise ((resolve, reject)=>{
    setTimeout(() => {
    resolve(['movie1', 'movie2']);
  }, 4000);
})
}

function sendEmail() {
  return new Promise ((resolve, reject)=>{
    setTimeout(() => {
      resolve('Email sent...');
  }, 4000);
})
}
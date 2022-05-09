const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(()=> console.log('connected to database..'))
    .catch(err=> console.log('there was an issue with the connection...', err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    isPublished: Boolean,
    price: Number,
    date: { type: Date, default: Date.now()}
});

const Course = mongoose.model('Course', courseSchema);

async function addCourse(){
    const course = new Course({
        name: 'Hello course',
        author: 'Kristein',
        tags: ['array'],
        isPublished: true,
        price: 40,
    });
    
    const result = await course.save();
    console.log(result);    

}

async function getCourses(){
    const getCourse = await Course
    .find ({isPublished: true , tags: 'backend'})
    .sort({name : 1})
    .select({name: 1, author: 1});

    console.log(getCourse);
}

// async function getList(){
//     const getLists = await Course
//     .find()
//     .or([ {isPublished: true}, {tags: 'backend'}, {tags: 'frontend'}] )
//     .sort({price: -1})
//     .select({name: 1, author: 1, price: 1});
//     console.log(getLists);
// }

// getList();

async function getList(){
    const getLists = await Course
    .find({isPublished:true})
    .or([{name: /.*by.*/}])
    .select('name');
    console.log(getLists);
}

getList();

// async function run(){
//     const result = await getList();
//     console.log(result);
// }
// run();

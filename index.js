'use strict';

const { MongoClient } = require('mongodb')
const MONGODB_URL = 'mongodb://localhost:27017/test'

const [,,...args] = process.argv
const arg = args.join(' ')
const reg = RegExp(`^${arg}`, "i")

MongoClient
  .connect(MONGODB_URL)
  .then(db => {
    db.collection('restaurants')
    .find({ name: reg }) // pass query to 'find'
    .sort({ name: 1 })
    // .toArray()
    // .then((restaurants) => {
    //   restaurants.forEach(restaurant => {
    //     if(restaurant.name) {
    //       console.log(restaurant.name)
    //     }
    //   })
    // })
    // .then(() => db.close())
    .forEach(restaurant => { // logs each restaurant as a chunk
      if (restaurant.name) {
        console.log(restaurant.name)
      }
    },
      () => db.close()
    )
  })
  .catch(console.error)

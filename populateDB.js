#! /usr/bin/env node

// imports
const fs = require('fs');
const Store = require('./models/store');
const User = require('./models/user');
const Music = require('./models/music');
const Variant = require('./models/variant');
const Product = require('./models/product');
const Video = require('./models/video');
const Tag = require('./models/tags');

// we get the arguments passed in the command line
const userArgs = process.argv.slice(2);

const users = [];
const stores = [];
const musics = [];
const TOTAL_VALUE = 300;

// intializing database connection to MongoDB
// via the mongoose ODM
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];
main().catch((err) => console.log(err));

// a simple main function that generates and adds sample data
// to the MongoDB database
async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await deleteDocuments();
  await createStores();
  await createUser();
  await createMusic();
  await createVariants();
  await createTags();
  await createProducts();
  await createVideos();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// a simple function to remove/delete documents from
// each collection when re-running the script to 
// avoid duplicates and redundant data
async function deleteDocuments(){
    await User.deleteMany();
    await Store.deleteMany();
    await Variant.deleteMany();
    await Product.deleteMany();
    await Tag.deleteMany();
    await Music.deleteMany();
    await Video.deleteMany();
}

// helper functions to create sample data for the 'Stores' collections
async function storeCreate(index, name, url) {
    const store = new Store({ _id: index + 1, name: name, logo_url: url });
    await store.save();
    stores[index] = store;
    console.log(`Added Store: ${name}`);
}

async function createStores() {
  console.log("Adding Stores");

  for (let i = 0; i < TOTAL_VALUE; i++){
      await Promise.all([
        storeCreate(i, `Store_${i}`, `https://example.com/Store_${i}`),
      ]);
  }
}

// helper functions to create sample data for the 'Users' collections
async function userCreate(index, obj) {
    const user = new User({ 
        _id: index + 1,
        username: obj.username,
        display_name: obj.display_name,
        profile_picture_url: obj.url,
        bio: obj.bio,
        followers_count: obj.followers_count,
        verified: obj.verified
    });

    await user.save();
    users[index] = user;
    console.log(`Added User: ${obj.username}`);
}

async function createUser(){
    console.log("Adding Users");
    for (let i = 0; i < TOTAL_VALUE; i++){

        const obj = {
            username: `User_${i + 1}`, 
            display_name: `User_Display_Name_${i + 1}`,
            bio: `Hello! I am User_${i + 1}`,
            followers_count: Math.floor(Math.random() * 50000),
            verfied: (i%2 == 0) ? true : false
        }
        await Promise.all([
          userCreate(i, obj),
        ]);
    }

}

// helper functions to create sample data for the 'Music' collections
async function musicCreate(index, obj) {
    const music = new Music({ 
        _id: index + 1,
        name: obj.name,
        artist: obj.artist,
        cover_url: obj.cover_url
    });

    await music.save();
    musics[index] = music;  
    console.log(`Added Music: ${obj.name} by ${obj.artist}`);
}

async function createMusic() {
    console.log("Adding Music Records");

    for (let i = 0; i < TOTAL_VALUE; i++) {
        const musicObj = {
            _id: i + 1, 
            name: `Song_${i + 1}`,
            artist: `Artist_${i + 1}`,
            cover_url: `https://example.com/cover_${i + 1}.jpg`
        };
        await Promise.all([
            musicCreate(i, musicObj),
        ]);
    }
}


// helper functions to create sample data for the 'Products' collections
async function createProducts() {
    console.log("Adding Products");

    const variants = await Variant.find();
    
    for (let i = 0; i < TOTAL_VALUE; i++) {
        const stores = await Store.find({_id: i + 1});
        const randomVariants = [
            variants[0]._id, 
            variants[1]._id
        ];
        console.log(randomVariants)
        const productObj = {
            _id: i + 1,
            name: `Product_${i + 1}`,
            price: (Math.random() * 100).toFixed(2),
            original_price: (Math.random() * 150).toFixed(2), 
            discount_percentage: Math.floor(Math.random() * 50), 
            image_url: `https://example.com/product_image_${i + 1}.jpg`,
            timestamp: Date.now(),
            currency: "USD",
            store: stores._id, 
            in_stock: Math.random() > 0.2,
            variants: randomVariants
        };

        await Promise.all([
            productCreate(productObj),
        ]);
    }
}

async function productCreate(productObj) {
    const product = new Product({
        _id: productObj._id,
        name: productObj.name,
        price: productObj.price,
        original_price: productObj.original_price,
        discount_percentage: productObj.discount_percentage,
        image_url: productObj.image_url,
        timestamp: productObj.timestamp,
        currency: productObj.currency,
        store: productObj.store,
        in_stock: productObj.in_stock,
        variants: productObj.variants
    });

    await product.save();
    console.log(`Added Product: ${productObj.name}`);
}


// helper functions to create sample data for the 'Variants' collections
async function createVariants() {
    console.log("Adding Variants");

    const variantsData = [
        {
            _id: 101,
            name: "Size",
            options: ["S", "M", "L", "XL"]
        },
        {
            _id: 102,
            name: "Color",
            options: ["Red", "Blue", "Green"]
        }
    ];

    for (let i = 0; i < variantsData.length; i++) {
        const variantObj = variantsData[i];

        const variant = new Variant({
            _id: variantObj._id,
            name: variantObj.name,
            options: variantObj.options
        });

        await variant.save();
        console.log(`Added Variant: ${variantObj.name}`);
    }
}

// helper functions to create sample data for the 'Tags' collections
async function createTags() {
    console.log("Adding Tags");

    for (let i = 0; i < TOTAL_VALUE; i++) {
        const tagObj = {
            _id: i + 1, 
            name: `Tag_${i + 1}`
        };

        await tagCreate(tagObj);
    }
}

async function tagCreate(tagObj) {
    const tag = new Tag({
        _id: tagObj._id,
        name: tagObj.name
    });

    await tag.save();
    console.log(`Added Tag: ${tagObj.name}`);
}


// helper functions to create sample data for the 'Videos' collections
async function createVideos() {
    console.log("Adding Videos");

    const users = await User.find({});
    const products = await Product.find({});
    const music = await Music.find({});
    const tags = await Tag.find({});


    for (let i = 0; i < TOTAL_VALUE; i++) {

        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomMusic = music[Math.floor(Math.random() * music.length)];

        const randomProducts = [
            products[Math.floor(Math.random() * products.length)]._id, 
            products[Math.floor(Math.random() * products.length)]._id  
        ];
        const randomTags = [
            tags[Math.floor(Math.random() * tags.length)]._id, 
            tags[Math.floor(Math.random() * tags.length)]._id  
        ];

        const videoObj = {
            _id: i + 1, 
            video_url: `https://example.com/video_${i + 1}.mp4`,
            thumbnail_url: `https://example.com/thumbnail_${i + 1}.jpg`,
            description: `This is the description for video_${i + 1}`,
            duration: Math.floor(Math.random() * 300) + 60, 
            created_at: new Date(),
            user: randomUser._id,
            products: randomProducts, 
            likes_count: Math.floor(Math.random() * 1000), 
            comments_count: Math.floor(Math.random() * 100), 
            shares_count: Math.floor(Math.random() * 100),
            is_liked: Math.random() > 0.5,
            is_bookmarked: Math.random() > 0.5, 
            music: randomMusic._id,
            hashtags: randomTags 
        };

        await Promise.all([
            videoCreate(videoObj),
        ]);
    }
}

async function videoCreate(videoObj) {
    const video = new Video({
        _id: videoObj._id,
        video_url: videoObj.video_url,
        thumbnail_url: videoObj.thumbnail_url,
        description: videoObj.description,
        duration: videoObj.duration,
        created_at: videoObj.created_at,
        user: videoObj.user,
        products: videoObj.products,
        likes_count: videoObj.likes_count,
        comments_count: videoObj.comments_count,
        shares_count: videoObj.shares_count,
        is_liked: videoObj.is_liked,
        is_bookmarked: videoObj.is_bookmarked,
        music: videoObj.music,
        hashtags: videoObj.hashtags
    });

    await video.save();
    console.log(`Added Video: ${videoObj.video_url}`);
}
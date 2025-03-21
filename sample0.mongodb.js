use('libraryDB');
db.books.insertOne({"title": "Gone with the wind"});
db.books.find()/*shows all the document in the collection */
/*2. drop the database */
use('libraryDB');
db.dropDatabase();
/*3.drop a collection */
use('libraryDB');
db.books.drop();
/*4.recreate the collection 'books'. then create 
a 2nd collection  */
use('libraryDB');
db.authors.insert({"a_name": "Jump", "DOB":"11th July 1967"});
db.authors.find();
/*5.Insert a second document into 'books' collection, this time supply ID field*/
use('libraryDB');
db.books.insert({"_id":9780007488377, "title":"Lord of the Rings", "pub_year":1954})

/*6.Bulk insert: insert multiple documents at the same time */
use('vehicleDB');
db.cars.insertMany([
{"brand":"Toyota", "model":"Corolla", "ndoors":4},
{"brand":"Ford", "model":"Mustang", "ndoors":2}
]);
db.cars.find();
/*deleting specific documents */
use('vehicleDB');
db.cars.deleteOne({"brand":"Ford"});
/*7. updating documents:
1.replaceOne()
2.replace()
3.update()
*/
/*7.1 
replaceOne(): to replace a specific, existing document with a new one*/
use('libraryDB');
db.authors.replaceOne({"a_name":"Jump", "DOB":"11th July 1967"},
    {"a_name":"Jump", "DOB":"11th July 1967","award_name":"A", "award_year":2000, "current_city":"New York"});
use('libraryDB');
db.authors.find();
/*7.2 update() */
/*1.without using JS script:
In 'modifier document' (SET clause), include all keys and their 
corresponding values, except _id key */
/*2. using javascript: in the modifier document(SET clause), include
only the key and value to be changed */
/*3..update(): without using javascript: 
use('libraryDB);
db.author.update({"_id":"669ff65b6cf35948ecb3dfb9"},
{"a_name":"Jump", "DOB":"11th July 1967",award_name":"A", "award_year":2000, "current_city":"Rome"}); */
use('libraryDB');
db.authors.updateMany(
  { "a_name": "Jump" },
  { $set: { "current_city": "Rome" } }
);
use('libraryDB');
db.authors.find();
/*insert many */
use('blogDB');
db.analytics.insertMany([
    {
        "url": "www.blogspot.com/blog1",
        "pageviews": 52,
        "likes": 4,
        "comments": 1,
        "b_author": "John Smith"
    },
    {
        "url": "www.blogspot.com/blog2",
        "pageviews": 1030,
        "likes": 180,
        "comments": 7,
        "b_author": "Anne Marie"
    },
    {
        "url": "www.blogspot.com/blog3",
        "pageviews": 30,
        "likes": 5,
        "comments": 3,
        "b_author": "Fred Jones"
    },
    {
        "url": "www.blogspot.com/blog4",
        "pageviews": 5,
        "likes": 1,
        "comments": 0,
        "b_author": "Anne Marie"
    }
]);
db.posts.insertMany([
    {
        "title": "On Golden Pond",
        "url": "www.blogspot.com/blog2",
        "content": "In the film, Norman (Henry Fonda) " +
            "is a curmudgeon with an estranged relationship " +
            "with his daughter Chelsea (Jane Fonda). " +
            "At Golden Pond, he and his wife nevertheless " +
            "agree to care for Billy, the son of Chelsea's new boyfriend, " +
            "and a most unexpected relationship blooms.",
        "author": {
            "a_name": "Anne Marie",
            "a_email": "am@gmail.com",
            "a_city": "Springfield"
        }
    }
]);
use('blogDB');
db.analytics.find();
use('blogDB');
db.posts.find();

/*increase pageviews for anne marries first blog by 1 */
use('blogDB');
db.analytics.update(
    { "url": "www.blogspot.com/blog2" },
    { $inc: { "pageviews": 1 } }
);
db.analytics.find({ "url": "www.blogspot.com/blog2" }); // Verifying

/*psgeviews for anne Marrie's snd blog, changing it to 20  */
use('blogDB');
db.analytics.update(
    { "url": "www.blogspot.com/blog4" },
    { $set: { "pageviews": 20 } }
);
db.analytics.find({ "url": "www.blogspot.com/blog4" }); // Verifying

/*update command to add a homepage field with a value 
of /index.html to Anne Marie's second blog, */
use('blogDB');
db.analytics.update(
    { "url": "www.blogspot.com/blog4" },
    { $set: { "homepage": "/index.html" } }
);
db.analytics.find({ "url": "www.blogspot.com/blog4" }); // Verifying

/*update command to change the name of the author of the blog "On Golden Pond" to "Anne Marie Davis,"*/
use('blogDB');
db.posts.update(
    { "title": "On Golden Pond" },
    { $set: { "author.a_name": "Anne Marie Davis" } }
);
db.posts.find({ "title": "On Golden Pond" }); // Verifying

//
use('HarryPotterDB');
db.FoodTrolley.insertMany([
    {
        "_id": 1,
        "FoodItem": "Chocolate Frogs",
        "Description": "literally chocolate shaped like a frog that jumps around - comes with a wizard card",
        "Price": 1.2,
        "Inventory": 56
    },
    {
        "_id": 2,
        "FoodItem": "Bertie Bots Every Flavour Beans",
        "Description": "Basic jelly beans made to taste like just about anything",
        "Price": 12.5,
        "Flavours": ["Pear", "Peppermint", "Rocky Road", "Salt", "Soap", "Toothpaste", "Vanilla", "Watermelon"]
    },
    {
        "_id": 3,
        "FoodItem": "Pumpkins Pasties",
        "Description": "Pastries made to taste like pumpkins",
        "Price": 1.8,
        "Inventory": 14
    },
    {
        "_id": 4,
        "FoodItem": "Cauldron Cakes",
        "Description": "Cauldron shaped licorice flavoured sweets",
        "Price": 1.3
    },
    {
        "_id": 5,
        "FoodItem": "Licorice Wands",
        "Price": 0.9,
        "Colour": "Black"
    }
])
use('HarryPotterDB');
db.FoodTrolley.find();

use('HarryPotterDB');
db.FoodTrolley.drop();

/*find() */
/*a. ~SELECT in SQL
b. If a blank QueryDocument is specified ('{}'), all the Documents (ie, ~'rows' in SQL) are returned
  c. 1 = shows a Key; 0 = does not show a Key
 d. '_id' is included in the returned Documents by default; and will explicitly need to be excluded if needed.*/

/* Q1. Display all the FoodItems present in the Collection.
Only the field 'FoodItem' should be visible. */
use('HarryPotterDB');
db.FoodTrolley.find(
    {},
    {"FoodItem": 1, "_id": 0}
);

/* Q2. Display all the info related to 'Chocolate Frogs'. */
use('HarryPotterDB');
db.FoodTrolley.find({"FoodItem": "Chocolate Frogs"});

/* 3.3) Wildcards:
3.3.1) Pattern-matching
3.3.2) Comparators (ie, comparison operators)
    - $gt
    - $gte
    - $lt
    - $lte
    - $ne
    - $eq
    - $in
    - $nin
3.3.3) $exists and NULL
3.4.4) ...
*/

/* Q1. Return all the FoodItems containing the word 'frog'. Only return the field 'Food Item': */
use('HarryPotterDB');
db.FoodTrolley.find({"FoodItem": {$regex: "frog", $options: "i"}}, /* case-insensitive match */
                    {"FoodItem":1, "_id":0});
//or:
use('HarryPotterDB');
db.FoodTrolley.find({
"FoodItem":/frog/i
},
{"FoodItem":1, "_id":0}
);
                    
/* works on 'frog', 'Frogs', 'frogger', bullfrog', etc. */

/*list the food items inventory is more than 20 */
use('HarryPotterDB');
db.FoodTrolley.find(
    {"Inventory": {"$gt": 20}},
    {"FoodItem": 1, "_id": 0}
);
/*between */
/* find all food items inventory between 12 and 60*/
use('HarryPotterDB');
db.FoodTrolley.find(
    {"Inventory": {"$gte": 12, "$lte": 60}},
    {"FoodItem": 1, "Inventory": 1, "_id": 0}
);
/*IN (multiple OR)
find all food items whose name contains either the 'frog'
or 'bean'*/
use('HarryPotterDB');
db.FoodTrolley.find(
    {"FoodItem": {"$in": [/frog/i, /bean/i]}},
    {"FoodItem": 1, "_id": 0}
);

/*use or instead of in*/
use('HarryPotterDB');
db.FoodTrolley.find(
    {
        "$or": [
            {"FoodItem":/frog/i},
            {"FoodItem":/bean/i}
        ]
    },
    {"FoodItem": 1, "_id": 0}
);
/*find all food items with 10, 20 or 14 items*/
use('HarryPotterDB');
db.FoodTrolley.find(
    {"Inventory": {"$in": [10, 20, 14]}},
    {"FoodItem": 1, "Inventory": 1, "_id": 0}
);
/*find all food items not contain 14 items*/
use('HarryPotterDB');
db.FoodTrolley.find(
    {"Inventory": {"$nin": [14]}},
    {"FoodItem": 1, "Inventory": 1, "_id": 0}
);
/*$exists and null */
/*list all items containing inventory*/
use('HarryPotterDB');
db.FoodTrolley.find(
    {"Inventory": {"$exists": true}},
    {"FoodItem": 1, "Inventory": 1, "_id": 0}
);
/*list all items not containing inventory*/
use('HarryPotterDB');
db.FoodTrolley.find(
    {"Inventory": null},
    {"FoodItem": 1, "inventory":1, "_id": 0}
);

/*$and , $or */
/*list all food trolly items containing the word 'frog'
 where the inventory is between 20 and 60*/
 use('HarryPotterDB');
db.FoodTrolley.find(
    {
        "$and":[{"inventory": {"$gt":20}},
            {"inventory": {"$lt":60}},
            {"FoodItem":/frog/i}
        ]
    },
    {"FoodItem": 1, "Inventory": 1, "_id": 0}
);
/* ARRAY Modifiers
$push
$each
$slice
$sort

/* $each*/
/*push multiple values to an array , on one "$push"operation */
use('blogDB');

db.posts.updateOne(
    {"title": "On Golden Pond"},
    {
        "$push": {
            "related_movies": {
                "$each": [
                    "Terms of Endearment(1983)",
                    "Ordinary People(1980)",
                    "Driving Miss Daisy(1989)"
                ]
            }
        }
    }
);


/* 4.3) $slice
Used with the "$push" operator to ensure that an array field does
 not grow bigger than a certain size. */
use('blogDB');
db.posts.update(
    {"title": "O"},
    {
        "$push": {
            "top2_related_movies": {
                "$each": [
                    "Terms of Endearment(1983)",
                    "Ordinary People(1980)",
                    "Driving Miss Daisy(1989)"
                ], /* comma, after the Square-bracket of "$each" */
                "$slice": -2
            }
        }
    }
);
use('blogDB');
db.posts.find();
/* 4.4) $sort
Can sort an array before pushing more elements to the array. */
db.posts.find(
    {"title": "On Golden Pond"},
    {"top2_related_movies": 1, "_id": 0}
).pretty();


/* Q1. Find all the Documents having 'duplex' in the room name
display only room_name and price of the room
display the prices in discending order */
use('sample_airbnb');
db.listingsAndReviews.aggregate([
  { "$match": { "name": /duplex/i } },
  { "$project": { "name": 1, "price": 1 } },
  { "$sort": { "price": -1 } }
])

/* Q2. How many listings contain the word 
'duplex' in the room name? */
use('sample_airbnb');
db.listingsAndReviews.aggregate([
  { "$match": { "name": /duplex/i } },
  { "$group": { _id: "name", count_of_duplex_rooms: { $sum: 1 } } },
  { "$project": { "name": 1, "count_of_duplex_rooms": 1 } }
])
/*Q3. For all the documents containing 'duplex' in 
the room name,
find the AVG price for such diplex listing*/
use('sample_airbnb');
db.listingsAndReviews.aggregate([
  { "$match": { "name": /duplex/i } },
  { 
    "$group": {
      _id: "name",
      calc_avgPrice: { "$avg": { "$toDouble": "$price" } }
    }
  },
  {
    "$project": {
      _id: 0,
      calc_avgPrice: 1
    }
  }
]);
/*Q4. How many listings have 'property_type' of 'House',
and include 'First aid Kit* as one of the amenities*/
use('sample_airbnb');
db.listingsAndReviews.aggregate([
    {
        "$match": {
          "$and": [
            { "property_type": /house/i },
            { "amenities": /first aid kit/i }
          ]
        }
      },
      {
        "$group": {
          "_id": "property_type",
          "count": { "$sum": 1 }
        }
      },
      {
        "$project": {
          "_id": 0,
          "count": 1
        }
      }
]);

/* Q5. Display all the listings that have 
"free parking on premises", "Air conditioning", and "WiFi"
as part of their amenities, and have at least 2 bedrooms */
use('sample_airbnb');
db.listingsAndReviews.aggregate([
  {
    $match: {
      $and: [
        { "amenities": { $regex: "free parking on premises", $options: "i" } },
        { "amenities": { $regex: "Air conditioning", $options: "i" } },
        { "amenities": { $regex: "wifi", $options: "i" } }
      ],
      "bedrooms": { $gte: 2 }
    }
  }
])

//or:
use('sample_airbnb');
db.listingsAndReviews.aggregate([
    {$match:{
        $and:[
            {"amenities":/free parking on premises/i},
            {"amenities":/Air conditioning/i},
            {"amenities":/WiFi/i}
        ],
        "bedrooms":{$gte: 2}
    }}
])

/*Q6. display the names and the street 
address of all the strings where the 
first amenity it "internet"*/
use('sample_airbnb');
db.listingsAndReviews.find({"amenities.0":/internet/i},
    {"_id":0, "name": 1, "address.street": 1}
)
/*Q7. display the name and accommodation capacity 
of the listing of the 5 
listings with the biggest accommodation.*/
use('sample_airbnb');
db.listingsAndReviews.aggregate(
{"$sort":{"accommodates" : -1}},
{"$limit": 5},
{"$project": {"_id": 0, "name": 1, "accommodates": 1}}
);
/*Q8.display each distinct value of property_type,
stored in ascending alphabetic order*/
use('sample_airbnb');
db.listingsAndReviews.aggregate([
{"$group":{_id:"$property_type"} },
{"$sort": {_id:1}}
]);
/*Q9. how many listings exists of type 'Bungalow'*/
use('sample_airbnb');
db.listingsAndReviews.aggregate(
    [
        {"$match":{"property_type": /bungalow/i}},
        {"$group":{_id: "property_type",
            count_of_bungalow_listings:{$count:{}}
        }}
    ]
);
/*Q10.  which property type has highest avg 
'review_score_rating'?*/
use('sample_airbnb');

db.listingsAndReviews.aggregate([
    {
        $group: {
            _id: "$property_type",
            average_review_score: { $avg: "$review_scores_rating" }
        }
    },
    {
        $sort: {
            average_review_score: -1
        }
    },
    {
        $limit: 1
    }
]);
/*Q11. How many listings have 30 amenities?*/
use('sample_airbnb');
db.listingsAndReviews.aggregate([
{$match: {"amenities": {"$size": 30}}},
{"$group": {_id: "amenities",
    count: {"$count": {}}
}}
]);
/*Q12. "$unwind": display the author and date
for the most recent review for 'Ribeira Charming Duplex'*/
use('sample_airbnb');

db.listingsAndReviews.aggregate([
    {
        $match: {
            name: "Ribeira Charming Duplex"
        }
    },
    {
        $unwind: "$reviews"
    },
    {
        $project: {
            date: "$reviews.date",
            author: "$reviews.reviewer_name"
        }
    },
    {
        $sort: {
            date: -1
        }
    },
    {
        $limit: 1
    }
]);










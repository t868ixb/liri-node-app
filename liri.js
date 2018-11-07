//variables here
require("dotenv").config();
let input = process.argv;
let nodeSpotify = require('node-spotify-api');
let keys = require("./keys.js");
let spotify = new nodeSpotify(keys.spotify);
let request = require("request");
let moment = require("moment");
let fs = require("fs");
//"program" represents which functionality of the program the user is calling (concert, spotify, etc)
let program = input[2];
//"userSearch represents what the user is requesting"
let userSearch = input[3];
//the rusults of what the user asked for
let queryUrl = "http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy";

// Make it so liri.js can take in one of the following commands (programn):
//placed code in function "callCode" to call it for "do-what-it-says"
function callCode() {
if (program === "concert-this") {
    //console.log("What concert buddy?")
    request("https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp", function (error, response, body) {

        //Date of the Event(use moment to format this as "MM/DD/YYYY")
        // let moment = moment("12/25/1995", "MM-DD-YYYY");
        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body);
            for (i = 0; i < body.length; i++)
                console.log("Venue -  " + body[i].venue.name + "\n" + "Location -  " + body[i].venue.city + ", " + body[i].venue.region + "\n" + "Date & Time -  " + body[i].datetime + "\n" + "---------------------------------");

        }
    });

} else if (program === "spotify-this-song") {
    //let callSpotify = function(){ 
    if (userSearch === undefined) {
        console.log("You did not give me search criteria so giving you default...")
        console.log("---------------Limiting to 5---------------");
        liriSelect = '"The Sign" by Ace of Base'
        let liriArtistNames = function (artist) {
            return artist.name;
        };
        spotify
            .search({ type: 'track', query: liriSelect, limit: 5 })
            .then(function (response) {
                let liriSong = response.tracks.items
                for (let i = 0; i < liriSong.length; i++) {
                    // console.log(response.tracks.items);
                    console.log("Artist: " + liriSong[i].artists.map(liriArtistNames));
                    console.log("Song Name: " + liriSong[i].name);
                    console.log("Preview Song: " + liriSong[i].preview_url);
                    console.log("Album: " + liriSong[i].album.name);
                    console.log("\n" + "--------------------------------------");
                }
            });


    } else {
        let getArtistNames = function (artist) {
            return artist.name;
        }

        spotify
            .search({ type: 'track', query: userSearch })
            .then(function (response) {
                let userSong = response.tracks.items
                for (let i = 0; i < userSong.length; i++) {
                    // console.log(response.tracks.items);
                    console.log("Artist: " + userSong[i].artists.map(getArtistNames));
                    console.log("Song Name: " + userSong[i].name);
                    console.log("Preview Song: " + userSong[i].preview_url);
                    console.log("Album: " + userSong[i].album.name);
                    console.log("\n" + "--------------------------------------");
                }
            })

    }
    // }


} else if (program === "movie-this") {
    //console.log("dumb movie buddy")
    //do this if user does not enter a movie
    if (userSearch === undefined) {
        console.log("You did not give me search criteria so giving you default...")
        console.log("--------------------------------------");
        userSearch = "Mr. Nobody"

    };
    request("http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        //console.log(body);
        let rottenTomatoes = JSON.parse(body).Ratings[1];
        if (!error && response.statusCode === 200) {
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Year Released: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[0].Value);
            // {"Source":"Rotten Tomatoes","Value":"90%"}.  this is in the Ratings array and it's index 1.  Index 0 shows x out of xx which I like better.  
            //+ rottenTomatoesRating
            console.log("Country of Production: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("\n" + "--------------------------------------");
        }

    });

} else if (program === "do-what-it-says") {
    console.log("That's right, do it buddy")

    fs.readFile("./random.txt", "utf8", function (error, data) {

        // If errors, log to console.
        if (error) {
            return console.log(error);
        } else {
            
            // split and make array
            let dataArr = data.split(",");
            program = dataArr[0];
            userSearch = dataArr[1];
        
            console.log("Program: " + program);
            console.log("Search Criteria: " + userSearch);
           callCode();
        }
    });
} else {
    console.log("You must select a program for this to work: concert-this, spotify-this-song, movie-this, or do-what-it-says ")
}
};//end of callCode function
callCode();
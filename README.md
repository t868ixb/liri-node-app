# Introduction to liri-node-app
This liri-node-app is utilized via a terminal using node.js.  The application takes user imput and displays information based on the objective and search criteria entered by the user.

# Getting started with liri-node-app

To use liri-node-app, do the following
* Get a spotify id and secret (see "How To" at the ed of this readme)
* Get your own api key from omdbapi (http://www.omdbapi.com)
    ** add your key after the equal sign in "app_id=" in the liri.js file.  
* Get your own rest.bandsintown.com api key, and replace the key in the code with your own
* clone this repo
* In the location of your code, create a directory named .env and add the following (replace "your-spotify-xx" with your own information): 

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# Interacting with the liri-node-app
Enter one of the following commands to interact with liri-node-app

- node liri.js concert-this <a band or an artist>
    * example: node liri.js concert-this "Keller Williamns"
    * example: node liri.js concert-this Cher

- node liri.js spotify-this-song <a song>
    * example: node liri.js spotify-this-song Ophelia
    * example: node liri.js spotify-this-song "Chill In The Air"

- node liri.js  movie-this <a moview>
    * example: node liri.js movie-this Jaws
    * example: node liri.js movie-this "Harry Potter"

- node liri.js  do-what-it-says
    * The above command will run whichever program and search criteria is added to the ramdom.txt file  

# Getting started with liri-node-app

#How To
#Get a Spotify ID and Secret
   Follow these steps in order to generate a **client id** and **client secret**:

   1. Visit <https://developer.spotify.com/my-applications/#!/>

   2. Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

   3. Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

   4. On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).
//All dat node stuff
require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
// var input = '';
// for (var i = 3; i < process.argv.length; i++) {
//     if (input === '') {
//         input = process.argv[3];
//     } else {
//         input = input + ' ' + process.argv[i];
//     }
// }

//The for loop above this does the same thing as what is below this
var input = process.argv.slice(3).join(' ');

// slice(2).join(' ');

function concertThis() {
    // console.log('Concert');
    if (input == '') {
        input = 'Arianna Grande';
    }
    var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function (response) {
            // console.log(response.data);
            if (response.data.length === 0) {
                console.log('No events can be found for this artist! Me sorry!')
            } else {
                for (var i = 0; i < response.data.length; i++) {
                    console.log('===============================')
                    var data = response.data[i];
                    console.log('Venue: ' + data.venue.name);
                    console.log('Location is at ' + data.venue.city + ' ' + data.venue.region + ' ' + data.venue.country);
                    var dateArr = data.datetime.split('T');
                    var ddmmyyArr = dateArr[0].split('-');
                    // console.log(ddmmyyArr);
                    console.log('The event is taking place on ' + ddmmyyArr[1] + '-' + ddmmyyArr[2] + '-' + ddmmyyArr[0]);
                    console.log('===============================')
                    // console.log(dateArr);
                }
            }
        }, function (err) {
            console.log(err.message);
        }
    );
}

function spotifyThis() {
    if (input == '') {
        input = 'The Sign by Ace of Base';
    }
    // console.log('Spotify');
    spotify.search({ limit: 1, type: 'track', query: input }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log('===============================')
        // console.log(JSON.stringify(data, null, 2));
        console.log('Track Name: ' + data.tracks.items[0].name);
        console.log('Artist(s):');
        for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
            console.log(data.tracks.items[0].artists[i].name);
        }
        console.log('Link: ' + data.tracks.items[0].external_urls.spotify);
        console.log('Album: ' + data.tracks.items[0].album.name);
        console.log('===============================')
    });
}

function movieThis() {
    // console.log('Movie');
    if (input == '') {
        input = 'Shutter Island';
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function (response) {
            // console.log(response.data.Ratings);
            console.log('===============================')
            console.log('Title: ' + response.data.Title);
            console.log('Release Year: ' + response.data.Year);
            console.log('IMDB rating: ' + response.data.imdbRating);
            // if ('Source' in response.data.Ratings[1]) {
            //     console.log('It exist!')
            // }
            if (response.data.Ratings && response.data.Ratings[1] && response.data.Ratings[1].Source === 'Rotten Tomatoes') {
                console.log('Rotten Tomatoes rating: ' + response.data.Ratings[1].Value);
            } else {
                console.log('Rotten Tomatoes rating does not exist for some reason. Don\'t ask me why!');
            }
            console.log('Produced in: ' + response.data.Country);
            console.log('Language: ' + response.data.Language);
            console.log('Plot: ' + response.data.Plot);
            console.log('Actors: ' + response.data.Actors);
            console.log('===============================')
        }
    );
}

function doWhatItSays() {
    // console.log('JUST DO IT!');
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(',');
        command = dataArr[0];
        input = dataArr[1];
        switch (command) {
            case 'concert-this':
                concertThis();
                break;
            case 'spotify-this-song':
                spotifyThis();
                break;
            case 'movie-this':
                movieThis();
                break;
            case 'do-what-it-says':
                // doWhatItSays(); //this makes it loop FOREVER!
                console.log('We are looping forever!');
                break;
            default:
                console.log('Invalid input. Accepted inputs are: concert-this <band here>, spotify-this-song <song here>, movie-this <movie here>, or do-what-it-says');
                break;
        }
    })
}

switch (command) {
    case 'concert-this':
        concertThis();
        break;
    case 'spotify-this-song':
        spotifyThis();
        break;
    case 'movie-this':
        movieThis();
        break;
    case 'do-what-it-says':
        doWhatItSays();
        break;
    default:
        console.log('Invalid input. Accepted inputs are: concert-this <band here>, spotify-this-song <song here>, movie-this <movie here>, or do-what-it-says');
        break;
}
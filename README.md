# LIRI

## Overview
Make a node application that takes in specific inputs and pulls information depending on the input and the parameter provided following the input.

Inputs included:
* spotify-this-song
* concert-this
* movie-this
* do-what-it-says

### Spotify-this-song
If the input is **spotify-this-song** then the parameter entered afterwards should be a song title. This should do a request to Spotify and display information in the console about the song found with its Title, Artist(s), Album it is featured in, and a link to the song on Spotify.

### Concert-this
If the input is **concert-this** then the paramter entered afterwards should be an artist name. This should do a request to BandsinTown and display upcoming events with information about the venue, its location, and the date of the event in DD/MM/YYYY format.

### Movie-this
If the input is **movie-this** then the paramter entered afterwards should be a movie title. This should do a request to omdb and display information to the console including the movie's title, plot, year of release, it's imdb and Rotten Tomatoes rating (if it exist), and the actors starred in the movie.

### Do-what-it-says
If the input is **do-what-it-says** then it will go inside the file [random](random.txt) and runs the LIRI function whether is is **concert-this** or **spotify-this-song** or **movie-this** and run the respective function with the paramter provided after the input within the same file.

## Video Example
[Youtube of my working Application!](youtube.com)
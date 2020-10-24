//Game game_query
function game_query(){
    //const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const request = new XMLHttpRequest();
    const twitch_ID = 'm5uh3wi1a7k773wdqjcsfdij61fmgs';
    const access_token = 'Bearer p4w9shm0guevd2sojnf2odmsf5t2k9';
    let igdb_url = proxyurl+ 'https://api.igdb.com/v4/games';

    let data = '';
    document.getElementById('status_').innerHTML = igdb_url;
    // Open a new connection, using the GET request on the URL endpoint
    request.open('POST', igdb_url, true);
    request.setRequestHeader('Client-ID',twitch_ID);
    request.setRequestHeader('Authorization',access_token);

    request.onload = function () {
        // Begin accessing JSON data here
        document.getElementById('status_').innerHTML = "Processing requested json data";
        data = JSON.parse(this.responseText);

        if (request.status >= 200 && request.status < 400) {
            document.getElementById('status_').innerHTML = "Printing results for Games";

            const result = document.getElementById("results");
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            const h1 = document.createElement('h1');
            h1.textContent = "hello";
            result.appendChild(card);
            card.appendChild(h1);

            document.getElementById('status_').innerHTML = "Results for Games are below";
        }
        else{
            document.getElementById('status_').innerHTML = this.responseText;
        }
    }
    // Send request
    console.log("Sending your request for Games");

    const body = "fields*; search: sonic the hedgehog; limit: 50;";
    request.send('fields id, name, release_dates, rating, game_engines, summary, involved_companies, genres;');
}

//Movie Search by user input
function movie_query(search_term){

    var movie_name = search_term;

    const OMDBID = '/?apikey=f08b8211';
    const OMDB_URL = 'http://www.omdbapi.com';
    const OMDB_request_url = OMDB_URL +  OMDBID + '&t=' + movie_name;

    //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var request = new XMLHttpRequest();

    console.log(OMDB_request_url);
    // Open a new connection, using the GET request on the URL endpoint
    //console.log("Formulating your request for Movies");
    document.getElementById('status_').innerHTML = "Current Status: Formulating your request for Movies";

    // const h4 = document.createElement('h4');
    // h4.textContent = "Formulating your request for Movies";
    // stat.appendChild(h4);
    request.open('GET', OMDB_request_url, true);
    request.onload = function () {
        // Begin accessing JSON data here
        document.getElementById('status_').innerHTML ="Current Status: Processing results for Movies";
        var data = JSON.parse(this.responseText);


        const result = document.getElementById("results");
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        const h1 = document.createElement('h1');
        h1.textContent = data.Title;
        result.appendChild(card);
        card.appendChild(h1);

        document.getElementById('status_').innerHTML ="Current Status: Processing results for Movies";
        console.log(data);
    }

    // Send request
    document.getElementById('status_').innerHTML ="Current Status: Results for Movies is below";
    request.send();

    //comic_query(search_term);
    game_query();
}

function comic_query(movie_name){
  //var movie_name = "The Amazing Spider-Man";
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const ComicVineID = '/?api_key=0419a722827efd68e37a229d58ee79d8c914a7a2';
  const ComicVine_URL = 'https://comicvine.gamespot.com/api';
  //const ComicVine_request_url='https://comicvine.gamespot.com/api/issues/?api_key=0419a722827efd68e37a229d58ee79d8c914a7a2&filter=name:The%20Amazing%20Spider-Man&field_list=name,cover_date';
  const ComicVine_request_url = proxyurl + ComicVine_URL + '/issues' + ComicVineID + '&format=json' + '&filter=name:' +movie_name+ '&field_list=name,cover_date,description' + '&sort=cover_date:desc';

  //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var request = new XMLHttpRequest();

  //console.log(ComicVine_request_url);
  // Open a new connection, using the GET request on the URL endpoint
  document.getElementById('status_').innerHTML ="Current Status: Formulating your request for Comics";
  request.open('GET', ComicVine_request_url, true);
  request.onload = function () {
    // Begin accessing JSON data here
    document.getElementById('status_').innerHTML ="Current Status: Processing results for Comics";
    var data = JSON.parse(this.responseText);

    if (request.status >= 200 && request.status < 400) {
      document.getElementById('status_').innerHTML ="Current Status: Printing results for Comics";
      //if(data.results.length!=0){
        for (var i = 0; i < 1; i++) {
          var comic = data.results[i];
          // console.log("\n" + comic.name);
          // console.log(comic.cover_date);
          // console.log(comic.description);
          var textstring = "\n" +comic.name + "\n" + comic.cover_date + "\n";
          const result = document.getElementById("results");
          const card = document.createElement('div');
          card.setAttribute('class', 'card');
          const h1 = document.createElement('h1');
          h1.textContent = textstring;
          result.appendChild(card);
          card.appendChild(h1);
        }
      //}
      // else{
      //   document.getElementById('status_').innerHTML ="Current Status: No results" ;
      // }
      document.getElementById('status_').innerHTML ="Current Status:Results for Comics are below";
    }
    else{
      document.getElementById('status_').innerHTML ="Current Status: We run into an error. Try again.";
    }
  }

  // Send request
  document.getElementById('status_').innerHTML ="Current Status:Sending your request for Comics";
  request.send();
}

const app = document.getElementById('start');
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);
document.getElementById("submit").onclick = function(){
    movie_query(document.getElementById("fname").value);
}

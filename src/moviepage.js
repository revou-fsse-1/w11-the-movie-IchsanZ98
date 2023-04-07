let movieID = localStorage.getItem("movieID");
const USER_API_URL_MOVIEID = `http://localhost:3000/movies/${movieID}`;
const USER_API_URL_WATCHLIST = "http://localhost:3000/watchlist";
const title = document.getElementById("movieTitle");
const synopsis = document.getElementById("movieSynopsis");
const rating = document.getElementById("movieRating");
const trailer = document.getElementById("movieTrailer");
const genre = document.getElementById("movieGenre");
const poster = document.getElementById("moviePoster");
const watchlistButton = document.getElementById("watchlist-button");
const addToWatchListButton = document.getElementById("add-to-watchlist-button");

const showMovieDetail = async () => {
  try {
    const response = await fetch(USER_API_URL_MOVIEID);
    const data = await response.json();

    title.innerHTML = `${data.title}`;
    synopsis.innerHTML = `${data.synopsis}`;
    poster.innerHTML = `
      <img class="object-cover w-full h-full" src="${data.image}" alt="${data.title}">
      `;
    trailer.innerHTML = `<embed class="rounded-[20px] aspect-video w-full h-full" src="${data.trailer}">`;
    rating.innerHTML = `⭐ ${data.rating}/10`;

    for (let i = 0; i < data.genre.length; i++) {
      genre.innerHTML += `
        <span
        class="rounded-full w-24 text-lg text-center font-medium border border-black"
        >${data.genre[i]}</span>
        `;
    }
  } catch (error) {
    console.error(error);
  }
};
showMovieDetail();

const loadToLocalStorage = async () => {
  try {
    const response = await fetch(USER_API_URL_MOVIEID);
    const data = await response.json();
    console.log(data);
    localStorage.setItem("title", `${data.title}`);
    localStorage.setItem("movieImage", `${data.image}`);
    localStorage.setItem("synopsis", `${data.synopsis}`);
    localStorage.setItem("genre", `${data.genre}`);
    localStorage.setItem("movieProduction", `${data.production}`);
    localStorage.setItem("trailer", `${data.trailer}`);
    localStorage.setItem("rating", `${data.rating}`);
    localStorage.setItem("movieYear", `${data.year}`);
  } catch (error) {
    console.error(error);
  }
};
loadToLocalStorage();

const addToWatchlist = async () => {
  try {
    const movieData = {
      id: movieID,
      title: localStorage.getItem("title"),
      image: localStorage.getItem("movieImage"),
      synopsis: localStorage.getItem("synopsis"),
      genre: localStorage.getItem("genre"),
      production: localStorage.getItem("movieProduction"),
      trailer: localStorage.getItem("trailer"),
      rating: localStorage.getItem("rating"),
      year: localStorage.getItem("movieYear"),
    };
    const postMovie = {
      method: "POST",
      body: JSON.stringify(movieData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch(USER_API_URL_WATCHLIST, postMovie);
    const data = await response.json();
    alert("Successfully added to watchlist");
  } catch (error) {
    console.error(error);
  }
};
addToWatchListButton.addEventListener("click", addToWatchlist);

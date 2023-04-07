const USER_API_URL_WATCHLIST = "http://localhost:3000/watchlist";
const USER_API_URL_MOVIE = "http://localhost:3000/movies";
const watchList = document.getElementById("watchlist");
const movieID = localStorage.getItem("movieID");

const title = document.getElementById("movieTitle");
const synopsis = document.getElementById("movieSynopsis");
const rating = document.getElementById("movieRating");
const trailer = document.getElementById("movieTrailer");
const genre = document.getElementById("movieGenre");
const poster = document.getElementById("moviePoster");

const watchlistButton = document.getElementById("watchlist-button");
const addToWatchListButton = document.getElementById("add-to-watchlist-button");

const getMovieById = async () => {
  try {
    const response = await fetch(`${USER_API_URL_MOVIE}/${movieID}`);
    const data = await response.json();

    title.innerHTML = data.title;
    synopsis.innerHTML = data.synopsis;
    poster.innerHTML = `<img class="object-cover w-full h-full" src="${data.image}" alt="${data.title}">`;
    trailer.innerHTML = `<embed class="rounded-[20px] aspect-video w-full h-full" src="${data.trailer}">`;
    rating.innerHTML = `⭐ ${data.rating}/10`;

    data.genre.forEach((g) => {
      const genreSpan = document.createElement("span");
      genreSpan.classList.add(
        "rounded-full",
        "w-24",
        "text-lg",
        "text-center",
        "font-medium",
        "border",
        "border-black"
      );
      genreSpan.innerHTML = g;
      genre.appendChild(genreSpan);
    });
  } catch (error) {
    console.error(error);
  }
};
getMovieById();

const addToWatchlist = async () => {
  try {
    const response = await fetch(`${USER_API_URL_WATCHLIST}/${movieID}`);
    const data = await response.json();

    if (data) {
      alert("This movie is already in your watchlist!");
      return;
    }

    const movie = {
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
      body: JSON.stringify(movie),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    const postResponse = await fetch(USER_API_URL_WATCHLIST, postMovie);
    const postData = await postResponse.json();
    alert("Successfully added to watchlist");
  } catch (error) {
    console.error(error);
  }
};

const goToWatchlist = () => {
  window.location.href = "watchlist.html";
};

watchlistButton.addEventListener("click", goToWatchlist);
addToWatchListButton.addEventListener("click", addToWatchlist);

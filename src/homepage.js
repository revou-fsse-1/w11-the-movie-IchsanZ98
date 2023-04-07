const USER_API_URL_CURRENT_WATCH = "http://localhost:3000/currentWatch/";
const USER_API_URL_IS_SUGGESTED = "http://localhost:3000/isSuggested/";
const USER_API_URL_IS_PREVIOUS = "http://localhost:3000/isPrevious/";

const nowWatching = document.getElementById("currentlyWatching");
const suggestedMovies = document.getElementById("suggestedToWatch");
const previousMovies = document.getElementById("previouslyWatched");
const watchListbutton = document.getElementById("watchlist-button");

const getDataFromAPI = async (currentAPI) => {
  const response = await fetch(currentAPI);
  const data = await response.json();
  return data;
};

const generateMovieHTML = (movie) => {
  return `
    <a class="h-64 w-44 rounded-3xl relative overflow-hidden" href="#">
      <img class="w-full object-cover h-64 rounded-3xl" src="${
        movie.image
      }" alt="${movie}">
      <p class="text-transparent hover:text-black hover:bg-yellow-400/70 text-4xl font-bold absolute top-0 flex justify-center items-center w-full h-full" id="${
        movie.id
      }" onclick="goToMovieDetail(this)">
      ⭐ ${movie.rating * 10}%
      </p>
    </a>
  `;
};

const loadMovies = async (apiUrl, container) => {
  try {
    const data = await getDataFromAPI(apiUrl);
    container.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      container.innerHTML += generateMovieHTML(data[i]);
    }
  } catch (error) {
    console.error(error);
  }
};

loadMovies(USER_API_URL_CURRENT_WATCH, nowWatching);
loadMovies(USER_API_URL_IS_SUGGESTED, suggestedMovies);
loadMovies(USER_API_URL_IS_PREVIOUS, previousMovies);

const goToMovieDetail = (e) => {
  const movieID = e.getAttribute("id");
  localStorage.setItem("movieID", movieID);
  window.location.href = "./moviepage.html";
};

const goToWatchList = () => {
  window.location.href = "./moviepage.html";
};

watchListbutton.addEventListener("click", goToWatchList);

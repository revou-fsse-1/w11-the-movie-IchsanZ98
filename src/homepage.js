const USER_API_URL_CURRENT_WATCH = "http://localhost:3000/currentWatch/";
const USER_API_URL_IS_SUGGESTED = "http://localhost:3000/isSuggested/";
const USER_API_URL_IS_PREVIOUS = "http://localhost:3000/isPrevious/";

const nowWatching = document.getElementById("currentlyWatching");
const suggestedMovies = document.getElementById("suggestedToWatch");
const previousMovies = document.getElementById("previouslyWatched");
const watchListbutton = document.getElementById("watchlist-button");

const loadnowWatching = async () => {
  try {
    const response = await fetch(USER_API_URL_CURRENT_WATCH);
    const data = await response.json();
    nowWatching.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      nowWatching.innerHTML += `
        <a
        class="h-64 w-44 rounded-3xl relative overflow-hidden"
        href="#"
        ><img
          class="w-full object-cover h-64 rounded-3xl"
          src="${data[i].image}"
          alt="${data[i]}"
      />
      <p
      class="text-transparent hover:text-black hover:bg-yellow-400/70 text-4xl font-bold absolute top-0 flex justify-center items-center w-full h-full"
      id ="${data[i].id}"
      onclick="goToMovieDetail(this)"
    >
      ${data[i].rating * 10}%
    </p>
      </a>
        `;
    }
  } catch (error) {
    console.error(error);
  }
};
loadnowWatching();

const loadpreviousMovies = async () => {
  try {
    const response = await fetch(USER_API_URL_IS_PREVIOUS);
    const data = await response.json();
    previousMovies.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      previousMovies.innerHTML += `
        <a
        class="h-64 w-44 rounded-3xl relative overflow-hidden"
        href="#"
        ><img
          class="w-full object-cover h-64 rounded-3xl"
          src="${data[i].image}"
          alt="${data[i]}"
      />
      <p
      class="text-transparent hover:text-black hover:bg-yellow-400/70 text-4xl font-bold absolute top-0 flex justify-center items-center w-full h-full"
      id ="${data[i].id}"
      onclick="goToMovieDetail(this)"
    >
      ${data[i].rating * 10}%
    </p>
      </a>
          `;
    }
  } catch (error) {
    console.error(error);
  }
};
loadpreviousMovies();

const loadsuggestedMovies = async () => {
  try {
    const response = await fetch(USER_API_URL_IS_SUGGESTED);
    const data = await response.json();
    suggestedMovies.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      suggestedMovies.innerHTML += `
        <a
        class="h-64 w-44 rounded-3xl relative overflow-hidden"
        href="#"
        ><img
          class="w-full object-cover h-64 rounded-3xl"
          src="${data[i].image}"
          alt="${data[i]}"
      />
      <p
      class="text-transparent hover:text-black hover:bg-yellow-400/70 text-4xl font-bold absolute top-0 flex justify-center items-center w-full h-full"
      id ="${data[i].id}"
      onclick="goToMovieDetail(this)"
    >
      ${data[i].rating * 10}%
    </p>
      </a>
            `;
    }
  } catch (error) {
    console.error(error);
  }
};
loadsuggestedMovies();

let goToMovieDetail = (e) => {
  const movieID = e.getAttribute("id");
  localStorage.setItem("movieID", `${movieID}`);
  window.location.href = "./moviepage.html";
};

let goToWatchList = () => {
  window.location.href = "./moviepage.html";
};

const USER_API_URL_WATCHLIST = "http://localhost:3000/watchlist";
const watchList = document.getElementById("watchlist");

const getWatchListData = async () => {
  try {
    const response = await fetch(USER_API_URL_WATCHLIST);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const loadWatchList = async () => {
  const data = await getWatchListData();
  watchList.innerHTML = "";
  for (const movie of data) {
    const { id, image, rating } = movie;
    const movieHtml = `
      <a class="h-64 w-44 rounded-3xl relative overflow-hidden" href="#">
        <img class="w-full object-cover h-64 rounded-3xl" src="${image}" alt="${movie}">
        <p class="text-transparent hover:text-black hover:bg-yellow-400/70 text-4xl font-bold absolute top-0 flex justify-center items-center w-full h-full" id="${id}" onclick="goToMovieDetail(this)">⭐ ${
      rating * 10
    }%</p>
      </a>
    `;
    watchList.innerHTML += movieHtml;
  }
};

const goToMovieDetail = (e) => {
  const movieID = e.getAttribute("id");
  localStorage.setItem("movieID", movieID);
  window.location.href = "moviepage.html";
};

loadWatchList();

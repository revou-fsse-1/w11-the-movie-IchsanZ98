const USER_API_URL_WATCHLIST = "http://localhost:3000/watchlist";
const watchList = document.getElementById("watchlist");

const loadWatchList = async () => {
  try {
    const response = await fetch(USER_API_URL_WATCHLIST);
    const data = await response.json();
    console.log(data);
    watchList.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      watchList.innerHTML += `
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
loadWatchList();
let goToMovieDetail = (e) => {
  const movieID = e.getAttribute("id");
  localStorage.setItem("movieID", `${movieID}`);
  window.location.href = "moviepage.html";
};

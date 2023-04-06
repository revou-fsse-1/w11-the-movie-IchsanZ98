const form = document.querySelector("form");
form.addEventListener("submit", loginUser);

function loginUser(e) {
  e.preventDefault();
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const USER_API_URL = "http://localhost:3000/users";
  fetch(USER_API_URL)
    .then((response) => response.json())
    .then((users) => {
      const check = users.find(
        (a) =>
          (a.username === username.value || a.email === username.value) &&
          a.password === password.value
      );
      if (check !== undefined) {
        alert("You're in");
        window.location.href = "homepage.html";
      } else {
        alert("Invalid Email or Password");
      }
    });
}

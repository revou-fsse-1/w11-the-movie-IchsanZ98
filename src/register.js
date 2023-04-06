const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("passwordConfirm");
const btn = document.getElementById("btn");
const USER_API_URL = "http://localhost:3000/users";

const checkUsername = () => {
  const usernameRegex = /^(?=.*[a-zA-Z])\w{6,}$/;
  if (!usernameRegex.test(username.value)) {
    document.getElementById(
      "usernameVal"
    ).innerHTML = `<div id="email-notif-text" class="text-red-500">
    Username must contain at least 6 characters and at least one letter.
    </div>`;
    return false;
  } else {
    document.getElementById("usernameVal").innerHTML = "";
    return true;
  }
};

const checkEmail = () => {
  const emailRegex = /^[\w-\.]{2,16}@([a-zA-Z_\-]{2,}\.)+[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email.value)) {
    document.getElementById(
      "emailVal"
    ).innerHTML = `<div id="email-notif-text" class="text-red-500">
    Invalid Email</div>`;
    return false;
  } else {
    document.getElementById("emailVal").innerHTML = "";
    return true;
  }
};

const checkPassword = () => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password.value)) {
    document.getElementById(
      "passwordVal"
    ).innerHTML = `<div id="email-notif-text" class="text-red-500">
    Must contain at least 8 characters, one uppercase, lowercase, and number!
    </div>`;
    return false;
  } else {
    document.getElementById("passwordVal").innerHTML = "";
    return true;
  }
};

const checkConfirmPassword = () => {
  const passwordConfirmation = document.getElementById("passwordConfirm").value;
  const passwordRegistration = document.getElementById("password").value;
  if (passwordConfirmation !== passwordRegistration) {
    document.getElementById(
      "confirmPasswordVal"
    ).innerHTML = `<div id="email-notif-text" class="text-red-500">
    Password does not match</div>`;
    return false;
  } else {
    document.getElementById("confirmPasswordVal").innerHTML = "";
    return true;
  }
};

const validateForm = (e) => {
  e.preventDefault();
  if (
    !checkUsername() ||
    !checkEmail() ||
    !checkPassword() ||
    !checkConfirmPassword()
  ) {
    alert("Please complete the registration process");
  } else {
    postNewUser();
  }
};

async function postNewUser() {
  try {
    const response = await fetch(USER_API_URL);
    const user = await response.json();
    const userExist = user.some(
      (a) => a.username === username.value || a.email === email.value
    );
    if (userExist) {
      alert("User's or email's already exist!");
      return;
    } else {
      const userData = {
        username: username.value,
        email: email.value,
        password: password.value,
      };
      const postUser = {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      const createUserResponse = await fetch(USER_API_URL, postUser);
      const newUser = await createUserResponse.json();
      console.log(newUser);
      if (!createUserResponse.ok) {
        throw new Error("Failed to create user");
      }
      window.location.href = "index.html";
    }
  } catch (error) {
    console.error(error);
  }
}

username.addEventListener("input", checkUsername);
email.addEventListener("input", checkEmail);
password.addEventListener("input", checkPassword);
passwordConfirm.addEventListener("input", checkConfirmPassword);
btn.addEventListener("click", validateForm);

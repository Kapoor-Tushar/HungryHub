const usernameSignin = document.querySelector(".username-signin");

if (usernameSignin) {
  usernameSignin.addEventListener("mouseover", function () {
    document
      .querySelector(".username-signin-container")
      .classList.remove("hidden");
  });
  usernameSignin.addEventListener("mouseout", function () {
    document
      .querySelector(".username-signin-container")
      .classList.add("hidden");
  });
}

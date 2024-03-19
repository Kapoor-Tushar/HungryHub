const form = document.querySelector(".signup-form");

const signup = async function (name, email, password, confirmPassword) {
  try {
    console.log(name, email, password, confirmPassword);
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data: {
        name,
        email,
        password,
        passwordConfirm: confirmPassword,
      },
    });
    if (res.data.status === "success") {
      document.querySelector(".overlay").classList.remove("hidden");
      window.setTimeout(function () {
        location.assign("/");
      }, 500);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.querySelector(".name-input").value;
  const email = document.querySelector(".email-input").value;
  const password = document.querySelector(".password-input").value;
  const confirmPassword = document.querySelector(
    ".password-confirm-input"
  ).value;
  signup(name, email, password, confirmPassword);
});

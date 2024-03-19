const form = document.querySelector(".login-form");

const login = async function (email, password) {
  try {
    // We are using axios library for sending request to the server
    // This will help us to send the login request to our desired path.
    //   This res variable will give us promise which will contain jwt token
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        email: email,
        password: password,
      },
    });
    if (res.data.status === "success") {
      // alert("Logged in successfully");
      document.querySelector(".overlay").classList.remove("hidden");
      window.setTimeout(function () {
        location.assign("/");
      }, 500);
    }
    // console.log(res);
  } catch (err) {
    alert(err.response.data.message);
  }
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.querySelector(".email-input").value;
  const password = document.querySelector(".password-input").value;
  login(email, password);
});

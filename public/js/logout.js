const logoutBtn = document.querySelector(".log-out");
// Implementing logout functionality
const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
    });
    // console.log(res);
    if (res.data.status === "success") {
      //   alert("You are now Logged out of your account");
      document
        .querySelector(".logout-overlay")
        .classList.remove("logout-hidden");
      if (window.location.href.split("/")[3] === "profile") {
        window.setTimeout(function () {
          location.assign("/");
        }, 500);
      } else {
        window.setTimeout(function () {
          location.reload(true);
        }, 500);
      }
    }
  } catch (err) {
    // alert(err.response.data.message);
    console.log(err);
  }
};
if (logoutBtn != null) {
  logoutBtn.addEventListener("click", function () {
    // console.log();
    logout();
  });
}

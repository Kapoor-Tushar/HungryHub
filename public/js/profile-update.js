const form = document.querySelector(".update-form");

const updateForm = async function (name, email) {
  try {
    let data;
    if (name == "" && email != "") {
      data = { email: email };
    } else if (name != "" && email == "") {
      data = { name: name };
    } else if (name != "" && email != "") {
      data = { name: name, email: email };
    } else {
      throw "Enter atleast one field to update your data.";
    }
    const res = await axios({
      method: "PATCH",
      url: "/api/v1/users/updateMe",
      data: data,
    });
    if (res.data.status === "success") {
      // alert("Logged in successfully");
      document.querySelector(".overlay").classList.remove("hidden");
      window.setTimeout(function () {
        location.reload();
      }, 500);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.querySelector(".update-profile-name-input").value;
  const email = document.querySelector(".update-profile-email-input").value;
  // console.log(name, email);
  updateForm(name, email);
});

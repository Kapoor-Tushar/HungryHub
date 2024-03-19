const question1 = document.querySelector(".question-1");
const question2 = document.querySelector(".question-2");
const question3 = document.querySelector(".question-3");
const question4 = document.querySelector(".question-4");
const question5 = document.querySelector(".question-5");
const ans1 = document.querySelector(".ans-1");
const ans2 = document.querySelector(".ans-2");
const ans3 = document.querySelector(".ans-3");
const ans4 = document.querySelector(".ans-4");
const ans5 = document.querySelector(".ans-5");
const legalQuestion1 = document.querySelector(".legal-question-1");
const legalAns1 = document.querySelector(".legal-ans-1");
const legalQuestion2 = document.querySelector(".legal-question-2");
const legalAns2 = document.querySelector(".legal-ans-2");
const partnerOnboardlingContainer = document.querySelector(
  ".partner-onboarding-conatiner"
);
const legalContainer = document.querySelector(".legal-container");
const partnerOnboardingLink = document.querySelector(
  ".partner-onboarding-link"
);
const legalLink = document.querySelector(".legal-link");
// const questionClick = function () {};
question1.addEventListener("click", function () {
  if (ans1.classList.contains("hidden")) {
    ans1.classList.remove("hidden");
    document.querySelector(".up-arrow1").classList.remove("hidden");
    document.querySelector(".down-arrow1").classList.add("hidden");
  } else {
    ans1.classList.add("hidden");
    document.querySelector(".up-arrow1").classList.add("hidden");
    document.querySelector(".down-arrow1").classList.remove("hidden");
  }
});
question2.addEventListener("click", function () {
  if (ans2.classList.contains("hidden")) {
    ans2.classList.remove("hidden");
    document.querySelector(".up-arrow2").classList.remove("hidden");
    document.querySelector(".down-arrow2").classList.add("hidden");
  } else {
    ans2.classList.add("hidden");
    document.querySelector(".up-arrow2").classList.add("hidden");
    document.querySelector(".down-arrow2").classList.remove("hidden");
  }
});
question3.addEventListener("click", function () {
  if (ans3.classList.contains("hidden")) {
    ans3.classList.remove("hidden");
    document.querySelector(".up-arrow3").classList.remove("hidden");
    document.querySelector(".down-arrow3").classList.add("hidden");
  } else {
    ans3.classList.add("hidden");
    document.querySelector(".up-arrow3").classList.add("hidden");
    document.querySelector(".down-arrow3").classList.remove("hidden");
  }
});
question4.addEventListener("click", function () {
  if (ans4.classList.contains("hidden")) {
    ans4.classList.remove("hidden");
    document.querySelector(".up-arrow4").classList.remove("hidden");
    document.querySelector(".down-arrow4").classList.add("hidden");
  } else {
    ans4.classList.add("hidden");
    document.querySelector(".up-arrow4").classList.add("hidden");
    document.querySelector(".down-arrow4").classList.remove("hidden");
  }
});
question5.addEventListener("click", function () {
  if (ans5.classList.contains("hidden")) {
    ans5.classList.remove("hidden");
    document.querySelector(".up-arrow5").classList.remove("hidden");
    document.querySelector(".down-arrow5").classList.add("hidden");
  } else {
    ans5.classList.add("hidden");
    document.querySelector(".up-arrow5").classList.add("hidden");
    document.querySelector(".down-arrow5").classList.remove("hidden");
  }
});

legalQuestion1.addEventListener("click", function () {
  if (legalAns1.classList.contains("hidden")) {
    legalAns1.classList.remove("hidden");
    document.querySelector(".legal-up-arrow1").classList.remove("hidden");
    document.querySelector(".legal-down-arrow1").classList.add("hidden");
  } else {
    legalAns1.classList.add("hidden");
    document.querySelector(".legal-up-arrow1").classList.add("hidden");
    document.querySelector(".legal-down-arrow1").classList.remove("hidden");
  }
});
legalQuestion2.addEventListener("click", function () {
  if (legalAns2.classList.contains("hidden")) {
    legalAns2.classList.remove("hidden");
    document.querySelector(".legal-up-arrow2").classList.remove("hidden");
    document.querySelector(".legal-down-arrow2").classList.add("hidden");
  } else {
    legalAns2.classList.add("hidden");
    document.querySelector(".legal-up-arrow2").classList.add("hidden");
    document.querySelector(".legal-down-arrow2").classList.remove("hidden");
  }
});

partnerOnboardingLink.addEventListener("click", function () {
  legalContainer.classList.remove("hidden");
  partnerOnboardlingContainer.classList.remove("hidden");
});
legalLink.addEventListener("click", function () {
  partnerOnboardlingContainer.classList.add("hidden");
  legalContainer.classList.remove("hidden");
});

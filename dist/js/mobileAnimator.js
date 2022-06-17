const signUpMobileAnimator = document.querySelector("#signup-mobile-animator");
const sectionSignIn = document.querySelector("#section-signIn");

signUpMobileAnimator.addEventListener("click", () => {
  sectionSignIn.style.cssText = `
    transform: translateY(-100%);
    transition: ease-in-out 0.7s;
    z-index: 5;
    `;
});

const signInMobileAnimator = document.querySelector("#signin-mobile-animator");

signInMobileAnimator.addEventListener("click", () => {
  sectionSignIn.style.cssText = `
    transform: translateY(100%);
    transition: ease-in-out 1s;
    z-index: 5;
    `;
});

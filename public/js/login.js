app.init = function () {
  app.cart.init();
  app.memberInit();
  app.nativeloginClickHandler();
  app.fbloginClickHandler();
};
window.addEventListener("DOMContentLoaded", app.init);

app.nativeSignIn = function () {
  // e.preventDefault();
  console.log("click test1");
  let email = document.getElementById("login__email").value;
  let password = document.getElementById("login__pw").value;

  let requestBody = {
    provider: "native",
    email: email,
    password: password,
  };

  app.ajax(
    "post",
    app.cst.API_HOST + "/user/signin",
    requestBody,
    {},
    (req) => {
      console.log("click test2");

      let res = JSON.parse(req.responseText);
      if (res.data) {
        console.log(req.responseText);
        alert("歡迎回來 !");
        let accessToken = res.data.access_token;
        // let userID = res.data.access_token;

        localStorage.setItem("accessToken", accessToken);
        window.location = "./profile.html";
      } else {
        alert("您輸入的帳密有誤，請再試一次");
      }
    }
  );
};

app.fbloginClickHandler = function () {
  app.get("#signIn_fb1").addEventListener("click", app.fb.login);
  app.get("#signIn_fb2").addEventListener("click", app.fb.login);
};

app.nativeloginClickHandler = function () {
  app.get("#signIn_native").addEventListener("click", app.nativeSignIn);
};

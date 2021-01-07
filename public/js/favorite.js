app.init = function () {
  app.cart.init();
  app.memberInit();
  app.checkFavourite();

  app.favClickHandler();
};
window.addEventListener("DOMContentLoaded", app.init);

// Check is product
app.checkFavourite = function () {
  let params = new URLSearchParams(document.location.search.substring(1));
  let new__productID = params.get("id");
  console.log("ID: " + new__productID);
  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
      let data = JSON.parse(this.responseText);
      console.log(data);
      if (data.data === true) {
        //In Fav
        app.get("#product-add-fav-btn").style.backgroundColor =
          "lightsteelblue";
        app.get("#product-add-fav-btn").style.color = "darkslategray";

        app.get("#product-add-fav-btn").innerHTML = "已收藏 ❤";
      }
    }
  });

  xhr.open("GET", "https://weimazon.online/api/1.0/products/myfavoritecheck");
  xhr.setRequestHeader("id", new__productID);
  xhr.setRequestHeader("Authorization", app.state.auth.accessToken);

  xhr.send();
};

// Fav button click
app.favClick = function () {
  if (
    app.state.auth.accessToken === "" ||
    app.state.auth.accessToken === null
  ) {
    alert("Please login first");
    window.location = "./login.html";
  } else {
    if (
      app.get("#product-add-fav-btn").style.backgroundColor === "lightsteelblue"
    ) {
      app.get("#product-add-fav-btn").style.backgroundColor = "#fddcd7";
      app.get("#product-add-fav-btn").style.color = "navy";

      app.get("#product-add-fav-btn").innerHTML = "加入收藏 ♡(ˆ⌣ˆԅ)";
    } else {
      app.get("#product-add-fav-btn").style.backgroundColor = "lightsteelblue";
      app.get("#product-add-fav-btn").style.color = "darkslategray";

      app.get("#product-add-fav-btn").innerHTML = "已收藏 ❤";
    }
    let new__productID = app.get("#product-id").textContent;
    console.log(new__productID);

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
        console.log("fav POST");
      }
    });

    xhr.open(
      "POST",
      "https://weimazon.online/api/1.0/products/createmyfavorite/"
    );
    xhr.setRequestHeader("id", new__productID);
    xhr.setRequestHeader("Authorization", app.state.auth.accessToken);
    xhr.send();
  }
};

app.favClickHandler = function () {
  app.get("#product-add-fav-btn").addEventListener("click", app.favClick);
};

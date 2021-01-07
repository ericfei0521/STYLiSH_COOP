app.state.recommend = [];

app.getThreeProducts = function () {
  app.ajax("get", app.cst.API_HOST + "/products/all", {}, {}, function (req) {
    let result = JSON.parse(req.responseText);
    if (result.error) {
      alert("產品清單取得失敗，請再試一次：" + result.error);
    } else {
      // console.log(result);

      //隨機抽取 3 筆 product data
      for (let i = 0; i < 3; i++) {
        let index = Math.floor(Math.random() * result.data.length);
        // console.log(index);
        app.state.recommend[i] = result.data[index];
        result.data.splice(index, 1); // 選過的元素從原陣列刪除以免重複
      }
      // console.log(app.state.recommend);
      app.showThreeProducts();
    }
  });
};

app.showThreeProducts = function () {
  // console.log(app.state.recommend);
  const data = app.state.recommend;
  const url = "https://weimazon.online/product.html?id=";
  let products = app.getAll(".recommend > .product");
  // console.log(products);
  for (let i = 0; i < products.length; i++) {
    products[i].href = `${url}${data[i].id}`;
    let photo = app.getAll(".recommend > .product > .photo")[i];
    let img = app.createElement(
      "img",
      { atrs: { src: data[i].main_image } },
      photo
    );
    let colors = app.getAll(".recommend > .product > .colors")[i];
    for (let j = 0; j < data[i].colors.length; j++) {
      let color = app.createElement(
        "div",
        {
          atrs: { className: "color" },
          stys: { "background-color": `#${data[i].colors[j].code}` },
        },
        colors
      );
    }
    let name = app.getAll(".recommend > .product > .name")[i];
    app.modifyElement(name, { atrs: { textContent: data[i].title } });
    let price = app.getAll(".recommend > .product > .price")[i];
    app.modifyElement(price, { atrs: { textContent: `TWD.${data[i].price}` } });
  }
};

app.getThreeProducts();

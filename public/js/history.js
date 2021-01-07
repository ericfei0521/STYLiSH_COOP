app.state.auth = {
  accessToken: window.localStorage.getItem(
    "accessToken"
    // 'EAAJ9Lv4JLxEBAHeBqOZB9AzUr7ZA7F8fuaiuuSR98RzWhUBcvMFRZA8EpdhetEwZCmnVtXQFyh6D4xd4kc6urunO0UpbRKCnGvwyZC0jKTj6nrcTaGwOcmJtQ7D3viXiNdL5QOASzvkiZCmrrVjGVce3Ks6Tz3oK9yZB7F3GIZCutvCo5vvgZAIjZB',
    // "7b2dfc63af604278a796c946ee3f8f2ddafbf82669f0b8cee620849500fe1690"
  ),
};
app.state.history = null;
app.state.pendingOrder = null;
app.state.doneOrder = null;
app.state.status = null;

app.init = function () {
  app.cart.init();
  app.memberInit();
};

app.getHistory = function () {
  let headers = {};
  if (app.state.auth !== null) {
    headers["Authorization"] = `Bearer ${app.state.auth.accessToken}`;
  }
  app.showLoading();
  app.ajax("get", app.cst.API_HOST + "/order/history", {}, headers, function (
    req
  ) {
    app.closeLoading();
    let result = JSON.parse(req.responseText);
    if (result.error) {
      alert("取得歷史訂單紀錄失敗，請再試一次：" + result.error);
    } else {
      app.state.history = result.data;
      console.log(app.state.history);
      app.handleHistory();
    }
  });

  // test data
  // app.state.history = [
  //   {
  //     date: 1591250610320,
  //     status: 0,
  //     record: {
  //       trackStatus: "1",
  //       description: "已出貨",
  //       time: [1591250610320, 1591250610320],
  //     },
  //     name: "test1",
  //     address: " address1",
  //     total: 3789,
  //     number: "000001",
  //     items: [
  //       {
  //         product: "小洋裝",
  //         price: 880,
  //         size: "S",
  //         color: { code: "DDFFFF", name: "綠色" },
  //         qty: 1,
  //       },
  //       {
  //         product: "前開衩扭結洋裝",
  //         price: 1000,
  //         size: "S",
  //         color: { code: "FFDDFF", name: "黃色" },
  //         qty: 1,
  //       },
  //     ],
  //   },
  //   {
  //     date: 1591250610326,
  //     status: 1,
  //     record: {
  //       trackStatus: "3",
  //       description: "已送達",
  //       time: [1591250610320, 1591250610355, 1591250610387, 15912506103],
  //     },
  //     name: "test2",
  //     address: " address2",
  //     total: 1123,
  //     number: "000002",
  //     items: [
  //       {
  //         product: "西裝外套",
  //         price: 1600,
  //         size: "S",
  //         color: { code: "FFFFFF", name: "白色" },
  //         qty: 1,
  //       },
  //       {
  //         product: "前開衩扭結洋裝",
  //         price: 1000,
  //         size: "M",
  //         color: { code: "FFDDFF", name: "黃色" },
  //         qty: 1,
  //       },
  //     ],
  //   },
  //   {
  //     date: 1591250610326,
  //     status: 0,
  //     record: {
  //       trackStatus: "2",
  //       description: "已配送",
  //       time: [1591250610100, 1591250610355, 1591250610666],
  //     },
  //     name: "test3",
  //     address: " address3",
  //     total: 4567,
  //     number: "000003",
  //     items: [
  //       {
  //         product: "牛仔褲",
  //         price: 1800,
  //         size: "S",
  //         color: { code: "FFFFFF", name: "白色" },
  //         qty: 1,
  //       },
  //       {
  //         product: "前開衩扭結洋裝",
  //         price: 1000,
  //         size: "S",
  //         color: { code: "FFFFFF", name: "白色" },
  //         qty: 1,
  //       },
  //     ],
  //   },
  // ];
  // app.handleHistory();
};

app.handleHistory = function () {
  // nothing in order record
  if (app.state.history.length === 0) {
    let order = app.get(".orders");
    order.innerHTML = "";
    let blankList = app.createElement(
      "div",
      { atrs: { className: "blank" } },
      order
    );
    app.createElement(
      "div",
      {
        atrs: {
          className: "message",
          innerHTML: "目前沒有你的購買紀錄喔！<br/>回去逛逛買起來！",
        },
      },
      blankList
    );
    let imgContainer = app.createElement(
      "a",
      { atrs: { className: "buyContainer", href: "./index.html" } },
      blankList
    );
    app.createElement(
      "img",
      { atrs: { className: "buy", src: "./imgs/icon-buy.svg" } },
      imgContainer
    );
    return;
  } else {
    // turn milliseconds to yyyy-mm-dd
    for (let i = 0; i < app.state.history.length; i++) {
      let ms = app.state.history[i].date;
      // console.log(ms);
      let orderTime = new Date();
      orderTime.setTime(ms);
      let year = orderTime.getFullYear();
      let month = orderTime.getMonth() + 1;
      month = app.checkNumber(month);
      let date = orderTime.getDate();
      date = app.checkNumber(date);
      app.state.history[i].date = `${year}-${month}-${date}`;
      // console.log(app.state.history[i]);
    }
  }

  // order type: pending | done
  app.state.pendingOrder = app.state.history.filter((order) => {
    return order.status === 0;
  });
  app.state.doneOrder = app.state.history.filter((order) => {
    return order.status === 1;
  });
  app.state.status = "pending";
  app.showOrderDate(app.state.pendingOrder);
};

// let 1 turn into 01
app.checkNumber = function (number) {
  if (number < 10) {
    number = `0${number.toString()}`;
  }
  return number;
};

app.setEventHandlers(app.get(".done"), {
  click: function () {
    app.state.status = "done";
    app.showOrderDate(app.state.doneOrder);
    app.modifyElement(app.get(".done"), {
      atrs: { className: "done current" },
    });
    app.modifyElement(app.get(".pending"), {
      atrs: { className: "pending" },
    });
  },
});

app.setEventHandlers(app.get(".pending"), {
  click: function () {
    app.state.status = "pending";
    app.showOrderDate(app.state.pendingOrder);
    app.modifyElement(app.get(".pending"), {
      atrs: { className: "pending current" },
    });
    app.modifyElement(app.get(".done"), { atrs: { className: "done" } });
  },
});

app.showOrderDate = function (data) {
  console.log(data);
  const list = app.get(".list");
  list.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    let row = app.createElement("div", { atrs: { className: "row" } }, list);
    let titleDate = app.createElement(
      "div",
      { atrs: { className: "title-date" } },
      row
    );
    let calendar = app.createElement(
      "img",
      { atrs: { className: "calendar", src: "./imgs/icon-calendar.svg" } },
      titleDate
    );
    let date = app.createElement(
      "div",
      { atrs: { className: "date" } },
      titleDate
    );
    date.textContent = data[i].date;
    let downArrow = app.createElement(
      "img",
      {
        atrs: {
          src: "./imgs/caret-down-solid.svg",
          className: "down",
          id: `arrow-${i}`,
        },
        evts: { click: app.toggleDetail },
      },
      titleDate
    );
    let info = app.createElement(
      "div",
      {
        atrs: { className: "info", id: `info-${i}` },
        stys: { display: "none" },
      },
      row
    );
  }
};

app.toggleDetail = function (e) {
  // console.log(e.currentTarget.id);
  const index = parseInt(e.currentTarget.id.slice(6));
  const info = app.get(`#info-${index}`);
  if (info.style.display === "none") {
    app.showOrderDetails(index);
    app.setStyles(info, {
      display: "block",
      animation: "slide-down 0.8s ease",
      // "-webkit-animation": "slide-down 0.6s ease-in-out",
      // "-moz-animation": "slide-down 0.6s ease-in-out",
    });
  } else {
    app.setStyles(info, {
      display: "none",
      animation: "slide-up 0.8s ease",
      // "-webkit-animation": "slide-up 0.3s ease-out",
      // "-moz-animation": "slide-up 0.3s ease-out",
    });
    info.innerHTML = "";
  }
};

app.handleTrackingTime = function (orderList, i) {
  // console.log(app.state.status);
  // console.log(orderList);

  let ms = orderList.record.time[i];
  if (ms === undefined) {
    return "";
  } else {
    // console.log(ms);
    let orderTime = new Date();
    orderTime.setTime(ms);
    let year = orderTime.getFullYear();
    let month = orderTime.getMonth() + 1;
    month = app.checkNumber(month);
    let date = orderTime.getDate();
    date = app.checkNumber(date);
    let hour = orderTime.getHours();
    hour = app.checkNumber(hour);
    let min = orderTime.getMinutes();
    min = app.checkNumber(min);
    return `${year}-${month}-${date}<br/>${hour}:${min}`;
  }
};

app.showOrderDetails = function (index) {
  const info = app.get(`#info-${index}`);
  info.innerHTML = "";

  // console.log(app.state.status);
  let orderList;
  if (app.state.status === "pending") {
    console.log("pending");
    orderList = app.state.pendingOrder[index];
  } else {
    console.log("done");
    orderList = app.state.doneOrder[index];
  }

  let basic = app.createElement("div", { atrs: { className: "basic" } }, info);
  let infoBasic = app.createElement(
    "div",
    { atrs: { className: "info-basic" } },
    basic
  );
  let numbersContainer = app.createElement(
    "div",
    { atrs: { className: "info-numbers" } },
    infoBasic
  );
  let numbersTitle = app.createElement(
    "div",
    { atrs: { className: "title", textContent: "訂單編號" } },
    numbersContainer
  );
  let nameContainer = app.createElement(
    "div",
    { atrs: { className: "info-name" } },
    infoBasic
  );
  let nameTitle = app.createElement(
    "div",
    { atrs: { className: "title", textContent: "收件人" } },
    nameContainer
  );
  let addressContainer = app.createElement(
    "div",
    { atrs: { className: "info-address" } },
    infoBasic
  );
  let addressTitle = app.createElement(
    "div",
    { atrs: { className: "title", textContent: "收件地址" } },
    addressContainer
  );
  let totalContainer = app.createElement(
    "div",
    { atrs: { className: "info-total" } },
    infoBasic
  );
  let totalTitle = app.createElement(
    "div",
    { atrs: { className: "title", textContent: "總金額" } },
    totalContainer
  );

  // set up tracking block
  let infoStatus = app.createElement(
    "div",
    { atrs: { className: "info-status", id: `info-status${index}` } },
    basic
  );
  let statusContainer = [];
  let statusTime = [];
  let circleContainer = [];
  let circle = [];
  let iconContainer = [];
  let description = [];

  for (let i = 0; i < 4; i++) {
    statusContainer[i] = app.createElement(
      "div",
      { atrs: { className: "status" } },
      infoStatus
    );
    statusTime[i] = app.createElement(
      "div",
      {
        atrs: {
          className: "status-time",
          innerHTML: app.handleTrackingTime(orderList, i),
        },
      },
      statusContainer[i]
    );
    circleContainer[i] = app.createElement(
      "div",
      { atrs: { className: "container" } },
      statusContainer[i]
    );
    circle[i] = app.createElement(
      "div",
      { atrs: { className: "circle" } },
      circleContainer[i]
    );

    iconContainer[i] = app.createElement(
      "div",
      { atrs: { className: "status-icon" } },
      statusContainer[i]
    );
  }
  app.createElement(
    "img",
    { atrs: { src: "./imgs/icon-storage.svg" } },
    iconContainer[0]
  );
  app.createElement(
    "img",
    { atrs: { src: "./imgs/icon-list.svg" } },
    iconContainer[1]
  );
  app.createElement(
    "img",
    { atrs: { src: "./imgs/icon-shipped.svg" } },
    iconContainer[2]
  );
  app.createElement(
    "img",
    { atrs: { src: "./imgs/icon-shipping.svg" } },
    iconContainer[3]
  );

  description[0] = app.createElement(
    "div",
    { atrs: { className: "status-description", textContent: "備貨中" } },
    statusContainer[0]
  );
  description[1] = app.createElement(
    "div",
    { atrs: { className: "status-description", textContent: "已出貨" } },
    statusContainer[1]
  );
  description[2] = app.createElement(
    "div",
    { atrs: { className: "status-description", textContent: "已配送" } },
    statusContainer[2]
  );
  description[3] = app.createElement(
    "div",
    { atrs: { className: "status-description", textContent: "已送達" } },
    statusContainer[3]
  );

  // add class "current"
  for (let i = 0; i < 4; i++) {
    if (i === parseInt(orderList.record.trackStatus)) {
      circle[i].classList.add("current");
      description[i].classList.add("des-current");
      iconContainer[i].classList.add("icon-current");
    }
  }

  // set up order title
  let topic = app.createElement(
    "div",
    { atrs: { className: "topic", textContent: "訂單詳情" } },
    info
  );
  let detailContainer = app.createElement(
    "div",
    { atrs: { className: "detail" } },
    info
  );
  let detailTitle = app.createElement(
    "div",
    { atrs: { className: "detail-title" } },
    detailContainer
  );
  let productTitle = app.createElement(
    "div",
    { atrs: { className: "title", textContent: "購買品項" } },
    detailTitle
  );
  let colorTitle = app.createElement(
    "div",
    { atrs: { className: "title", textContent: "顏色" } },
    detailTitle
  );
  let sizeTitle = app.createElement(
    "div",
    { atrs: { className: "title", textContent: "尺寸" } },
    detailTitle
  );
  let priceTitle = app.createElement(
    "div",
    { atrs: { className: "title", textContent: "單價" } },
    detailTitle
  );
  let qtyTitle = app.createElement(
    "div",
    { atrs: { className: "title", textContent: "數量" } },
    detailTitle
  );

  // set up order details

  let numbers = app.createElement(
    "div",
    {
      atrs: {
        className: "numbers",
        textContent: orderList.number,
      },
    },
    numbersContainer
  );
  let name = app.createElement(
    "div",
    {
      atrs: {
        className: "name",
        textContent: orderList.name,
      },
    },
    nameContainer
  );
  let address = app.createElement(
    "div",
    {
      atrs: {
        className: "address",
        textContent: orderList.address,
      },
    },
    addressContainer
  );
  let total = app.createElement(
    "div",
    {
      atrs: {
        className: "total",
        textContent: orderList.total,
      },
    },
    totalContainer
  );

  // items
  console.log(orderList.items);
  for (let i = 0; i < orderList.items.length; i++) {
    let detailContent = app.createElement(
      "div",
      {
        atrs: { className: "detail-content" },
      },
      detailContainer
    );
    let product = app.createElement(
      "div",
      {
        atrs: { className: "product", textContent: orderList.items[i].product },
      },
      detailContent
    );
    let color = app.createElement(
      "div",
      {
        atrs: { className: "color" },
        stys: { "background-color": `#${orderList.items[i].color.code}` },
      },
      detailContent
    );
    let size = app.createElement(
      "div",
      {
        atrs: { className: "size", textContent: orderList.items[i].size },
      },
      detailContent
    );
    let price = app.createElement(
      "div",
      {
        atrs: { className: "price", textContent: orderList.items[i].price },
      },
      detailContent
    );
    let qty = app.createElement(
      "div",
      {
        atrs: { className: "qty", textContent: orderList.items[i].qty },
      },
      detailContent
    );
  }
};

window.addEventListener("DOMContentLoaded", app.init);
app.getHistory();

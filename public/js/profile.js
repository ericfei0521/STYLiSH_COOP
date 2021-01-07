let costumerID = app.get('#costumerID')
let costumerName = app.get('#costumerName')
let costumerEmail = app.get('#costumeremail')
let costumerimg = app.get('#profile-picture')
let favrender = app.get('.favo-list')

function init() {
  app.cart.init()
  app.memberInit()
  app.setlogoutButton()
  app.fb.nativeProfileCallback = app.getProfile
  app.fb.statusChangeCallback = app.getProfile
  console.log(app.state.auth.accessToken)
  let accessToken = app.state.auth.accessToken
  if (accessToken == null) {
    return
  } else {
    let headers = {}
    headers['Authorization'] = `Bearer ${accessToken}`
    function check(req) {
      let data = JSON.parse(req.responseText)
      window.sessionStorage.setItem('userID', data.data.id)
      costumerID.innerHTML = data.data.id
      costumerName.innerHTML = data.data.name
      costumerEmail.innerHTML = data.data.email
      if (data.data.picture === null) {
        costumerimg.src = './imgs/member_peach.jpg'
      } else {
        costumerimg.src = data.data.picture
      }
    }
    app.ajax('get', app.cst.API_HOST + '/user/profile', '', headers, check)

    let productHeader = {}
    productHeader['Authorization'] = `Bearer ${accessToken}`
    function renderfav(req) {
      let product = JSON.parse(req.responseText).data
      console.log(product)
      for (let i = 0; i < product.length; i++) {
        let favoitem = document.createElement('div')
        favoitem.className = 'favo-item'
        let favoimg = document.createElement('div')
        favoimg.className = 'favo-img'
        favoimg.style.backgroundImage = `url(${product[i].main_image})`
        favoitem.appendChild(favoimg)
        let favotitle = document.createElement('div')
        favotitle.className = 'favo-title'
        favotitle.textContent = product[i].title
        favoitem.appendChild(favotitle)
        let favoid = document.createElement('div')
        favoid.className = 'favo-id'
        favoid.textContent = product[i].id
        favoitem.appendChild(favoid)
        let favopric = document.createElement('div')
        favopric.className = 'favo-price'
        favopric.textContent = 'NT.' + product[i].price
        favoitem.appendChild(favopric)
        favrender.appendChild(favoitem)
      }
    }
    app.ajax('get', app.cst.API_HOST + '/user/profile/myfavorite', '', productHeader, renderfav)
  }
}

app.initProfile = function () {
  if (app.state.auth === null) {
    window.location = './'
  }
  app.fb
    .getProfile()
    .then(function (data) {
      app.showProfile(data)
    })
    .catch(function (error) {
      console.log('Facebook Error', error)
    })
}

app.showProfile = function (data) {
  app.get('#profile-picture').src = 'https://graph.facebook.com/' + data.id + '/picture/?width=200'
  let details = app.get('#profile-details')
  app.createElement(
    'div',
    {
      atrs: {
        className: 'name',
        textContent: data.name,
      },
    },
    details
  )
  app.createElement(
    'div',
    {
      atrs: {
        className: 'email',
        textContent: data.email,
      },
    },
    details
  )
}

// function logoutAJAX() {
//   localStorage.setItem("accessToken", "");
//   FB.logout(() => console.log("person is now logout"));
//   window.location = "./index.html";
// }

app.setlogoutButton = function () {
  app.get('.logout').addEventListener('click', app.logout)
}
app.logout = function () {
  localStorage.setItem('accessToken', '')
  FB.logout(() => console.log('FB logout'))
  window.location = './'
}

window.addEventListener('DOMContentLoaded', init)

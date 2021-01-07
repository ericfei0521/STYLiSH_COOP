const sentButton = app.get('#questionSubmit')
const servisMsg = app.get('#inputarea')
const displayArea = app.get('#dispalyzone')
const socket = io('https://weimazon.online')
const costumerList = app.get('.currentCostumer')
const showall = app.get('#showall')
socket.emit('service online')
let history = []
let roomList = []
let currentuser = ''
let currentStage = false
socket.on('message', (message) => {
  // console.log(message)
  for (let i = 0; i < message.length; i++) {
    if (message[i].is_customer === true && message[i].user_id !== currentuser) {
      let div = document.createElement('div')
      div.className = 'notice'
      let notich2 = document.createElement('span')
      notich2.textContent = `user:  ${message[i].user_id}`
      let notich3 = document.createElement('span')
      notich3.textContent = '新訊息:'
      let notich4 = document.createElement('span')
      notich4.className = 'noticmessage'
      notich4.textContent = `${message[i].msg}`
      div.appendChild(notich2)
      div.appendChild(notich3)
      div.appendChild(notich4)
      app.get('body').appendChild(div)
      setInterval(() => {
        div.style.display = 'none'
      }, 4000)
    }
    history.push(message[i])
    if (roomList.indexOf(message[i].user_id) == -1) {
      roomList.push(message[i].user_id)
      userlist(message[i], 'userzoom', costumerList)
    }
    if (currentStage === false) {
      currentuser = message[i].user_id
      let li = document.createElement('li')
      let head = document.createElement('div')
      head.className = 'head'
      head.textContent = '🐶'
      let span = document.createElement('span')
      span.className = 'message'
      span.textContent = message[i].msg
      if (message[i].is_customer === false) {
        li.appendChild(span)
        li.appendChild(head)
        head.style.marginRight = 0
        head.style.marginLeft = '10px'
        head.textContent = '🐶'
        li.style.justifyContent = 'flex-end'
      } else {
        li.appendChild(head)
        li.appendChild(span)
      }
      displayArea.appendChild(li)
    } else if (currentStage === true && currentuser === message[i].user_id) {
      let li = document.createElement('li')
      let head = document.createElement('div')
      head.className = 'head'
      head.textContent = '🐶'
      // let img = document.createElement('img')
      // img.src = './imgs/cart.png'
      // head.appendChild(img)
      let span = document.createElement('span')
      span.className = 'message'
      span.textContent = message[i].msg
      if (message[i].is_customer === false) {
        li.appendChild(span)
        li.appendChild(head)
        head.style.marginRight = 0
        head.style.marginLeft = '10px'
        head.textContent = '🐶'
        li.style.justifyContent = 'flex-end'
      } else {
        li.appendChild(head)
        li.appendChild(span)
      }
      displayArea.appendChild(li)
      //Scroll down
    }
  }

  if (displayArea.scrollHeight > 850) {
    displayArea.style.overflowY = 'scroll'
  } else {
    displayArea.style.overflow = 'hidden'
  }
  displayArea.scrollTop = displayArea.scrollHeight
})
function userlist(message, className, Container) {
  let div = document.createElement('div')
  div.className = className
  div.textContent = message.user_id
  div.addEventListener('click', chooseZoom)
  Container.appendChild(div)
}
function chooseZoom() {
  currentuser = parseInt(this.textContent)
  currentStage = true
  displayArea.innerHTML = ''
  let data = []
  history.forEach((item) => {
    if (item.user_id === currentuser) {
      data.push(item)
    }
  })
  // console.log(data)
  for (let i = 0; i < data.length; i++) {
    let li = document.createElement('li')
    let head = document.createElement('div')
    head.className = 'head'
    head.textContent = '🐶'
    let span = document.createElement('span')
    span.className = 'message'
    span.textContent = data[i].msg
    if (data[i].is_customer === false) {
      li.appendChild(span)
      li.appendChild(head)
      head.style.marginRight = 0
      head.style.marginLeft = '10px'
      head.textContent = '🐶'
      li.style.justifyContent = 'flex-end'
    } else {
      li.appendChild(head)
      li.appendChild(span)
    }
    displayArea.appendChild(li)
  }
  if (displayArea.scrollHeight > 850) {
    displayArea.style.overflowY = 'scroll'
  } else {
    displayArea.style.overflow = 'hidden'
  }
  displayArea.scrollTop = displayArea.scrollHeight
}
function showallMessage() {
  currentStage = false
  displayArea.innerHTML = ''
  let data = []
  history.forEach((item) => {
    data.push(item)
  })
  // console.log(data)
  for (let i = 0; i < data.length; i++) {
    let li = document.createElement('li')
    let head = document.createElement('div')
    head.className = 'head'
    head.textContent = '🐶'
    let span = document.createElement('span')
    span.className = 'message'
    span.textContent = data[i].msg
    if (data[i].is_customer === false) {
      li.appendChild(span)
      li.appendChild(head)
      head.style.marginRight = 0
      head.style.marginLeft = '10px'
      head.textContent = '🐶'
      li.style.justifyContent = 'flex-end'
    } else {
      li.appendChild(head)
      li.appendChild(span)
    }
    displayArea.appendChild(li)
  }
  if (displayArea.scrollHeight > 850) {
    displayArea.style.overflowY = 'scroll'
  } else {
    displayArea.style.overflow = 'hidden'
  }
  displayArea.scrollTop = displayArea.scrollHeight
}
sentButton.addEventListener('click', () => {
  let date = new Date()

  let message = servisMsg.value
  let servicevalue = {
    is_customer: false,
    user_id: currentuser,
    msg: message,
    timestamp: date.getTime(),
  }
  if (!message) {
    return
  } else {
    servisMsg.value = ''
    socket.emit('message', servicevalue)
    servisMsg.focus()
  }
})
servisMsg.addEventListener('keyup', (event) => {
  let message = servisMsg.value
  if (event.keyCode === 13 && currentuser && message) {
    let date = new Date()
    let servicevalue = {
      is_customer: false,
      user_id: currentuser,
      msg: message,
      timestamp: date.getTime(),
    }
    servisMsg.value = ''
    socket.emit('message', servicevalue)
    servisMsg.focus()
  }
})

showall.addEventListener('click', showallMessage)

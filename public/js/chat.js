const chatIcon = app.get('.chat')
const chatZoom = app.get('.chatzoom')
const hidebutton = app.get('#hide')
const sentButton = app.get('#questionSubmit')
const messageDisplay = app.get('#displayzone')
const selemsg = app.get('#common')
const msg = app.get('#inputplace')
const chatsystem = app.get('#backsystem')
const socket = io('https://weimazon.online')
let costumerID = window.sessionStorage.getItem('userID')
let user_id
if (costumerID) {
  user_id = parseInt(costumerID)
}

console.log(user_id)

socket.emit('customer contact', user_id)
socket.on('message', (message) => {
  for (let i = 0; i < message.length; i++) {
    let li = document.createElement('li')
    let head = document.createElement('div')
    head.className = 'head'
    let img = document.createElement('span')
    img.textContent = '🐨'
    head.appendChild(img)
    let span = document.createElement('span')
    span.className = 'message'
    span.textContent = message[i].msg
    if (message[i].is_customer === false) {
      img.textContent = '🦁'
      li.appendChild(head)
      li.appendChild(span)
    } else {
      li.appendChild(span)
      li.appendChild(head)
      head.style.marginRight = 0
      head.style.marginLeft = '10px'
      li.style.justifyContent = 'flex-end'
    }
    messageDisplay.appendChild(li)
  }

  //Scroll down
  if (messageDisplay.scrollHeight > 600) {
    messageDisplay.style.overflowY = 'scroll'
  } else {
    messageDisplay.style.overflow = 'hidden'
  }
  messageDisplay.scrollTop = messageDisplay.scrollHeight
})

const chatToggle = function () {
  if (app.state.auth.accessToken === '') {
    alert('請先登入')
    window.location = './login.html'
  } else {
    if (this.classList.contains('chat') && this.classList.contains('close') === false) {
      this.classList.add('close')
      chatZoom.classList.remove('close')
      if (messageDisplay.scrollHeight > 600) {
        messageDisplay.style.overflowY = 'scroll'
      } else {
        messageDisplay.style.overflow = 'hidden'
      }
      messageDisplay.scrollTop = messageDisplay.scrollHeight
    } else if (this.id === 'hide') {
      console.log('this')
      chatZoom.classList.add('close')
      chatIcon.classList.remove('close')
    }
  }
}
chatIcon.addEventListener('click', chatToggle)
hidebutton.addEventListener('click', chatToggle)
sentButton.addEventListener('click', () => {
  let date = new Date()
  let message = msg.value

  let msgvalue = {
    is_customer: false,
    user_id: user_id,
    msg: msg.value,
    timestamp: date.getTime(),
  }

  if (!message) {
    return
  } else {
    if (user_id) {
      msgvalue.is_customer = true
    }
    msg.value = ''
    socket.emit('message', msgvalue)
    msg.focus()
  }
})
msg.addEventListener('keyup', (event) => {
  let message = msg.value
  if (event.keyCode === 13 && message) {
    let date = new Date()
    let msgvalue = {
      is_customer: false,
      user_id: user_id,
      msg: msg.value,
      timestamp: date.getTime(),
    }
    if (user_id) {
      msgvalue.is_customer = true
    }
    msg.value = ''
    socket.emit('message', msgvalue)
    msg.focus()
  }
})
selemsg.addEventListener('click', () => {
  msg.textContent = selemsg.value
  msg.value = selemsg.value
})

chatsystem.addEventListener('click', function () {
  let confirm = prompt('請輸入密碼')
  if (confirm === 'ericfei306') {
    window.location = './service.html'
  } else {
    return
  }
})

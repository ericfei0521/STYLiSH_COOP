function signupAJAX() {
  console.log('sign up 1')

  let name = document.getElementById('signup__name').value
  let email = document.getElementById('signup__email').value
  let password = document.getElementById('signup__pw').value
  let password2 = document.getElementById('signup__pw--confirm').value

  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    console.log('sign up 2')

    if (password !== password2) {
      console.log('密碼不相同')
      alert('密碼不相同')
    } else if (xhr.readyState === 4) {
      console.log(xhr.responseText)

      if (xhr.status === 403) {
        console.log('403 email exists')
        alert('電子郵件已經存在')
      } else if (xhr.status === 400) {
        console.log('400 type error')
        alert('請填寫密碼和電子郵件')
      } else if (xhr.status === 500) {
        console.log('500 server error')
        alert('Server error')
      } else if (xhr.status === 200) {
        console.log('200 sign up success')
        alert('註冊成功，請重新登錄')
        window.location.replace('./login.html')
      }
    }
  }

  xhr.open('POST', app.cst.API_HOST + '/user/signup')
  console.log('sign up sent')
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(
    JSON.stringify({
      name: name,
      email: email,
      password: password,
    })
  )
}

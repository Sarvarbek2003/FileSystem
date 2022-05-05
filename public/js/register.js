const form = document.querySelector('.form');

form.onsubmit = async(ev) => {
    ev.preventDefault()

    let email = emailInput.value.trim();
    let password = passwordInput.value.trim();
    let username = usernameInput.value.trim();

    let body = {
        username,
        password,
        email
    }

    let res = await req('/auth/signup','POST',body);
    if (res?.access_token){
        window.localStorage.setItem('token', res.access_token)
        window.localStorage.setItem('userId', res.id)
        window.location = '/'
    }else  {
        alert(res.message[0])
    }
}
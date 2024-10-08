document.getElementById("user").style.display = "none";

const loginForm = document.querySelector("form");
loginForm.addEventListener("submit", userLogin);

async function userLogin(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await fetch("http://localhost:3030/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    const data = await res.json();

    const userData = {
      email: data.email,
      id: data._id,
      token: data.accessToken
    };

    localStorage.setItem('userData', JSON.stringify(userData)); // 'userData' is the name of the element. The second element is the object with the data. We give that to app.js.
    window.location = './index.html'; // Like this we redirect the user from register page to home page. Or we can add: ('./index.html')
  } catch (error) {
    document.querySelector('form').reset(); // Here we clear the form, if we have error.
    alert(error.message);
  }
}

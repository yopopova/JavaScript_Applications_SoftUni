// Judge: 92/100

const userData = JSON.parse(localStorage.getItem("userData")); // We get the user from login.js 'localeStorage'. We parse it, because it is stringified.
// ^ It will return the whole information like 'id', 'email', and 'token'.

if (userData) { // If we have logged user, we should change this settings.
  document.querySelector(".email span").textContent = userData.email; // After we have logged user, we should make 'Welcome, username'.
  document.querySelector("#guest").style.display = "none"; // agter we have logged user, we should hide the 'Login' and 'Register' buttons.
  document.querySelector("#addForm .add").disabled = false; // We should also make 'Add' button is aside active.
  loadData(); // This is a function envication for 'Load' button.
} else {
  document.getElementById("user").style.display = "none"; // If we don't have logged user, 'Logout' button don't have to be shown.
}

// Load all data
document.querySelector(".load").addEventListener("click", loadData);
// Create Catch
document.querySelector("#addForm").addEventListener("submit", onSubmit);
// Button delegation for delete and update
document.querySelector("#main").addEventListener("click", buttonsDelegation); // Here we take the two buttons at the same time.
// Logout
document.querySelector("#logout").addEventListener("click", onLogout);

//-----------LOGOUT--------------
async function onLogout() {
  await fetch("http://localhost:3030/users/logout", {
    headers: {
      "X-Authorization": userData.token,
    },
  });
  localStorage.clear(); // After we give the token, we should clear the locale storage. After that we should show or hide some elements.
  document.querySelector('#logout').style.display = 'none'
  document.querySelector("#addForm .add").disabled = true;
  document.querySelector("#guest").style.display = "block";
}
//------------------------------

function buttonsDelegation(e) {
  const currBtn = e.target.textContent; // We take the whole main and like this we can check which button is clicked with button text content.
  const id = e.target.id === "" ? e.target.dataset.id : e.target.id;
  const cuurentCatchEL = e.target.parentElement;
  if (currBtn === "Delete") {
    deleteCatch(id);
  } else if (currBtn === "Update") {
    updateCatchElement(id, cuurentCatchEL);
  }
}

async function deleteCatch(id) {
  await fetch(`http://localhost:3030/data/catches/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": userData.token,
    },
  });
  loadData(); // We load the function, because we want to refresh and take the new data.
}

async function updateCatchElement(id, cuurentCatchEL) {
  let [angler, weight, species, location, bait, captureTime] =
    cuurentCatchEL.querySelectorAll("input"); // Like this we take all the input elements of the form.

  try {
    const res = await fetch(`http://localhost:3030/data/catches/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": userData.token,
      },
      body: JSON.stringify({
        angler: angler.value,
        weight: +weight.value,
        species: species.value,
        location: location.value,
        bait: bait.value,
        captureTime: +captureTime.value,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }
  } catch (error) {
    alert(error.message);
  }
  loadData();
}

async function onSubmit(e) {
  e.preventDefault();

  if (!userData) { // This is if we don't have user. Then we redirict the user to home page.
    window.location = "./login.html"; 
    return;
  }

  const formData = new FormData(e.target); // This will return an object.

  const data = [...formData.entries()].reduce(
    (acc, [k, v]) => Object.assign(acc, { [k]: v }), // Here with '.entries()' we take the tuples from object 'formData': 'k' for keys and 'v' for values.
    {}
  );
  // With 'Object.assign()' we create new object

  try {
    if (Object.values(data).some((x) => x === ""))
      throw new Error("All fields are requierd!");

    const res = await fetch("http://localhost:3030/data/catches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": userData.token,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }
    loadData(); // Here we load the data because we want the new data.
    e.target.reset(); // We clear te whole form here, because we already have the whole needed information.
  } catch (error) {
    alert(error.message);
  }
}

async function loadData() {
  const res = await fetch("http://localhost:3030/data/catches");
  const data = await res.json();
  document.getElementById("catches").replaceChildren(...data.map(createCatch)); // Here we create divs with information for 'Catches' field.
}

// With this function we give values to elements and create them.
function createCatch(data) {
  const isDisabled = userData && data._ownerId === userData.id ? false : true;
  // ^ We check, if we have logged user and check if owner id is equal to id from the user.

  const catches = createElement(
    "div",
    { class: "catch" },
    createElement("label", {}, "Angler"),
    createElement("input", {
      type: "text",
      class: "angler",
      value: data.angler,
      disabled: isDisabled,
    }),
    createElement("label", {}, "Weight"),
    createElement("input", {
      type: "text",
      class: "weight",
      value: data.weight,
      disabled: isDisabled,
    }),
    createElement("label", {}, "Species"),
    createElement("input", {
      type: "text",
      class: "species",
      value: data.species,
      disabled: isDisabled,
    }),
    createElement("label", {}, "Location"),
    createElement("input", {
      type: "text",
      class: "location",
      value: data.location,
      disabled: isDisabled,
    }),
    createElement("label", {}, "Bait"),
    createElement("input", {
      type: "text",
      class: "bait",
      value: data.bait,
      disabled: isDisabled,
    }),
    createElement("label", {}, "Capture Time"),
    createElement("input", {
      type: "number",
      class: "captureTime",
      value: data.captureTime,
      disabled: isDisabled,
    }),
    createElement(
      "button",
      { class: "update", id: data._id, disabled: isDisabled },
      "Update"
    ),
    createElement(
      "button",
      { class: "delete", id: data._id, disabled: isDisabled },
      "Delete"
    )
  );
  return catches;
}

// This is a function which creates elements.
function createElement(type, attr, ...content) {
  const element = document.createElement(type);

  for (const item in attr) {
    if (item === "class") {
      element.classList.add(attr[item]);
    } else if (item === "disable") {
      element.disabled = attr[item];
    } else {
      element[item] = attr[item];
    }
  }

  // Here we check if the content is string or number.
  for (let item of content) {
    if (typeof item === "string" || typeof item === "number") {
      item = document.createTextNode(item);
    }

    element.appendChild(item);
  }

  return element;
}

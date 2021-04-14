let addToy = false;
let toyLocation = document.querySelector("#toy-collection")

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      } else {
      toyFormContainer.style.display = "none";
    }
  });
});
fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json()
  })
  .then(function(obj) {
    obj.forEach(loadToys)
  })

function loadToys(toy) {
    let cardDiv = document.createElement("div")
      cardDiv.className = "card"

    let toyTag = document.createElement("h2")
      toyTag.innerText = toy.name
    
    let toyImg = document.createElement("img")
      toyImg.src = toy.image
      toyImg.className = "toy-avatar"
    
    let toyP = document.createElement("p")
      toyP.innerText = `${toy.likes} Likes`

    let likeButton = document.createElement("button")
      likeButton.innerText = "Like <3"
      likeButton.classList.add = "like-btn"
    
    cardDiv.append(toyTag, toyImg, toyP, likeButton)
    
    toyLocation.append(cardDiv)

    likeButton.addEventListener("click", (e) => {
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify( {
          "likes": toy.likes + 1
        }) 
      })
        .then(res => res.json())
        .then((updatedToy) => {
          toyP.innerText = `${updatedToy.likes} Likes`
          toy.likes = updatedToy.likes
        })
    })
}

let addToyForm = document.querySelector("form.add-toy-form")

addToyForm.addEventListener("submit", (e) => {
  e.preventDefault()
  let submitName = e.target.name.value
  let submitImg = e.target.image.value

  fetch("http://localhost:3000/toys", {
    method:"POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      "name": submitName,
      "image": submitImg,
      "likes": 0
    })
  })
  .then((res) => res.json())
  .then((toyObj) => {
    loadToys(toyObj)
  });
});
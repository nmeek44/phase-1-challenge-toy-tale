let addToy = false;

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
  let toySubmit = document.querySelector(".add-toy-form")
  toySubmit.addEventListener("submit", function(e) {
    e.preventDefault()
    let 
    console.log(e.target[0])
    debugger
  })
});

fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json()
  })
  .then(function(obj) {
    loadToys(obj)
  })

function loadToys(obj) {
  obj.forEach(function (toy) {
    let cardDiv = document.createElement("div")
    cardDiv.class = "card"

    let toyTag = document.createElement("h2")
    toyTag.innerText = toy.name
    cardDiv.append(toyTag)
    
    let toyImg = document.createElement("img")
    toyImg.src = toy.image
    toyImg.class = "toy-avatar"
    cardDiv.append(toyImg)
    
    let toyP = document.createElement("p")
    toyP.innerText = (`${toy.likes} Likes`)
    cardDiv.append(toyP)

    let toyButton = document.createElement("button")
    toyButton.class = "like-btn"
    toyButton.id = toy.id
    
    let toyLocation = document.querySelector("#toy-collection")
    cardDiv.append(toyTag, toyImg, toyP, toyButton)
    toyLocation.append(cardDiv)

  })
}
  
//   let postObj = {
//     method:"POST"
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     }
//     body: JSON.stringify({
//       "name": ""
//       "image": ""
//       "likes": 
//     })
//   }

//   fetch("http://localhost:3000/toys", configObj)


// }
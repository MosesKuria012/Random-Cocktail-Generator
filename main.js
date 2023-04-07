// fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php') 
//   .then((res) => res.json())
//   .then((data) => {
//   //console.log(data)
// })

fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      throw new Error("Network Response Error")
    }
  })
  .then((data) => {
    console.log(data)
    displayCocktail(data)
  })
  .catch((error) => console.log("Fetch Error", error))



function displayCocktail(data) {
  const cocktail = data.drinks[0]
  const cocktailDiv = document.getElementById("cocktail")

  // create a container div for the image, text, and instructions
  const container = document.createElement("div")
  cocktailDiv.appendChild(container)

  // cocktail image
  const cocktailImage = document.createElement("img")
  cocktailImage.src = cocktail.strDrinkThumb
  cocktailImage.style.width = "50%"
  container.appendChild(cocktailImage)

  // cocktail name
  const cocktailName = cocktail.strDrink
  const heading = document.createElement("h1")
  heading.innerHTML = cocktailName
  container.appendChild(heading)

  // cocktail ingredients
  const cocktailIngredients = document.createElement("ul")
  container.appendChild(cocktailIngredients)
  const getIngredients = Object.keys(cocktail)
    .filter(function (ingredient) {
      return ingredient.indexOf("strIngredient") == 0
    })
    .reduce(function (ingredients, ingredient) {
      if (cocktail[ingredient] != null) {
        ingredients[ingredient] = cocktail[ingredient]
      }
      return ingredients;
    }, {});
  for (let key in getIngredients) {
    let value = getIngredients[key]
    listItem = document.createElement("li")
    listItem.innerHTML = value
    cocktailIngredients.appendChild(listItem)
  }

  // cocktail instructions
  // cocktail instructions
const cocktailInstructions = document.createElement("p")
const instructionsHeading = document.createTextNode("Instructions: ")
const instructionsText = document.createTextNode(cocktail.strInstructions)
cocktailInstructions.appendChild(instructionsHeading)
cocktailInstructions.appendChild(instructionsText)
container.appendChild(cocktailInstructions)


  // refresh button
  const refreshButton = document.createElement("button")
  refreshButton.innerHTML = "Another Try?"
  cocktailDiv.appendChild(refreshButton)
  refreshButton.addEventListener("click", function () {
    window.location.reload()
  });
}

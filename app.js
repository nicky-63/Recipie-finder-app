// Sample Recipe Database
const recipes = [
  {
    id: 1,
    title: "Classic Spaghetti Carbonara",
    time: "20 mins",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&auto=format&fit=crop&q=60",
    ingredients: ["Spaghetti", "Eggs", "Pancetta or Bacon", "Parmesan Cheese", "Black Pepper"],
    instructions: "Boil pasta. Fry pancetta until crispy. Beat eggs with parmesan. Combine pasta with pancetta, remove from heat, and quickly stir in egg mixture."
  },
  {
    id: 2,
    title: "Creamy Garlic Chicken",
    time: "30 mins",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&auto=format&fit=crop&q=60",
    ingredients: ["Chicken Breasts", "Garlic", "Heavy Cream", "Olive Oil", "Spinach", "Parmesan"],
    instructions: "Sear chicken breasts until golden. Sauté garlic, add heavy cream and spinach. Simmer chicken in the sauce until fully cooked."
  },
  {
    id: 3,
    title: "Vegetable Stir-Fry",
    time: "15 mins",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60",
    ingredients: ["Broccoli", "Bell Peppers", "Soy Sauce", "Tofu or Chicken", "Garlic", "Sesame Oil"],
    instructions: "Chop all veggies. Stir-fry garlic and protein in sesame oil. Add vegetables and soy sauce, toss on high heat for 5-7 minutes."
  },
  {
    id: 4,
    title: "Avocado Toast with Egg",
    time: "10 mins",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&auto=format&fit=crop&q=60",
    ingredients: ["Bread Slices", "Ripe Avocado", "Eggs", "Red Pepper Flakes", "Salt & Pepper"],
    instructions: "Toast bread slices. Mash avocado with salt and pepper. Fry or poach eggs. Spread avocado on toast and top with egg."
  }
];

// DOM Elements
const recipeContainer = document.getElementById("recipe-container");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

// Function to Render Recipe Cards
function displayRecipes(recipeList) {
  recipeContainer.innerHTML = "";

  if (recipeList.length === 0) {
    recipeContainer.innerHTML = `
      <div class="col-12 text-center py-5">
        <p class="fs-5 text-muted">No recipes found matching your search.</p>
      </div>
    `;
    return;
  }

  recipeList.forEach((recipe) => {
    const cardHtml = `
      <div class="col-md-6 col-lg-6">
        <div class="card recipe-card h-100 shadow-sm">
          <img src="${recipe.image}" class="card-img-top recipe-img" alt="${recipe.title}">
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h5 class="card-title fw-bold m-0">${recipe.title}</h5>
              <span class="time-badge">⏱️ ${recipe.time}</span>
            </div>
            
            <h6 class="fw-semibold text-secondary mt-3">Ingredients:</h6>
            <ul class="ingredient-list mb-3">
              ${recipe.ingredients.map((ing) => `<li>${ing}</li>`).join("")}
            </ul>

            <p class="card-text text-muted small mt-auto">
              <strong>Method

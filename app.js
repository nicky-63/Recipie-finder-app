// Expanded Multi-Cuisine Recipe Database
const recipes = [
  {
    id: 1,
    title: "Paneer Butter Masala",
    cuisine: "Indian",
    time: "35 mins",
    calories: "450 kcal",
    serves: "3-4 people",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=60",
    ingredients: [
      "250g Paneer (Cottage Cheese) cubes",
      "3 ripe Tomatoes & 1 large Onion",
      "15 Cashews (soaked)",
      "2 tbsp Butter & 1 tbsp Oil",
      "1 tsp Garam Masala & 1 tsp Kashmiri Red Chili",
      "2 tbsp Heavy Cream & Dried Fenugreek (Kasuri Methi)"
    ],
    instructions: [
      "Blend onions, tomatoes, and soaked cashews into a smooth paste.",
      "Melt butter and oil in a pan, add cumin seeds, then sauté the blended puree for 8-10 minutes.",
      "Add red chili powder, turmeric, garam masala, and salt. Cook until oil separates.",
      "Pour in 1/2 cup water, simmer for 5 minutes, then add paneer cubes.",
      "Finish with heavy cream, crushed Kasuri Methi, and serve warm with Naan or Rice."
    ]
  },
  {
    id: 2,
    title: "Classic Creamy Carbonara",
    cuisine: "Italian",
    time: "20 mins",
    calories: "520 kcal",
    serves: "2 people",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&auto=format&fit=crop&q=60",
    ingredients: [
      "200g Spaghetti pasta",
      "100g Guanciale or Pancetta/Bacon",
      "2 large Egg yolks & 1 whole Egg",
      "50g Pecorino Romano or Parmesan Cheese",
      "Freshly cracked Black Pepper"
    ],
    instructions: [
      "Boil spaghetti in salted water until al dente. Reserve 1/2 cup pasta water.",
      "Crisp the pancetta/bacon in a skillet over medium heat until golden brown.",
      "Whisk egg yolks, whole egg, grated cheese, and black pepper in a bowl.",
      "Drain pasta and immediately toss with pancetta in the hot skillet off the heat.",
      "Quickly pour in the egg-cheese mixture while tossing constantly. Add splash of reserved pasta water to create a creamy sauce."
    ]
  },
  {
    id: 3,
    title: "Authentic Beef Tacos",
    cuisine: "Mexican",
    time: "25 mins",
    calories: "380 kcal",
    serves: "3 people",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&auto=format&fit=crop&q=60",
    ingredients: [
      "300g Ground Beef",
      "6 Small Corn Tortillas",
      "1 tbsp Taco Seasoning (Cumin, Chili, Garlic)",
      "1/2 cup Chopped Onions & Cilantro",
      "1 Lime & Salsa Verde"
    ],
    instructions: [
      "Brown ground beef in a skillet over medium heat, draining excess fat.",
      "Stir in taco seasoning and 1/4 cup water. Simmer for 5 minutes until thick.",
      "Warm corn tortillas on a dry hot skillet for 30 seconds per side.",
      "Assemble tacos: spoon meat into tortillas, top with raw onions, fresh cilantro, and a squeeze of lime."
    ]
  },
  {
    id: 4,
    title: "Chicken Teriyaki Bowl",
    cuisine: "Japanese",
    time: "30 mins",
    calories: "490 kcal",
    serves: "2 people",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60",
    ingredients: [
      "300g Chicken Thighs (sliced)",
      "3 tbsp Soy Sauce & 2 tbsp Mirin",
      "1 tbsp Honey or Sugar",
      "1 tsp Grated Ginger & Garlic",
      "Steamed Jasmine/Sushi Rice & Sesame Seeds"
    ],
    instructions: [
      "Whisk soy sauce, mirin, honey, grated ginger, and garlic to make teriyaki sauce.",
      "Sear chicken thighs in a skillet until golden on both sides.",
      "Pour sauce over chicken and simmer over medium heat until sauce thickens and glazes the chicken.",
      "Serve over hot steamed rice and garnish with green onions and toasted sesame seeds."
    ]
  },
  {
    id: 5,
    title: "Greek Gyros Bowl",
    cuisine: "Mediterranean",
    time: "25 mins",
    calories: "410 kcal",
    serves: "2 people",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=60",
    ingredients: [
      "250g Grilled Chicken Breast",
      "1 cup Cucumber & Cherry Tomatoes (sliced)",
      "1/2 cup Feta Cheese cubes",
      "1/2 cup Tzatziki Sauce (Yogurt + Garlic + Cucumber)",
      "Pita Bread wedges"
    ],
    instructions: [
      "Season chicken with oregano, garlic powder, lemon juice, and olive oil; grill until cooked through.",
      "Assemble bowl: bed of fresh veggies (cucumbers, tomatoes, red onions, olives).",
      "Slice grilled chicken breast and place alongside veggies.",
      "Top with crumbled feta cheese, serve with a dollop of Tzatziki and warm pita wedges."
    ]
  },
  {
    id: 6,
    title: "Smokey BBQ Cheeseburger",
    cuisine: "American",
    time: "20 mins",
    calories: "650 kcal",
    serves: "1 person",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60",
    ingredients: [
      "180g Ground Beef Patty",
      "1 Brioche Bun",
      "1 slice Cheddar Cheese",
      "2 tbsp BBQ Sauce & 2 Crispy Bacon strips",
      "Lettuce, Tomato slice, Pickles"
    ],
    instructions: [
      "Form beef patty, season generously with salt and pepper.",
      "Sear patty on a hot skillet for 3-4 mins per side; place cheddar cheese on top to melt.",
      "Toast brioche bun slices with butter.",
      "Build burger: bottom bun, lettuce, tomato, cheesy beef patty, bacon, BBQ sauce, pickles, top bun."
    ]
  }
];

let currentCuisine = "All";

function renderRecipes() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const grid = document.getElementById("recipe-grid");
  grid.innerHTML = "";

  const filtered = recipes.filter(r => {
    const matchesCuisine = currentCuisine === "All" || r.cuisine === currentCuisine;
    const matchesSearch = r.title.toLowerCase().includes(query) || 
                          r.cuisine.toLowerCase().includes(query) || 
                          r.ingredients.some(i => i.toLowerCase().includes(query));
    return matchesCuisine && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-12 text-center py-5 text-secondary">
        <i class="fa-solid fa-magnifying-glass fa-3x mb-3 text-success"></i>
        <p class="fs-5">No recipes found matching your criteria.</p>
      </div>`;
    return;
  }

  filtered.forEach(r => {
    grid.innerHTML += `
      <div class="col-md-6 col-lg-4">
        <div class="card recipe-card h-100 shadow" onclick="openRecipeModal(${r.id})">
          <div class="card-img-wrapper">
            <img src="${r.image}" alt="${r.title}">
            <span class="badge-cuisine">${r.cuisine}</span>
            <span class="badge-time"><i class="fa-regular fa-clock me-1"></i>${r.time}</span>
          </div>
          <div class="card-body d-flex flex-column">
            <h5 class="fw-bold text-light mb-2">${r.title}</h5>
            
            <div class="d-flex justify-content-between text-secondary small mb-3">
              <span><i class="fa-solid fa-fire me-1 text-danger"></i>${r.calories}</span>
              <span><i class="fa-solid fa-users me-1 text-info"></i>Feeds ${r.serves}</span>
            </div>

            <p class="text-secondary small mt-auto mb-0">
              <i class="fa-solid fa-utensils text-success me-1"></i>${r.ingredients.length} Ingredients Required
            </p>
          </div>
        </div>
      </div>
    `;
  });
}

function openRecipeModal(id) {
  const r = recipes.find(item => item.id === id);
  document.getElementById("modalTitle").innerText = `${r.title} (${r.cuisine})`;
  document.getElementById("modalBody").innerHTML = `
    <img src="${r.image}" class="img-fluid rounded-3 mb-3 w-100" style="max-height: 260px; object-fit: cover;">
    
    <div class="row g-2 mb-3">
      <div class="col-4">
        <div class="meta-chip">
          <small class="text-secondary d-block">Time</small>
          <strong class="text-success"><i class="fa-regular fa-clock me-1"></i>${r.time}</strong>
        </div>
      </div>
      <div class="col-4">
        <div class="meta-chip">
          <small class="text-secondary d-block">Calories</small>
          <strong class="text-danger"><i class="fa-solid fa-fire me-1"></i>${r.calories}</strong>
        </div>
      </div>
      <div class="col-4">
        <div class="meta-chip">
          <small class="text-secondary d-block">Yield</small>
          <strong class="text-info"><i class="fa-solid fa-user me-1"></i>${r.serves}</strong>
        </div>
      </div>
    </div>

    <h6 class="fw-bold text-success border-bottom border-secondary pb-1"><i class="fa-solid fa-list me-2"></i>Ingredients</h6>
    <ul class="text-light mb-4">
      ${r.ingredients.map(i => `<li class="mb-1">${i}</li>`).join("")}
    </ul>

    <h6 class="fw-bold text-success border-bottom border-secondary pb-1"><i class="fa-solid fa-list-check me-2"></i>Preparation Steps</h6>
    <ol class="text-light">
      ${r.instructions.map(s => `<li class="mb-2">${s}</li>`).join("")}
    </ol>
  `;
  new bootstrap.Modal(document.getElementById('recipeModal')).show();
}

// Event Listeners for Filters
document.querySelectorAll(".pill-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    document.querySelectorAll(".pill-btn").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    currentCuisine = e.target.dataset.cuisine;
    renderRecipes();
  });
});

document.getElementById("search-input").addEventListener("input", renderRecipes);
document.getElementById("reset-btn").addEventListener("click", () => {
  document.getElementById("search-input").value = "";
  currentCuisine = "All";
  document.querySelectorAll(".pill-btn").forEach(b => b.classList.remove("active"));
  document.querySelector('[data-cuisine="All"]').classList.add("active");
  renderRecipes();
});

// Initial Render
renderRecipes();

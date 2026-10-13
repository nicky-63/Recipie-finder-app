const recipes = [
  {
    id: 1,
    title: "Classic Spaghetti Carbonara",
    category: "Dinner",
    time: "20 mins",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&auto=format&fit=crop&q=60",
    ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan Cheese", "Black Pepper"],
    instructions: ["Boil spaghetti in salted water.", "Crisp pancetta in a pan.", "Whisk eggs with grated parmesan.", "Toss pasta with pancetta, off heat stir in egg mix."]
  },
  {
    id: 2,
    title: "Avocado & Egg Toast",
    category: "Breakfast",
    time: "10 mins",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&auto=format&fit=crop&q=60",
    ingredients: ["Sourdough Bread", "Ripe Avocado", "Eggs", "Chili Flakes", "Sea Salt"],
    instructions: ["Toast bread to golden brown.", "Mash avocado with salt and spread on toast.", "Fry or poach eggs and place on top."]
  },
  {
    id: 3,
    title: "Garlic Butter Salmon",
    category: "Healthy",
    time: "25 mins",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60",
    ingredients: ["Salmon Fillets", "Garlic", "Butter", "Lemon Juice", "Parsley"],
    instructions: ["Season salmon with salt and pepper.", "Sear in butter for 4 mins per side.", "Add minced garlic and lemon juice, pan sauce over salmon."]
  }
];

let selectedCategory = "All";

function renderRecipes() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const grid = document.getElementById("recipe-grid");
  grid.innerHTML = "";

  const filtered = recipes.filter(r => {
    const matchesCategory = selectedCategory === "All" || r.category === selectedCategory || (selectedCategory === "Quick & Easy" && parseInt(r.time) <= 30);
    const matchesSearch = r.title.toLowerCase().includes(query) || r.ingredients.some(i => i.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="col-12 text-center py-5 text-muted"><i class="fa-regular fa-folder-open fa-3x mb-3"></i><p>No recipes found matching your filters.</p></div>`;
    return;
  }

  filtered.forEach(r => {
    grid.innerHTML += `
      <div class="col-md-6 col-lg-4">
        <div class="card recipe-card shadow-sm h-100" onclick="openRecipeModal(${r.id})">
          <div class="card-img-wrapper">
            <img src="${r.image}" alt="${r.title}">
            <span class="badge-time"><i class="fa-regular fa-clock me-1"></i>${r.time}</span>
          </div>
          <div class="card-body">
            <span class="badge bg-danger-subtle text-danger mb-2">${r.category}</span>
            <h5 class="fw-bold mb-2">${r.title}</h5>
            <p class="text-muted small mb-0"><i class="fa-solid fa-list me-1"></i>${r.ingredients.length} Ingredients</p>
          </div>
        </div>
      </div>
    `;
  });
}

function openRecipeModal(id) {
  const r = recipes.find(item => item.id === id);
  document.getElementById("modalTitle").innerText = r.title;
  document.getElementById("modalBody").innerHTML = `
    <img src="${r.image}" class="img-fluid rounded-3 mb-3 w-100" style="max-height: 250px; object-fit: cover;">
    <h6 class="fw-bold text-danger">Ingredients:</h6>
    <ul class="mb-3">${r.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
    <h6 class="fw-bold text-danger">Steps:</h6>
    <ol>${r.instructions.map(s => `<li class="mb-1">${s}</li>`).join("")}</ol>
  `;
  new bootstrap.Modal(document.getElementById('recipeModal')).show();
}

document.querySelectorAll(".pill-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    document.querySelectorAll(".pill-btn").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    selectedCategory = e.target.dataset.category;
    renderRecipes();
  });
});

document.getElementById("search-input").addEventListener("input", renderRecipes);
document.getElementById("reset-btn").addEventListener("click", () => {
  document.getElementById("search-input").value = "";
  selectedCategory = "All";
  document.querySelectorAll(".pill-btn").forEach(b => b.classList.remove("active"));
  document.querySelector('[data-category="All"]').classList.add("active");
  renderRecipes();
});

renderRecipes();

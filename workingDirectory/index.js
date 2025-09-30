const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const resultsDiv = document.getElementById("results");
const API_KEY = "CG-EerpQdvXuD1THEzKRXuE7MPj"

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  //data formatting
  let userInput = input.value.trim();
  //if no input throw error
  if (!userInput) throw new Error("No valid input found.");

  // nesting html inside results div
  resultsDiv.innerHTML = `<p class="text-center text-muted">Searching...</p>`;

  try {
    // Search coin by name
    const searchRes = await fetch(`https://api.coingecko.com/api/v3/search?query=${userInput}`);
    //required fetch json parsing
    const searchData = await searchRes.json();
    if (!searchData.coins.length) {
        // innerHTML nesting html inside div container.
      resultsDiv.innerHTML = `<p class="text-center text-danger">No results found.</p>`;
      return;
    }

    // Take first match
    const coin = searchData.coins[0];
    console.log(coin);

    // Get price
    const priceRes = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin.id}&vs_currencies=usd`);
    //required fetch json parsing
    const priceData = await priceRes.json();

    const price = priceData[coin.id].usd;

    resultsDiv.innerHTML = `
      <div class="col-md-4 offset-md-4">
        <div class="card p-4 text-center">
          <img src="${coin.large}" alt="${coin.name}" class="mx-auto mb-3" style="width:60px;height:60px;">
          <h4 class="mb-1">${coin.name}</h4>
          <p class="coin-symbol">${coin.symbol.toUpperCase()}</p>
          <p class="price">$${price.toLocaleString()}</p>
        </div>
      </div>
    `;
  } catch (error) {
    // Name must be correct or error will be thrown
    resultsDiv.innerHTML = `<p class="text-center text-danger">Error fetching data, Input must be valid: ${error}.</p>`;
  }
});

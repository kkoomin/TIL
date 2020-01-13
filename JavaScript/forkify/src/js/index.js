import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";

/* Global State of the App
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */

// state = to store all the data in one central place
const state = {};

/**
 * SEARCH CONTROLLER
 * */
const controlSearch = async () => {
  // 1) Get query from view
  const query = searchView.getInput();

  if (query) {
    // 2) New search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // 4) Search for recipes
      await state.search.getResults();

      // 5 render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (err) {
      alert("Somehthing wrong with search...");
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

// .closest() : returns the closest ancester of the current element (or the current elelment itself) which matches the selectors given in parameter. If there isn't such an ancester, it returns null.
elements.searchResPages.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/**
 * RECIPE CONTROLLER *
 */
const controlRecipe = async () => {
  // Get ID from url
  const id = window.location.hash.replace("#", ""); //#42345 -> 42345
  console.log(id);

  if (id) {
    // Prepare UI for changes

    // Create new recipe object
    state.recipe = new Recipe(id);

    try {
      // Get recipe data
      await state.recipe.getRecipe();

      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      console.log(state.recipe);
    } catch (err) {
      alert("Error processing recipe!");
    }
  }
};

// To execute same event listener in two different event
["hashchange", "load"].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
// =>
// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);
// load => when the page loads

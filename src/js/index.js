// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';


// Global state of the app
// Search object
// Current recipe object
// Shopping list object
// Likes recipes
const state = {};

// Search controller
const controlSearch = async () => {
    // 1. Get query from view
    const query = searchView.getInput();
    console.log(query);

    if (query){
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Show a loading spinner and prepare UI
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResList);

        try{
            // 4. Search for recipes
            await state.search.getResults();

            // 5. render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        }
        catch(err){
            alert('something wrong with the search');
        }
    }
}
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn){
        const goToPage = parseInt(btn.dataset.goto,10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

// Recipe controller
const controlRecipe = async () => {
    //get id from url
    const id = window.location.hash.replace('#', '');
    console.log(id);
    if (id){
        // prepare ui for changes

        // create new recipe object
        state.recipe = new Recipe(id);


        try{
            // get recipe object and parse ingredients
            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients);
            state.recipe.parseIngredients();

            // calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // render the recipe
            console.log(state.recipe);
        }
        catch(err){
            alert('Error processing the recipe');
        }
         
    }
};
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

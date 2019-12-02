// Global app controller
import Search from './models/Search';

// Global state of the app
// Search object
// Current recipe object
// Shopping list object
// Likes recipes
const state = {};

const controlSearch = async () => {
    // 1. Get query from view
    const query = 'pizza' //TODO

    if (query){
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Show a loading spinner and prepare UI

        // 4. Search for recipes
        await state.search.getResults();

        // 5. render results on UI
        console.log(state.search.result)

    }
}
document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

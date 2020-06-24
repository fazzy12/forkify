// Global app controller
import Search from './modules/search';

/**
 * -search object
 * -current recipe object
 * -shopping list object
 * -liked recipes
 */
const state = {};

const controlSearch = async () =>{
    //get the query from the view
    const query = 'piza' //todo

    if (query){
        //new search object and add it to state
        state.search = new Search(query);

        //show loading spinner

        //serach for recipe
        await state.search.getResults();

       // render results on UI
    
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});



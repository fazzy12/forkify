// Global app controller
import Search from './modules/search';
import * as searchview from './views/searchViews';
import {element} from './views/base';


/**
 * -search object
 * -current recipe object
 * -shopping list object
 * -liked recipes
 */
const state = {};

const controlSearch = async () => {
    //get the query from the view
    const query = searchview.getInput(); 

    if (query){
        //new search object and add it to state
        state.search = new Search(query);

        //prepare UI for results
        searchview.clearInput();
        searchview.clearResult();


        //show loading spinner

        //serach for recipe
        await state.search.getResults();
        

       // render results on UI
       searchview.renderResults(state.search.result);
    
    }
}

element.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});



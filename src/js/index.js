// Global app controller
import Search from './modules/search';
import Recipe from './modules/recipe'; 
import * as searchview from './views/searchViews';
import {element, renderLoader, clearLoader} from './views/base';


/**
 * -search object
 * -current recipe object
 * -shopping list object
 * -liked recipes
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
    //get the query from the view
    const query = searchview.getInput(); 

    if (query){
        //new search object and add it to state
        state.search = new Search(query);

        //prepare UI for results
        searchview.clearInput();
        searchview.clearResult();
        renderLoader(element.searchRes);
        

        //show loading spinner

        //serach for recipe
        await state.search.getResults();
        

       // render results on UI
       clearLoader();
       searchview.renderResults(state.search.result);
    
    }
}

element.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

element.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const gotoPage = parseInt(btn.dataset.goto, 10);
        searchview.clearResult();
        searchview.renderResults(state.search.result, gotoPage);
    }
});


/**
 * RECIPE CONTROLLER
 */

const r = new Recipe(47025); 
r.getRecipe(); 
console.log(r);
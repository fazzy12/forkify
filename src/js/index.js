// Global app controller
import Search from './modules/search';
import Recipe from './modules/recipe'; 
import * as searchview from './views/searchViews';
import * as recipeview from './views/recipeview';
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

        try{
            
            //show loading spinner

            //serach for recipe
            await state.search.getResults();
            

            // render results on UI
            clearLoader();
            searchview.renderResults(state.search.result);

        }catch(error){
            alert('something wrong with the search');
            clearLoader();
        }
        

    
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
const controlRecipe = async () =>{
    //get id from url
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if(id){
        //prepare ui for changes.abs
        recipeview.clearRecipe();
        renderLoader(element.recipe);

        //create new recipe object
        state.recipe = new Recipe(id);

        //higlight selected search item
        if (state.search) searchview.highlightSelected(id); 

        try{

                //get recipe data
            await state.recipe.getRecipe();

            //calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            //render recipe
            clearLoader(); 
            recipeview.renderRecipe(state.recipe);
        }catch(error){
            alert('Error processing recipe');
        };

       
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

//handling recipe button clicks
element.recipe.addEventListener('click', e => {
    
    if (e.target.matches('.btn-decrease, .btn-decrease *')){
        //decrease if button clicked
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
        }   
    }else if (e.target.matches('.btn-increase, .btn-increase *')){
        //increase if button clicked
        state.recipe.updateServings('inc');
    }
});

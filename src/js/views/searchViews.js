import {element} from './base';

export const getInput = () =>  element.searchInput.value;

export const clearResult = () => {
    element.searchResultList.innerHTML = "";
    element.searchResPages.innerHTML = "";
}

export const clearInput = () => {
    element.searchInput.value = "";
}; 

export const highlightSelected = id =>{
    const resultArr = Array.from(document.querySelectorAll('.results__link'));
    resultArr.forEach(el =>{
        el.classList.remove('results__link--active');
    });
 document.querySelector(`a[href="#${id}#]`).classList.add('results__link--active');
};

const limitRecipeTitle = ( title,  limit = 17) => {
    const newTitle = [];
    if (title.length > limit){
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        return `${newTitle.join(' ')} .... `;
    }
    return title;
}

const renderRecipe = recipe => {

    const markup = `
        <li>
        <a class="results__link" href="${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle (recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
        </li>
    `;
    element.searchResultList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) => `

    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev'? page -1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left': 'right'}"></use>
        </svg>
    </button>

    
`;

const renderButtons = (page, numResult, resPerPage) => {
    const pages = Math.ceil(numResult / resPerPage);
    let button;
    if (page === 1 && pages > 1){
        //only button to go to next page
        button = createButton(page, 'next');
    }else if (page < pages ){
        //both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    }else if (page === pages && pages > 1){
        //only button to go to prev page
        button = createButton(page, 'prev');
    }

    element.searchResPages.insertAdjacentHTML('afterbegin', button); 
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    //render result of current page
    const start = (page -1) * resPerPage;;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);

    //render result of pagination button
    renderButtons(page, recipes.length, resPerPage);

};


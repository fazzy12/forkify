export const element = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
    searchResultList: document.querySelector('.results__list'),
    recipe: document.querySelector('.recipe')
};


export const elementString = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader =`
        <div class="${elementString.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementString.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
};
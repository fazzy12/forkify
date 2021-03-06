import axios from 'axios';


export default class Recipe {
    constructor(id){
        this.id = id;
      
    }


    async getRecipe(){
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        }catch(error){
            console.log(error);
            alert('something went wrong :(');
        };
    }


    calcTime(){
        //assuming that we need 15 min for each 3 ingreedients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = period = 15
    }

    calcServings(){
        this.servings = 4;
    }



    updateServings (type) {
        //servings
        const newSrevings = type === 'dec' ? this.servings - 1 : this.servings + 1;

        //ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (newSrevings / this.servings);
        });

        this.servings = newSrevings;
    }
}
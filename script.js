const movieContainer = document.querySelector('.movies-container');
const form = document.querySelector('form');
const errorMessage = document.querySelector('.error');
const baseUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=';
const apiKey = 'c516a304f2ae47d8e852776f800cc2fc';
const mainUrl = baseUrl + apiKey;
let apiUrl = mainUrl;
const imgPath = 'https://image.tmdb.org/t/p/w1280';
const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

class UI{
    async getProducts(term){
        if(term){
            apiUrl = searchUrl+term;
        }else if(term == ''){
            apiUrl = mainUrl;
        }
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
       
    }
    async displayProducts(term){
        const data = await this.getProducts();
        const movies = data.results;
        if(movies.length ==0){
            errorMessage.classList.add('show-error');
            return;
        }
        errorMessage.classList.remove('show-error')
        // map the movies;
        movieContainer.innerHTML =  movies.map(movie=>{
            const {id, original_title:title, overview, poster_path, vote_average} = movie;
            return `
            <div class="movie" data-id=${id}>
                <div class="movie-image">
                    <img src=${imgPath+poster_path} alt="">
                    <div class="movie-overview">
                        <p>${overview}</p>
                    </div>
                </div>
                <div class="movie-details">
                    <h1>${title}</h1>
                    <p>${vote_average}</p>
                </div>
            </div>
            `
        }).join('');
        //  add colors
        const ratings = document.querySelectorAll('.movie-details p');
        ratings.forEach(rating=>{
            const value = rating.textContent;
            if(value>6){
                rating.style.setProperty('--color', 'green')
            }else{
                rating.style.setProperty('--color', 'red');
            }
        })
    }
}





window.addEventListener('DOMContentLoaded', ()=>{
    const Ui = new UI();
    Ui.displayProducts();
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const inputValue = form.querySelector('input').value;
        Ui.getProducts(inputValue).then(data=>{
            Ui.displayProducts()
        })
    })
})
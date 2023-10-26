function getMovieList(){
    const apiKey = '96d2c79a685de50fdecbf8abfd028da7';
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR`;

        const movieListElement = document.getElementById('movieList');
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const movies = data.results;
                movies.forEach(movie => {
                    const li = document.createElement('li');
                    const img = document.createElement('img');
                    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                    img.alt = movie.title;
                    li.appendChild(img);
                    li.appendChild(document.createTextNode(movie.title));
                    movieListElement.appendChild(li);
                });
            })
            .catch(()=>{
                if (!navigator.onLine){
                    window.location.href='https://narovana-randriatiana.vercel.app/fallBack.html'
                }
            })
}
document.getElementById('btn-show').addEventListener('click', getMovieList);


function searchMovies(query) {
    const apiKey = '96d2c79a685de50fdecbf8abfd028da7';
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=fr-FR&query=${query}`;

    const movieListElement = document.getElementById('movieList');
    movieListElement.innerHTML = '';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const movies = data.results;
            movies.forEach(movie => {
                const li = document.createElement('li');
                const img = document.createElement('img');
                img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                img.alt = movie.title;
                li.appendChild(img);
                li.appendChild(document.createTextNode(movie.title));
                movieListElement.appendChild(li);
            });
        })
        .catch(()=>{
            if (!navigator.onLine){
                window.location.href='https://narovana-randriatiana.vercel.app/fallBack.html'
            }
        })
}

document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value;
    if (query.trim() !== '') {
        searchMovies(query);
    } else {
        
        getMovieList();
    }
});
(function() {
    const videoPlayer = document.querySelector('video');
    const playlistWrapper = document.querySelector('.movies_wrapper');
    const addMovieButton = document.querySelector('.add_movie_button');
    const newMovieTitle = document.querySelector('#movie_title');
    const newMovieUrl = document.querySelector('#movie_url');
    let movies = Array.from(document.querySelectorAll('.movie'));

    const createNewMovieElement = () => {
        const movieItem = document.createElement('li');
        movieItem.className = 'movie';
        const title = document.createElement('span');
        title.setAttribute('data-video', newMovieUrl.value);
        title.textContent = newMovieTitle.value;
        title.className = 'movie_link';
        const up = document.createElement('button');
        up.textContent = '↑';
        up.className = 'move_up_button';
        const down = document.createElement('button');
        down.textContent = '↓';
        down.className = 'move_down_button';
        const remove = document.createElement('button');
        remove.className = 'remove_button';
        const remove_icon = document.createElement('img');
        remove_icon.src = "images/minus.png";
        remove.appendChild(remove_icon);
        movieItem.appendChild(title);
        movieItem.appendChild(up);
        movieItem.appendChild(down);
        movieItem.appendChild(remove);
        movies.push(movieItem);
        initializeLitenersForMovieItem(movieItem);
        movieItem.setAttribute('data-index', (movies.length - 1).toString());
        playlistWrapper.appendChild(movieItem);
        newMovieUrl.value = '';
        newMovieTitle.value = '';
    }

    addMovieButton.addEventListener('click', (e) => {
        e.preventDefault();
        createNewMovieElement();
    })

    const swapArrayElements = (arr, indexA, indexB) => [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];

    const moveUp = (movie) => {
        let oldIndex = Number(movie.getAttribute('data-index'));
        if (oldIndex === 0) {
            return void 0;
        }
        let newIndex = oldIndex - 1;
        swapArrayElements(movies, oldIndex, newIndex);
    }

    const moveDown = (movie) => {
        let oldIndex = Number(movie.getAttribute('data-index'));
        if (oldIndex === movies.length - 1) {
            return void 0;
        }
        let newIndex = oldIndex + 1;
        swapArrayElements(movies, oldIndex, newIndex);
    }

    const remove = (movie) => {
        const index = movie.getAttribute('data-index');
        movies.splice(index, 1);
        for (let i = index; i < movies.length; i++) {
            movies[i].setAttribute('data-index', i.toString());
        }
    }

    const setPlayVideoListener = (movie) => {
        const movieLink = movie.querySelector('.movie_link');
        movieLink.addEventListener('click', () => {
            videoPlayer.src = movieLink.getAttribute('data-video');
        });
    }
    const setMoveUpListener = (movie) => movie.querySelector('.move_up_button').addEventListener('click', () => {
        moveUp(movie);
        reloadList()
    });
    const setMoveDownListener = (movie) => movie.querySelector('.move_down_button').addEventListener('click', () => {
        moveDown(movie);
        reloadList();
    });
    const setRemoveListener = (movie) => movie.querySelector('.remove_button').addEventListener('click', () => {
        remove(movie);
        reloadList();
    });

    const initializeLitenersForMovieItem = (movieItem) => {
        setPlayVideoListener(movieItem);
        setMoveUpListener(movieItem);
        setMoveDownListener(movieItem);
        setRemoveListener(movieItem);
    }

    const reloadList = () => {
        playlistWrapper.innerHTML = '';
        movies.forEach((movieItem, idx) => {
            movieItem.setAttribute('data-index', idx.toString());
            playlistWrapper.appendChild(movieItem);
        });
    }

    movies.forEach(movie => initializeLitenersForMovieItem(movie));

    reloadList();
})();
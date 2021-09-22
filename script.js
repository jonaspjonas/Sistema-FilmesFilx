const colecao = document.querySelector('.movies');
const setaEsquerda = document.querySelector('.btn-prev');
const setaDireita = document.querySelector('.btn-next');
const divDestaque = document.querySelector('.highlight__video');
const divDestaqueTitulo = document.querySelector('.highlight__title-rating');
const tituloDestaque = document.querySelector('.highlight__title');
const notaDestaque = document.querySelector('.highlight__rating');
const generosDestaque = document.querySelector('.highlight__genres');
const dataLancaDestaque = document.querySelector('.highlight__launch');
const descricaoDestaque = document.querySelector('.highlight__description');
const videoDestaque = document.querySelector('.highlight__video-link');
const modal = document.querySelector('.modal');
const tituloModal = document.querySelector('.modal__title');
const imgModal = document.querySelector('.modal__img');
const modalDescricao = document.querySelector('.modal__description');
const notaFilmeModal = document.querySelector('.modal__average');
const fecharModal = document.querySelector('.modal__close');
const inputBusca = document.querySelector('.input');
const alterarTema = document.querySelector('.btn-theme');
const divContainer = document.querySelector('body');
const subtitulo = document.querySelector('.subtitle');
const divInfo = document.querySelector('.highlight__info');


modal.classList.add('ocultar');
let arrayFilmes = {};
let filmesBuscados = {};
let paginaAtual = 0;

function carregarPaginaInicial(arrayFilmes) {
    arrayFilmes.forEach(function (item, index) {

        let imgFilme = document.createElement('img');
        imgFilme.src = item.poster_path;
        imgFilme.id = item.id;
        imgFilme.width = 168;
        imgFilme.height = 301;

        const divImgFilme = document.createElement('div');
        divImgFilme.append(imgFilme);
        divImgFilme.classList.add('img_filme');

        let tituloFilme = document.createElement('span');
        tituloFilme.textContent = item.title;
        tituloFilme.classList.add('titulo');
        tituloFilme.classList.add('.margin-left');

        const estrela = document.createElement('img');
        estrela.src = "./assets/estrela.svg";

        const divNota = document.createElement('div');
        divNota.classList.add('flex');

        let notaFilme = document.createElement('span');
        notaFilme.textContent = item.vote_average;
        
        divNota.append(estrela, notaFilme);

        const divInfoFilme = document.createElement('div');
        divInfoFilme.append(tituloFilme, divNota);
        divInfoFilme.classList.add('info_filme');

        const filme = document.createElement('div');
        filme.append(divImgFilme, divInfoFilme);
        filme.style.cursor = 'pointer';

        filme.addEventListener('click', function (event) {
            modal.classList.remove('ocultar');
            fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/' + event.target.id + '?language=pt-BR').then(function (resposta) {
                const promiseBody = resposta.json();
                promiseBody.then(function (body) {
                    tituloModal.textContent = body.title;
                    imgModal.src = body.backdrop_path;
                    imgModal.width = 729;
                    imgModal.height = 413;
                    modalDescricao.textContent = body.overview;
                    notaFilmeModal.textContent = body.vote_average;
                });

            });
        });

        colecao.append(filme);

        filme.classList.add('ocultar');

        if (index < 5) {
            filme.classList.remove('ocultar');
        };

    });
};

fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false').then(function (resposta) {
    const promiseBody = resposta.json();

    promiseBody.then(function (body) {
        arrayFilmes = body.results;
        carregarPaginaInicial(arrayFilmes);

        inputBusca.addEventListener('keydown', function (event) {

            if (event.key !== "Enter") {
                return;
            } else {
                if (inputBusca.value === "") {
                    colecao.innerHTML = "";
                    carregarPaginaInicial(arrayFilmes);
                } else {
                    colecao.innerHTML = "";
                    paginaAtual = 0;
                    let busca = inputBusca.value;
                    inputBusca.value = "";
                    fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=' + busca + '').then(function (resposta) {
                        const promiseBody = resposta.json();

                        promiseBody.then(function (item) {
                            filmesBuscados = item.results;
                            carregarPaginaInicial(filmesBuscados);


                        });
                    });
                };
            };
        });

        fecharModal.addEventListener('click', function () {
            modal.classList.add('ocultar');
        });

        setaDireita.addEventListener('click', function paginacao() {

            if (paginaAtual === 0) {
                for (let i = 0; i < 5; i++) {
                    colecao.children[i].classList.add('ocultar');
                }
                for (let i = 5; i < 10; i++) {
                    colecao.children[i].classList.remove('ocultar');
                }
                paginaAtual++;
            } else if (paginaAtual === 1) {
                for (let i = 5; i < 10; i++) {
                    colecao.children[i].classList.add('ocultar');
                }
                for (let i = 10; i < 15; i++) {
                    colecao.children[i].classList.remove('ocultar');
                }
                paginaAtual++;
            } else if (paginaAtual === 2) {
                for (let i = 10; i < 15; i++) {
                    colecao.children[i].classList.add('ocultar');
                }
                for (let i = 15; i < 20; i++) {
                    colecao.children[i].classList.remove('ocultar');
                }
                paginaAtual++;
            } else if (paginaAtual === 3) {
                for (let i = 15; i < 20; i++) {
                    colecao.children[i].classList.add('ocultar');
                }
                for (let i = 0; i < 5; i++) {
                    colecao.children[i].classList.remove('ocultar');
                }
                paginaAtual = 0;
            };
        });

        setaEsquerda.addEventListener('click', function () {
            if (paginaAtual === 3) {
                for (let i = 15; i < 20; i++) {
                    colecao.children[i].classList.add('ocultar');
                }
                for (let i = 10; i < 15; i++) {
                    colecao.children[i].classList.remove('ocultar');
                }
                paginaAtual--;
            } else if (paginaAtual === 2) {
                for (let i = 10; i < 15; i++) {
                    colecao.children[i].classList.add('ocultar');
                }
                for (let i = 5; i < 10; i++) {
                    colecao.children[i].classList.remove('ocultar');
                }
                paginaAtual--;
            } else if (paginaAtual === 1) {
                for (let i = 5; i < 10; i++) {
                    colecao.children[i].classList.add('ocultar');
                }
                for (let i = 0; i < 5; i++) {
                    colecao.children[i].classList.remove('ocultar');
                }
                paginaAtual--;
            } else if (paginaAtual === 0) {
                for (let i = 0; i < 5; i++) {
                    colecao.children[i].classList.add('ocultar');
                }
                for (let i = 15; i < 20; i++) {
                    colecao.children[i].classList.remove('ocultar');
                }
                paginaAtual = 3;
            };
        });


    });

})

fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR').then(function (resposta) {
    const promiseBody = resposta.json();

    promiseBody.then(function (body) {

        let imgDestaque = document.createElement('img');
        imgDestaque.src = body.backdrop_path;
        imgDestaque.width = 553;
        imgDestaque.height = 311;

        divDestaque.append(imgDestaque);

        tituloDestaque.textContent = body.title;

        notaDestaque.textContent = body.vote_average;

        let gen = "";
        for (let genero of body.genres) {
            gen += genero.name + ', ';
        }
        generosDestaque.textContent = gen.toLocaleUpperCase();

        dataLancaDestaque.textContent = body.release_date;

        descricaoDestaque.textContent = body.overview;

    });
});

fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR').then(function (resposta) {
    const promiseBody = resposta.json();

    promiseBody.then(function (body) {
        let link = "";
        link = "https://www.youtube.com/watch?v=" + body.results[0].key;
        videoDestaque.href = link;
    });
});

alterarTema.addEventListener('click', function () {
    divContainer.classList.toggle('tema');
    divInfo.classList.toggle('dark');
    if (divContainer.classList.contains('tema')) {
        setaDireita.src = "./assets/seta-direita-branca.svg"
        setaEsquerda.src = "./assets/seta-esquerda-branca.svg";
        alterarTema.src = "./assets/dark-mode.svg";
        subtitulo.style.color = "white";
        generosDestaque.style.color = "white";
        descricaoDestaque.style.color = "white"
        dataLancaDestaque.style.color = "white";

    } else {
        setaDireita.src = "./assets/seta-direita-preta.svg"
        setaEsquerda.src = "./assets/seta-esquerda-preta.svg";
        subtitulo.style.color = "black";
        generosDestaque.style.color = "black";
        descricaoDestaque.style.color = "black";
        dataLancaDestaque.style.color = "black";
        alterarTema.src = "./assets/light-mode.svg";
    };
});
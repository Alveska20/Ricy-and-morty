// endereco da API que vamos usar
const urlApi = "https://rickandmortyapi.com/api/character";

// pegando os elementos do HTML
const listaCards = document.getElementById("lista-cards");
const mensagem = document.getElementById("mensagem");

// funcao que busca os personagens na API usando fetch
function buscarPersonagens() {
    fetch(urlApi)
        .then(function (resposta) {
            // transforma a resposta em JSON
            return resposta.json();
        })
        .then(function (dados) {
            console.log("Dados recebidos da API:", dados);

            // a lista de personagens fica dentro de "results"
            const personagens = dados.results;

            mensagem.textContent = "Foram carregados " + personagens.length + " personagens.";

            // para cada personagem cria um card
            personagens.forEach(function (personagem) {
                criarCard(personagem);
            });
        })
        .catch(function (erro) {
            console.log("Erro ao buscar a API:", erro);
            mensagem.textContent = "Não foi possível carregar os personagens. Tente novamente mais tarde.";
        });
}

// funcao que traduz o status que vem em ingles
function traduzirStatus(status) {
    if (status === "Alive") {
        return "Vivo";
    } else if (status === "Dead") {
        return "Morto";
    } else {
        return "Desconhecido";
    }
}

// funcao que monta o card com createElement e appendChild
function criarCard(personagem) {
    // div principal do card
    const card = document.createElement("div");
    card.classList.add("card");

    // botao de coracao (favoritar)
    const coracao = document.createElement("button");
    coracao.classList.add("coracao");
    coracao.textContent = "♡";
    coracao.addEventListener("click", function () {
        if (coracao.textContent === "♡") {
            coracao.textContent = "♥";
        } else {
            coracao.textContent = "♡";
        }
    });

    // nome do personagem
    const nome = document.createElement("h3");
    nome.textContent = personagem.name;

    // imagem do personagem
    const imagem = document.createElement("img");
    imagem.src = personagem.image;
    imagem.alt = "Imagem de " + personagem.name;

    // status (vivo, morto ou desconhecido)
    const status = document.createElement("p");
    const statusTraduzido = traduzirStatus(personagem.status);
    status.innerHTML = "Status: <span>" + statusTraduzido + "</span>";

    if (statusTraduzido === "Vivo") {
        status.querySelector("span").classList.add("vivo");
    } else if (statusTraduzido === "Morto") {
        status.querySelector("span").classList.add("morto");
    } else {
        status.querySelector("span").classList.add("desconhecido");
    }

    // especie
    const especie = document.createElement("p");
    especie.textContent = "Espécie: " + personagem.species;

    // local onde o personagem esta
    const local = document.createElement("p");
    local.textContent = "Local: " + personagem.location.name;

    // colocando tudo dentro do card
    card.appendChild(coracao);
    card.appendChild(nome);
    card.appendChild(imagem);
    card.appendChild(status);
    card.appendChild(especie);
    card.appendChild(local);

    // colocando o card na pagina
    listaCards.appendChild(card);
}

// chama a funcao quando a pagina abrir
buscarPersonagens();

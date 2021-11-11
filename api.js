"use strict"

const pesquisarTodos = async (imagem) => {
    const key = "key=24029855-4a27ba5b68cc6c5e6bf950812"
    const url = `https://pixabay.com/api/?${key}&q=${imagem}&image_type=all&pretty=true&lang=pt&per_page=30`
    const response = await fetch(url)
    const imagensEncontradas = await response.json()

    return imagensEncontradas
}

const pesquisarFotos = async (imagem) => {
    const key = "key=24029855-4a27ba5b68cc6c5e6bf950812"
    const url = `https://pixabay.com/api/?${key}&q=${imagem}&image_type=photo&pretty=true&lang=pt&per_page=30`
    const response = await fetch(url)
    const imagensEncontradas = await response.json()

    return imagensEncontradas
}

const pesquisarIlustracoes = async (imagem) => {
    const key = "key=24029855-4a27ba5b68cc6c5e6bf950812"
    const url = `https://pixabay.com/api/?${key}&q=${imagem}&image_type=illustration&pretty=true&lang=pt&per_page=30`
    const response = await fetch(url)
    const imagensEncontradas = await response.json()
    return imagensEncontradas
}

const pesquisarVetores = async (imagem) => {
    const key = "key=24029855-4a27ba5b68cc6c5e6bf950812"
    const url = `https://pixabay.com/api/?${key}&q=${imagem}&image_type=vector&pretty=true&lang=pt&per_page=30`
    const response = await fetch(url)
    const imagensEncontradas = await response.json()
    return imagensEncontradas
}


const all = 'Todos'
const photos = 'Fotos'
const ilustrations = 'Ilustrações'
const vectors = 'Vetores'

const tiposSelect = document.querySelector('.tiposSelect')

tiposSelect.innerHTML = `<option>${all}</option>
<option>${photos}</option>
<option>${ilustrations}</option>
<option>${vectors}</option>`


const limpaBusca = (elemento) => {
    while(elemento.firstChild){
        elemento.removeChild(elemento.lastChild);
    }
}

const buscarImagens = async(evento) => {
    const valueOption = tiposSelect.options[tiposSelect.selectedIndex].text
    if(valueOption == all){
        if(evento.key === 'Enter'){
            const imagemPesquisa = evento.target.value
            const infoImagens = await pesquisarTodos(imagemPesquisa)
            console.log(infoImagens)
            const arrayResultados = infoImagens.hits
            console.log(arrayResultados)
            limpaBusca(document.querySelector('.galeriaImagens'))
            carregarResultados(arrayResultados)
        }  
    }
    else if(valueOption == photos){
        if(evento.key === 'Enter'){
            const imagemPesquisa = evento.target.value
            const infoImagens = await pesquisarFotos(imagemPesquisa)
            const arrayResultados = infoImagens.hits
            console.log(arrayResultados)
            limpaBusca(document.querySelector('.galeriaImagens'))
            carregarResultados(arrayResultados)
        }   
    }
    else if(valueOption == ilustrations){
        if(evento.key === 'Enter'){
            const imagemPesquisa = evento.target.value
            const infoImagens = await pesquisarIlustracoes(imagemPesquisa)
            const arrayResultados = infoImagens.hits
            console.log(arrayResultados)
            limpaBusca(document.querySelector('.galeriaImagens'))
            carregarResultados(arrayResultados)
        }   
    }
    else if(valueOption == vectors){
        if(evento.key === 'Enter'){
            const imagemPesquisa = evento.target.value
            const infoImagens = await pesquisarVetores(imagemPesquisa)

            const arrayResultados = infoImagens.hits
            console.log(arrayResultados)
            limpaBusca(document.querySelector('.galeriaImagens'))
            carregarResultados(arrayResultados)
        }   
    }
}


const criaCard = (elemento, indice, array) => {
    const container = document.querySelector(".galeriaImagens")
    const novaDiv = document.createElement("div")
    novaDiv.classList.add("card-imagem")
    novaDiv.innerHTML = 
    `<a href="${elemento.pageURL}" target="_blank">
        <img src="${elemento.largeImageURL}">
        <div class="descImg">
            
        </div>
    </a>
    `
    container.appendChild(novaDiv)
}

const carregarResultados = (array) => {
    array.forEach(criaCard)
}


document.querySelector("#inputPesquisa").addEventListener('keypress', buscarImagens)
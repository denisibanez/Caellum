//FUNCAO MUDA LAYOUT
document.querySelector("#mudaLayout").addEventListener("click", function () {
  var $mural = document.querySelector (".mural");  //pega o elemento com a class="mural"
    $mural.classList.toggle("mural-linhas");  //tira ou coloca a classe
      if ($mural.classList.contains ("mural-linhas")) {
        this.textContent = "colunas";
      }

      else {
        this.textContent = "linhas";
      }
    });

//CRIA CARTAO REMOVER
function cartaoRemover () {
  var $card = document.querySelector("#cartao_" + this.dataset.ref);

  $card.classList.add("cartaoSome");//da uma classe que faze ele sumir devagar
  $card.addEventListener("transitionend", function() {//esperar transicao
    this.remove();//tira da pagina depois da animacao
  });
}

  var $botoes = document.querySelectorAll (".cartaoRemover");//pega os btns
    for (var i = 0; i < $botoes.length; i++ ) {//adiciona o evento em cada botao
      $botoes[i].addEventListener("click", cartaoRemover);
}

//DINAMIZA CARTAO REMOVER
// var contador = document.querySelectorAll(".card").length;//contador de cards id

// document.querySelector(".newCard").onsubmit = function(event) {   //pega o evento do form ao submeter
//   contador++; //incrementa o elemento contador
//   var contentTag = document.querySelector(".newCard-content");    //pega textarea
//   var content = contentTag.value;  //pega o valor da textarea
//
//   var btnRemover = document.createElement("button"); //cria elemento botao
//   btnRemover.classList.add("cartaoRemover");//add classe cartaoRemover
//   btnRemover.setAttribute("data-ref", contador);//add atributo data ref + concatenar variavel contador
//   btnRemover.textContent= "Remover";//add conteudo Remover ao botao
//   btnRemover.addEventListener("click", cartaoRemover);//add ouvinte de evento click do botao remover
//
//   var card = document.createElement("div");//cria elemento div
//     card.classList.add("card");//add classe card na div
//     card.setAttribute("id", "cartao_" + contador);//add atributo id e concatena com variavel contador
//     card.appendChild(cardText); //add conteudo da variavel cardtext
//     card.appendChild(btnRemover); //add conteudo da variavel cardtext
//
//   var cardText = document.createElement ("p");//add paragrafo com texto
//     cardText.classList.add("card-content");//add classe no p
//     cardText.textContent = content;//add o conteudo texto no p
//
//   document.querySelector(".mural").appendChild(card);//add todo conteudo do cartao dentro da div mural
//     event.preventDefault();//pŕevine que o submit nao sera efetuado
// }

//DINAMIZA CARTAO REMOVER JQUERYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
var contador = $(".card").length;//contador de cards id

$(".newCard").submit(function(event) {   //pega o evento do form ao submeter
  contador++; //incrementa o elemento contador
  var contentTag = $(".newCard-content")    //pega textarea
  var content = contentTag.val()  //pega o valor da textarea
    .trim()
    .replace(/\n+/g, "</br>");// substitui os enter por quebra de linha <br>


  var btnRemover = $("<button>") //cria elemento botao
    .addClass("cartaoRemover")//add classe cartaoRemover
    .attr("data-ref", contador)//add atributo data ref + concatenar variavel contador
    .text('X')//add conteudo Remover ao botao
    .on("click", cartaoRemover)//add ouvinte de evento click do botao remover


    var cardText = $("<p>")//add paragrafo com texto
    .addClass("card-content")//add classe no p
    .html(content); //add o conteudo texto no p

  var card = $("<div>")//cria elemento div
    .addClass("card")//add classe card na div
    .attr("id", "cartao_" + contador)//add atributo id e concatena com variavel contador
    .prepend(btnRemover) //add conteudo da variavel cardtext
    .append(cardText) //add conteudo da variavel cardtext


    $(".mural").prepend(card)//add todo conteudo do cartao dentro da div mural
    event.preventDefault();//pŕevine que o submit nao sera efetuado
}
);

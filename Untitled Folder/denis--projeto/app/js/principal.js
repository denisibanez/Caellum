(function () {
  var usuario = "denis";

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

  //funcao dinamiza cartao
  function adicionaCartao (conteudo, cor) {
    contador++; //incrementa o elemento contador

    var btnRemover = $("<button>") //cria elemento botao
      .addClass("cartaoRemover")//add classe cartaoRemover
      .attr("data-ref", contador)//add atributo data ref + concatenar variavel contador
      .text('X')//add conteudo Remover ao botao
      .on("click", cartaoRemover);//add ouvinte de evento click do botao remover

    var cardText = $("<p>")//add paragrafo com texto
      .addClass("card-content")//add classe no p
      .html(conteudo); //add o conteudo texto no p

    var card = $("<div>")//cria elemento div
      .addClass("card")//add classe card na div
      .attr("id", "cartao_" + contador)//add atributo id e concatena com variavel contador
      .prepend(btnRemover) //add conteudo da variavel cardtext
      .css("background-color", cor)
      .append(cardText); //add conteudo da variavel cardtext

    $(".mural").prepend(card);//add todo conteudo do cartao dentro da div mural

  }

  //DINAMIZA CARTAO
  var contador = document.querySelectorAll(".card").length;//contador de cards id
    $(".newCard").submit(function(event) {
      var contentTag = $(".newCard-content");

      var content = contentTag.val()  //pega o valor da textarea
        .trim()
        .replace(/\n+/g, "</br>");// substitui os enter por quebra de linha <br>   //pega o evento do form ao submeter

    adicionaCartao(content);
    event.preventDefault();//pŕevine que o submit nao sera efetuado
  });

  //busca
  $("#search").on("input", function(){
    //guarda o valor diigitado, removendo espaços extras.
    var search = $(this).val().trim();
    if(search.length) {
      $(".card").hide().filter(function(){
        return $(this).find(".card-content")
          .text()
          .match(new RegExp(search, "i"));
      }).show();
    }
    else {
      $(".card").show();
    }
  });

  //ajax e json
  $("#ajuda").click(function(){
    $.getJSON ("https://ceep.herokuapp.com/cartoes/instrucoes",
      function (res) {
        res.instrucoes.forEach(function(instrucao){
          adicionaCartao(instrucao.conteudo, instrucao.cor);
          });
      });
    });


  //sincroniza botao
  $("#sync").click (function() {
    $("#sync").removeClass("botaoSync--sincronizado");
    $("#sync").addClass("botaoSync--esperando");

    var cartoes = [];

    $(".card").each(function(){cthce
      var cartao = {};
      cartao.conteudo = $(this).find(".card-content").html();
      cartoes.push(cartao);
    });

    //nome de usuario
    var mural = {
      usuario: usuario,
      cartoes: cartoes
    }

    $.ajax({
      url:"https://ceep.herokuapp.com/cartoes/salvar",
      method: "POST",
      data: mural,
      success: function (res) {
        $("#sync").addClass("botaoSync--sincronizado");
        console.log(res.quantidade + "cartões salvos em" + res.usuario);
      },
      error: function() {
        $("#sync").addClass("botaoSync--deuRuim");
        console.log("não foi possivel salvar no mural");
      },
      complete:function () {
        $("#sync").removeClass("botaoSync--esperando");
      }
    });
  });
  console.log("teste");
  //pega json carrega no onload
  $.getJSON(
    "https://ceep.herokuapp.com/cartoes/carregar?callback=?",
    {usuario : usuario},
    function (res) {

      res.cartoes.forEach(function(cartao){
        adicionaCartao(cartao.conteudo);
      });
    }
  );
})();

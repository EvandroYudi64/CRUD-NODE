const express = require('express')
const app = new express();
const bodyparse = require('body-parser');
const path = require('path');

const Produto = require("../CRUD-NODE/source/model/Produto");
const DAO = require("../CRUD-NODE/source/controller/ProdutoDAO");

app.use(bodyparse.json());
app.use(bodyparse.urlencoded({extends:true}));
app.use(express.static(path.join(__dirname,"./css/styles.css")));

//config ejs

app.set('view engine','ejs');//ejs como render
app.set('views', path.join(__dirname+"/source/view"));//pasta com os arq ejs


//primeira rota
app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
})

//rota de crud do form
app.post("/cadastro", async function(req,res){
    /* teste de passagem
    let descricao = "";
    let preco = 0;
    let qtde = 0;
    
    try{

        descricao = req.body.txtDescricao;
        preco = parseInt(req.body.txtPreco);
        qtde = parseInt(req.body.txtQuantidade);
        res.render("mostra", {descricao:descricao,preco:preco,qtde:qtde})
    }catch(err){
        console.log("ERRo"+err);
    }
    */
   var lista;
   var a ="";
    const produto = new Produto();
    const dao = new DAO();
    const botao = req.body.b1;
    try {
      switch (botao.toLowerCase()) {
        case 'gravar':
          produto.descricao = req.body.txtDescricao;
          produto.preco = parseFloat(req.body.txtPreco);
          produto.qtde = parseInt(req.body.txtQuantidade);

          await dao.gravar(produto);
          produto.codigo = dao.codigo;
          break;

        case 'alterar':
          produto.codigo = parseInt(req.body.txtCodigo);
          produto.descricao = req.body.txtDescricao;
          produto.preco = parseFloat(req.body.txtPreco);
          produto.qtde = parseInt(req.body.txtQuantidade);
          dao.alterar(produto);
          break;

        case 'remover':
          produto.codigo = req.body.txtCodigo;
          dao.remover(produto);
          break;

        case 'listar':
          await dao.listar();
          listaprod = dao.tabela;
          res.render("listar", {lista: listaprod})
          break;
      }
  
    }
    catch (err) {
      console.log(err);
    }
});

//rota carrinho
const app2 = new express();
app.post('/carrinho', function(req,res){
    let codigo = 0;
    
    try{
        codigo = parseInt(req.body.txtcodigo);
        console.log(req.body.txtcodigo);
        res.render("mostra", {codigo:codigo})
    }catch(err){
        console.log("ERRo"+err);
    }
});
///

app.listen(3000, function(err){
    if(err)
        console.log("ERRO: "+ err)
    else 
        console.log("ROCK");
});
class Produto {
    #codigo;
    #descricao;
    #preco;
    #qtde;
    constructor() {
  
      this.#codigo = 0;
      this.#descricao = "";
      this.#preco = 0;
      this.qtde = 0;
    }
    set codigo(c) {
      this.#codigo = c;
    }
    get codigo() {
      return this.#codigo;
    }
    set descricao(d) {
      this.#descricao = d;
    }
    get descricao() {
      return this.#descricao;
    }
    set preco(p) {
      this.#preco = p;
    }
    get preco() {
      return this.#preco;
    }
    set qtde(q){
        this.#qtde = q;
    }
    get qtde(){
        return this.#qtde;
    }
  }
  module.exports = Produto;
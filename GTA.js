class GTA {
    constructor(nome, anoQSP, dataLancamento, protagonista, antagonista, cidade, posicaoNaLista) {
        this.nome = nome;
        this.anoQSP = anoQSP;
        this.dataLancamento = dataLancamento;
        this.protagonista= protagonista;
        this.antagonista = antagonista;
        this.cidade= cidade;


        this.posicaoNaLista = null; //atributo para facilitar a alteração e exclusão 
    }
}

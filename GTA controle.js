let listaGta = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let gta = null; //variavel global 
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaGta.length; i++) {
        const gta = listaGta[i];
        if (gta.nome == chave) {
            gta.posicaoNaLista = i;
            return listaGta[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const nome = document.getElementById("inputNome").value;
    if (nome) { // se digitou um Nome
        gta = procurePorChavePrimaria(nome);
        if (gta) { //achou na lista
            mostrarDadosGta(gta);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            //limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputNome").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputNome").focus();

}

// Função para alterar um elemento da lista
function alterar() {

    // Remove o readonly dos campos
    bloquearAtributos(false);

    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');

    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clic o botão salvar");
}

// Função para excluir um elemento da lista
function excluir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)

    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");
}

function salvar() {
    //gerencia operações inserir, alterar e excluir na lista

    // obter os dados a partir do html

    let nome;
    if (gta == null) {
        nome = document.getElementById("inputNome").value;
    } else {
        nome = gta.nome;
    }

    const anoQSP = parseInt(document.getElementById("inputAnoQSP").value);
    const dataLancamento = document.getElementById("inputDataLancamento").value;
    const protagonista = document.getElementById("inputProtagonista").value;
    const antagonista = document.getElementById("inputAntagonista").value;
    const cidade = document.getElementById("inputCidade").value; 

    if (anoQSP<0) {
        mostrarAviso("O AnoQSP não pode ser menor que zero");
        return;
    }

    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (nome && anoQSP && dataLancamento && protagonista && antagonista && cidade) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                gta = new GTA(nome, anoQSP, dataLancamento, protagonista, antagonista, cidade);
                listaGta.push(gta);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                gtaAlterado = new GTA(nome, anoQSP, dataLancamento, protagonista, antagonista, cidade);
                listaGta[gta.posicaoNaLista] = gtaAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaGta.length; i++) {
                    if (gta.posicaoNaLista != i) {
                        novaLista.push(listaGta[i]);
                    }
                }
                listaGta = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputNome").focus();
    } else {
        alert("Erro nos dados digitados");
        return;
    }
}

//backend
function preparaListagem(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        const linha = vetor[i];
        texto +=
            linha.nome + " - " +
            linha.anoQSP + " - " +
            linha.dataLancamento + " - " +
            linha.protagonista + " - " +
            linha.antagonista + " - " + 
            linha.cidade + "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaGta);
}

function cancelarOperacao() {
    limparAtributos();
    //bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
    //printa a mensagem na divAviso
    document.getElementById("divAviso").innerHTML = mensagem;
}

// Função para mostrar os dados do GTA nos campos
function mostrarDadosGta(gta) {
    document.getElementById("inputNome").value = gta.nome;
    document.getElementById("inputAnoQSP").value = gta.anoQSP;
    document.getElementById("inputDataLancamento").value = gta.dataLancamento;
    document.getElementById("inputProtagonista").value = gta.protagonista;
    document.getElementById("inputAntagonista").value = gta.antagonista;
    document.getElementById("inputCidade").value = gta.cidade;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputAnoQSP").value = "";
    document.getElementById("inputDataLancamento").value = "";
    document.getElementById("inputProtagonista").value = "";
    document.getElementById("inputAntagonista").value = "";
    document.getElementById("inputCidade").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputNome").readOnly = !soLeitura;
    document.getElementById("inputAnoQSP").readOnly = soLeitura;
    document.getElementById("inputDataLancamento").readOnly = soLeitura;
    document.getElementById("inputProtagonista").readOnly = soLeitura;
    document.getElementById("inputAntagonista").readOnly = soLeitura;
    document.getElementById("inputCidade").readOnly = soLeitura; 
}

// Função para deixar visível ou invisível os botões
function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
    //  visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); 
    //none significa que o botão ficará invisível (visibilidade == none)
    //inline significa que o botão ficará visível 

    document.getElementById("btProcure").style.display = btProcure;
    document.getElementById("btInserir").style.display = btInserir;
    document.getElementById("btAlterar").style.display = btAlterar;
    document.getElementById("btExcluir").style.display = btExcluir;
    document.getElementById("btSalvar").style.display = btSalvar;
    document.getElementById("btCancelar").style.display = btSalvar; // o cancelar sempre aparece junto com o salvar
    document.getElementById("inputNome").focus();
}
function prepararESalvarCSV() { //gera um arquivo csv com as informações de listaMusica vai enviar da memória RAM para dispositivo de armazenamento permanente.
    let nomeDoArquivoDestino = "./gta.csv";  //define o nome do arquivo csv
     let textoCSV = "";
     for (let i = 0; i < listaGta.length; i++) {
         const linha = listaGta[i]; //variavel linha contem as informações de cada musica
         textoCSV += linha.nome + ";" + //concatena os dados dos GTAs formatados para linha csv (separada por ;)
             linha.anoQSP + ";" +
             linha.dataLancamento + ";" +
             linha.protagonista + ";" +
             linha.antagonista + ";" + 
             linha.cidade + "\n";
     }
     persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);
 }
 
 
 function persistirEmLocalPermanente(nomeArq, conteudo) {
     /*cria um blob (objeto que representa dados de arquivo) que armazena "[conteudo]" como arquivo de texto,
     criando um arquivo temporário*/
     const blob = new Blob([conteudo], { type: 'text/plain' });
     //cria o elemento "a" (link temporário) usado para adicionar o dowload do arquivo
     const link = document.createElement('a'); /*cria uma URL temporária que aponta para o blob e
     atribui ela ao href do link para que ele "aponte" para o arquivo gerado (permitindo seu download)*/
     link.href = URL.createObjectURL(blob);
     link.download = nomeArq; // Nome do arquivo de download
     link.click(); //inicia o processo de dowload automaticamente
     // Libera o objeto URL
     URL.revokeObjectURL(link.href); //remove a URL temporária que foi criada (liberando a memória)
 }
 
 
 // Função para abrir o seletor de arquivos para upload (para processar o arquivo selecionado)
 function abrirArquivoSalvoEmLocalPermanente() {
     
     const input = document.createElement('input');
     //cria o elemento input do tipo file (serve para abrir o seletor de arquivos)
     input.type = 'file';
     input.accept = '.csv'; // Aceita apenas arquivos CSV do sistema local
     input.onchange = function (event) {
         /*associa uma função de evento ao onchange, que será chamada quando o usuário selecionar um arquivo
         O evento change é disparado quando um arquivo é selecionado*/
         const arquivo = event.target.files[0]; //acessa o arquivo selecionado e armazena na variavel arquivo
         console.log(arquivo.name);
         if (arquivo) {
             converterDeCSVparaListaObjeto(arquivo);
         }
         /*verifica se um arquivo foi selecionado: 
         se sim, chama a função processarArquivo e passa o arquivo selecionado como argumento
         permitindo que o arquivo seja lido e processado na função processarArquivo*/
     };
     input.click(); //seletor de arquivos exibido automaticamente    
 }
 
 
 // Função para processar o arquivo CSV e transferir os dados para a listaGta
 function converterDeCSVparaListaObjeto(arquivo) {
     const leitor = new FileReader();  //objeto que permite ler arquivos locais no navegador 
     leitor.onload = function (e) {
         const conteudo = e.target.result; // Conteúdo do arquivo CSV
         const linhas = conteudo.split('\n'); // Separa o conteúdo por linha
         listaGta = []; // Limpa a lista atual (se necessário)
         for (let i = 0; i < linhas.length; i++) {
             const linha = linhas[i].trim();  //linhas[i] representa cada linha do arquivo CSV
             if (linha) { //verifica se a linha não está vazia
                 const dados = linha.split(';'); // Separa os dados por ';'
                 if (dados.length === 6) { //verifica os seis campos
                     // Adiciona os dados à listaGta como um objeto
                     listaGta.push({
                         nome: dados[0],
                         anoQSP: dados[1],
                         dataLancamento: dados[2],
                         protagonista: dados[3],
                         antagonista: dados[4],
                         cidade: dados[5]
                     });
                 }
             }
         }
         listar(); //exibe a lista atualizada
     };
     leitor.readAsText(arquivo); // Lê o arquivo como texto
 }
 

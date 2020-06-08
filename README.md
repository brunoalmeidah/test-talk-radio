# Começando

Use o git clone ou faça o download deste projeto.

## Instalação

Depois de clonar o repositório, entre na pasta do projeto e execute o comando abaixo :

```
yarn
```

# Rodando os testes

Para rodar os testes rode o comando abaixo:

```
yarn test
```

# Inicialização

Para iniciar o servidor, entre dentro da pasta do projeto e rode o seguinte comando:

```
yarn dev
```

# Solução Proposta

### Tarefa 1

Dentro da pasta src/utils/ foi criado o LogParser.js, uma classe que herda a classe Transform da biblioteca stream do node, o objetivo desse LogParser é ser usado como um Pipe em um ReadStream para analisar o arquivo de log e retornar os resultados de cadad jogo. O Parser é utilizado na leitura do arquivo dentro do ImportGameResultService dentro da pasta src/services/.

### Tarefa 2

Dentro da pasta src/services/ temos o arquivo GameResultReportService utilizado para imprimir um relatório no console.log, dos hashs gerados de cada resultado e um ranking geral.

### Tarefa 3

Dentro da pasta src/ temos o arquivo routes.js com a seguinte rota :

```
/games/:id
```

você pode acessar essa rota de qualquer client, enviando o ID a api retornará o resultado do Jogo, o ID do jogo é mostrado em log no terminal quando o servidor inicializa.

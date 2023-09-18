
class Node {
  constructor(value) {
    this.value = value;
    this.camada = 0;
    this.filhos = [];
  }
}

class Arvore {
  constructor(raiz) {
    this.raiz = raiz;
  }
}

function buscaEmLargura(grafoExemplo, inicio, destino) {
  let camada = 0;

  const nodes = {}
  nodes[inicio] = new Node(inicio);
  const arvoreDeBusca = new Arvore(nodes[inicio]);

  const grafo = grafoExemplo

  const explorados = [];
  explorados.push(inicio);
  const fila = [];
  fila.push([inicio, 0]);

  const caminho = [];

  let i = 0

  while (fila.length > 0) {
    const [primeiro, custoAtual] = fila.shift();
    console.log(primeiro);


    if (primeiro === destino) {
      return {
        arvore: arvoreDeBusca,
        caminho: caminho,
        custo: custoAtual
      };
    }

    for (const vizinho of grafo[primeiro].ways) {
      const custo = calcula_distancia(grafo[primeiro], grafo[vizinho])
      if (!nodes[vizinho]) {
        nodes[vizinho] = new Node(vizinho);
      }

      if (!explorados.includes(vizinho)) {
        explorados.push(vizinho);
        fila.push([vizinho, custo + custoAtual]);
        camada = nodes[primeiro].camada + 1;
        nodes[vizinho].camada = camada;
        nodes[primeiro].filhos.push(nodes[vizinho]);
      }
    }
  }

  return {
    arvore: arvoreDeBusca,
    caminho: [],
    custo: -1
  };
}

function calcula_distancia(x, y){

  return Math.sqrt( Math.pow(y.coordinates[0] - x.coordinates[0],2) + Math.pow(y.coordinates[1] - x.coordinates[1],2) )
}


function init_networkBFS(grafo, arvore) {
  // create an array with nodes
  let node_data = []
  for (const node in grafo) {
    node_data.push({
      id: node,
      label: node
    })
  }

  var nodes = new vis.DataSet(node_data);

  let edge_data = []
  let node;
  let node_list = [arvore.raiz]

  let i = 0

  while (node_list.length > 0) {
    node = node_list.pop();

    for (const filho of node.filhos) {
      node_list.push(filho);
      edge_data.push({
        from: node.value,
        to: filho.value
      });
    }
  }

  console.log(edge_data);

  // create an array with edges
  var edges = new vis.DataSet(edge_data);

  // create a network
  var container = document.getElementById('network');

  // provide the data in the vis format
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {};

  // initialize your network!
  var network = new vis.Network(container, data, options);
  return network;
}




function BFSrun(grafoExemplo, noInical, noFinal){
  

  const { arvore, caminho, custo } = buscaEmLargura(grafoExemplo, noInical, noFinal);
  console.log(arvore);

  console.log("Custo:", custo);
  console.log("Caminho:", caminho); // Deve imprimir "Custo mínimo: 9" e "Caminho: [ 'A', 'B', 'D', 'F' ]"

  return init_networkBFS(grafoExemplo, arvore)
}


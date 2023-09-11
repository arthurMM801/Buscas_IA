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

  const grafo = grafoExemplo;

  const explorados = [];
  explorados.push(inicio);
  const fila = [];
  fila.push([inicio, 0]);

  const caminho = [];

  let i = 0

  while (fila.length > 0) {
    const [primeiro, custoAtual] = fila.shift();

    if (primeiro === destino) {
      return {
        arvore: arvoreDeBusca,
        caminho: caminho,
        custo: custoAtual
      };
    }

    for (const [vizinho, custo] of grafo[primeiro]) {
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


function init_network(grafo, arvore) {
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
  var container = document.getElementById('networkBFS');

  // provide the data in the vis format
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {};

  // initialize your network!
  var network = new vis.Network(container, data, options);
}




function run(){
  const grafoExemplo = {
    A: [['B', 2], ['C', 4]],
    B: [['D', 5]],
    C: [['E', 3]],
    D: [['F', 6]],
    E: [['F', 2]],
    F: [],
  };


  const { arvore, caminho, custo } = buscaEmLargura(grafoExemplo, "A", "F");
  console.log(arvore);

  console.log("Custo:", custo);
  console.log("Caminho:", caminho); // Deve imprimir "Custo mínimo: 9" e "Caminho: [ 'A', 'B', 'D', 'F' ]"

  init_network(grafoExemplo, arvore)
}
run()

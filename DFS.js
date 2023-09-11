<<<<<<< Updated upstream


function DFS_pilha(grafoExemplo, vertice) {
  const explorados = [vertice];
  const pilha = [vertice];

  const nodes = {}
  nodes[vertice] = new Node(vertice);
  const G = new Arvore(nodes[vertice]);

  while (pilha.length > 0) {
    const u = pilha.pop();
    for (const [vizinho, peso] of grafoExemplo[u]) {
      if (!explorados.includes(vizinho)) {

        if (!nodes[vizinho]) {
          nodes[vizinho] = new Node(vizinho);
        }

        nodes[u].filhos.push(nodes[vizinho]);
        explorados.push(vizinho);
        pilha.push(vizinho);
      }
    }
  }

  return G;
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
  var container = document.getElementById('networkDFS');

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
  
  // Exemplo de uso
  const grafoExemplo = {
    A: [['B', 2], ['C', 4]],
    B: [['D', 5]],
    C: [['E', 3]],
    D: [['F', 6]],
    E: [['F', 2]],
    F: [],
  };

  const arvore = DFS_pilha(grafoExemplo, 'A');
  console.log(arvore);

  init_network(grafoExemplo, arvore)
}

run()
=======
class Node {
    constructor(value) {
      this.value = value;
      this.camada = 0;
      this.filhos = [];
    }
  }
  
  class Grafo {
    constructor() {
      this.vertices = {};
    }
  
    addVertice(nome) {
      if (!this.vertices[nome]) {
        this.vertices[nome] = new Node(nome);
      }
    }
  
    addAresta(origem, destino) {
      if (!this.vertices[origem] || !this.vertices[destino]) {
        throw new Error('Vértices não existem no grafo');
      }
      this.vertices[origem].filhos.push(this.vertices[destino]);
    }
  }
  
  function DFS_pilha(grafoExemplo, vertice) {
    const explorados = [vertice];
    const pilha = [vertice];
    const G = new Grafo();
  
    while (pilha.length > 0) {
      const u = pilha.pop();
      for (const [vizinho, peso] of grafoExemplo[u]) {
        if (!explorados.includes(vizinho)) {
          G.addVertice(u);
          G.addVertice(vizinho);
          G.addAresta(u, vizinho);
          explorados.push(vizinho);
          pilha.push(vizinho);
        }
      }
    }
  
    return explorados;
  }
  
  // Exemplo de uso
  const grafoExemplo = {
    A: [['B', 2], ['C', 4]],
    B: [['D', 5]],
    C: [['E', 3]],
    D: [['F', 6]],
    E: [['F', 2]],
    F: [],
  };
  
  const explorados = DFS_pilha(grafoExemplo, 'A');
  console.log(explorados);
  
>>>>>>> Stashed changes

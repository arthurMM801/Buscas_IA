

function DFS_pilha(grafoExemplo, vertice) {
  const explorados = [vertice];
  const pilha = [vertice];

  const nodes = {}
  nodes[vertice] = new Node(vertice);
  const G = new Arvore(nodes[vertice]);

  while (pilha.length > 0) {
    const u = pilha.pop();
    for (const vizinho of grafoExemplo[u].ways) {
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
    '-53.12052_-27.90799': {
      coordinates: [ -53.120523, -27.9079902 ],
      ways: [ '-53.11963_-27.90860', '-53.12010_-27.90759' ]
    },
    '-53.11963_-27.90860': {
      coordinates: [ -53.1196312, -27.9085981 ],
      ways: [ '-53.12052_-27.90799', '-53.11926_-27.90893' ]
    },
    '-53.11926_-27.90893': {
      coordinates: [ -53.1192609, -27.9089283 ],
      ways: [ '-53.11963_-27.90860' ]
    },
    '-53.12010_-27.90759': {
      coordinates: [ -53.1200986, -27.9075937 ],
      ways: [ '-53.12052_-27.90799', '-53.11954_-27.90707' ]
    },
    '-53.11954_-27.90707': {
      coordinates: [ -53.1195384, -27.9070703 ],
      ways: [ '-53.12010_-27.90759', '-53.11879_-27.90641' ]
    },
    '-53.11879_-27.90641': {
      coordinates: [ -53.1187916, -27.9064067 ],
      ways: [ '-53.11954_-27.90707', '-53.11835_-27.90602' ]
    },
    '-53.11835_-27.90602': {
      coordinates: [ -53.1183528, -27.9060167 ],
      ways: [ '-53.11879_-27.90641', '-53.11829_-27.90596' ]
    },
    '-53.11829_-27.90596': {
      coordinates: [ -53.1182856, -27.9059613 ],
      ways: [ '-53.11835_-27.90602' ]
    }
  };

  const arvore = DFS_pilha(grafoExemplo, "-53.12052_-27.90799", "-53.12010_-27.90759");
  console.log(arvore);

  init_network(grafoExemplo, arvore)
}

run()

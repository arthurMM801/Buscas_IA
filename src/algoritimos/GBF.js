class FilaPrioritaria {
  constructor() {
    this.elementos = [];
  }

  enfileirar(elemento, prioridade) {
    this.elementos.push({ elemento, prioridade });
    this.elementos.sort((a, b) => a.prioridade - b.prioridade);
  }

  desenfileirar() {
    return this.elementos.shift().elemento;
  }

  estaVazia() {
    return this.elementos.length === 0;
  }
}

function buscaGulosaMelhorPrimeira(grafo, inicio, objetivo) {
  const conjuntoAberto = new FilaPrioritaria();
  conjuntoAberto.enfileirar(inicio, 0);
  const veioDe = {};

  const custoG = {};
  const custoF = {};

  for (const no in grafo) {
    custoG[no] = Infinity;
    custoF[no] = Infinity;
  }

  custoG[inicio] = 0;
  custoF[inicio] = calcula_distancia(grafo[inicio], grafo[objetivo])

  while (!conjuntoAberto.estaVazia()) {
    const atual = conjuntoAberto.desenfileirar();

    if (atual == objetivo) {
      return reconstruirCaminho(veioDe, atual);
    }

    for (const vizinho of grafo[atual].ways) {
      const custoGtentativo = custoG[atual] + 1; // Supondo custo de aresta uniforme

      if (custoGtentativo < custoG[vizinho]) {
        veioDe[vizinho] = atual;
        custoG[vizinho] = custoGtentativo;
        custoF[vizinho] = custoG[vizinho] + calcula_distancia(grafo[vizinho], grafo[objetivo]);

        if (!conjuntoAberto.elementos.some((elemento) => elemento.elemento === vizinho)) {
          conjuntoAberto.enfileirar(vizinho, custoF[vizinho]);
        }
      }
    }
  }

  return null; // Nenhum caminho encontrado
}

function reconstruirCaminho(veioDe, atual) {
  const caminho = [atual];
  while (veioDe[atual]) {
    atual = veioDe[atual];
    caminho.unshift(atual);
  }
  console.log("Caminho:", caminho.join(" -> "));
  return caminho;
}


function calcula_distancia(x, y) {

  return Math.sqrt(Math.pow(y.coordinates[0] - x.coordinates[0], 2) + Math.pow(y.coordinates[1] - x.coordinates[1], 2))
}



// Exemplo de uso:
const grafoExemplo = {
  '-53.12052_-27.90799': {
    coordinates: [-53.120523, -27.9079902],
    ways: ['-53.11963_-27.90860', '-53.12010_-27.90759']
  },
  '-53.11963_-27.90860': {
    coordinates: [-53.1196312, -27.9085981],
    ways: ['-53.12052_-27.90799', '-53.11926_-27.90893']
  },
  '-53.11926_-27.90893': {
    coordinates: [-53.1192609, -27.9089283],
    ways: ['-53.11963_-27.90860']
  },
  '-53.12010_-27.90759': {
    coordinates: [-53.1200986, -27.9075937],
    ways: ['-53.12052_-27.90799', '-53.11954_-27.90707']
  },
  '-53.11954_-27.90707': {
    coordinates: [-53.1195384, -27.9070703],
    ways: ['-53.12010_-27.90759', '-53.11879_-27.90641']
  },
  '-53.11879_-27.90641': {
    coordinates: [-53.1187916, -27.9064067],
    ways: ['-53.11954_-27.90707', '-53.11835_-27.90602']
  },
  '-53.11835_-27.90602': {
    coordinates: [-53.1183528, -27.9060167],
    ways: ['-53.11879_-27.90641', '-53.11829_-27.90596']
  },
  '-53.11829_-27.90596': {
    coordinates: [-53.1182856, -27.9059613],
    ways: ['-53.11835_-27.90602']
  }
};



function init_network(grafo, caminho) {
  console.log(caminho);

  // Converter o grafo para o formato esperado pela vis.js
  const nodes = [];
  const edges = [];

  // Adicionar nós ao array nodes
  for (const node in grafo) {
    nodes.push({ id: node, label: node });
  }

  // Adicionar arestas ao array edges
  for (const node in grafo) {
    const vizinhos = grafo[node].ways;
    for (const vizinho of vizinhos) {

      edges.push({ from: node, to: vizinho });
      grafo[node].ways = grafo[node].ways.filter(way => way != vizinho)
      grafo[vizinho].ways = grafo[vizinho].ways.filter(way => way != node)
    }
  }

  // Objeto de dados para a vis.js
  const data = {
    nodes: new vis.DataSet(nodes),
    edges: new vis.DataSet(edges),
  };

  // Itere pelo array de nós e atualize as propriedades de cor
  for (const node of nodes) {
    if (caminho.includes(node.id)) {
      node.color = 'red'; // Defina a cor dos nós do caminho como vermelho
    } else {
      delete node.color; // Remova a cor dos outros nós
    }
  }

  // Itere pelo array de arestas e atualize as propriedades de cor
  for (const edge of edges) {
    const fromNode = caminho.indexOf(edge.from);
    const toNode = caminho.indexOf(edge.to);

    if (fromNode !== -1 && toNode !== -1 && fromNode + 1 === toNode) {
      edge.color = 'red'; // Defina a cor das arestas do caminho como vermelho
    } else {
      delete edge.color; // Remova a cor das outras arestas
    }
  }

  // Opções para a visualização (você pode personalizar isso conforme necessário)
  const options = {};

  // Criar a visualização do grafo
  const container = document.getElementById('networkGBF');
  const network = new vis.Network(container, data, options);
}


function run() {
  const noInicio = "-53.12052_-27.90799";
  const noObjetivo = "-53.12010_-27.90759";

  const caminho = buscaGulosaMelhorPrimeira(grafoExemplo, noInicio, noObjetivo);

  if (caminho) {
    console.log("Caminho encontrado:");
    console.log(caminho);
    init_network(grafoExemplo, caminho)
  } else {
    console.log("Nenhum caminho encontrado.");
  }
}


run();
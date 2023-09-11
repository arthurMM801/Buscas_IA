class FilaDePrioridade {
  constructor() {
    this.elements = [];
  }

  isEmpty() {
    return this.elements.length === 0;
  }

  enqueue(element) {
    this.elements.push(element);
    this.elements.sort((a, b) => a.distancia - b.distancia);
  }

  dequeue() {
    return this.elements.shift();
  }
}

function custoUniformeSearch(grafo, inicio, final) {
  const fila = new FilaDePrioridade();
  fila.enqueue({ node: inicio, distancia: 0 });

  const explorando = new Set();
  const pai = {};

  while (!fila.isEmpty()) {
    const { node, distancia } = fila.dequeue();
    console.log(`Explorando nó: ${node}, Custo atual: ${distancia}`);

    if (node === final) {
      console.log('Caminho encontrado!');

      // Reconstruir o caminho a partir das informações em pai
      const caminho = buildCaminho(pai, final);
      console.log('Melhor caminho:', caminho.join(' -> '));
      console.log('Custo Total:', distancia);
      return { caminho, distancia };
    }

    if (!explorando.has(node)) {
      explorando.add(node);

      const vizinhos = grafo[node] || [];

      for (const [n, nDistancia] of vizinhos) {
        const novaDistancia = distancia + nDistancia;
        fila.enqueue({ node: n, distancia: novaDistancia });

        // Registre o nó anterior para reconstruir o caminho
        pai[n] = node;
      }
    }
  }

  console.log('Caminho não encontrado');
  return { caminho: null, distancia: null }; // Caminho não encontrado
}

function buildCaminho(pai, current) {
  const caminho = [current];
  while (pai[current]) {
    current = pai[current];
    caminho.unshift(current);
  }
  return caminho;
}

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
    const vizinhos = grafo[node];
    for (const [vizinho, peso] of vizinhos) {
      edges.push({ from: node, to: vizinho, label: String(peso) });
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
  const container = document.getElementById('networkUC');
  const network = new vis.Network(container, data, options);
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

  const resultado = custoUniformeSearch(grafoExemplo, 'A', 'F');

  if (resultado.caminho) {
    console.log('Caminho encontrado:', resultado.caminho);
    console.log('Custo Total:', resultado.distancia);
  } else {
    console.log('Caminho não encontrado');
  }

  init_network(grafoExemplo, resultado.caminho)
}

run();
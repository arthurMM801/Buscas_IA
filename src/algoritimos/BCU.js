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
  const d = {};

  for (const node of Object.keys(grafo)) {
    d[node] = Infinity;
    pai[node] = null;
  }
  d[inicio] = 0;

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

      const vizinhos = grafo[node].ways || [];

      for (const n of vizinhos) {
        const nDistancia = calcula_distancia(grafo[node], grafo[n]);
        const novaDistancia = distancia + nDistancia;

        if (novaDistancia < d[n]) { // Verifique se a nova distância é menor
          fila.enqueue({ node: n, distancia: novaDistancia });
          pai[n] = node;
          d[n] = novaDistancia;
        }
      }
    }
  }

  console.log('Caminho não encontrado');
  return { caminho: null, distancia: null }; // Caminho não encontrado
}


function calcula_distancia(x, y){

  return Math.sqrt( Math.pow(y.coordinates[0] - x.coordinates[0],2) + Math.pow(y.coordinates[1] - x.coordinates[1],2) )
}


function buildCaminho(pai, current) {
  console.log(pai);
  const caminho = [current];
  while (pai[current]) {
    current = pai[current];
    caminho.unshift(current);
    console.log(caminho);
  }
  return caminho;
}

function init_networkBCU(grafo, caminho) {
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
  const container = document.getElementById('network');
  const network = new vis.Network(container, data, options);
  return network
}

function BCUrun(grafoExemplo, noInical, noFinal){
  
  const resultado = custoUniformeSearch(grafoExemplo, noInical, noFinal);
  console.log(resultado);

  if (resultado.caminho) {
    console.log('Caminho encontrado:', resultado.caminho);
    console.log("123");
    console.log('Custo Total:', resultado.distancia);
    return init_networkBCU(grafoExemplo, resultado.caminho)
  } else {
    console.log('Caminho não encontrado');
  }

  
}

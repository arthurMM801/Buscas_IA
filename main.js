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
        fila.enqueue({ node: n, distancia: nDistancia });

        // Registre o nó anterior para reconstruir o caminho
        pai[n] = node;
        console.log(`Adicionando nó na fronteira: ${n}, Novo custo: ${novaDistancia}`);
      }
    }
    console.log(fila.elements);
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

const grafo = {
  A: [['B', 2], ['C', 4]],
  B: [['D', 5]],
  C: [['E', 3]],
  D: [['F', 6]],
  E: [['F', 2]],
  F: [],
};

const resultado = custoUniformeSearch(grafo, 'A', 'F');

if (resultado.caminho) {
  console.log('Caminho encontrado:', resultado.caminho.join(' -> '));
  console.log('Custo Total:', resultado.distancia);
} else {
  console.log('Caminho não encontrado');
}

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
  
  function buscaEmLargura(grafoExemplo, vertice) {
    let camada = 0;
    nodes[vertice].camada = camada;
    const arvoreDeBusca = new Arvore(nodes[vertice]);
    const grafo = grafoExemplo;
  
    const explorados = [];
    explorados.push(vertice);
    const fila = [];
    fila.push(vertice);
  
    while (fila.length > 0) {
      const primeiro = fila.shift();
      for (const [vizinho, peso] of grafo[primeiro]) {
        if (!explorados.includes(vizinho)) {
          explorados.push(vizinho);
          fila.push(vizinho);
          camada = nodes[primeiro].camada + 1;
          nodes[vizinho].camada = camada;
          nodes[primeiro].filhos.push(nodes[vizinho]);
        }
      }
    }
  
    return arvoreDeBusca;
  }
  
  // Exemplo de uso
  const nodes = {
    A: new Node('A'),
    B: new Node('B'),
    C: new Node('C'),
    D: new Node('D'),
    E: new Node('E'),
    F: new Node('F'),
  };
  
  const grafoExemplo = {
    A: [['B', 2], ['C', 4]],
    B: [['D', 5]],
    C: [['E', 3]],
    D: [['F', 6]],
    E: [['F', 2]],
    F: [],
  };
  
  const arvoreResultado = buscaEmLargura(grafoExemplo, 'A');
  console.log(arvoreResultado);
  
  
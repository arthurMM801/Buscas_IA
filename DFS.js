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
  
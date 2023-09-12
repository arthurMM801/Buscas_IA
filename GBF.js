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

function buscaGulosaMelhorPrimeira(grafo, inicio, objetivo, heuristica) {
  const conjuntoAberto = new FilaPrioritaria();
  conjuntoAberto.enfileirar(inicio, heuristica[inicio]);
  const veioDe = {};

  const custoG = {};
  const custoF = {};

  for (const no in grafo) {
    custoG[no] = Infinity;
    custoF[no] = Infinity;
  }

  custoG[inicio] = 0;
  custoF[inicio] = heuristica[inicio];

  while (!conjuntoAberto.estaVazia()) {
    const atual = conjuntoAberto.desenfileirar();

    if (atual === objetivo) {
      return reconstruirCaminho(veioDe, atual);
    }

    for (const vizinho of grafo[atual]) {
      const custoGtentativo = custoG[atual] + 1; // Supondo custo de aresta uniforme

      if (custoGtentativo < custoG[vizinho]) {
        veioDe[vizinho] = atual;
        custoG[vizinho] = custoGtentativo;
        custoF[vizinho] = custoG[vizinho] + heuristica[vizinho];

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

// Exemplo de uso:
const grafo = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E", "G"],
  G: ["F"],
};

const heuristica = {
  A: 3,
  B: 2,
  C: 4,
  D: 5,
  E: 2,
  F: 3,
  G: 0,
};

const noInicio = "G";
const noObjetivo = "B";

const caminho = buscaGulosaMelhorPrimeira(grafo, noInicio, noObjetivo, heuristica);

if (caminho) {
  console.log("Caminho encontrado:");
  console.log(caminho);
} else {
  console.log("Nenhum caminho encontrado.");
}

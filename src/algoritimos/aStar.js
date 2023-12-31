function aStar(grafo, start, end) {
    // Definir um conjunto para nós abertos e um conjunto para nós fechados
    let openSet = [start];
    let closedSet = [];

    // Criar um mapa para rastrear os custos do caminho atual para cada nó
    let gScore = {};
    gScore[start] = 0;

    // Criar um mapa para rastrear os custos estimados do caminho até o destino para cada nó
    let fScore = {};
    fScore[start] = heuristic(grafo[start], grafo[end]);

    // Criar um mapa para rastrear o nó pai de cada nó
    let cameFrom = {};

    while (openSet.length > 0) {
        // Encontrar o nó com menor fScore no conjunto aberto
        let current = openSet.reduce((a, b) => fScore[a] < fScore[b] ? a : b);

        if (current === end) {
            let path = reconstructPath(cameFrom, current);
            return path;
        }

        // Remover o nó atual do conjunto aberto e adicioná-lo ao conjunto fechado
        openSet = openSet.filter(node => node !== current);
        closedSet.push(current);

        // Iterar sobre os vizinhos do nó atual
        for (let neighbor of grafo[current].ways) {
            if (closedSet.includes(neighbor)) continue;

            let tentativeGScore = gScore[current] + heuristic(grafo[current], grafo[neighbor]);

            if (!openSet.includes(neighbor) || tentativeGScore < gScore[neighbor]) {
                // Este caminho é o melhor até agora, salvar os dados
                cameFrom[neighbor] = current;
                gScore[neighbor] = tentativeGScore;
                fScore[neighbor] = gScore[neighbor] + heuristic(grafo[neighbor], grafo[end]);

                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                }
            }
        }
    }

    // Se chegamos aqui, não há caminho possível
    return null;
}

function heuristic(x, y) {

    return Math.sqrt(Math.pow(y.coordinates[0] - x.coordinates[0], 2) + Math.pow(y.coordinates[1] - x.coordinates[1], 2))
}

function reconstructPath(cameFrom, current) {
    let path = [current];
    while (cameFrom[current] !== undefined) {
        current = cameFrom[current];
        path.unshift(current);
    }
    return path;
}


function init_networkaStart(grafo, caminho) {
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



function aStarRun(grafoExemplo, noInical, noFinal) {


    const noInicio = "-53.12052_-27.90799";
    const noObjetivo = "-53.12010_-27.90759";

    const caminho = aStar(grafoExemplo, noInical, noFinal);

    if (caminho) {
        console.log("Caminho encontrado:");
        console.log(caminho);
        return init_networkaStart(grafoExemplo, caminho)
    } else {
        console.log("Nenhum caminho encontrado.");
    }

}

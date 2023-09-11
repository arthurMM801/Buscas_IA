function aStar(graph, start, end) {
    // Definir um conjunto para nós abertos e um conjunto para nós fechados
    let openSet = [start];
    let closedSet = [];
    
    // Criar um mapa para rastrear os custos do caminho atual para cada nó
    let gScore = {};
    gScore[start] = 0;
    
    // Criar um mapa para rastrear os custos estimados do caminho até o destino para cada nó
    let fScore = {};
    fScore[start] = heuristic(start, end);
    
    while (openSet.length > 0) {
      // Encontrar o nó com menor fScore no conjunto aberto
      let current = openSet.reduce((a, b) => fScore[a] < fScore[b] ? a : b);
      
      if (current === end) {
        return reconstructPath(gScore, current);
      }
      
      // Remover o nó atual do conjunto aberto e adicioná-lo ao conjunto fechado
      openSet = openSet.filter(node => node !== current);
      closedSet.push(current);
      
      // Iterar sobre os vizinhos do nó atual
      for (let neighbor in graph[current]) {
        if (closedSet.includes(neighbor)) continue;
        
        let tentativeGScore = gScore[current] + graph[current][neighbor];
        
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        } else if (tentativeGScore >= gScore[neighbor]) {
          continue;
        }
        
        // Este caminho é o melhor até agora, salvar os dados
        gScore[neighbor] = tentativeGScore;
        fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, end);
      }
    }
    
    // Se chegamos aqui, não há caminho possível
    return null;
  }
  
  function heuristic(node, end) {
    // Esta é a função heurística, que estima o custo restante para o destino
    // Pode ser qualquer função que nunca superestime o custo
    // Por exemplo, distância euclidiana para coordenadas no plano
    return Math.abs(node.x - end.x) + Math.abs(node.y - end.y);
  }
  
  function reconstructPath(gScore, current) {
    // Reconstroi o caminho a partir dos dados de gScore
    let path = [current];
    while (gScore[current] !== 0) {
      let neighbors = Object.keys(graph[current]);
      let nextNode = neighbors.reduce((a, b) => gScore[a] < gScore[b] ? a : b);
      path.unshift(nextNode);
      current = nextNode;
    }
    return path;
  }
  
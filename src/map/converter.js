const fs = require('fs');

// Função para criar o grafo a partir dos dados JSON
function criarGrafo(data) {
    const grafo = {};

    for (const elemento of data) {
        const coordinates = elemento.geometry.coordinates;
        
        for (let i = 0; i < coordinates.length; i++) {
            const coordenada = coordinates[i];

            const id = coordenada[0].toFixed(3) + '_' + coordenada[1].toFixed(3)
            
            if (!grafo[id]) {
                grafo[id] = {
                    coordinates: coordenada,
                    ways: [],
                };
            }

            // Adicionar arestas entre nós na mesma coordenada
            let j = i+1
            if(j < coordinates.length){
                let noj = coordinates[j]
                const outroId = noj[0].toFixed(3) + '_' + noj[1].toFixed(3);

                if(grafo[id].ways.includes(outroId) || id == outroId){
                    continue
                }

                grafo[id].ways.push(outroId);
                if (!grafo[outroId]) {
                    grafo[outroId] = {
                        coordinates: noj,
                        ways: [],
                    };
                }
                grafo[outroId].ways.push( id );
            }

           /*  // adiciona 
            for (let j = i; j < coordinates.length; j++) {

                let noj = coordinates[j];
                
                const outroId = noj[0].toFixed(3) + '-' + noj[1].toFixed(3);
                grafo[id].ways.push(outroId);

                if (!grafo[outroId]) {
                    grafo[outroId] = {
                        coordinates: noj,
                        ways: [],
                    };
                }
                grafo[outroId].ways.push( id );
            } */
        }
    }

    return grafo;
}

// Ler o arquivo JSON
fs.readFile('C:/Users/arthu/workspace/IA - buscas/src/map/test.json', 'utf-8', (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo JSON:', err);
        return;
    }

    try {
        const jsonData = JSON.parse(data);
        const grafo = criarGrafo(jsonData);

    } catch (error) {
        console.error('Erro ao analisar o JSON:', error);
    }
});

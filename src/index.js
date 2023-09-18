const state = {}; 
const graph = {
    '-53.121_-27.908': {
      coordinates: [ -53.120523, -27.9079902 ],
      ways: [ '-53.120_-27.909', '-53.120_-27.908' ]
    },
    '-53.120_-27.909': {
      coordinates: [ -53.1196312, -27.9085981 ],
      ways: [ '-53.121_-27.908', '-53.119_-27.909', '-53.119_-27.908' ]
    },
    '-53.119_-27.909': {
      coordinates: [ -53.1192609, -27.9089283 ],
      ways: [ '-53.120_-27.909' ]
    },
    '-53.121_-27.906': {
      coordinates: [ -53.1205293, -27.9060129 ],
      ways: [ '-53.119_-27.905', '-53.120_-27.905' ]
    },
    '-53.119_-27.905': {
      coordinates: [ -53.1193031, -27.9049515 ],
      ways: [
        '-53.121_-27.906',
        '-53.120_-27.905',
        '-53.118_-27.906',
        '-53.120_-27.906'
      ]
    },
    '-53.119_-27.908': {
      coordinates: [ -53.1194815, -27.9084379 ],
      ways: [
        '-53.120_-27.909',
        '-53.118_-27.907',
        '-53.120_-27.908',
        '-53.118_-27.908'
      ]
    },
    '-53.118_-27.907': {
      coordinates: [ -53.1182789, -27.9073585 ],
      ways: [ '-53.119_-27.908', '-53.118_-27.906', '-53.117_-27.907' ]
    },
    '-53.121_-27.905': {
      coordinates: [ -53.1213228, -27.9051972 ],
      ways: [ '-53.120_-27.904' ]
    },
    '-53.120_-27.904': {
      coordinates: [ -53.120092, -27.9041237 ],
      ways: [
        '-53.121_-27.905',
        '-53.121_-27.904',
        '-53.121_-27.903',
        '-53.120_-27.905'
      ]
    },
    '-53.120_-27.905': {
      coordinates: [ -53.1196894, -27.9045569 ],
      ways: [ '-53.121_-27.906', '-53.120_-27.904', '-53.119_-27.905' ]
    },
    '-53.122_-27.905': {
      coordinates: [ -53.1216825, -27.9048026 ],
      ways: [ '-53.121_-27.904' ]
    },
    '-53.121_-27.904': {
      coordinates: [ -53.1207209, -27.9040216 ],
      ways: [ '-53.122_-27.905', '-53.120_-27.904' ]
    },
    '-53.120_-27.908': {
      coordinates: [ -53.1200986, -27.9075937 ],
      ways: [ '-53.121_-27.908', '-53.120_-27.907', '-53.119_-27.908' ]
    },
    '-53.120_-27.907': {
      coordinates: [ -53.1195384, -27.9070703 ],
      ways: [ '-53.120_-27.908', '-53.119_-27.906' ]
    },
    '-53.119_-27.906': {
      coordinates: [ -53.1187916, -27.9064067 ],
      ways: [ '-53.120_-27.907', '-53.118_-27.906' ]
    },
    '-53.118_-27.906': {
      coordinates: [ -53.1183528, -27.9060167 ],
      ways: [ '-53.119_-27.906', '-53.119_-27.905', '-53.118_-27.907' ]
    },
    '-53.118_-27.908': {
      coordinates: [ -53.1184354, -27.9082103 ],
      ways: [ '-53.119_-27.908' ]
    },
    '-53.123_-27.901': {
      coordinates: [ -53.1225227, -27.9014049 ],
      ways: [ '-53.122_-27.902' ]
    },
    '-53.122_-27.902': {
      coordinates: [ -53.1224256, -27.901568 ],
      ways: [ '-53.123_-27.901', '-53.122_-27.903' ]
    },
    '-53.122_-27.903': {
      coordinates: [ -53.1215127, -27.9025864 ],
      ways: [ '-53.122_-27.902', '-53.121_-27.903' ]
    },
    '-53.121_-27.903': {
      coordinates: [ -53.121238, -27.9028808 ],
      ways: [ '-53.122_-27.903', '-53.120_-27.904' ]
    },
    '-53.117_-27.907': {
      coordinates: [ -53.1174041, -27.9071576 ],
      ways: [ '-53.118_-27.907', '-53.116_-27.908' ]
    },
    '-53.116_-27.908': {
      coordinates: [ -53.1160746, -27.9077112 ],
      ways: [ '-53.117_-27.907', '-53.115_-27.908' ]
    },
    '-53.115_-27.908': {
      coordinates: [ -53.1153853, -27.9079799 ],
      ways: [ '-53.116_-27.908', '-53.114_-27.908' ]
    },
    '-53.114_-27.908': {
      coordinates: [ -53.1142868, -27.9081351 ],
      ways: [ '-53.115_-27.908', '-53.113_-27.908' ]
    },
    '-53.113_-27.908': {
      coordinates: [ -53.113451, -27.9081574 ],
      ways: [ '-53.114_-27.908', '-53.112_-27.908' ]
    },
    '-53.112_-27.908': {
      coordinates: [ -53.1121446, -27.9081968 ],
      ways: [ '-53.113_-27.908' ]
    },
    '-53.120_-27.906': {
      coordinates: [ -53.1201139, -27.9064755 ],
      ways: [ '-53.119_-27.905' ]
    }
  }

function search(){
    const select = document.getElementById('select-serch');
    const id = select.options[select.selectedIndex].id

    if(state.network){
        state.network.destroy();
    }

    const noInical = '-53.121_-27.908'
    const noFinal = '-53.119_-27.906'
    
    if(id == 1){
        state.network = BFSrun(graph, noInical, noFinal);
    }else if(id == 2){
        state.network = DFSrun(graph, noInical, noFinal);
    }else if(id == 3){
        state.network = BCUrun(graph, noInical, noFinal);
    }else if(id == 4){
        state.network = GBFrun(graph, noInical, noFinal);
    }else if(id == 5){
        state.network = aStarRun(graph, noInical, noFinal);
    }
   
}

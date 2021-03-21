class LevelDesign {
  constructor() {
    this.map = [];
    this.levelDesign = {
      way: ["way1", "way2"],
      gates: ["gate1", "gate2", "gate3"]
    }
    this.generateMap();
    this.mapDesign();
  }
  
  generateMap() {
    for (let i = 0; i <= 10; i++) {
      let line = []
      let count = 0;
      for (let j = 0; j <= 10; j++) {
        let mapping = Math.floor(Math.random() * 2);
        if (mapping === 1) count++;
        if (count > 3
          || (line[j-1] === 1 && line[j-2] === 1)
          || ( i !== 0 && this.map[i-1][j]=== 1) ) {
          mapping = 0;
        }
        line = [...line, mapping];
      }
      this.map.push(line);
    }
    console.log(this.map && "it's work!");
  }
  
  mapDesign() {
    const mapContainer = $("#level-design");
    if (this.map) {
      for (let i = 0; i < this.map.length; i++) {
        mapContainer.append(`<div id="row${i+1}" class="row"></div>`)
        for (let j = 0; j < this.map[i].length; j++) {
          const mapRow = $(`#row${i}`);
          const mapValue = this.map[i][j];
          const randomWay = Math.floor(Math.random() * this.levelDesign.way.length);
          const randomGate = Math.floor(Math.random() * this.levelDesign.gates.length);
          const wayClass = this.levelDesign.way[randomWay];
          const gateClass = this.levelDesign.gates[randomGate];
          if (mapValue === 0) {
            mapRow.append(`<div class='case ${wayClass}'></div>`)
          } else mapRow.append(`<div class='case ${gateClass}'></div>`)
        }
      }
    }
  }
  
  randomPosition() {
    const x = Math.floor(Math.random() * this.map.length);
    const y = Math.floor(Math.random() * this.map[x].length);
    
    // let emptyCase = false;
    
    if (this.map[x][y] === 0) {
      return [x, y];
    } else this.randomPosition();
  }
}

const map = new LevelDesign();
map.randomPosition();
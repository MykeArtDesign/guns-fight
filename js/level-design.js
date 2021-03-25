import { weaponsUrl } from "./db/db.js";

class LevelDesign {
  constructor() {
    this.map = [];
    this.levelDesign = {
      way: ["way1", "way2"],
      gates: ["gate1", "gate2", "gate3"]
    }
    this.generateMap();
  }
  
  generateMap() {
    for (let i = 0; i <= 10; i++) {
      let line = []
      let count = 0;
      for (let j = 0; j <= 10; j++) {
        let mapping = Math.floor(Math.random() * 2);
        if (mapping === 1) count++;
        if (count > 3
          || (line[j - 1] === 1 && line[j - 2] === 1)
          || (i !== 0 && this.map[i - 1][j] === 1)) {
          mapping = 0;
        }
        line = [...line, mapping];
      }
      this.map.push(line);
    }
    console.log(this.map && "it's work!");
    this.generateWeapons();
    this.mapDesign();
  }
  
  mapDesign() {
    let id = 0;
    const mapContainer = $("#level-design");
    if (this.map) {
      for (let i = 0; i < this.map.length; i++) {
        mapContainer.append(`<div id="row${i + 1}" class="row"></div>`)
        for (let j = 0; j < this.map[i].length; j++) {
          const mapRow = $(`#row${i}`);
          const mapValue = this.map[i][j];
          const randomWay = Math.floor(Math.random() * this.levelDesign.way.length);
          const randomGate = Math.floor(Math.random() * this.levelDesign.gates.length);
          const wayClass = this.levelDesign.way[randomWay];
          const gateClass = this.levelDesign.gates[randomGate];
          if (mapValue === 0) {
            mapRow.append(`<div class='case ${wayClass}'></div>`)
          } else if (mapValue === 2) {
            if(weaponsUrl[id]){
              mapRow.append(`<div class='case ${wayClass}'><img class="weapon" src="${weaponsUrl[id].url}" alt="${weaponsUrl[id].name}"/></div>`)
              id++;
            }
          } else mapRow.append(`<div class='case ${gateClass}'></div>`)
        }
      }
    }
  }
  
  generateWeapons() {
    for(let i =0; i < weaponsUrl.length; i++) {
      const weapons = this.randomPosition();
      if (weapons) {
      const x = weapons[0];
      const y = weapons[1];
      this.map[x][y] = 2;
      }
    }
  }
  
  randomPosition() {
    const x = Math.floor(Math.random() * this.map.length);
    const y = Math.floor(Math.random() * this.map[x].length);
    
    if (this.map[x][y] === 0) {
      return [x, y];
    } else this.randomPosition();
  }
}

const map = new LevelDesign();
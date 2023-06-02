const stage = new Stage()


const bigGridConfig = {
    grid_location :{
        x:0,
        y:0
    },
    cell_size:{
        x_size:150,
        y_size:150
    },
    grid_dimensions:{
        y_size:3,
        x_size:3
    }
}

const bigGrid = new Grid(bigGridConfig)

for(let i = 0; i < 3; i++){
    for(let j =0; j<3; j++){
      if(j != 1 & i != 1){
        const newRect = new Rectangle({height: 140, width: 140});
        bigGrid.add({x:i,y:j}, newRect)
      }
    }
}

const smallGridConfig = {
    grid_location :{
        x:0,
        y:0
    },
    cell_size:{
        x_size:45,
        y_size:45
    },
    grid_dimensions:{
        y_size:3,
        x_size:3
    }
}
const smallGrid = new Grid(smallGridConfig)
for(let i = 0; i < 3; i++){
    for(let j =0; j<3; j++){
      if(i != 1 & j!= 1){
        const newRect = new Rectangle({height: 40,width: 40});
        smallGrid.add({x:i,y:j}, newRect)
      }
        
    }
}


const smallerGridConfig = {
    grid_location :{
        x:0,
        y:0
    },
    cell_size:{
        x_size:10,
        y_size:10
    },
    grid_dimensions:{
        y_size:3,
        x_size:3
    }
}

const smallerGrid = new Grid(smallerGridConfig)
for(let i = 0; i < 3; i++){
    for(let j =0; j<3; j++){
        const newRect = new Rectangle({height: 9, width: 9});
        smallerGrid.add({x:i,y:j}, newRect)
    }
}

smallGrid.add({x:1,y:1},smallerGrid)

bigGrid.add({x:1,y:1}, smallGrid)

stage.add(bigGrid)

stage.render(svg)



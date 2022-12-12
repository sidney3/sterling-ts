require('d3')


const stage = new Stage()
const mainPane = new Pane()
const boardGridProps = {
    grid_location: {
        x: 0,
        y:0
    },
    cell_size: {
        x_size:10,
        y_size:10
    },
    grid_dimensions:{
        height:3,
        width:3
    }
}

function findAtom(v) {
  switch(v) {
    case 1: return A; 
    case 2: return B; 
    default: return C; 
  }
}

const newTextbox = new TextBox({x:0,y:0},"")
console.log(newTextbox)
function makeNewGrid(boardAtom){
    let returnGrid = new Grid(boardGridProps)
    for (r = 1; r <= 3; r++) {
        for (c = 1; c <= 3; c++) {
          const text = boardAtom.places[findAtom(r)][findAtom(c)].toString().substring(0,1)
          const cellObject = new TextBox({x:0,y:0}, text)
          returnGrid.add({y:r-1,x:c-1}, cellObject) 
        }
      }
    return returnGrid
}

const multiBoardGridProps = {
        grid_location: {
            x: 0,
            y:0
        },
        cell_size: {
            x_size:40,
            y_size:40
        },
        grid_dimensions:{
            height:9,
            width:1
        }
}

const multiBoardGrid = new Grid(multiBoardGridProps)

for(b = 0; b <= 9; b++) {  
    if(Board.atom("Board"+b) != null){
      const newGrid = makeNewGrid(Board.atom("Board"+b))
      multiBoardGrid.add({x:0,y:b},newGrid)
    }
}

stage.add(mainPane);
mainPane.add(multiBoardGrid)
stage.render(svg)
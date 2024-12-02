class Grid{
    constructor(){
        this.grid = Array.from({ length: 28 }, () => Array(28).fill(0));
    }



    createGrid(){

        let containerDiv = document.querySelector("#grid");
        containerDiv.innerHTML = "";
    
        for (let i = 0; i < 28; i++){
            for (let j = 0; j < 28; j++){
    
                const square = document.createElement('div'); 
                square.className = 'grid-square'; 
                square.setAttribute('data-coordinate', `${i}-${j}`);
                     
                containerDiv.appendChild(square);
            }
        }
    }


    draw_grid(){

        for (let i = 0; i < 28; i++) {
            for (let j = 0; j < 28; j++){

                if (this.grid[i][j] === 0){

                    const square = document.querySelector(`[data-coordinate="${i}-${j}"]`);
                    square.style.backgroundColor = "white";
                }
                else if (this.grid[i][j] === 1){

                    const square = document.querySelector(`[data-coordinate="${i}-${j}"]`);
                    square.style.backgroundColor = "black";
                }

            }
        }
    }


    update_grid(){
        this.draw_grid();
        
    }


}

let grid = new Grid();
grid.createGrid();
grid.update_grid(); 
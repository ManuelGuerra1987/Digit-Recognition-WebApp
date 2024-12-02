class Grid{
    constructor(){
        this.grid = Array.from({ length: 28 }, () => Array(28).fill(0));
        this.isMouseDown = false; 
    }



    createGrid(){

        let containerDiv = document.querySelector("#grid");
        containerDiv.innerHTML = "";
    
        for (let i = 0; i < 28; i++){
            for (let j = 0; j < 28; j++){
    
                const square = document.createElement('div'); 
                square.className = 'grid-square'; 
                square.setAttribute('data-coordinate', `${i}-${j}`);
                square.addEventListener('mousedown', (e) => this.handleMouseDown(e, i, j));
                square.addEventListener('mouseover', (e) => this.handleMouseOver(e, i, j));
                square.addEventListener('mouseup', (e) => this.handleMouseUp());                
                     
                containerDiv.appendChild(square);
            }
        }
    }

    handleMouseDown(e, i, j) {
        this.isMouseDown = true;
        this.updateSquareColor(i, j);
    }

    handleMouseOver(e, i, j) {
        if (this.isMouseDown) {
            this.updateSquareColor(i, j);
        }
    }

    handleMouseUp() {
        this.isMouseDown = false;
    }
    
    updateSquareColor(i, j) {
        const square = document.querySelector(`[data-coordinate="${i}-${j}"]`);
        square.style.backgroundColor = "black";
        this.grid[i][j] = 1;
        console.log(this.grid)
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
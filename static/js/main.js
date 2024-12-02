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
        this.updateNeighborCells(i, j);
    }    

    updateNeighborCells(i, j) {
        const neighbors = [
            [-1, 0], [1, 0],  
            [0, -1], [0, 1],  
            [-1, -1], [-1, 1], [1, -1], [1, 1]  
        ];
    
        neighbors.forEach(([dx, dy]) => {
            const ni = i + dx;
            const nj = j + dy;
    
            if (ni >= 0 && ni < 28 && nj >= 0 && nj < 28) {
                const neighborSquare = document.querySelector(`[data-coordinate="${ni}-${nj}"]`);
                neighborSquare.style.backgroundColor = "black";
                this.grid[ni][nj] = 1;
            }
        });
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

    reset_grid(){
        this.isMouseDown = false; 
        for (let i = 0; i < 28; i++) {
            for (let j = 0; j < 28; j++){
                this.grid[i][j] = 0;
            }
        }
    }
}

let grid = new Grid();
grid.createGrid();
grid.draw_grid(); 

document.getElementById('sendGrid').addEventListener('click', () => {
    const gridData = JSON.stringify(grid.grid);  
   
    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: gridData,  
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);  
        const predictionElement = document.getElementById('prediction');
        predictionElement.textContent = `Predicción: ${data.data}`;
    })
    .catch((error) => {
        console.error('Error:', error);  
    });
    grid.reset_grid()
    grid.draw_grid()
});
document.addEventListener('DOMContentLoaded', function() {
    // Add Variables
    const userCanvas = document.getElementById('userBattleshipCanvas');
    const opponentCanvas = document.getElementById('opponentBattleshipCanvas');
    const gridSize = 10;

    // Arrays to store ship coordinates and their hit counters
    let destroyerShip = [];
    let destroyerShipCounter = 0;
    let opponentDestroyerShip = [];
    let opponentDestroyerShipCounter = 0;
    let submarineShip = [];
    let submarineShipCounter = 0;
    let opponentSubmarineShip = [];
    let opponentSubmarineShipCounter = 0;
    let cruiserShip = [];
    let cruiserShipCounter = 0;
    let opponentCruiserShip = [];
    let opponentCruiserShipCounter = 0;
    let battleshipShip = [];
    let battleshipShipCounter = 0;
    let opponentBattleshipShip = [];
    let opponentBattleshipShipCounter = 0;
    let carrierShip = [];
    let carrierShipCounter = 0;
    let opponentCarrierShip = [];
    let opponentCarrierShipCounter = 0;

    // Each players arrays gathered up
    let userShips = [];
    let opponentShips = [];

    // Arrays to store hit coordinates
    let hits = [];
    let opponentHits = [];

    // Clone of the initial ships from the shipList
    let initialShipPositions = {};

    // Clone of the ships
    let destroyerShipClone;
    let submarineShipClone;
    let cruiserShipClone;
    let battleshipShipClone;
    let carrierShipClone;
    

    function drawBoard(canvas) {
        // Draw the grid (10x10)
        const ctx = canvas.getContext('2d');
        const cellSize = canvas.width / gridSize;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }
    }

    function generateShips() {
        // Generate Opponent Destroyer Ship
        // Randomly choose horizontal or vertical
        let rotation = Math.random() > 0.5 ? "horizontal" : "vertical";
        let x, y;
        if (rotation == "horizontal") {
            // Randomly choose x and y coordinates
            while (opponentDestroyerShip.length < 2) {
                x = Math.floor(Math.random() * (gridSize - 1));
                y = Math.floor(Math.random() * gridSize);
                // Check if the coordinates are valid and the ship is not overlapping with other ships by checking the next coordinate
                if (isValidPlacement(x, y, opponentShips)) {
                    opponentDestroyerShip.push([x, y]);
                    if (isValidPlacement(x+1, y, opponentShips)) {
                        // If the next coordinate is valid, add it to the ship
                        opponentDestroyerShip.push([x+1, y]);
                    }
                    else {
                        // If the next coordinate is not valid, reset the ship (resetting the while loop and choosing random coordinates again)
                        opponentDestroyerShip = [];
                    }
                }
            }
        }
        else {
            // Randomly choose x and y coordinates (same as above but for vertical ships)
            while (opponentDestroyerShip.length < 2) {
                x = Math.floor(Math.random() * gridSize);
                y = Math.floor(Math.random() * (gridSize - 1));
                // Check if the coordinates are valid and the ship is not overlapping with other ships by checking the next coordinate
                if (isValidPlacement(x, y, opponentShips)) {
                    opponentDestroyerShip.push([x, y]);
                    if (isValidPlacement(x, y+1, opponentShips)) {
                        // If the next coordinate is valid, add it to the ship
                        opponentDestroyerShip.push([x, y+1]);
                    }
                    else {
                        // If the next coordinate is not valid, reset the ship (resetting the while loop and choosing random coordinates again)
                        opponentDestroyerShip = [];
                    }
                }
            }
        }
        // Once the ship is generated, add it to the opponentShips array and paint it on the canvas
        addOpponentShip("destroyer", opponentDestroyerShip);
        paintShips(opponentDestroyerShip);

        // Generate Opponent Submarine Ship
        // Randomly choose horizontal or vertical
        rotation = Math.random() > 0.5 ? "horizontal" : "vertical";
        if (rotation == "horizontal") {
            // Randomly choose x and y coordinates
            while (opponentSubmarineShip.length < 3) {
                x = Math.floor(Math.random() * (gridSize - 2));
                y = Math.floor(Math.random() * gridSize);
                // Check if the coordinates are valid and the ship is not overlapping with other ships by checking the next coordinates
                if (isValidPlacement(x, y, opponentShips)) {
                    opponentSubmarineShip.push([x, y]);
                    if (isValidPlacement(x+1, y, opponentShips)) {
                        opponentSubmarineShip.push([x+1, y]);
                        if (isValidPlacement(x+2, y, opponentShips)) {
                            // If all of the coordinates are valid, add them to the ship
                            opponentSubmarineShip.push([x+2, y]);
                        }
                        else {
                            // If the next coordinate is not valid, reset the ship (resetting the while loop and choosing random coordinates again)
                            opponentSubmarineShip = [];
                        }
                    }
                    else {
                        // If the next coordinate is not valid, reset the ship (resetting the while loop and choosing random coordinates again)
                        opponentSubmarineShip = [];
                    }
                }
            }
        }
        else {
            // Randomly choose x and y coordinates (same as above but for vertical ships)
            while (opponentSubmarineShip.length < 3) {
                x = Math.floor(Math.random() * gridSize);
                y = Math.floor(Math.random() * (gridSize - 2));
                // Check if the coordinates are valid and the ship is not overlapping with other ships by checking the next coordinates
                if (isValidPlacement(x, y, opponentShips)) {
                    opponentSubmarineShip.push([x, y]);
                    if (isValidPlacement(x, y+1, opponentShips)) {
                        opponentSubmarineShip.push([x, y+1]);
                        if (isValidPlacement(x, y+2, opponentShips)) {
                            // If all of the coordinates are valid, add them to the ship
                            opponentSubmarineShip.push([x, y+2]);
                        }
                        else {
                            // If the next coordinate is not valid, reset the ship (resetting the while loop and choosing random coordinates again)
                            opponentSubmarineShip = [];
                        }
                    }
                    else {
                        // If the next coordinate is not valid, reset the ship (resetting the while loop and choosing random coordinates again)
                        opponentSubmarineShip = [];
                    }
                }
            }
        }
        // Once the ship is generated, add it to the opponentShips array and paint it on the canvas
        addOpponentShip("submarine", opponentSubmarineShip);
        paintShips(opponentSubmarineShip);

        // Generate Opponent Cruiser Ship
        // Randomly choose horizontal or vertical
        rotation = Math.random() > 0.5 ? "horizontal" : "vertical";
        if (rotation == "horizontal") {
            // Randomly choose x and y coordinates
            while (opponentCruiserShip.length < 3) {
                x = Math.floor(Math.random() * (gridSize - 2));
                y = Math.floor(Math.random() * gridSize);
                // Check if the coordinates are valid and the ship is not overlapping with other ships by checking the next coordinates
                if (isValidPlacement(x, y, opponentShips)) {
                    opponentCruiserShip.push([x, y]);
                    if (isValidPlacement(x+1, y, opponentShips)) {
                        opponentCruiserShip.push([x+1, y]);
                        if (isValidPlacement(x+2, y, opponentShips)) {
                            // If all of the coordinates are valid, add them to the ship
                            opponentCruiserShip.push([x+2, y]);
                        }
                        else {
                            // If the next coordinate is not valid, reset the ship (resetting the while loop and choosing random coordinates again)
                            opponentCruiserShip = [];
                        }
                    }
                    else {
                        // If the next coordinate is not valid, reset the ship (resetting the while loop and choosing random coordinates again)
                        opponentCruiserShip = [];
                    }
                }
            }
        }
        else {
            // Randomly choose x and y coordinates (same as above but for vertical ships)
            while (opponentCruiserShip.length < 3) {
                x = Math.floor(Math.random() * gridSize);
                y = Math.floor(Math.random() * (gridSize - 2));
                // Check if the coordinates are valid and the ship is not overlapping with other ships by checking the next coordinates
                if (isValidPlacement(x, y, opponentShips)) {
                    opponentCruiserShip.push([x, y]);
                    if (isValidPlacement(x, y+1, opponentShips)) {
                        opponentCruiserShip.push([x, y+1]);
                        if (isValidPlacement(x, y+2, opponentShips)) {
                            // If all of the coordinates are valid, add them to the ship
                            opponentCruiserShip.push([x, y+2]);
                        }
                        else {
                            // If the next coordinate is not valid, reset the ship (resetting the while loop and choosing random coordinates again)
                            opponentCruiserShip = [];
                        }
                    }
                    else {
                        // If the next coordinate is not valid, reset the ship (resetting the while loop and choosing random coordinates again)
                        opponentCruiserShip = [];
                    }
                }
            }
        }
        // Once the ship is generated, add it to the opponentShips array and paint it on the canvas
        addOpponentShip("cruiser", opponentCruiserShip);
        paintShips(opponentCruiserShip);

        // Generate Opponent Battleship Ship
        // Randomly choose horizontal or vertical
        rotation = Math.random() > 0.5 ? "horizontal" : "vertical";
        if (rotation == "horizontal") {
            // Randomly choose x and y coordinates
            while (opponentBattleshipShip.length < 4) {
                x = Math.floor(Math.random() * (gridSize - 3));
                y = Math.floor(Math.random() * gridSize);
                // Check if the coordinates are valid and the ship is not overlapping with other ships by checking the next coordinates
                if (isValidPlacement(x, y, opponentShips)) {
                    opponentBattleshipShip.push([x, y]);
                    if (isValidPlacement(x+1, y, opponentShips)) {
                        opponentBattleshipShip.push([x+1, y]);
                        if (isValidPlacement(x+2, y, opponentShips)) {
                            opponentBattleshipShip.push([x+2, y]);
                            if (isValidPlacement(x+3, y, opponentShips)) {
                                // If all of the coordinates are valid, add them to the ship
                                opponentBattleshipShip.push([x+3, y]);
                            }
                            else {
                                // If the next coordinate is not valid, reset the ship (resetting the while loop and choosing random coordinates again)
                                opponentBattleshipShip = [];
                            }
                        }
                        else {
                            opponentBattleshipShip = [];
                        }
                    }
                    else {
                        opponentBattleshipShip = [];
                    }
                }
            }
        }
        else {
            // Randomly choose x and y coordinates (same as above but for vertical ships)
            while (opponentBattleshipShip.length < 4) {
                x = Math.floor(Math.random() * gridSize);
                y = Math.floor(Math.random() * (gridSize - 3));
                // Check if the coordinates are valid and the ship is not overlapping with other ships by checking the next coordinates
                if (isValidPlacement(x, y, opponentShips)) {
                    opponentBattleshipShip.push([x, y]);
                    if (isValidPlacement(x, y+1, opponentShips)) {
                        opponentBattleshipShip.push([x, y+1]);
                        if (isValidPlacement(x, y+2, opponentShips)) {
                            opponentBattleshipShip.push([x, y+2]);
                            if (isValidPlacement(x, y+3, opponentShips)) {
                                // If all of the coordinates are valid, add them to the ship
                                opponentBattleshipShip.push([x, y+3]);
                            }
                            else {
                                // If the next coordinate is not valid, reset the ship (resetting the while loop and choosing random coordinates again)
                                opponentBattleshipShip = [];
                            }
                        }
                        else {
                            opponentBattleshipShip = [];
                        }
                    }
                    else {
                        opponentBattleshipShip = [];
                    }
                }
            }
        }
        // Once the ship is generated, add it to the opponentShips array and paint it on the canvas
        addOpponentShip("battleship", opponentBattleshipShip);
        paintShips(opponentBattleshipShip);

        // Generate Opponent Carrier Ship
        // Randomly choose horizontal or vertical
        rotation = Math.random() > 0.5 ? "horizontal" : "vertical";
        if (rotation == "horizontal") {
            // Randomly choose x and y coordinates
            while (opponentCarrierShip.length < 5) {
                x = Math.floor(Math.random() * (gridSize - 4));
                y = Math.floor(Math.random() * gridSize);
                // Check if the coordinates are valid and the ship is not overlapping with other ships by checking the next coordinates
                if (isValidPlacement(x, y, opponentShips)) {
                    opponentCarrierShip.push([x, y]);
                    if (isValidPlacement(x+1, y, opponentShips)) {
                        opponentCarrierShip.push([x+1, y]);
                        if (isValidPlacement(x+2, y, opponentShips)) {
                            opponentCarrierShip.push([x+2, y]);
                            if (isValidPlacement(x+3, y, opponentShips)) {
                                opponentCarrierShip.push([x+3, y]);
                                if (isValidPlacement(x+4, y, opponentShips)) {
                                    // If all of the coordinates are valid, add them to the ship
                                    opponentCarrierShip.push([x+4, y]);
                                }
                                else {
                                    // If the next coordinate is not valid, reset the ship (resetting the while loop and choosing random coordinates again)
                                    opponentCarrierShip = [];
                                }
                            }
                            else {
                                opponentCarrierShip = [];
                            }
                        }
                        else {
                            opponentCarrierShip = [];
                        }
                    }
                    else {
                        opponentCarrierShip = [];
                    }
                }
            }
        }
        else {
            // Randomly choose x and y coordinates (same as above but for vertical ships)
            while (opponentCarrierShip.length < 5) {
                x = Math.floor(Math.random() * gridSize);
                y = Math.floor(Math.random() * (gridSize - 4));
                // Check if the coordinates are valid and the ship is not overlapping with other ships by checking the next coordinates
                if (isValidPlacement(x, y, opponentShips)) {
                    opponentCarrierShip.push([x, y]);
                    if (isValidPlacement(x, y+1, opponentShips)) {
                        opponentCarrierShip.push([x, y+1]);
                        if (isValidPlacement(x, y+2, opponentShips)) {
                            opponentCarrierShip.push([x, y+2]);
                            if (isValidPlacement(x, y+3, opponentShips)) {
                                opponentCarrierShip.push([x, y+3]);
                                if (isValidPlacement(x, y+4, opponentShips)) {
                                    // If all of the coordinates are valid, add them to the ship
                                    opponentCarrierShip.push([x, y+4]);
                                }
                                else {
                                    // If the next coordinate is not valid, reset the ship (resetting the while loop and choosing random coordinates again)
                                    opponentCarrierShip = [];
                                }
                            }
                            else {
                                opponentCarrierShip = [];
                            }
                        }
                        else {
                            opponentCarrierShip = [];
                        }
                    }
                    else {
                        opponentCarrierShip = [];
                    }
                }
            }
        }
        // Once the ship is generated, add it to the opponentShips array and paint it on the canvas
        addOpponentShip("carrier", opponentCarrierShip);
        paintShips(opponentCarrierShip);
    }

    function addOpponentShip(shipType, validShip){
        // Add the coordinates of the ship to the opponentShips array
        for (let i = 0; i < validShip.length; i++) {
            switch (shipType){
                case "destroyer":
                    opponentShips.push(validShip[i]);
                    break;
                case "submarine":
                    opponentShips.push(validShip[i]);
                    break;
                case "cruiser":
                    opponentShips.push(validShip[i]);
                    break;
                case "battleship":
                    opponentShips.push(validShip[i]);
                    break;
                case "carrier":
                    opponentShips.push(validShip[i]);
                    break;
            }
        }
    }   
                        
    function isValidPlacement(x, y, shipType) {
        // Check if either the userShips or opponentShips array is empty, if so then it is valid
        if (shipType.length == 0) {
            return true;
        }
        // Check if the coordinates are within the grid
        for (let i = 0; i < shipType.length; i++) {
            // If the coordinates are found in the array, then it is not valid
            if (shipType[i][0] == x && shipType[i][1] == y) {
                return false;
            }
        }
        // If the coordinates are not found in the array, then it is valid
        return true;
    }

    function paintShips(ship) {
        // Paint the ship on the canvas
        const ctx = opponentCanvas.getContext('2d');
        const cellSize = opponentCanvas.width / gridSize;
        const borderWidth = 1;
        
        // For each ship, draw the border and fill the tiles
        switch (ship) {
            case destroyerShip:
            case submarineShip:
            case cruiserShip:
            case battleshipShip:
            case carrierShip:
                // Draw border around the entire ship
                ctx.fillStyle = 'black';
                const minX = Math.min(...ship.map(coord => coord[0])) * cellSize - borderWidth;
                const minY = Math.min(...ship.map(coord => coord[1])) * cellSize - borderWidth;
                const maxX = (Math.max(...ship.map(coord => coord[0])) + 1) * cellSize + borderWidth * 2;
                const maxY = (Math.max(...ship.map(coord => coord[1])) + 1) * cellSize + borderWidth * 2;
                ctx.fillRect(minX, minY, maxX - minX, maxY - minY);
    
                // Draw ship tiles
                ctx.fillStyle = 'rgb(141, 141, 141)';
                for (let i = 0; i < ship.length; i++) {
                    ctx.fillRect(ship[i][0] * cellSize, ship[i][1] * cellSize, cellSize, cellSize);
                }
                break;
        }
    }
    
    function opponentHit() {
        // Draw the opponent's hit on the user's canvas
        const ctx = userCanvas.getContext('2d');
        const cellSize = userCanvas.width / gridSize;
        const x = Math.floor(Math.random() * gridSize);
        const y = Math.floor(Math.random() * gridSize);
        
        // Check if the coordinates have already been hit
        if (!opponentHits.some(hit => hit[0] == x && hit[1] == y)) {
            // Check if the coordinates are part of the user's ship, if so then it's a hit
            if (userShips.some(ship => ship[0] == x && ship[1] == y)) {
                // Draw white X for hit
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(x * cellSize, y * cellSize);
                ctx.lineTo((x + 1) * cellSize, (y + 1) * cellSize);
                ctx.moveTo((x + 1) * cellSize, y * cellSize);
                ctx.lineTo(x * cellSize, (y + 1) * cellSize);
                ctx.stroke();
                
                // Add the coordinates to the opponentHits array and update the hit counter
                opponentHits.push([x, y]);
                updateCounter('hit', 'opponent');
                // Remove the coordinates from the userShips array
                canvasHit(x, y, userShips);
            } else {
                // If not part of the user's ship, it's a miss
                // Draw slightly lighter background rectangle for miss
                ctx.fillStyle = 'rgb(222, 222, 249)';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                opponentHits.push([x, y]);
                updateCounter('miss', 'opponent');
            }
        } else {
            // If already hit, try again
            opponentHit();
        }
    }
    
    function playGame(isMyTurn) {
        // Function to handle the player's turn
        function playerTurn() {
            // Update UI to indicate player's turn
            document.getElementById('whosTurn').innerText = 'Your Turn';
            // Define the event listener function
            function handleClick(event) {
                handleCanvasClick(event, isMyTurn);
                // Remove the event listener after the player's move
                opponentCanvas.removeEventListener('click', handleClick);
                // After player's move, start the opponent's turn immediately
            }
            // Attach event listener to opponent canvas
            opponentCanvas.addEventListener('click', handleClick);
            if (checkEnd()) {
                return;
            }
        }
        
    
        // Function to handle the opponent's turn
        function opponentTurn() {
            // Update UI to indicate opponent's turn
            document.getElementById('whosTurn').innerText = 'Opponent\'s Turn';
            // Simulate opponent's move after a delay
            setTimeout(function () {
                opponentHit();
                // Switch back to player's turn after opponent's move
                isMyTurn = true;
                // Continue game loop
                if (checkEnd()) {
                    return;
                }
                playGame(isMyTurn);
            }, 1000);
        }
    
        // Function to handle canvas click events
        function handleCanvasClick(event, itsMyTurn) {
            if (itsMyTurn) {
                const rect = opponentCanvas.getBoundingClientRect();
                const ctx = opponentCanvas.getContext('2d');
                const cellSize = opponentCanvas.width / gridSize;
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                const gridX = Math.floor(x / cellSize);
                const gridY = Math.floor(y / cellSize);
                const centerX = (gridX + 0.5) * cellSize;
                const centerY = (gridY + 0.5) * cellSize;

                if (!hits.some(hit => hit[0] == gridX && hit[1] == gridY)) {
                    if (opponentShips.some(ship => ship[0] == gridX && ship[1] == gridY)) {
                        // Draw white X for hit
                        ctx.strokeStyle = 'white';
                        ctx.lineWidth = 4;
                        ctx.beginPath();
                        ctx.moveTo(centerX - cellSize / 2, centerY - cellSize / 2);
                        ctx.lineTo(centerX + cellSize / 2, centerY + cellSize / 2); 
                        ctx.moveTo(centerX + cellSize / 2, centerY - cellSize / 2);
                        ctx.lineTo(centerX - cellSize / 2, centerY + cellSize / 2); 
                        ctx.stroke();

                        hits.push([gridX, gridY]);
                        updateCounter('hit', 'user');
                        canvasHit(gridX, gridY, opponentShips);
                    } else {
                        // Draw slightly lighter background rectangle for miss
                        ctx.fillStyle = 'rgb(222, 222, 249)';
                        ctx.fillRect(gridX * cellSize, gridY * cellSize, cellSize, cellSize);
                        hits.push([gridX, gridY]);
                        updateCounter('miss', 'user');
                    }
                }
                else{
                    // Add class to change background color to red
                    const bodyElement = document.body;
                    bodyElement.classList.add('flash-red');
                    displayMessage('You already hit this spot!');

                    setTimeout(function() {
                        // Remove class after 1 second to revert back to normal background color
                        bodyElement.classList.remove('flash-red'); 
                    }, 250);
                    handleCanvasClick(event, itsMyTurn);
                }
                // Switch to opponent's turn after player's move
                isMyTurn = false;
                // After player's move, start the opponent's turn immediately
                opponentTurn();
            }
        }
    
        // Start the game loop
        if (isMyTurn) {
            playerTurn();
        } else {
            opponentTurn();
        }
    }

    function updateCounter(hitOrMiss, player) {

        if (hitOrMiss == 'hit' && player == 'user') {
            const hitCounter = document.getElementById('hitCounter');
            hitCounter.innerText = parseInt(hitCounter.innerText) + 1;
        }
        else if (hitOrMiss == 'hit' && player == 'opponent') {
            const hitCounter = document.getElementById('opponentHitCounter');
            hitCounter.innerText = parseInt(hitCounter.innerText) + 1;
        }
        else if (hitOrMiss == 'miss' && player == 'user') {
            const missCounter = document.getElementById('missCounter');
            missCounter.innerText = parseInt(missCounter.innerText) + 1;
        }
        else if (hitOrMiss == 'miss' && player == 'opponent') {
            const missCounter = document.getElementById('opponentMissCounter');
            missCounter.innerText = parseInt(missCounter.innerText) + 1;
        }

    }

    function canvasHit(x, y, shipList){
        for (let i = 0; i < shipList.length; i++) {
            if (shipList[i][0] == x && shipList[i][1] == y) {
                shipList.splice(i, 1);
                break;
            }
        }

        let shipType;

        if (shipList == userShips) {

            if (destroyerShip.some(coord => coord[0] === x && coord[1] === y)) {
                shipType = "destroyerShip";
                destroyerShipCounter++;
            } else if (submarineShip.some(coord => coord[0] === x && coord[1] === y)) {
                shipType = "submarineShip";
                submarineShipCounter++;
            } else if (cruiserShip.some(coord => coord[0] === x && coord[1] === y)) {
                shipType = "cruiserShip";
                cruiserShipCounter++;
            } else if (battleshipShip.some(coord => coord[0] === x && coord[1] === y)) {
                shipType = "battleshipShip";
                battleshipShipCounter++;
            } else if (carrierShip.some(coord => coord[0] === x && coord[1] === y)) {
                shipType = "carrierShip";
                carrierShipCounter++;
            }
        } else {
            if (opponentDestroyerShip.some(coord => coord[0] === x && coord[1] === y)) {
                shipType = "opponentDestroyerShip";
                opponentDestroyerShipCounter++;
            } else if (opponentSubmarineShip.some(coord => coord[0] === x && coord[1] === y)) {
                shipType = "opponentSubmarineShip";
                opponentSubmarineShipCounter++;
            } else if (opponentCruiserShip.some(coord => coord[0] === x && coord[1] === y)) {
                shipType = "opponentCruiserShip";
                opponentCruiserShipCounter++;
            } else if (opponentBattleshipShip.some(coord => coord[0] === x && coord[1] === y)) {
                shipType = "opponentBattleshipShip";
                opponentBattleshipShipCounter++;
            } else if (opponentCarrierShip.some(coord => coord[0] === x && coord[1] === y)) {
                shipType = "opponentCarrierShip";
                opponentCarrierShipCounter++;
            }
        }
        checkShipSunk(shipType);
    }

    function checkShipSunk(ship) {
        switch (ship+ "Counter"){
            case "destroyerShipCounter":
                if (destroyerShipCounter == 2){
                    displayMessage('Your ship has sunk!');
                    sunkShip(ship, "user");
                }
                break;
            case "submarineShipCounter":
                if (submarineShipCounter == 3){
                    displayMessage('Your ship has sunk!');
                    sunkShip(ship, "user");
                }
                break;
            case "cruiserShipCounter":
                if (cruiserShipCounter == 3){
                    displayMessage('Your ship has sunk!');
                    sunkShip(ship, "user");
                }
                break;
            case "battleshipShipCounter":
                if (battleshipShipCounter == 4){
                    displayMessage('Your ship has sunk!');
                    sunkShip(ship, "user");
                }
                break;
            case "carrierShipCounter":
                if (carrierShipCounter == 5){
                    displayMessage('Your ship has sunk!');
                    sunkShip(ship, "user");
                }
                break;
            case "opponentDestroyerShipCounter":
                if (opponentDestroyerShipCounter == 2){
                    displayMessage('You sunk a ship!');
                    sunkShip(ship, "opponent");
                }
                break;
            case "opponentSubmarineShipCounter":
                if (opponentSubmarineShipCounter == 3){
                    displayMessage('You sunk a ship!');
                    sunkShip(ship, "opponent");
                }
                break;
            case "opponentCruiserShipCounter":
                if (opponentCruiserShipCounter == 3){
                    displayMessage('You sunk a ship!');
                    sunkShip(ship, "opponent");
                }
                break;
            case "opponentBattleshipShipCounter":
                if (opponentBattleshipShipCounter == 4){
                    displayMessage('You sunk a ship!');
                    sunkShip(ship, "opponent");
                }
                break;
            case "opponentCarrierShipCounter":
                if (opponentCarrierShipCounter == 5){
                    displayMessage('You sunk a ship!');
                    sunkShip(ship, "opponent");
                }
                break;
        }
    }

    function sunkShip(shipType, player){
        // Set the ship variable to the correct ship array (Passed in as a string)
        switch (shipType){
            case "destroyerShip":
                ship = destroyerShip;
                break;
            case "submarineShip":
                ship = submarineShip;
                break;
            case "cruiserShip":
                ship = cruiserShip;
                break;
            case "battleshipShip":
                ship = battleshipShip;
                break;
            case "carrierShip":
                ship = carrierShip;
                break;
            case "opponentDestroyerShip":
                ship = opponentDestroyerShip;
                break;
            case "opponentSubmarineShip":
                ship = opponentSubmarineShip;
                break;
            case "opponentCruiserShip":
                ship = opponentCruiserShip;
                break;
            case "opponentBattleshipShip":
                ship = opponentBattleshipShip;
                break;
            case "opponentCarrierShip":
                ship = opponentCarrierShip;
                break;
        }
        // If the user's ship is sunk, paint the ship with a darker color
        if (player == "user"){
            for (let i = 0; i < ship.length; i++) {
                const ctx = userCanvas.getContext('2d');
                const cellSize = userCanvas.width / gridSize;
                ctx.fillStyle = 'rgb(50, 50, 50, 0.5)';
                ctx.fillRect(ship[i][0] * cellSize, ship[i][1] * cellSize, cellSize, cellSize);
            }
        }
        // If the opponent's ship is sunk, paint the ship with a darker color
        else {
            for (let i = 0; i < ship.length; i++) {
                const ctx = opponentCanvas.getContext('2d');
                const cellSize = opponentCanvas.width / gridSize;
                ctx.fillStyle = 'rgb(50, 50, 50, 0.5)';
                ctx.fillRect(ship[i][0] * cellSize, ship[i][1] * cellSize, cellSize, cellSize);
            }
        }
    }
    
    function checkEnd() {
        // Function to check game end conditions
        // If all of the user's ships are sunk, the opponent wins
        if (userShips.length == 0) {
            displayMessage('You lose!');
            restartButton.style.display = 'block';
            return true;
        } else if (opponentShips.length == 0) {
            // If all of the opponent's ships are sunk, the user wins
            displayMessage('You win!');
            restartButton.style.display = 'block';
            return true;
        }
        // If the game has not ended, return false
        return false;
    }

    function clearCanvas(canvas) {
        // Clear the canvas
        const ctx = canvas.getContext('2d');
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    function restartGame() {
        // Reset game variables
        hits = [];
        opponentHits = [];
        
        userShips = []; 
        destroyerShip = [];
        destroyerShipCounter = 0;
        submarineShip = [];
        submarineShipCounter = 0;
        cruiserShip = [];
        cruiserShipCounter = 0;
        battleshipShip = [];
        battleshipShipCounter = 0;
        carrierShip = [];
        carrierShipCounter = 0;

        opponentShips = [];
        opponentHits = [];
        opponentDestroyerShip = [];
        opponentDestroyerShipCounter = 0;
        opponentSubmarineShip = [];
        opponentSubmarineShipCounter = 0;
        opponentCruiserShip = [];
        opponentCruiserShipCounter = 0;
        opponentBattleshipShip = [];
        opponentBattleshipShipCounter = 0;
        opponentCarrierShip = [];
        opponentCarrierShipCounter = 0;
        

        // Reset the hit and miss counters
        document.getElementById('hitCounter').innerText = '0';
        document.getElementById('missCounter').innerText = '0';
        document.getElementById('opponentHitCounter').innerText = '0';
        document.getElementById('opponentMissCounter').innerText = '0';

        // Hide the restart button again
        restartButton.style.display = 'none';

        // Reset the user ships
        // Get the ship list
        const shipList = document.getElementById('shipList');

        // Add the cloned ships to the shipList
        shipList.append(destroyerShipClone);
        shipList.append(submarineShipClone);
        shipList.append(cruiserShipClone);
        shipList.append(battleshipShipClone);
        shipList.append(carrierShipClone);

        // Clear game boards
        clearCanvas(userBattleshipCanvas);
        clearCanvas(opponentBattleshipCanvas);


        // Display the start and rotate buttons
        startButton.style.display = 'block';
        rotateButton.style.display = 'block';
        // Reset the rotate for each user ship
        document.querySelectorAll('.ship').forEach(ship => {
            ship.classList.remove('rotate');
        });

        // Initialize the game again
        initGame();
    }

    function addShip(gridX, gridY, size, ctx, cellSize, ship){
        // Add the ship to the userShips array and paint it on the canvas
        ctx.fillStyle = 'black';
        const borderWidth = 2;

        // Check if the ship is not rotated
        if (!rotate) {
            // Draw black border and ship tiles horizontally
            ctx.fillRect(gridX * cellSize - borderWidth, gridY * cellSize - borderWidth, (size * cellSize) + borderWidth * 2, cellSize + borderWidth * 2);
            ctx.fillStyle = 'rgb(141, 141, 141)';
            // Add the ship to the userShips array and the specific ship array
            for (let i = 0; i < size; i++) {
                ctx.fillRect((gridX + i) * cellSize, gridY * cellSize, cellSize, cellSize);
                userShips.push([gridX + i, gridY]);
                ship.push([gridX + i, gridY]);
            }
        } else {
            // Same as above but for vertical ships
            // Draw black border and ship tiles vertically
            ctx.fillRect(gridX * cellSize - borderWidth, gridY * cellSize - borderWidth, cellSize + borderWidth * 2, (size * cellSize) + borderWidth * 2);
            ctx.fillStyle = 'rgb(141, 141, 141)';
            // Add the ship to the userShips array and the specific ship array
            for (let i = 0; i < size; i++) {
                ctx.fillRect(gridX * cellSize, (gridY + i) * cellSize, cellSize, cellSize);
                userShips.push([gridX, gridY + i]);
                ship.push([gridX, gridY + i]);
            }
        }
    }

    function cloneShips(){
        // Clone the ships from the shipList
        destroyerShipClone = document.getElementById('destroyerIcon').cloneNode(true);
        submarineShipClone = document.getElementById('submarineIcon').cloneNode(true);
        cruiserShipClone = document.getElementById('cruiserIcon').cloneNode(true);
        battleshipShipClone = document.getElementById('battleshipIcon').cloneNode(true);
        carrierShipClone = document.getElementById('carrierIcon').cloneNode(true);
    }

    function displayMessage(message) {
        // Display a message on the screen
        const messageElement = document.getElementById('messageHeader');
        messageElement.innerText = message;
    
        // Clear the message after 1 seconds
        setTimeout(() => {
            messageElement.innerText = '';
        }, 1000);
    }

    function initGame() {
        // Initialize the game
        // Draw each board and generate the opponent's ships      
        drawBoard(userCanvas);
        drawBoard(opponentCanvas);
        generateShips();
        
        // For each user ship, add the dragstart event listener
        document.querySelectorAll('.ship').forEach(ship => {
            ship.addEventListener('dragstart', function(event) {
                event.dataTransfer.setData('shipType', ship.dataset.shipType);
            });
        });

        // Add the drop event listener to the user canvas
        userCanvas.addEventListener('dragover', function(event) {
            event.preventDefault();
        });
        // Add the drop event listener to the user canvas
        userCanvas.addEventListener('drop', function(event) {
            // Prevent the default behavior
            event.preventDefault();
            // Get the coordinates of the drop
            const rect = userCanvas.getBoundingClientRect();
            const ctx = userCanvas.getContext('2d');
            const cellSize = userCanvas.width / gridSize;
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const gridX = Math.floor(x / cellSize);
            const gridY = Math.floor(y / cellSize);
            // Get the ship type from the dataTransfer
            const shipType = event.dataTransfer.getData('shipType');
            let draggedShip
            // Based on the ship, check if the placement is valid and add the ship to the canvas
            switch (shipType) {
                case 'destroyer':
                    // Check if the ship is not rotated and the tiles are empty
                    if (gridX < gridSize - 1 && !rotate && isValidPlacement(gridX, gridY, userShips) && isValidPlacement(gridX + 1, gridY, userShips)){
                        // If the placement is valid, add the ship to the canvas
                        ctx.fillStyle = 'rgb(141, 141, 141)';
                        // Add the ship
                        addShip(gridX, gridY, 2, ctx, cellSize, destroyerShip);
                        // Remove the dragged destroyer ship element from the DOM after successful placement
                        draggedShip = document.querySelector('.ship[data-ship-type="' + shipType + '"]');
                        draggedShip.remove();
                    }
                    // Check if the ship is rotated and the tiles are empty
                    else if (gridY < gridSize - 1 && rotate && isValidPlacement(gridX, gridY, userShips) && isValidPlacement(gridX, gridY + 1, userShips)){
                        // If the placement is valid, add the ship to the canvas
                        ctx.fillStyle = 'rgb(141, 141, 141)';
                        // Add the ship
                        addShip(gridX, gridY, 2, ctx, cellSize, destroyerShip);
                        // Remove the dragged destroyer ship element from the DOM after successful placement
                        draggedShip = document.querySelector('.ship[data-ship-type="' + shipType + '"]');
                        draggedShip.remove();
                    }
                    break;
    
                // Same as above but for the other ships
                case 'submarine':
                    if (gridX < gridSize - 2 && !rotate && isValidPlacement(gridX, gridY, userShips) && isValidPlacement(gridX + 1, gridY, userShips) && isValidPlacement(gridX + 2, gridY, userShips)) {
                        ctx.fillStyle = 'rgb(141, 141, 141)';
                        addShip(gridX, gridY, 3, ctx, cellSize, submarineShip);
                        draggedShip = document.querySelector('.ship[data-ship-type="' + shipType + '"]');
                        draggedShip.remove();
                    }
                    else if (gridY < gridSize - 2 && rotate && isValidPlacement(gridX, gridY, userShips) && isValidPlacement(gridX, gridY + 1, userShips) && isValidPlacement(gridX, gridY + 2, userShips)) {
                        ctx.fillStyle = 'rgb(141, 141, 141)';
                        addShip(gridX, gridY, 3, ctx, cellSize, submarineShip);
                        draggedShip = document.querySelector('.ship[data-ship-type="' + shipType + '"]');
                        draggedShip.remove();
                    }
                    break;
    
                // Same as destroyer but for the cruiser ships
                case 'cruiser':
                    if (gridX < gridSize - 2 && !rotate && isValidPlacement(gridX, gridY, userShips) && isValidPlacement(gridX + 1, gridY, userShips) && isValidPlacement(gridX + 2, gridY, userShips)) {
                        ctx.fillStyle = 'rgb(141, 141, 141)';
                        addShip(gridX, gridY, 3, ctx, cellSize, cruiserShip);
                        draggedShip = document.querySelector('.ship[data-ship-type="' + shipType + '"]');
                        draggedShip.remove();
                    }
                    else if (gridY < gridSize - 2 && rotate && isValidPlacement(gridX, gridY, userShips) && isValidPlacement(gridX, gridY + 1, userShips) && isValidPlacement(gridX, gridY + 2, userShips)) {
                        ctx.fillStyle = 'rgb(141, 141, 141)';
                        addShip(gridX, gridY, 3, ctx, cellSize, cruiserShip);
                        draggedShip = document.querySelector('.ship[data-ship-type="' + shipType + '"]');
                        draggedShip.remove();
                    }
                    break;
    
                // Same as destroyer but for the battleship ships
                case 'battleship':
                    if (gridX < gridSize - 3 && !rotate && isValidPlacement(gridX, gridY, userShips) && isValidPlacement(gridX + 1, gridY, userShips) && isValidPlacement(gridX + 2, gridY, userShips) && isValidPlacement(gridX + 3, gridY, userShips)) {
                        ctx.fillStyle = 'rgb(141, 141, 141)';
                        addShip(gridX, gridY, 4, ctx, cellSize, battleshipShip);
                        draggedShip = document.querySelector('.ship[data-ship-type="' + shipType + '"]');
                        draggedShip.remove();
                    }
                    else if (gridY < gridSize - 3 && rotate && isValidPlacement(gridX, gridY, userShips) && isValidPlacement(gridX, gridY + 1, userShips) && isValidPlacement(gridX, gridY + 2, userShips) && isValidPlacement(gridX, gridY + 3, userShips)) {
                        ctx.fillStyle = 'rgb(141, 141, 141)';
                        addShip(gridX, gridY, 4, ctx, cellSize, battleshipShip);
                        draggedShip = document.querySelector('.ship[data-ship-type="' + shipType + '"]');
                        draggedShip.remove();
                    }
                    break;
    
                // Same as destroyer but for the carrier ships
                case 'carrier':
                    if (gridX < gridSize - 4 && !rotate && isValidPlacement(gridX, gridY, userShips) && isValidPlacement(gridX + 1, gridY, userShips) && isValidPlacement(gridX + 2, gridY, userShips) && isValidPlacement(gridX + 3, gridY, userShips) && isValidPlacement(gridX + 4, gridY, userShips)) {
                        ctx.fillStyle = 'rgb(141, 141, 141)';
                        addShip(gridX, gridY, 5, ctx, cellSize, carrierShip);
                        draggedShip = document.querySelector('.ship[data-ship-type="' + shipType + '"]');
                        draggedShip.remove();
                    }
                    else if (gridY < gridSize - 4 && rotate && isValidPlacement(gridX, gridY, userShips) && isValidPlacement(gridX, gridY + 1, userShips) && isValidPlacement(gridX, gridY + 2, userShips) && isValidPlacement(gridX, gridY + 3, userShips) && isValidPlacement(gridX, gridY + 4, userShips)) {
                        ctx.fillStyle = 'rgb(141, 141, 141)';
                        addShip(gridX, gridY, 5, ctx, cellSize, carrierShip);
                        draggedShip = document.querySelector('.ship[data-ship-type="' + shipType + '"]');
                        draggedShip.remove();
                    }
                    break;
                }
        });
    }

    // Add event listener to the restart button
    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', restartGame);

    // Check if the rotate button is clicked
    const rotateButton = document.getElementById('rotateButton');
    let rotate = false;
    // Add event listener to the rotate button
    rotateButton.addEventListener('click', function() {
        rotate = !rotate;
        // rotate the divs
        document.querySelectorAll('.ship').forEach(ship => {
            ship.classList.toggle('rotate');
        });
    });

    // Check if the start button is clicked
    const startButton = document.getElementById('startButton');
    // Add event listener to the start button
    startButton.addEventListener('click', function() {
        // Check if all the ships are placed
        if (userShips.length == 17 && opponentShips.length == 17) {
            startButton.style.display = 'none';
            rotateButton.style.display = 'none';
            let itsMyTurn = Math.random() > 0.5 ? true : false;
            playGame(itsMyTurn);
        }
        // If not, display a message
        else {
            displayMessage('Place all your ships!');
        }
    });

    // Set the initial ship positions of each ship within the shipList. This is used to reset the ships when the game is restarted
    const ships = document.querySelectorAll('.ship');
    ships.forEach(ship => {
        const rect = ship.getBoundingClientRect();
        initialShipPositions[ship.id] = { x: rect.left, y: rect.top };
    }); 

    // Clone the ships and initialize the game
    cloneShips();
    initGame();
});
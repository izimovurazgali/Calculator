// const container = document.getElementById('container');
// container.addEventListener('click', (event) => {
//     if (event.target.classList.contains('add-btn')) 
//     {
//         const clickedButton = event.target;
//         const newDiv = document.createElement('div');
//         newDiv.style.marginLeft = '20px';
//         newDiv.style.marginTop = '10px';
//         newDiv.style.backgroundColor = "red";
//         newDiv.style.padding = '20px';
//         const newButton = document.createElement('button');
//         newButton.className = 'add-btn';
//         newButton.textContent = 'Нажми меня';
//         newDiv.append(newButton);
//         clickedButton.after(newDiv);
//     }
// }
// );
// let containerImg = document.getElementById("images");
// let addImg = document.getElementById("add-btn");
// console.log(addImg);
// addImg.addEventListener('click', function()
// {
//     let newImg = document.createElement('img');
//     newImg.src = "https://e7.pngegg.com/pngimages/141/685/png-clipart-circle-letter-c-text-orange-thumbnail.png";
//     newImg.style.padding = '10px';
//     containerImg.appendChild(newImg);
// });
let isXTurn = true; 

    function CrestikiNoliki(cellElement) {
        if (cellElement.textContent === "") {
            if (isXTurn) {
                const newLabel = document.createElement("label");
                newLabel.textContent = "X";
                cellElement.append(newLabel);
            } else {
                const newLabel = document.createElement("label");
                newLabel.textContent = "O";
                cellElement.append(newLabel);
            }
            isXTurn = !isXTurn; 
        }
    }
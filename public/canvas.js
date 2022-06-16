

let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//API
let tool = canvas.getContext("2d");
let undoRedoTracker = [];
let track = 0; //represent which action from tracker array

let pencilColor = document.querySelectorAll(".pencil-colour")
let pencilWidthCont = document.querySelector(".pencil-width")
let eraserWidthCont = document.querySelector(".eraser-width")
let undo = document.querySelector(".undo")
let redo = document.querySelector(".redo")
let download = document.querySelector(".download")
let pencilWidth = pencilWidthCont.value;
let eraserWidth = eraserWidthCont.value;
let penColor = "red";
tool.strokeStyle = penColor;
tool.lineWidth = pencilWidth;
let eraserColour = "white";
let mouseDown = false;
// tool.beginPath();//new graphic (path)(line)
// tool.moveTo(10,10); //start point
// tool.lineTo(100,150);//end point
// tool.strokeStyle = "red";
// tool.lineWidth = "8"
// tool.stroke();//fill colour (fill graphic)
// tool.lineTo(200,200);
// tool.stroke()

// mousedown->start new path, mousemove -> path fill(graphics)
canvas.addEventListener("mousedown",(e)=>{
    mouseDown = true;
    // beginPath({
    //     x : e.clientX,
    //     y : e.clientY
    // })
   let data= {
        x : e.clientX,
        y : e.clientY
    }
    //send data to server
    socket.emit("beginPath",data)
   
})
canvas.addEventListener("mousemove",(e)=>{
  
   
    if(mouseDown){
       let data = {
        x:e.clientX,
            y:e.clientY,
            color :eraserFlag ? eraserColour:penColor,
            width :eraserFlag? eraserWidth:pencilWidth

       } 
       socket.emit("drawStroke",data);
    }

        
    
})
canvas.addEventListener("mouseup",(e)=>{
    mouseDown = false;
    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    track = undoRedoTracker.length-1;
})
undo.addEventListener("click",(e)=>{
    //track action
    if(track>0){
        track--;
        let data = {
            trackValue:track,
            undoRedoTracker
        }
        socket.emit("redoUndo",data)
    }

})
redo.addEventListener("click",(e)=>{
    if(track<undoRedoTracker.length-1){
        //track action
        track++;
        let trackObj = {
            trackValue:track,
            undoRedoTracker
        }
        undoRedoCanvas(trackObj)
    }
})

function undoRedoCanvas(trackObj){
    track = trackObj.trackValue;
    undoRedoTracker = trackObj.undoRedoTracker;
    let url = undoRedoTracker[track];
    let img = new Image(); //new image reference element
    img.src = url;
    img.onload = (e)=>{
        tool.drawImage(img,0,0,canvas.width,canvas.height)
    }

}
function beginPath(strokeObj){
    tool.beginPath();
    tool.moveTo(strokeObj.x , strokeObj.y)
     
}
function drawStroke(strokeObj){
    tool.strokeStyle = strokeObj.color;
    tool.lineWidth = strokeObj.width;
    tool.lineTo(strokeObj.x,strokeObj.y);
    tool.stroke();
}


pencilColor.forEach((colorElem)=>{
    colorElem.addEventListener("click",(e)=>{
        let color = colorElem.classList[0];
        penColor = color;
        tool.strokeStyle = penColor;
    })
})

pencilWidthCont.addEventListener("change",(e)=>{
    pencilWidth = pencilWidthCont.value;
    tool.lineWidth = pencilWidth;
})
eraserWidthCont.addEventListener("change",(e)=>{
    eraserWidth = eraserWidthCont.value;
    tool.lineWidth = eraserWidth;
})

eraser.addEventListener("click",(e)=>{
    if(eraserFlag){
        tool.strokeStyle = eraserColour;
        tool.lineWidth = eraserWidth;
    }
    else{
        tool.strokeStyle = penColor;
        tool.lineWidth = pencilWidth;
    }
})


download.addEventListener("click",(e)=>{
    let url = canvas.toDataURL();
    let a = document.createElement("a");
    a.href = url;
    a.download = "board.jpg"; 
    a.click();
})
socket.on("beginPath",(data)=>{
    //data->data from server
    beginPath(data);
})
socket.on("drawStroke",(data)=>{
    drawStroke(data);
})
socket.on("redoUndo",(data)=>{
    undoRedoCanvas(data);
})
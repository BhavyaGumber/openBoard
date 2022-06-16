let optionsCont = document.querySelector(".options-container");
let toolsCont = document.querySelector(".tools-container");
let pencilCont = document.querySelector(".pencil-container");
let pencil = document.querySelector(".pencil")
let eraser = document.querySelector(".eraser")
let upload = document.querySelector(".upload");
let eraserCont = document.querySelector(".eraser-container")
let sticky = document.querySelector(".sticky");
let pencilColorCont = document.querySelector(".pencil-colour-container")
let optionsFlag = true;
let pencilFlag = false;
let eraserFlag = false;
//true->tools show
//false -> hide tools
optionsCont.addEventListener("click", (e)=>{
    optionsFlag = !optionsFlag;
    //
    if(optionsFlag){
        openTools();

    }
    else{
     closeTools();
    }

})
function openTools(){
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-times");
    iconElem.classList.add("fa-bars");
    toolsCont.style.display = "flex";

}
function closeTools(){
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-times");
    toolsCont.style.display = "none";
    pencilCont.style.display = "none";
    eraserCont.style.display = "none";



}

pencil.addEventListener("click",(e)=>{
    //true->show pencil tool
    //false->hide pencil tool
    pencilFlag = !pencilFlag;
    if(pencilFlag){
        pencilCont.style.display = "block";

    }
    else{
        pencilCont.style.display = "none";
    }
})


eraser.addEventListener("click",(e)=>{
    //true->show pencil tool
    //false->hide pencil tool
    eraserFlag = !eraserFlag;
    if(eraserFlag){
        eraserCont.style.display = "flex";

    }
    else{
        eraserCont.style.display = "none";
    }
})
upload.addEventListener("click",(e)=>{
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.click();
    input.addEventListener("change",(e)=>{
        let file = input.files[0];
        let url = URL.createObjectURL(file);

let stickyTemplateHTML = `<div class="header-cont">
<div class="minimise"></div>
<div class="remove"></div>
</div>
<div class="note-cont">
<img src = "${url}"

</div>`
createSticky(stickyTemplateHTML);
      
    })
})


//     let stickyCont = document.createElement("div");  
//     stickyCont.setAttribute("class","sticky-cont");
//     stickyCont.innerHTML = ` 
//     <div class="header-cont">
//         <div class="minimise"></div>
//         <div class="remove"></div>
//     </div>
//     <div class="note-cont">
//         <textarea ></textarea>
        
//     </div>

// `
// document.body.appendChild(stickyCont);
// let minimise = stickyCont.querySelector(".minimise");
// let remove = stickyCont.querySelector(".remove");
// noteActions(minimise, remove, stickyCont);
// stickyCont.onmousedown = function(event){
//     dragAndDrop(stickyCont,event);
// }
// stickyCont.ondragstart = function (){
//     return false;
// }

function createSticky(stickyTemplateHTML){
    let stickyCont = document.createElement("div");  
    stickyCont.setAttribute("class","sticky-cont");
    stickyCont.innerHTML = stickyTemplateHTML;
    document.body.appendChild(stickyCont);
let minimise = stickyCont.querySelector(".minimise");
let remove = stickyCont.querySelector(".remove");
noteActions(minimise, remove, stickyCont);
stickyCont.onmousedown = function(event){
    dragAndDrop(stickyCont,event);
}
stickyCont.ondragstart = function (){
    return false;
}



}



sticky.addEventListener("click",(e)=>{
    let stickyTemplateHTML = `
    <div class="header-cont">
        <div class="minimise"></div>
        <div class="remove"></div>
    </div>
    <div class="note-cont">
        <textarea spellcheck = "false" ></textarea>
        
    </div>

`
createSticky(stickyTemplateHTML);

})
function noteActions(minimise,remove,stickyCont){
    remove.addEventListener("click",(e)=>{
        stickyCont.remove();
    })
    minimise.addEventListener("click",(e)=>{
        let noteCont = stickyCont.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");
        if(display === "none"){
            noteCont.style.display="block";
        }
    else{
        noteCont.style.display = "none";
    }

    })

}
function dragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
}

    
 
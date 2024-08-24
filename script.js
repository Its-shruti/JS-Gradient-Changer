let plus_check_icon = document.querySelector(".plus_check_icon");
const inputRange = document.getElementById("inputRange");
const degBox = document.getElementById("degBox");
const textBox = document.querySelector(".textBox");
const dataBox = document.getElementById("dataBox");

let colStr = "0123456789abcdef";
let getColorArr = [];


//** generate color  */
const getColor = () =>{
    let color = "#";

    for(let i=0; i<6; i++){
        let index = colStr[Math.floor(Math.random()*16)];
        color = color + index;
    }
    return color.toString();
}


//** generate degree of linear-gadient background
const getDegree = (event) =>{
    let targetVal = event.target.value;
    degBox.innerText = `${targetVal}deg`;
    
    // return targetVal;
}


//** which event is clicked (plus or checked) */
const plusCheck = (event) =>{
    let targetElem = event.target;

    if(targetElem.classList.contains("plus")){

        let li = document.createElement("li");

        let div = document.createElement("div"); 
        div.classList.add("btn-div", "bg-green");

        let p = document.createElement("p");
        p.innerText = "#ffffff";
        p.classList.add("text-16", "col-white", "paragraph");

        let i = document.createElement("i");
        i.classList.add("fa-solid", "fa-xmark", "cross-circle", "text-18", "bg-white", "col-black");

        li.appendChild(div);
        div.appendChild(p);
        div.appendChild(i);

        dataBox.appendChild(li);
    }

    else if(targetElem.classList.contains("check")){
        if(getColorArr.length == 0){
            alert("⚠ can't generate gradient with 0 colors ⚠");
        }
        else if(getColorArr.length == 1){
            document.body.style.backgroundImage = `linear-gradient( ${degBox.innerText}, ${getColorArr.join(", ")}, #ffffff )`;
            textBox.innerHTML = `background-image: linear-gradient( ${degBox.innerText}, ${getColorArr.join(", ")}, #ffffff)`;
        }
        else{
            document.body.style.backgroundImage = `linear-gradient( ${degBox.innerText}, ${getColorArr.join(", ")})`;
            textBox.innerHTML = `background-image: linear-gradient( ${degBox.innerText}, ${getColorArr.join(", ")})`;
        }
        
        // console.log(getColorArr);
    }
}


//** clicking button */
const buttonClick = (event) =>{
    let targetElem = event.target;

    if(targetElem.classList.contains("paragraph")){            //targetting paragraph

        if(!targetElem.classList.contains("clicked")){        //functionality to stop for clicking again  
            let rgb = getColor();
            targetElem.innerText = rgb;
            getColorArr.push(rgb);
            targetElem.classList.add("clicked");
        }
        else{
            alert("cant click twice, generate other to add more colors");
            return false;
        }
    }

    else if(targetElem.classList.contains("cross-circle")){
        targetElem.parentElement.parentElement.style.display = "none";
        getColorArr.filter((curElem, index)=>{
            if(curElem == targetElem.previousElementSibling.innerText){
                getColorArr.splice(index, 1);
            }
        })
    }
}

//** coopy the gradient code on clipboard */
const copyCode = () =>{
    navigator.clipboard.writeText(textBox.innerHTML);
    alert("Code copied on clipboard");
}





//** Event Listeners ================================= */
inputRange.addEventListener("input", getDegree);
plus_check_icon.addEventListener("click", plusCheck);
dataBox.addEventListener('click', buttonClick);
textBox.addEventListener("click", copyCode);

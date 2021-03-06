console.log("Client side javascript file is loaded");

const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");



weatherform.addEventListener('submit',(e)=>{
    e.preventDefault();

    const input_location = search.value;
    
    messageOne.textContent  = "laster.."
    messageTwo.textContent = ""

    fetch('/weather?adresse=' + input_location).then((response) => {
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent  = data.error;
            } else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.weather;
            }   
        })
    })
})
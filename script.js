const serviceItems = document.querySelector(".items");
const box = document.querySelector(".box");
const CloseIcon = box.querySelector(".close-icon");
const postsContainerEl = document.getElementById("posts-container");
let dataFromBack = [];

serviceItems.addEventListener("click",function(event){
   if(event.target.tagName.toLowerCase() == "button"){
      const item =event.target.parentElement;
      const h3 = item.querySelector("h3").innerHTML;
      const readMoreCont = item.querySelector(".read-more-cont").innerHTML;
      box.querySelector("h3").innerHTML = h3;
      box.querySelector(".body").innerHTML = readMoreCont;
      contentBox();
   }
})

CloseIcon.addEventListener("click", contentBox);

box.addEventListener("click", function(event){
   if(event.target == box){
      contentBox();
   }
})

function contentBox(){
   box.classList.toggle("open");
}

const getData = async() =>{
   const response = await fetch (`https://jsonplaceholder.typicode.com/posts`);
   const data = await response.json();
   dataFromBack =[...dataFromBack, ...data];
   console.log(data);
   return data;
};
const renderPost  = ({ title, body})=>{
   return`
   <div class="item">
      <div class="item-inner">
         <h3 class="h3style">${title}</h3>
         <p class="fixText">${body}</p>
         <div class="read-more-cont">
            <p>${body}</p>
         </div>
         <button class="btn" type="button">View Details</button>
      </div>
   </div> 
   `;
}

const createHTMLTamplate =(data) =>{
   let text = data.reduce((template, element) =>( template += renderPost(element)),""
   );
   return text;
};
const renderHTMLTamplate= () =>{
   getData()
   .then((posts) => {
      postsContainerEl.innerHTML += createHTMLTamplate(posts); 
   })
   
};
const scrollCheck =() =>{
   const{scrollTop, scrollHeight, clientHeight} = document.documentElement;
   console.log(scrollTop, scrollHeight, clientHeight);
   scrollTop + clientHeight >= scrollHeight && renderHTMLTamplate();
};

window.addEventListener("scroll",scrollCheck);
renderHTMLTamplate();
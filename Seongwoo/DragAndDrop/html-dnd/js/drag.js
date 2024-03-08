const item = document.querySelector(".item");
const container = document.querySelector(".container");
const container2 = document.querySelector(".container2");


// item.addEventListener("dragstart", (e) => {
//   console.log(e);
//   console.log("드래그를 시작하면 발생하는 이벤트");
// });


// item.addEventListener("drag", (e) => {
//   console.log(e);
//   console.log("드래그하면 발생하는 이벤트");
// });

item.ondragenter = function () { };
// item.addEventListener("dragenter", (e) => {
//     // e.preventDefault();
//     // console.log(e); 
//     console.log("버튼");
//     // e.stopImmediatePropagation();
// });

container.addEventListener("dragenter", function (e) {
    if (e.target !== this) return;
    e.preventDefault();
    console.log(e); 
    console.log("드래그 요소가 1번박스에 최초 진입 시 발생하는 이벤트");
});

// container.addEventListener("dragover", (e) => { 
//     console.log(e);
//     // console.log(e.offsetX);
//     console.log("드래그 요소가 1번 박스 위에 계속 위치하면 발생하는 이벤트");
// })

// container.addEventListener("dragleave", (e) => { 
//     e.preventDefault();
//     console.log(e);
//     console.log("드래그 요소가 1번 박스 위에 들어왔다가 나갈 때 발생하는 이벤트");
// })

//---------------

container2.addEventListener("dragenter", (e) => {
    e.preventDefault();
    console.log(e);
    console.log("드래그 요소가 2번박스에 최초 진입 시 발생하는 이벤트");
});

// container2.addEventListener("dragover", (e) => { 
//     console.log(e);
//     // console.log(e.offsetX);
//     console.log("드래그 요소가 2번 박스 위에 계속 위치하면 발생하는 이벤트");
// })

container2.addEventListener("dragleave", (e) => { 
    e.preventDefault();
    console.log(e);
    console.log("드래그 요소가 2번 박스 위에 들어왔다가 나갈 때 발생하는 이벤트");
})
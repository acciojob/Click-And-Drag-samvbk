// Your code here.
const container = document.querySelector(".items");
const items = document.querySelectorAll(".item");

let selectedItem = null;
let offsetX = 0;
let offsetY = 0;

items.forEach((item) => {
	item.addEventListener('mousedown',(event) =>{
		selectedItem = item;

		const rect = item.getBoundingClientRect();

		offsetX=event.clientX - rect.left;
		offsetY=event.clientY - rect.top;

		container.classList.add("active");
	});
});

document.addEventListener("mousemove",(event) =>{
	if (selectedItem === null){
		return;
	}
	const parentRect = container.getBoundingClientRect();

	let x = event.clientX - parentRect.left -container.clientLeft - offsetX;
	let y = event.clientY - parentRect.top -container.clientTop - offsetY;

	x = Math.max(0, Math.min(x, container.clientWidth - selectedItem.offsetWidth));
	y = Math.max(0, Math.min(y, container.clientHeight - selectedItem.offsetHeight));

	selectedItem.style.left = x + "px";
	selectedItem.style.top = y + "px";
});

document.addEventListener("mouseup", (event) => {
	selectedItem = null;
	container.classList.remove("active");
});







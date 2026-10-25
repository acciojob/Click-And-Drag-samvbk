// Your code here.
const container = document.querySelector(".items");
const items = document.querySelectorAll(".item");
const columns = 5;
const gap = 20;
const itemWidth = 200;
let selectedItem = null;
let offsetX = 0;
let offsetY = 0;

items.forEach((item, index) => {
	item.style.position = "absolute";
	const row = Math.floor(index / columns);
	const col = index % columns;
	
	item.style.left = col * (itemWidth + gap) + "px";
	item.style.top = row * (item.offsetHeight + gap) + "px";
	
	item.addEventListener('mousedown',(event) =>{
		selectedItem = item;

		const rect = item.getBoundingClientRect();

		offsetX=event.clientX - rect.left;
		offsetY=event.clientY - rect.top;

		container.classList.add("active");
	});
});

document.addEventListener("mousemove", (event) => {
  if (selectedItem === null) return;

  const parentRect = container.getBoundingClientRect();

  let x = event.clientX - parentRect.left
        - container.clientLeft - offsetX;

  let y = event.clientY - parentRect.top
        - container.clientTop - offsetY;

  const maxX = container.clientWidth - selectedItem.offsetWidth;
  const maxY = container.clientHeight - selectedItem.offsetHeight;

  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(0, Math.min(y, maxY));

  selectedItem.style.left = `${x}px`;
  selectedItem.style.top = `${y}px`;
});

document.addEventListener("mouseup", (event) => {
	selectedItem = null;
	container.classList.remove("active");
});







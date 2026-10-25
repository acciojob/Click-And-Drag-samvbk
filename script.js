
const container = document.querySelector(".items");
const items = document.querySelectorAll(".item");

const columns = 5;
const gap = 20;

let selectedItem = null;
let offsetX = 0;
let offsetY = 0;

// 1. Arrange the cubes in a grid
items.forEach((item, index) => {
  const row = Math.floor(index / columns);
  const col = index % columns;

  item.style.left = `${col * (item.offsetWidth + gap)}px`;
  item.style.top = `${row * (item.offsetHeight + gap)}px`;

  // 2. Select a cube
  item.addEventListener("mousedown", (event) => {
    event.preventDefault();

    selectedItem = item;

    const rect = item.getBoundingClientRect();

    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;

    // Bring selected cube to the front
    item.style.zIndex = 1;

    container.classList.add("active");
  });
});

// 3. Move the selected cube
document.addEventListener("mousemove", (event) => {
  if (!selectedItem) return;

  const rect = container.getBoundingClientRect();

  let x = event.clientX - rect.left - container.clientLeft - offsetX;
  let y = event.clientY - rect.top - container.clientTop - offsetY;

  const maxX = container.clientWidth - selectedItem.offsetWidth;
  const maxY = container.clientHeight - selectedItem.offsetHeight;

  x = Math.min(Math.max(0, x), Math.max(0, maxX));
  y = Math.min(Math.max(0, y), Math.max(0, maxY));

  selectedItem.style.left = `${x}px`;
  selectedItem.style.top = `${y}px`;
});
// 5. Drop the cube
document.addEventListener("mouseup", () => {
  if (selectedItem !== null) {
    selectedItem.style.zIndex = 0;
  }

  selectedItem = null;
  container.classList.remove("active");
});

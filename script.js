
const container = document.querySelector(".items");
const items = document.querySelectorAll(".item");

const columns = 5;
const gap = 20;

let selectedItem = null;
let offsetX = 0;
let offsetY = 0;

// Arrange all cubes in a grid
items.forEach((item, index) => {
  const row = Math.floor(index / columns);
  const col = index % columns;

  item.style.position = "absolute";

  item.style.left = `${col * (item.offsetWidth + gap)}px`;
  item.style.top = `${row * (item.offsetHeight + gap)}px`;

  // Select a cube
  item.addEventListener("mousedown", (event) => {
    if (event.button !== 0) return;

    event.preventDefault();

    selectedItem = item;

    const rect = item.getBoundingClientRect();

    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;

    // Put the selected cube above the others
    item.style.zIndex = 1;

    container.classList.add("active");
  });
});

// Move the selected cube
document.addEventListener("mousemove", (event) => {
  if (selectedItem === null) return;

  const containerRect = container.getBoundingClientRect();

  // Calculate position relative to the container
  let x =
    event.clientX -
    containerRect.left -
    container.clientLeft -
    offsetX;

  let y =
    event.clientY -
    containerRect.top -
    container.clientTop -
    offsetY;

  // Maximum allowed coordinates
  const maxX = Math.max(
    0,
    container.clientWidth - selectedItem.offsetWidth
  );

  const maxY = Math.max(
    0,
    container.clientHeight - selectedItem.offsetHeight
  );

  // Keep the entire cube inside the container
  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(0, Math.min(y, maxY));

  // Apply the new position
  selectedItem.style.left = `${x}px`;
  selectedItem.style.top = `${y}px`;
});

// Release the cube
document.addEventListener("mouseup", () => {
  if (selectedItem !== null) {
    selectedItem.style.zIndex = 0;
  }

  selectedItem = null;
  container.classList.remove("active");
});

// Prevent a stuck drag if the mouse leaves the browser window
window.addEventListener("blur", () => {
  selectedItem = null;
  container.classList.remove("active");
});

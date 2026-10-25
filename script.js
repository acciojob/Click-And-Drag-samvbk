
const container = document.querySelector(".items");
const items = document.querySelectorAll(".item");

const columns = 5;
const gap = 20;

let selectedItem = null;
let offsetX = 0;
let offsetY = 0;

// Set up the initial grid
items.forEach((item, index) => {
  const row = Math.floor(index / columns);
  const col = index % columns;

  item.style.position = "absolute";
  item.style.left = `${col * (item.offsetWidth + gap)}px`;
  item.style.top = `${row * (item.offsetHeight + gap)}px`;

  item.addEventListener("mousedown", (event) => {
    if (event.button !== 0) return;

    event.preventDefault();

    selectedItem = item;

    const itemRect = item.getBoundingClientRect();
    const parentRect = container.getBoundingClientRect();

    // Store the click offset in CSS layout coordinates
    const scaleX = parentRect.width / container.offsetWidth;
    const scaleY = parentRect.height / container.offsetHeight;

    offsetX = (event.clientX - itemRect.left) / scaleX;
    offsetY = (event.clientY - itemRect.top) / scaleY;

    item.style.zIndex = 1000;
    container.classList.add("active");
  });
});

document.addEventListener("mousemove", (event) => {
  if (!selectedItem) return;

  const rect = container.getBoundingClientRect();

  const scaleX = rect.width / container.offsetWidth;
  const scaleY = rect.height / container.offsetHeight;

  // Convert mouse coordinates to the container's layout coordinates
  let x =
    (event.clientX - rect.left) / scaleX -
    container.clientLeft -
    offsetX;

  let y =
    (event.clientY - rect.top) / scaleY -
    container.clientTop -
    offsetY;

  // Available inner space
  const maxX = container.clientWidth - selectedItem.offsetWidth;
  const maxY = container.clientHeight - selectedItem.offsetHeight;

  // Clamp before applying styles
  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(0, Math.min(y, maxY));

  selectedItem.style.left = `${x}px`;
  selectedItem.style.top = `${y}px`;
});

function stopDragging() {
  if (selectedItem) {
    selectedItem.style.zIndex = 0;
  }

  selectedItem = null;
  container.classList.remove("active");
}

document.addEventListener("mouseup", stopDragging);
window.addEventListener("blur", stopDragging);

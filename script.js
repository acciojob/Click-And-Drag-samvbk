const container = document.querySelector('.container');
const cubes = document.querySelectorAll('.cube');

const GAP = 20;

// ---------- 1. Arrange cubes in a grid (works for any number of cubes) ----------
function arrangeGrid() {
  if (!cubes.length) return;

  const size = cubes[0].offsetWidth;
  const cols = Math.max(1, Math.floor((container.clientWidth - GAP) / (size + GAP)));

  cubes.forEach((cube, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    cube.style.left = GAP + col * (size + GAP) + 'px';
    cube.style.top = GAP + row * (size + GAP) + 'px';
  });
}

arrangeGrid();

// ---------- 2. Drag behaviour ----------
let activeCube = null;
let offsetX = 0;
let offsetY = 0;
let zCounter = 1;

cubes.forEach((cube) => {
  cube.addEventListener('mousedown', (e) => {
    e.preventDefault();
    activeCube = cube;

    // Distance between mouse and cube's top-left corner, so it doesn't jump
    const cubeRect = cube.getBoundingClientRect();
    offsetX = e.clientX - cubeRect.left;
    offsetY = e.clientY - cubeRect.top;

    cube.classList.add('dragging');
  });
});

document.addEventListener('mousemove', (e) => {
  if (!activeCube) return;

  const containerRect = container.getBoundingClientRect();

  // Mouse position relative to the container's inner area (inside the border)
  let x = e.clientX - containerRect.left - container.clientLeft - offsetX;
  let y = e.clientY - containerRect.top - container.clientTop - offsetY;

  // Boundary conditions: keep the cube fully inside the container
  const maxX = container.clientWidth - activeCube.offsetWidth;
  const maxY = container.clientHeight - activeCube.offsetHeight;
  x = Math.min(Math.max(0, x), maxX);
  y = Math.min(Math.max(0, y), maxY);

  activeCube.style.left = x + 'px';
  activeCube.style.top = y + 'px';
});

document.addEventListener('mouseup', () => {
  if (!activeCube) return;

  activeCube.classList.remove('dragging');
  // Keep the last dragged cube on top of the others
  activeCube.style.zIndex = ++zCounter;
  activeCube = null; // cube stays where it was dropped
});
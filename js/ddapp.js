(() => {
	const puzzleSelectors = document.querySelectorAll("#buttonHolder img"),
				dropContainer = document.querySelector(".puzzle-board"),
				dragImages = document.querySelectorAll(".puzzle-image"),
				dropZones = document.querySelectorAll(".drop-zone"),
				puzzleContainer = document.querySelector(".puzzle-pieces");

	const pieceName = ["topLeft", "topRight", "bottomLeft", "bottomRight"]

	function swapImages() {
	let currentIndex = this.dataset.imageref;

	dragImages.forEach((image, index) => {
	image.src = `images/dd/${pieceName[index] + currentIndex}.jpg`;
		});

	dropContainer.style.backgroundImage = `url(images/dd/backGround${this.dataset.imageref}.jpg)`;

	resetPuzzlePieces();
		}

function resetPuzzlePieces() {
dropZones.forEach(zone => {
if (zone.children) {
puzzleContainer.appendChild(zone.firstElementChild);
		}
	})
}

function startDrag(event) {
console.log('dragging ' + this.id);

event.dataTransfer.setData("dragTarget", this.id);
			}

function draggedOver(event) {
event.preventDefault();
console.log('dragging over drop zone elements');
		}

function dropped(event) {

event.preventDefault();


if (this.children.length > 0) { return; }

let targetImage = document.querySelector(`#${event.dataTransfer.getData("dragTarget")}`);

if (targetImage.id !== this.dataset.drop) { return; }

			this.appendChild(targetImage);
			targetImage.classList.add('puzzle-dropped');

		}

	dragImages.forEach(piece => {
		piece.addEventListener('dragstart', startDrag);
	});

	dropZones.forEach(zone => {
		zone.addEventListener('drop', dropped);
		zone.addEventListener('dragover', draggedOver);
	});
	
	puzzleSelectors.forEach(button => button.addEventListener("click", swapImages));

})();

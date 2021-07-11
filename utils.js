//#Grouped animation
function GroupedAnimation(parent, animateOn, animationName) {
	this.duration = 0.06;
	this.delay = 0;
	this.reverse = false;
	this.play = function () {
		parent.querySelectorAll(animateOn).forEach((child, i) => {
			if (animationName.indexOf("$direction") != -1) {
				child.classList.add(
					animationName.replace("$direction", direction(parent))
				);
			} else {
				child.classList.add(animationName);
			}
			if (this.reverse === true) {
				child.style["animation-duration"] =
					(parent.querySelectorAll(animateOn).length - i) * this.duration + "s";
				child.style["animation-delay"] =
					(parent.querySelectorAll(animateOn).length - i) * this.delay + "s";
			} else {
				child.style["animation-duration"] = i * this.duration + "s";
				child.style["animation-delay"] = i * this.delay + "s";
			}
			//#Remove class
			child.addEventListener("animationend", () => {
				child.classList.remove(animationName);
			});
		});
	};
	this.apply = function () {
		return this.play();
	};
}
function Animation(animateOn, animationName) {
	this.duration = 0.06;
	this.delay = 0;
	this.reverse = false;
	this.animations = "";
	this.animationDisplay = function () {
		//#Check for multiple animation classes
		if (animationName.indexOf(" ") != -1) {
			animationName.split(" ").forEach((animations) => {
				if (animations.indexOf("$direction") != -1) {
					animateOn.classList.add(
						animations.replace("$direction", direction(animateOn))
					);
					this.animations = animations.replace(
						"$direction",
						direction(animateOn)
					);
				} else {
					this.animations = animations;
					animateOn.classList.add(this.animations);
				}
			});
		}
	};
	this.play = function () {
		this.animationDisplay();
		animateOn.style["animation-duration"] = this.duration + "s";
		animateOn.style["animation-delay"] = this.delay + "s";
		//#Remove class
		animateOn.addEventListener("animationend", () => {
			if (animationName.indexOf(" ") !== -1) {
				animationName.split(" ").forEach((animations) => {
					animateOn.classList.remove(animations);
				});
			} else {
				animateOn.classList.remove(animationName);
			}
			// animateOn.style["animation-duration"] = null;
			// animateOn.style["animation-delay"] = null;
		});
	};
	this.apply = function () {
		return this.play();
	};
}
//#Function direction
const direction = function (parent) {
	let direction = "down";
	var divposition = parent.getBoundingClientRect();
	if (divposition.left + divposition.width < 0) {
		// element is off to the left of the view
		direction = "right";
	}
	if (divposition.top + divposition.height < 0) {
		// element is off the top of the view
		direction = "down";
	}
	if (divposition.top > window.innerHeight) {
		// element is off the bottom of the view
		direction = "up";
	}
	if (divposition.left > window.innerWidth) {
		// element is off to the right of the view
		direction = "left";
	}
	return direction;
};
//#Remove array by name
function RemoveFromArray(arr) {
	var what,
		a = arguments,
		L = a.length,
		ax;
	while (L > 1 && arr.length) {
		what = a[--L];
		while ((ax = arr.indexOf(what)) !== -1) {
			arr.splice(ax, 1);
		}
	}
	return arr;
}

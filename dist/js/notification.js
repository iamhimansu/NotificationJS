//Globals

const NotificationContainer = document.querySelector(".notification-container");
function Notify() {
	//
	let CurrentHeight = 0,
		StartStackingFrom = 0,
		STACKED_NOTIFICATIONS = [];
	//#Create a show all button
	const ShowAllNotifications = document.createElement("div");
	ShowAllNotifications.classList.add("notification-showall");
	ShowAllNotifications.innerHTML =
		'<div><b>Show all (<span class="all-notifications"></span>)</b></div></i>';
	//#Define a boundary after which stacking will
	//#Staking will take place
	const Boundary = NotificationContainer.offsetHeight;
	//#Default settings
	let CONFIGS = {
		stacking: true,
		// save initial values
		init: function () {
			var origValues = {};
			for (var prop in this) {
				if (this.hasOwnProperty(prop) && prop != "origValues") {
					origValues[prop] = this[prop];
				}
			}
			this.origValues = origValues;
		},
		// restore initial values
		reset: function () {
			for (var prop in this.origValues) {
				this[prop] = this.origValues[prop];
			}
		},
	};
	let NOTIFICATION = {
		head: "",
		body: "",
		footer: "",
		html: true,
		delay: 0,
		timeout: 5,
		dismiss: true,
		timebar: true,
		focus: true,
		// save initial values
		init: function () {
			var origValues = {};
			for (var prop in this) {
				if (this.hasOwnProperty(prop) && prop != "origValues") {
					origValues[prop] = this[prop];
				}
			}
			this.origValues = origValues;
		},
		// restore initial values
		reset: function () {
			for (var prop in this.origValues) {
				this[prop] = this.origValues[prop];
			}
		},
	};
	//#Default configs
	this.configs = function (configs) {
		return Object.assign(CONFIGS, configs);
	};
	//#===============================//
	//#--------C R E A T E----------//
	//#===========================//
	//#Notifications Settings
	this.create = function (props) {
		//#Save initial configurations
		NOTIFICATION.init();
		//#Add new properties
		Object.assign(NOTIFICATION, props);
		//#Handle Notification
		//#Use the tepmlate to create notifications
		this.template();
		//#Reset to default configurations
		NOTIFICATION.reset();
	};
	//#==================================//
	//#----------T E M P L A T E-------//
	//#==============================//
	//#Notification Template
	this.template = function () {
		//# div.notification
		const Notification = document.createElement("div");
		let NotificationInFocus = false;
		Notification.classList.add("notification");
		Notification.classList.add("animate__animated", "animate__fadeInUp");

		//#Notification header
		//#div.notification-header
		if (NOTIFICATION.head.length > 0) {
			//#Create a header
			const NotificationHeader = document.createElement("div");
			//#Create notification title
			const NotificationHeaderTitle = document.createElement("div");
			//
			NotificationHeader.classList.add("notification-header");
			//
			NotificationHeaderTitle.classList.add("notification-header-content");
			//#Inject content in header
			this.inject(NotificationHeaderTitle, NOTIFICATION.head);
			//#Append Heatitle to header
			NotificationHeader.appendChild(NotificationHeaderTitle);
			//#Append to Notification body
			Notification.appendChild(NotificationHeader);
		}
		//#Notification Body
		if (NOTIFICATION.body.length > 0) {
			//#Create a body
			const NotificationBody = document.createElement("div");
			//
			//#Create notification body content
			const NotificationBodyContent = document.createElement("div");
			//
			NotificationBody.classList.add("notification-body");
			//
			NotificationBodyContent.classList.add("notification-body-content");
			//#Inject content in header
			this.inject(NotificationBodyContent, NOTIFICATION.body);
			//#Append body content to header
			NotificationBody.appendChild(NotificationBodyContent);
			//#Append to Notification body
			Notification.appendChild(NotificationBody);
		}
		//#Notification footer
		if (NOTIFICATION.footer.length > 0) {
			//#Create a footer
			const NotificationFooter = document.createElement("div");
			//
			//#Create notification body footer
			const NotificationFooterContent = document.createElement("div");
			//
			NotificationFooterContent.classList.add("notification-footer-content");
			//
			NotificationFooter.classList.add("notification-footer");
			//#Inject content in header
			this.inject(NotificationFooterContent, NOTIFICATION.footer);
			//#Append footer content to footer
			NotificationFooter.appendChild(NotificationFooterContent);
			//#Append to Notification footer
			Notification.appendChild(NotificationFooter);
		}

		//
		if (
			typeof NOTIFICATION.timeout !== "null" ||
			typeof NOTIFICATION.timeout !== "Infinity"
		) {
			let InitialTimeStart = 0, //+1 becoz of transition effect
				FinalTime = NOTIFICATION.timeout;
			//#Append timebar
			const NotificationTimebarContainer = document.createElement("div");
			const NotificationTimebar = document.createElement("div");
			NotificationTimebarContainer.classList.add(
				"notification-timebar-container"
			);
			NotificationTimebar.classList.add("notification-timebar");
			NotificationTimebarContainer.appendChild(NotificationTimebar);
			if (NOTIFICATION.timebar === true) {
				Notification.lastElementChild.after(NotificationTimebarContainer);
			}

			let TimeBar = setInterval(() => {
				if (NotificationInFocus === false) {
					InitialTimeStart += 1;
				}
				if (NOTIFICATION.timebar === true) {
					NotificationTimebar.style["width"] =
						(InitialTimeStart / FinalTime) * 100 + "%";
				}
				if (InitialTimeStart > FinalTime) {
					clearInterval(TimeBar);
					//	//#Removing shadown from notification
					Notification.style["shadow"] = null;
					Notification.classList.add("animate__animated", "animate__fadeOutUp");
					Notification.addEventListener("animationend", () => {
						CurrentHeight -= Notification.offsetHeight;

						Notification.remove();
						//#Check for stackings
						if (CONFIGS.stacking === true) {
							STACKED_NOTIFICATIONS.pop(Notification);
							this.stack(Notification);
							this.ShowAllNotifications();

							// console.log(CurrentHeight, Boundary);
						}
					});
				}
			}, 1000); //#Updating every 0.1 seconds for smoother transition
			if (NOTIFICATION.focus === true) {
				Notification.addEventListener("mouseover", () => {
					NotificationInFocus = true;
				});
				Notification.addEventListener("mouseleave", () => {
					NotificationInFocus = false;
				});
			}
		}

		//#Dismiss notification
		if (NOTIFICATION.dismiss === true) {
			const DismissNotification = document.createElement("span");
			DismissNotification.classList.add("notification-close");
			DismissNotification.innerHTML = '<i class="bi bi-x-lg"></i>';
			//#Append notification to the first element inside of div.notification
			DismissNotification.addEventListener("click", () => {
				this.dismiss(Notification);
			});
			Notification.firstElementChild.append(DismissNotification);
			this.draggable(Notification);
		}
		//#Set time delay

		//#Append notification to body
		if (NotificationContainer.querySelectorAll(".notification").length > 0) {
			NotificationContainer.firstElementChild.before(Notification);
		} else {
			NotificationContainer.appendChild(Notification);
		}
		//#Check for stackings
		if (CONFIGS.stacking === true) {
			this.stack(Notification);
			this.ShowAllNotifications();
		}
	};
	//#==============================//
	//#---------S T A C K I N G----//
	//#==========================//
	//#Handle stackings
	this.stack = function (component) {
		//#check for negative height
		if (CurrentHeight < 0) {
			CurrentHeight = 0;
		}
		//#Add stacking height
		CurrentHeight += component.offsetHeight;
		//#Check if Boudary is exceeds

		if (CurrentHeight + 150 >= Boundary) {
			OverflowedBoundary = true;
			//#Set stacking number
			StartStackingFrom += 1;
			//#Iterate throghu each notification
			let TotalNotifications =
				NotificationContainer.querySelectorAll(".notification");
			//Check if stacking occured
			if (StartStackingFrom > 0) {
				for (let index = StartStackingFrom; index > 0; index--) {
					//#Subtracting this elements height from current height
					//#To stack only out of viewport notifications

					CurrentHeight -=
						TotalNotifications[TotalNotifications.length - index].offsetHeight;
					//#Removing overflowing notifications
					TotalNotifications[TotalNotifications.length - index].remove();

					//#Adding class .stacked-notification
					//
					TotalNotifications[TotalNotifications.length - index].classList.add(
						"stacked-notification"
					);
					//Adding notification to stacked array
					STACKED_NOTIFICATIONS.push(
						TotalNotifications[TotalNotifications.length - index]
					);
					StartStackingFrom -= 1;
				}
			}

			//#Add a show all notification button
		}
	};
	//#==================================//
	//#---------SHOW ALL NOTIFICATION--//
	//#==============================//
	this.ShowAllNotifications = function () {
		if (STACKED_NOTIFICATIONS.length > 1) {
			ShowAllNotifications.querySelector(".all-notifications").innerHTML =
				STACKED_NOTIFICATIONS.length;
			ShowAllNotifications.addEventListener("click", () => {
				STACKED_NOTIFICATIONS.forEach((thisNOTIFICATION) => {
					NotificationContainer.appendChild(thisNOTIFICATION);
					ShowAllNotifications.remove();
				});
				STACKED_NOTIFICATIONS = [];
				CurrentHeight = 0;
			});
			NotificationContainer.lastElementChild.after(ShowAllNotifications);
		} else {
			ShowAllNotifications.remove();
		}
	};
	//#==================================//
	//#-----------D I S M I S S--------//
	//#==============================//
	this.dismiss = function (component) {
		//#Removing shadown from notification
		component.style["shadow"] = null;
		component.classList.add(
			"animate__animated",
			"animate__fadeOutRight",
			"animate__faster"
		);
		//#Adding timeout to each childrens
		Array.prototype.forEach.call(component.children, (componentChilds, i) => {
			if (i === 0) {
				i = 0.5;
			}
			const componentChildsAnimation = new Animation(
				componentChilds,
				"animate__animated animate__fadeOutRight"
			);
			componentChildsAnimation.duration = i;
			componentChildsAnimation.apply();
		});
		component.addEventListener("animationend", () => {
			component.remove();
		});
	};
	//#=================================//
	//#--------D R A G G A B L E -----//
	//#=============================//
	this.draggable = function (component) {
		let isDragging = false,
			elementPositionX = 0,
			elementPositionY = 0,
			clickedPositionX = 0,
			mousedown = false;
		//#=================================//
		//#-------- ON MOUSE EVENT---------//
		//#=============================//
		component.addEventListener("mousedown", (md) => {
			md.preventDefault();
			mousedown = true;
			//
			clickedPositionX = md.pageX;
			//
			this.GetTransformation(component);

			component.addEventListener("mousemove", (e) => {
				e.preventDefault();
				isDragging = true;

				if (mousedown === true && isDragging === true) {
					//#Start dragging movement
					let targetPos = elementPositionX + e.clientX - clickedPositionX;
					this.HandleDragging(component, e, targetPos);
				}
				window.addEventListener("mouseup", function () {
					mousedown = false;
					isDragging = false;
				});
			});
			//#===============================//
			//#---------ON TOUCH MOVEMENT---//
			//#===========================//
			component.addEventListener(
				"touchmove",
				(tm) => {
					clickedPositionX = tm.touches[0].pageX;
					//	console.log("touched");
					//
					this.GetTransformation(component);

					//#Start dragging movement
					let targetPos = elementPositionX + tm.touches[0].pageX;
					this.HandleDragging(component, tm, targetPos);

					component.addEventListener(
						"touchend",
						function () {
							component.removeEventListener("touchmove", tm, false);
						},
						false
					);
				},
				false
			);
		});
	};
	this.HandleDragging = function (component, event, toNewPosition) {
		component.classList.remove("animate__animated", "animate__fadeInUp");
		component.style["transform"] = `translate3d(${toNewPosition}px, 0, 0)`;
		//#Fading out effect
		if (toNewPosition > 0 || toNewPosition < 0) {
			let opacity = 1;
			if (toNewPosition < 0) {
				opacity = opacity + toNewPosition / 100;
			} else {
				opacity = opacity - toNewPosition / 100;
			}

			if (Math.abs(opacity) > 1) {
				this.dismiss(component);
			}
			//console.log(`filter: opactiy(${opacity})`);
			component.style["filter"] = `opacity(${opacity})`;
		}
	};
	this.GetTransformation = function (component) {
		if (
			component.style["transform"].indexOf("(") !== -1 &&
			component.style["transform"].indexOf(")") !== -1
		) {
			var transformed = component.style["transform"]
				.split("(")[1]
				.split(")")[0];
			elementPositionX = parseInt(
				transformed.split(",")[0].split("px")[0].trim()
			);
			elementPositionY = parseInt(
				transformed.split(",")[1].split("px")[0].trim()
			);
		} else {
			elementPositionY = 0;
			elementPositionX = 0;
		}
	};
	//#====================================//
	//#--------A N I M A T I O N----------//
	//#==================================//
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

	//#==================================//
	//#--------I N J E C T-------------//
	//#==============================//
	this.inject = function (place, content) {
		if (NOTIFICATION.html === false) {
			place.textContent = content;
		} else {
			place.innerHTML = content;
		}
	};
}
const Notification = new Notify();

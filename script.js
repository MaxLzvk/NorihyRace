/* RoulioZ.com main page JS */
var size = 40;
var halfsize = size / 2;
var trailLength = 20;
var boxes = [];
var x = window.innerHeight/2;
var y = window.innerWidth/2;
var circles = document.getElementsByClassName("circle");
var deg = 0;
var boxshow = trailLength-1;
var move = false;


// add somes divs for the trail into mouseanim div
function initTrail() {
	for (var i = 0; i < trailLength; i++) {
		boxes[i] = document.createElement('div');
		boxes[i].className = 'box';
		boxes[i].style.display = "none";
		boxes[i].style.width  = size - (trailLength-i)*(halfsize/trailLength) + 'px';
		boxes[i].style.height = size - (trailLength-i)*(halfsize/trailLength) + 'px';
		boxes[i].style.opacity = 1 - (trailLength-i)*(1/trailLength);		
		boxes[i].style.backgroundColor = 'rgb('+(255 - (trailLength-i)*(255/trailLength))+', '+(17 - (trailLength-i)*(17/trailLength))+', '+(119 - (trailLength-i)*(119/trailLength))+')'; //'hsl(' + hue + ', 90%, 50%)';
		mouseanim.appendChild(boxes[i]);			
	}	
}

// animate trail and turning circles
function update(){
	// trai rendering
	for (var i = 0; i < boxes.length; i++) {
		if (i+1 === boxes.length) {
			boxes[i].style.left = x - halfsize + 'px';
			boxes[i].style.top = y - halfsize + 'px';						
		} else {
			boxes[i].style.left = boxes[i+1].style.left;
			boxes[i].style.top = boxes[i+1].style.top;						
		}
	}	
	// activate trail boxes only if mouse as moved at start
	if (move){
		if (boxshow >= 0){
			boxes[boxshow].style.display = "block";
			boxshow--;
			move = false;
		}
	}
	// turn circles on Z axis
	/*for (var i = 0; i < circles.length; i++){
		circles[i].style.transform = "rotateZ("+deg+"deg)";
	}
	deg++;*/
}

document.onmousemove = function() {
	x = window.pageXOffset + event.clientX;
	y = window.pageYOffset + event.clientY;
	move = true;	
};

// makes trails divs
initTrail();
// animate
var timer = setInterval(update, 20);

/* Popup iframe */
function load(){
	// stop mouse and circles animation
	mouseanim.display = "hidden";
	clearInterval(timer);	
	window.onresize = resize;
	document.body.onresize = resize;
	resize();
	myframe.contentWindow.focus();	
}

function resize(){
	// scale iframe content
	console.log("resize");
	scale = Math.min(0.96*framecontainer.clientWidth/myframe.contentWindow.document.body.scrollWidth, 0.96*framecontainer.clientHeight/myframe.contentWindow.document.body.scrollHeight);		
	myframe.contentWindow.document.body.style.transformOrigin = "0% 0%";
	myframe.contentWindow.document.body.style.transform = "scale("+scale+","+scale+")";	
	myframe.contentWindow.document.body.style.overflow = "hidden";
	// center the content with margin
	var margin = (myframe.clientWidth - (myframe.contentWindow.document.body.clientWidth * scale)) / 2;	
	console.log("frame width " + myframe.clientWidth);
	console.log("body width " +myframe.contentWindow.document.body.clientWidth);
	console.log("scaled to " + scale);
	if (margin > 0)
		myframe.contentWindow.document.body.style.marginLeft = margin + "px";
	else
		myframe.contentWindow.document.body.style.marginLeft = "0px";
}

// activate subtitle effect
function subtitleEffect(){
	subtitleeffect.style.top = subtitle.offsetTop + "px";
	subtitleeffect.style.animation = "appear 1s forwards";
}

window.onresize = subtitleEffect;
window.onload = subtitleEffect;
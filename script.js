function create_loop_video() {
	let loop_video = document.createElement('video');
	loop_video.src = './render.mp4'
	loop_video.loop = true;

	let style = {
		height: '100%',
	}

	Object.assign(loop_video.style, style);
	return loop_video;
}

function create_container() {
	let container = document.createElement('div');
	let container_style = {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		backgroundColor: 'black',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	}

	container.fade_in = async function() {
		container.style.opacity = 0;
		setTimeout(() => container.style.opacity = 1, 1);
		setTimeout(() => container.style.transition = 'opacity 2s', 5);
		setTimeout(() => container.style.transition = '', 2000);
		await new Promise((resolve) => setTimeout(resolve, 2000));
	}


	Object.assign(container.style, container_style);
	return container;
}

function create_entry_sequence() {
	let entry_sequence = document.createElement('video');
	// entry_sequence.src = './entry.mp4';
	entry_sequence.src = './short.mp4';
	entry_sequence.autoplay = true;
	entry_sequence.loop = false;
	entry_sequence.onended = () => {
		entry_sequence.remove();
		show_start_game();
	}

	return entry_sequence;
}

function create_second_scene() {
	let img = document.createElement('img');
	img.src = './scene.jpg';
	img.style.height = '100%';

	return img;
}

let entry_sequence = create_entry_sequence();
let loop_video = create_loop_video()
let container = create_container();
let second_scene = create_second_scene();

function transition_to_loop() {
	entry_sequence.remove();
	container.appendChild(loop_video);
	loop_video.play();

	container.fade_in().then(() => {
		show_get_out_option();
	})
}

function show_start_game() {
	let option_1 = document.createElement('button');
	option_1.innerText = 'start game';
	option_1.onclick = () => {
		option_1.remove();
		setTimeout(() => {
			transition_to_loop();
		}, 20);
	}

	let style = {
		position: 'fixed',
		bottom: "80px",
		left: "30vw",
	}

	Object.assign(option_1.style, style);
	float_element(option_1);
	document.body.appendChild(option_1);

}

function show_get_out_option() {
	let option_1 = document.createElement('button');
	option_1.innerText = 'get out';
	option_1.onclick = () => {
		option_1.remove();
		loop_video.remove();
		setTimeout(() => {
			container.appendChild(second_scene);
		}, 20);

		container.fade_in()
	}

	let style = {
		position: 'fixed',
		bottom: "80px",
		left: "30vw",
	}

	Object.assign(option_1.style, style);
	float_element(option_1);
	document.body.appendChild(option_1);

}

function float_element(element) {
	let inc = 0;
	let y = 0;
	let magnitude = 50;

	setInterval(() => {
		inc += .005;
		y = Math.sin(inc) * magnitude;

		element.style.transform = `translateY(${y}px)`;
		element.style.opacity = 1 - Math.abs(y / magnitude);
		element.style.filter = `blur(${1 + Math.abs(y / magnitude) * 3}px)`;
		element.style.letterSpacing = `${Math.abs(y / magnitude)}px`;

	}, 30);
}

document.addEventListener('mousemove', (e) => {
	let x = e.clientX;
	let y = e.clientY;

	let x_percent = x / window.innerWidth;
	let y_percent = y / window.innerHeight;

	loop_video.style.transform = `translate(${x_percent * 30}px, ${y_percent * 30}px)`;
})


container.appendChild(entry_sequence);
document.body.appendChild(container);




let audio = new Audio('./sound.mp3');
document.body.appendChild(audio);
audio.loop = true;
audio.play();

function create_video_library() {
	let videos = [
		{
			src: './render.mp4',
			options: [
				{ message: "Approach them", next: 2 }
			]
		},

		{
			src: './exit.mp4',
			options: [
				{ message: "Go back", next: 1 },
			]
		}


	]

	let get_video = (num) => videos[num - 1];

	return { get_video, videos }
}

let library = create_video_library()

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
	entry_sequence.onclick = () => {
		if (entry_sequence.paused) entry_sequence.play();
	}
	entry_sequence.onended = () => {
		entry_sequence.remove();
		show_start_game();
	}

	return entry_sequence;
}

function add_video(num) {
	let video = document.createElement('video')

	// get and set video src
	let video_source = library.get_video(num).src
	video.src = video_source
	video.autoplay = "true"
	// video.playbackRate = .5

	// 
	container.appendChild(video)

	return video
}

function play_scene(num) {
	let video_element = add_video(num)
	let video = library.get_video(num)

	video_element.onended = () => {

		video.options.forEach((option, i) => {
			add_button(option.message, option.next, (i + 1) * 30)
		})
	}
}

function add_button(message, link, left = 30) {
	let btn = document.createElement('button');
	btn.innerText = message;
	btn.onclick = () => {
		btn.remove();
		document.querySelectorAll("button").forEach((e) => e.remove())
		document.querySelector("video").remove()
		setTimeout(() => {
			play_scene(link)
		}, 20);
	}

	let style = {
		position: 'fixed',
		bottom: "80px",
		left: left + "vw",
	}

	Object.assign(btn.style, style);
	float_element(btn);
	document.body.appendChild(btn);
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
			play_scene(1)
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





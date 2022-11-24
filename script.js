const finish = () => {
	document.getElementById("max").innerText =
		`The maximum number of items in ${index - 1}`;
}

let index = JSON.parse(localStorage.getItem("index")) ?? 0;

// Place a limit so it doesn't loop forever when there is not limit;.
const fn = () => {
	try {
		index++;
		localStorage.setItem("index", JSON.stringify(index));

		let storage = {};
		storage[index.toString()] = index.toString();
		chrome.storage.sync.set(storage);
	} catch {
		finish();
	}

	chrome.storage.sync.get([index.toString()])
		.then((result) => {
			if (result[index.toString()] !== index.toString()) {
				finish();
			} else {
				document.getElementById("max").innerText = ` ${index}`;

				// Only continue the loop when this finishes.
				// Wait a bit to not exceed the maximum number of writes per
				// minute.
				setTimeout(fn, 500);
			}
		})
		.catch(() => {
			finish();
		});
}

fn();

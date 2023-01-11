window.onload = function () {
	if (g_config == null) return;
	if (g_config.list <= 0) return;

	var avatar = g_config.list[0];

	initPartsUI(avatar.id);
};

function showPartsList(id, matName) {
	if (g_config == null) return;

	var div = document.getElementById("list-pick");
	if (div == null) return;

	div.innerHTML = "";

	var files = [];
	var avatar = g_fileList.find((x) => x.Gender == id);
	if (avatar == null) return;
	for (var i of avatar.Parts) {
		if (i.Name == matName) {
			files = i.Files;
		}
	}

	var header = document.createElement("H2");
	var text = document.createTextNode(matName);
	header.appendChild(text);
	div.append(header);

	for (var i of files) {
		var button = document.createElement("button");
		button.innerText = i.Name;
		button.innerHTML = `<button class="img-size"><img src='${i.Path}' /></button>`;
		button.setAttribute(
			"onClick",
			`replaceParts('${matName}', '${i.Path}')`
		);
		div.appendChild(button);
	}
}

function changeGender(id) {
	initPartsUI(id);
	loadAvatar(id);
}

async function initPartsUI(id) {
	await waitForLoading();

	if (g_config == null) return;
	if (g_config.list <= 0) return;

	var avatar = g_config.list.find((x) => x.id == id);
	if (avatar == null) return;

	// Load Gender buttons
	var genderDiv = document.getElementById("gender-pick");
	if (genderDiv == null) return;

	genderDiv.innerHTML = "";
	for (var g of g_config.list) {
		var button = document.createElement("button");
		button.innerHTML = g.id;
		button.setAttribute("onClick", `changeGender('${g.id}')`);
		genderDiv.appendChild(button);
	}

	// Load Parts buttons
	var partsDiv = document.getElementById("parts-pick");
	if (partsDiv == null) return;

	partsDiv.innerHTML = "";
	for (var m of avatar.materials) {
		var button = document.createElement("button");
		button.innerText = m.name;
		button.setAttribute("onClick", `showPartsList('${id}', '${m.name}')`);
		partsDiv.appendChild(button);
	}

	// Default to the first material
	showPartsList(id, avatar.materials[0].name);
}

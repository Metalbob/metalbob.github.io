function insertHeader()
{
	fetch('header.html')
		.then(response => response.text())
		.then(headerContent => {
			const headerContainer = document.createElement("div");
			headerContainer.id = 'header-container';
			headerContainer.innerHTML = headerContent;
			body = document.getElementsByTagName("body");
			body[0].innerHTML = headerContainer.outerHTML + body[0].innerHTML;
		})
		.then(() => {
			//console.log("coucou");
			/*const banner = document.querySelector('.slider');
			const clones = banner.innerHTML; // Dupliquer le contenu de la bannière
			banner.innerHTML += clones; // Ajouter les clones à la fin*/

			// Pour assurer une longueur infinie
			//const totalWidth = banner.scrollWidth;
			//const bannerItems = document.querySelectorAll('.parallelogram');

			// Ajuster la durée de l'animation en fonction de la longueur du contenu
			//banner.style.animationDuration = `${totalWidth / 100}px`;
		});
}

function alignedContent(contentPath, description, align)
{
	const projectDescription = document.getElementById("project-description");
	const sectionContainer = document.createElement("div");
	sectionContainer.classList.add(align + '-aligned-content-container');
	projectDescription.appendChild(sectionContainer);

	var descriptionDiv = document.createElement('div');
	sectionContainer.appendChild(descriptionDiv);
	var descriptionContainer = document.createElement('p');
	descriptionContainer.innerHTML = description;
	descriptionDiv.appendChild(descriptionContainer);

	var IsURL = true;
	try
	{
		const URLPath = new URL(contentPath)
	}
	catch(e)
	{
		IsURL = false;
	}

	if (IsURL)
	{
		var videoDiv = document.createElement('div');
		sectionContainer.appendChild(videoDiv);
		var iframeVideo = document.createElement('iframe');
		contentPath = contentPath.slice(0, 24) + "embed/" + contentPath.slice(32);
		iframeVideo.src = contentPath;
		iframeVideo.title = "Youtube video player";
		iframeVideo.frameborder="0";
		videoDiv.appendChild(iframeVideo);
	}
	else
	{
		fetch(contentPath)
			.then(response => {
				const contentType = response.headers.get('Content-Type');
				var contentContainer = null;

				var contentDiv = document.createElement('div');
				sectionContainer.appendChild(contentDiv);

				// Traiter le fichier en fonction de son type MIME
				if (contentType.startsWith('image/'))
				{
					contentContainer = document.createElement("img");
				}
				else if (contentType.startsWith('video/'))
				{
					contentContainer = document.createElement("video");
				}
				else
				{
					console.log('Type de fichier non pris en charge.');
				}

				if (contentContainer != null)
				{
					contentContainer.src = contentPath;
					contentDiv.appendChild(contentContainer);
				}
			})
			.catch(error => console.error('Erreur lors de la récupération du fichier:', error));
	}
};

function projectSummary(projectName, projectSummary, projectAbout, technologies)
{
	const projectDetailsContainer = document.getElementById("project-summary");
	projectDetailsContainer.innerHTML = "";

	// description part
	var descriptionDiv = document.createElement('div');
	projectDetailsContainer.appendChild(descriptionDiv);

	var descriptionSummary = document.createElement('h2');
	descriptionSummary.textContent = "Summary";
	descriptionDiv.appendChild(descriptionSummary);
	var summaryParagraphe = document.createElement('p');
	summaryParagraphe.textContent = projectSummary;
	descriptionDiv.appendChild(summaryParagraphe);
	var descriptionAbout = document.createElement('h2');
	descriptionAbout.textContent = "About";
	descriptionDiv.appendChild(descriptionAbout);
	var descriptionParagraphe = document.createElement('p');
	descriptionParagraphe.textContent = projectAbout;
	descriptionDiv.appendChild(descriptionParagraphe);

	// poster part
	var posterDiv = document.createElement('div');
	projectDetailsContainer.appendChild(posterDiv);

	var posterImage = document.createElement('img');
	posterImage.src = "projects/" + projectName + "/poster.webp";
	posterImage.classList.add('poster');
	posterDiv.appendChild(posterImage);

	// technologies part
	var technoDiv = document.createElement('div');
	projectDetailsContainer.appendChild(technoDiv);

	var technologiesTitle = document.createElement('h2');
	technologiesTitle.textContent = "Technologies";
	technoDiv.appendChild(technologiesTitle);

	var iconsDiv = document.createElement('div');
	iconsDiv.classList.add('icons');
	technoDiv.appendChild(iconsDiv);

	technologies.forEach((item, i) => {
		var technoImage = document.createElement('img');
		technoImage.src = "resources/icons/" + item + ".webp";
		technoImage.classList.add('techno');
		iconsDiv.appendChild(technoImage);
	});
}

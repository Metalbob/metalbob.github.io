function imageExist(url)
{
	var http = new XMLHttpRequest();
	try {
		http.open('HEAD', url, false);
	} catch (e) {
		return false;
	}
	http.send();
	if (http.status === 200) {
		 return true;
		 //This file exist!
	} else {
		 return false;
		 //This file does not exist!
	}
}

function noContent(description)
{
	const projectDescription = document.getElementById("project-description");
	const sectionContainer = document.createElement("div");
	sectionContainer.classList.add('no-content-container');
	projectDescription.appendChild(sectionContainer);

	var descriptionDiv = document.createElement('div');
	sectionContainer.appendChild(descriptionDiv);
	var descriptionContainer = document.createElement('p');
	descriptionContainer.innerHTML = description;
	descriptionDiv.appendChild(descriptionContainer);
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
					contentContainer.controls = true;
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
}

function moveCarousel(shift, carouselIndex)
{
	const carousels = document.querySelectorAll(".carousel-displayer");
	const carousel = Array.from(carousels).find((element) => element.carouselIndex === carouselIndex);

	/** ne pas mettre le -800 en dur, se baser sur la taille du carousel */
	if ((carousel.currentX + shift <= 0) && (carousel.currentX + shift >= ((carousel.children.length - 1) * - Math.abs(shift))))
	{
		var currentLocation = carousel.currentX;
		carousel.displayedContentIndex += shift / Math.abs(shift);
		carousel.currentX += shift;
		updateCarouselFrame(carousel, currentLocation, shift/16);
	}
}

function updateCarouselFrame(carousel, currentLocation, frameShift)
{
	currentLocation += frameShift;

	if ((frameShift > 0 && currentLocation < carousel.currentX) ||
			(frameShift < 0 && currentLocation > carousel.currentX))
	{
		carousel.style.transform = `translateX(${currentLocation}px)`;
		requestAnimationFrame(function()
		{
			updateCarouselFrame(carousel, currentLocation, frameShift);
		});
	}
	else
	{
		currentLocation = carousel.currentX;
		carousel.style.transform = `translateX(${currentLocation}px)`;
	}
}

function resizeCarousel(carousel, carouselDisplayer, carouselIndex)
{
	var previousButton = carousel.children[0];
	var nextButton = carousel.children[carousel.children.length - 1];
	if (previousButton && nextButton)
	{
		previousButton.onclick = function() { moveCarousel(carousel.offsetWidth, carouselIndex); };
		nextButton.onclick = function() { moveCarousel(-carousel.offsetWidth, carouselIndex); };
		carouselDisplayer.currentX = carouselDisplayer.displayedContentIndex * carousel.offsetWidth;
		carouselDisplayer.style.transform = `translateX(${carouselDisplayer.currentX}px)`;
		var children = Array.from(carouselDisplayer.children);
		children.forEach((contentContainer) =>
		{
			contentContainer.children[0].style.width = carousel.offsetWidth + "px";
		});
	}
}

var nextCarouselIndex = 0;
async function alignedContents(contentsPaths, description, align)
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

	var carouselContainerDiv = document.createElement('div');
	carouselContainerDiv.classList.add("carousel-container");
	sectionContainer.appendChild(carouselContainerDiv);

	const carouselIndex =	nextCarouselIndex++;

	const previousButton = document.createElement('button');
	previousButton.classList.add("previous-button");
	const nextButton = document.createElement('button');
	nextButton.classList.add("next-button");
	previousButton.innerHTML = "<p>\<</p>";
	carouselContainerDiv.appendChild(previousButton);

	var carouselDisplayerDiv = document.createElement('div');
	carouselDisplayerDiv.classList.add("carousel-displayer");
	carouselDisplayerDiv.carouselIndex = carouselIndex;
	carouselDisplayerDiv.currentX = 0;
	carouselDisplayerDiv.displayedContentIndex = 0;
	carouselContainerDiv.appendChild(carouselDisplayerDiv);

	nextButton.innerHTML = "<p>\></p>";
	carouselContainerDiv.appendChild(nextButton);

	for(var pathsIndex = 0; pathsIndex < contentsPaths.length; pathsIndex++)
	{
		var contentPath = contentsPaths[pathsIndex];

		var contentContainerDiv = document.createElement('div');
		contentContainerDiv.classList.add("content-container");
		carouselDisplayerDiv.appendChild(contentContainerDiv);

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
			var iframeVideo = document.createElement('iframe');
			contentPath = contentPath.slice(0, 24) + "embed/" + contentPath.slice(32);
			iframeVideo.src = contentPath;
			iframeVideo.title = "Youtube video player";
			iframeVideo.frameborder="0";
			contentContainerDiv.appendChild(iframeVideo);
		}
		else
		{
			await fetch(contentPath)
				.then(response => {
					const contentType = response.headers.get('Content-Type');
					var contentContainer = null;

					// Traiter le fichier en fonction de son type MIME
					if (contentType.startsWith('image/'))
					{
						contentContainer = document.createElement("img");
					}
					else if (contentType.startsWith('video/'))
					{
						contentContainer = document.createElement("video");
						contentContainer.controls = true;
					}
					else
					{
						console.log('Type de fichier non pris en charge.');
					}

					if (contentContainer != null)
					{
						contentContainer.src = contentPath;
						contentContainerDiv.appendChild(contentContainer);
					}

					previousButton.onclick = function() { moveCarousel(contentContainerDiv.parentElement.parentElement.offsetWidth, carouselIndex); };
					nextButton.onclick = function() { moveCarousel(-contentContainerDiv.parentElement.parentElement.offsetWidth, carouselIndex); };
					contentContainerDiv.children[0].style.width = contentContainerDiv.parentElement.parentElement.offsetWidth + "px";

					window.addEventListener("resize", (event) => {resizeCarousel(carouselContainerDiv, carouselDisplayerDiv, carouselIndex);});
				})
				.catch(error => console.error('Erreur lors de la récupération du fichier:', error));
		}
	}
};

function projectSummary(projectName, projectSummary, projectRole, projectAbout, technologies)
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
	descriptionAbout.textContent = "Role";
	descriptionDiv.appendChild(descriptionAbout);
	var descriptionParagraphe = document.createElement('p');
	descriptionParagraphe.textContent = projectRole;
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

	var descriptionAbout = document.createElement('h2');
	descriptionAbout.textContent = "About";
	technoDiv.appendChild(descriptionAbout);
	var descriptionParagraphe = document.createElement('p');
	descriptionParagraphe.textContent = projectAbout;
	technoDiv.appendChild(descriptionParagraphe);

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

function displayGoToAnchor(anchor)
{
	document.querySelector(anchor).scrollIntoView({
		behavior: 'smooth'
	});
}

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

function moveCarousel(shift, carouselIndex)
{
	const carousels = document.querySelectorAll(".carousel-displayer");
	const carousel = Array.from(carousels).find((element) => element.carouselIndex === carouselIndex);

	if ((carousel.currentX + shift <= 0) && (carousel.currentX + shift >= ((carousel.children.length - 1) * -800)))
	{
		var currentLocation = carousel.currentX;
		carousel.currentX += shift;
		updateCarouselFrame(carousel, currentLocation, shift/16);
		/*carousel.style.transform = `translateX(${carousel.currentX}px)`;*/
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

	var carouselDiv = document.createElement('div');
	carouselDiv.classList.add("carousel");
	carouselContainerDiv.appendChild(carouselDiv);

	const carouselIndex =	nextCarouselIndex++;

	const previousButton = document.createElement('button');
	previousButton.classList.add("previous-button");
	previousButton.onclick = function() { moveCarousel(800, carouselIndex); };
	const nextButton = document.createElement('button');
	nextButton.classList.add("next-button");
	nextButton.onclick = function() { moveCarousel(-800, carouselIndex); };
	previousButton.innerHTML = "<p>\<</p>";
	carouselDiv.appendChild(previousButton);

	var carouselDisplayerDiv = document.createElement('div');
	carouselDisplayerDiv.classList.add("carousel-displayer");
	carouselDisplayerDiv.carouselIndex = carouselIndex;
	carouselDisplayerDiv.currentX = 0;
	carouselDiv.appendChild(carouselDisplayerDiv);

	nextButton.innerHTML = "<p>\></p>";
	carouselDiv.appendChild(nextButton);

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
				})
				.catch(error => console.error('Erreur lors de la récupération du fichier:', error));
		}
	}

	carouselDisplayerDiv.style = "width:" + carouselDisplayerDiv.children.length * 800 + "px";
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

function displayGoToTop()
{

}

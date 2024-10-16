function aligned_content(content_path, description, align)
{
	const project_description = document.getElementById("project-description");
	const section_container = document.createElement("div");
	section_container.classList.add(align + '-aligned-content-container');
	project_description.appendChild(section_container);

	var descriptionDiv = document.createElement('div');
	section_container.appendChild(descriptionDiv);
	var descriptionContainer = document.createElement('p');
	descriptionContainer.innerHTML = description;
	descriptionDiv.appendChild(descriptionContainer);

	var IsURL = true;
	try
	{
		const URLPath = new URL(content_path)
	}
	catch(e)
	{
		IsURL = false;
	}

	if (IsURL)
	{
		var videoDiv = document.createElement('div');
		section_container.appendChild(videoDiv);
		var iframeVideo = document.createElement('iframe');
		content_path = content_path.slice(0, 24) + "embed/" + content_path.slice(32);
		iframeVideo.src = content_path;
		iframeVideo.title = "Youtube video player";
		iframeVideo.frameborder="0";
		videoDiv.appendChild(iframeVideo);
	}
	else
	{
		fetch(content_path)
			.then(response => {
				const contentType = response.headers.get('Content-Type');
				var content_container = null;

				var contentDiv = document.createElement('div');
				section_container.appendChild(contentDiv);

				// Traiter le fichier en fonction de son type MIME
				if (contentType.startsWith('image/'))
				{
					content_container = document.createElement("img");
				}
				else if (contentType.startsWith('video/'))
				{
					content_container = document.createElement("video");
				}
				else
				{
					console.log('Type de fichier non pris en charge.');
				}

				if (content_container != null)
				{
					content_container.src = content_path;
					//content_container.style = "float: right";
					contentDiv.appendChild(content_container);
				}
			})
			.catch(error => console.error('Erreur lors de la récupération du fichier:', error));
	}
};

function project_summary(project_name, project_summary, project_about, technologies)
{
	const project_details_container = document.getElementById("project-summary");
	project_details_container.innerHTML = "";

	// description part
	var descriptionDiv = document.createElement('div');
	project_details_container.appendChild(descriptionDiv);

	var description_summary = document.createElement('h2');
	description_summary.textContent = "Summary";
	descriptionDiv.appendChild(description_summary);
	var summary_paragraphe = document.createElement('p');
	summary_paragraphe.textContent = project_summary;
	descriptionDiv.appendChild(summary_paragraphe);
	var description_about = document.createElement('h2');
	description_about.textContent = "About";
	descriptionDiv.appendChild(description_about);
	var description_paragraphe = document.createElement('p');
	description_paragraphe.textContent = project_about;
	descriptionDiv.appendChild(description_paragraphe);

	// poster part
	var posterDiv = document.createElement('div');
	project_details_container.appendChild(posterDiv);

	var poster_image = document.createElement('img');
	poster_image.src = "projects/" + project_name + "/poster.webp";
	poster_image.classList.add('poster');
	posterDiv.appendChild(poster_image);

	// technologies part
	var technoDiv = document.createElement('div');
	project_details_container.appendChild(technoDiv);

	var technologies_title = document.createElement('h2');
	technologies_title.textContent = "Technologies";
	technoDiv.appendChild(technologies_title);

	var icon_div = document.createElement('div');
	icon_div.classList.add('icons');
	technoDiv.appendChild(icon_div);

	technologies.forEach((item, i) => {
		var techno_image = document.createElement('img');
		techno_image.src = "resources/" + item + ".webp";
		techno_image.classList.add('techno');
		icon_div.appendChild(techno_image);
	});
}

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

function project_description()
{
	console.log("coucou");
	const project_summary = document.getElementById("project-summary");
	
	var descriptionDiv = document.createElement('div');
	project_summary.appendChild(descriptionDiv);
	var posterDiv = document.createElement('div');
	project_summary.appendChild(posterDiv);
	var technoDiv = document.createElement('div');
	project_summary.appendChild(technoDiv);
}

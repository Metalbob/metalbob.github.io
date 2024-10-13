function right_aligned_content(content_path, description)
{
	const iframe = document.getElementById("project-description");
	const section_container = document.createElement("div");
	section_container.classList.add('aligned-content-container');
	iframe.appendChild(section_container);

	fetch(content_path)
		.then(response => {
			const contentType = response.headers.get('Content-Type');

			var descriptionDiv = document.createElement('div');
			section_container.appendChild(descriptionDiv);
			var descriptionContainer = document.createElement('p');
			descriptionContainer.innerHTML = description;
			descriptionDiv.appendChild(descriptionContainer);
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
};

function left_aligned_content(content_path, description)
{
	const iframe = document.getElementById("project-description");
	const section_container = document.createElement("div");
	section_container.classList.add('aligned-content-container');
	iframe.appendChild(section_container);

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

			var descriptionDiv = document.createElement('div');
			section_container.appendChild(descriptionDiv);
			var descriptionContainer = document.createElement('p');
			descriptionContainer.innerHTML = description;
			descriptionDiv.appendChild(descriptionContainer);
		})
		.catch(error => console.error('Erreur lors de la récupération du fichier:', error));
};

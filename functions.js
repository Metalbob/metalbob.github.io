function right_aligned_content(content_path, description)
{
	const iframe = document.getElementById("project-description");
	const section_container = document.createElement("div");
	iframe.appendChild(section_container);

	fetch(content_path)
		.then(response => {
			const contentType = response.headers.get('Content-Type');
			console.log('Le type MIME du fichier est :', contentType);
			
			var content_container = null;
			
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
				section_container.appendChild(content_container);
			}
		})
		.catch(error => console.error('Erreur lors de la récupération du fichier:', error));
};

function left_aligned_content(content_path, description)
{
	
};
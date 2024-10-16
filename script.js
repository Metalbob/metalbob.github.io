// Charger les données JSON et générer la frise
fetch('projects/projects.json')
	.then(response => response.json())
	.then(data => {

		const sortedProjects = data.sort((a, b) => a.order - b.order);

		const promises = sortedProjects.map(project => {
		 	return fetch("projects/" + project.projectFolder + "/project_data.json", { cache: 'no-store' })
				.then( project_data_json => project_data_json.json())
				.then( project_data => ({

					projectFolder: project.projectFolder,
					projectData: project_data
				}));
		});

		return Promise.all(promises);
	})
	.then(allProjects => {

		const timelineContainer = document.getElementById('timeline-container');

		allProjects.forEach(({projectFolder, projectData}) => {

			// Créer le bouton pour chaque projet
			const button = document.createElement('button');
			button.className = 'timeline-btn';
			button.innerHTML = `<img src="projects/${projectFolder}/thumbnail.webp" alt="${projectData.title}">`;
			button.dataset.project = projectData.year;

			// Ajoute le comportement de clic
			button.addEventListener('click', () => {

				const projectHeader = document.getElementById('project-header');
				projectHeader.style = `background-image:url('resources/static.webp');`;
				projectHeader.style.backgroundRepeat = 'repeat';
				projectHeader.style.backgroundSize = 'contain';

				setTimeout(() => {

					project_summary(`${projectFolder}`, `${projectData.summary}`, `${projectData.about}`, projectData.technologies);
					// Remplacer le contenu du projet affiché
					projectHeader.style = `background-image:url(projects/${projectFolder}/header.webp); background-position:${projectData.headercoordinates}`;
					projectHeader.innerHTML = `<h2>${projectData.title}</h2>`;

					fetch(`projects/${projectFolder}/index.html`)
						.then(response => {
							return response.text();
						})
						.then(text => {
							const projectDescription = document.getElementById('project-description');
							projectDescription.innerHTML = text;

							const scripts = projectDescription.querySelectorAll('script');
							scripts.forEach( script => {
								const newScript = document.createElement('script');
								newScript.textContent = script.textContent;
								projectDescription.removeChild(script);
								projectDescription.appendChild(newScript);
							});
						});
				}, 300);
			});

			// Ajouter le bouton à la frise
			timelineContainer.appendChild(button);
		});

		// Activer le premier projet par défaut
		document.querySelector('.timeline-btn').click();
	})
	.catch(error => console.error('Erreur lors du chargement des projets:', error));

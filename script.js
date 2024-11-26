// Charger les données JSON et générer la frise
fetch('projects/projects.json')
	.then(response => response.json())
	.then(data => {

		const sortedProjects = data.sort((a, b) => a.order - b.order);

		const promises = sortedProjects.map(project => {
		 	return fetch("projects/" + project.projectFolder + "/project_data.json")
				.then( projectDataJson => projectDataJson.json())
				.then( projectData => ({

					projectFolder: project.projectFolder,
					projectData: projectData
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
			if (projectFolder != "Other")
			{
				button.innerHTML = `<img src="projects/${projectFolder}/thumbnail.webp" alt="${projectData.title}">`;
			}
			else
			{
				button.innerHTML = `<h2 alt="${projectData.title}"> ${projectData.title}</h2>`;
			}
			button.dataset.project = projectData.year;

			// Ajoute le comportement de clic
			button.addEventListener('click', () => {

				displayGoToAnchor('#project-details');
				const projectHeaderStatic = document.getElementById('project-header-static');
				const projectHeader = document.getElementById('project-header');
				const projectTitle = document.getElementById('project-title');
				projectHeader.style = "height:0";

				setTimeout(() => {

					projectSummary(`${projectFolder}`, `${projectData.summary}`, `${projectData.role}`, `${projectData.about}`, projectData.technologies);
					// Remplacer le contenu du projet affiché
					projectHeader.src = `projects/${projectFolder}/header.webp`;
					projectHeader.backgroundPosition = `${projectData.headercoordinates}`
					projectTitle.textContent = `${projectData.title}`;

					projectHeader.onload = function()
					{
						projectHeader.style = "height:inherit";
					}

					fetch(`projects/${projectFolder}/index.html`, {cache: "no-store"})
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

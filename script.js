// Charger les données JSON et générer la frise
fetch('projects/projects.json')
	.then(response => response.json())
	.then(data => {
		const timelineContainer = document.getElementById('timeline-container');
		const projectDetails = document.getElementById('project-details');

		const promises = data.map(project => {
		 	return fetch("projects/" + project.projectFolder + "/project_data.json", { cache: 'no-store' })
				.then( project_data_json => project_data_json.json())
				.then( project_data => {

					// Créer le bouton pour chaque projet
					const button = document.createElement('button');
					button.className = 'timeline-btn';
					button.innerHTML = `<img src="projects/${project.projectFolder}/thumbnail.png" alt="${project_data.title}">`;
					button.dataset.project = project_data.year;

					// Ajoute le comportement de clic
					button.addEventListener('click', () => {

						const projectHeader = document.getElementById('project-header');
            projectHeader.style = `background-image:url('resources/static.gif');`;
						//projectHeader.style.backgroundRepeat = 'repeat';
						//projectHeader.style.backgroundSize = 'contain';

						setTimeout(() => {

							project_summary(`${project.projectFolder}`, `${project_data.summary}`, `${project_data.about}`, project_data.technologies);
							// Remplacer le contenu du projet affiché
							projectHeader.style = `background-image:url(projects/${project.projectFolder}/header.png); background-position:${project_data.headercoordinates}`;
							projectHeader.innerHTML = `<h2>${project_data.title}</h2>`;

							fetch(`projects/${project.projectFolder}/index.html`)
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
		});

		return Promise.all(promises);
	})
	.then(() => {
		// Activer le premier projet par défaut
		document.querySelector('.timeline-btn').click();
	})
	.catch(error => console.error('Erreur lors du chargement des projets:', error));

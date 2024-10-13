// Charger les données JSON et générer la frise
fetch('projects/projects.json')
	.then(response => response.json())
	.then(data => {
		const timelineContainer = document.getElementById('timeline-container');
		const projectDetails = document.getElementById('project-details');
			data.forEach(project => {
			// Créer le bouton pour chaque projet
			const button = document.createElement('button');
			button.className = 'timeline-btn';
			button.innerHTML = `<img src="${project.icon}" alt="${project.title}">`;
			button.dataset.project = project.year;

			// Ajoute le comportement de clic
			button.addEventListener('click', () => {
				// Remplacer le contenu du projet affiché
				const projectHeader = document.getElementById('project-header');
				projectHeader.style = `background-image:url(${project.header}); background-position:${project.headercoordinates}`;
				projectHeader.innerHTML = `<h2>${project.title}</h2>`;
				
				fetch(`${project.content}`)
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
			});

			// Ajouter le bouton à la frise
			timelineContainer.appendChild(button);
		});

		// Activer le premier projet par défaut
		document.querySelector('.timeline-btn').click();
	})
	.catch(error => console.error('Erreur lors du chargement des projets:', error));


/*// Charger les données JSON et générer la frise
fetch('projects/projects.json')
	.then(response => response.json())
	.then(data => {
		const timelineContainer = document.getElementById('timeline-container');
		const projectDetails = document.getElementById('project-details');
			data.forEach(project => {
			// Créer le bouton pour chaque projet
			const button = document.createElement('button');
			button.className = 'timeline-btn';

			button.innerHTML = `<img src="${project.icon}" alt="${project.title}">`;
			button.dataset.project = project.year;

			// Ajoute le comportement de clic
			button.addEventListener('click', () => {
				// Remplacer le contenu du projet affiché
				projectDetails.innerHTML = `
					<div class="project-header" style="background-image:url(${project.header}); background-position:${project.headercoordinates}">
						<h2>${project.title}</h2>
					</div>
					<iframe class="project-description" src="${project.content}" frameborder="0"></iframe>
				`;
			});

			// Ajouter le bouton à la frise
			timelineContainer.appendChild(button);
		});

		// Activer le premier projet par défaut
		document.querySelector('.timeline-btn').click();
	})
	.catch(error => console.error('Erreur lors du chargement des projets:', error));*/

async function fetchMyGithubRepos() {

  let responseJSON = [], response;

  let pageNumber = 1;

  do {
    response = await fetch(
      `https://api.github.com/users/RaselParvejABC/repos?page=${pageNumber++}`,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/vnd.github.v3+json",
        },
      }
    );

    response = await response.json();
    
    responseJSON.push(...response);


  } while(response.length > 0);


  return responseJSON;
}

function getPortfolioItemHTML(project) {

  return `
    <div class="col-md-6 col-lg-4 mb-5">
        <div class="portfolio-item mx-auto">
            
            <div class="portfolio-item-card card bg-secondary text-white" data-bs-toggle="tooltip" title="${project['description']}">
                <div class="card-body flex-fill">
                    <h4 class="card-title">${project['name']}</h4>
                    <p class="card-body">${project['description']}</p>
                    <a href="${project['html_url']}" class="card-link text-decoration-none" target="_blank">See on Github</a>
                </div>
            </div>



        </div>
    </div>
    `;
}

async function populatePortfolioSection() {
    const arrayOfProjects = await fetchMyGithubRepos();
    
    const portfolioGrid = document.querySelector('#portfolio-grid');

    portfolioGrid.innerHTML = arrayOfProjects.map(project => getPortfolioItemHTML(project)).join('\n');
}

populatePortfolioSection();

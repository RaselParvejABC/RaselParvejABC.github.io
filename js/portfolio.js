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
    <div class="col-md-6 col-lg-4 mb-5 mx-auto">
      <div class="card h-100 bg-secondary text-white p-2" data-bs-toggle="tooltip" title="${project['description']}">
        <div class="card-body position-relative h-100">
          <h4 class="card-title">${project['name']}</h4>
          <p class="card-body">${project['description']}</p>
          <a href="${project['html_url']}" class="card-link text-decoration-none position-absolute bottom-0" target="_blank">See on Github</a>
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

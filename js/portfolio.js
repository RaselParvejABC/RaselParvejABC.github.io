async function fetchMyGithubRepos() {
  const response = await fetch(
    "https://api.github.com/users/RaselParvejABC/repos",
    {
      headers: {
        "Content-Type": "application/json",
        accept: "application/vnd.github.v3+json",
      },
    }
  );
  const responseJSON = await response.json();
  console.log(responseJSON);
  return responseJSON;
}

function getPortfolioItemHTML(project) {
  return `
    <div class="col-md-6 col-lg-4 mb-5">
        <div class="portfolio-item mx-auto">
            <div
              class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
              <div
                class="portfolio-item-caption-content text-center text-white">
                <a href="${project['html_url']}" class="btn btn-success" target="_blank">See on Github</a>
              </div>
            </div>
            
            <div class="portfolio-item-card card">
                <div class="card-body">
                    <h4 class="card-title text-primary">${project['name']}</h4>
                    <p class="card-text">${project['description']}</p>
                    <a href="${project['html_url']}" class="card-link" target="_blank">See on Github</a>
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

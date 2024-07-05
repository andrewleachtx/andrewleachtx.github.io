const projects = [
  {
    title: "Ray Tracer",
    date: "April 2024",
    image: "../projects/raytracer/assets/scene.png",
    link: "../projects/raytracer/raytracer.html",
    desc: "Ray tracing engine featuring constructive solid geometry, anti-aliasing, multithreading, and 9 scenes.",
  },
  {
    title: "TBD...",
    date: "January 0000",
    image: "",
    link: "",
    desc: "More will be added to this doc soon",
  }
  //   {
  //     title: "Deferred Renderer",
  //     date: "March 2024",
  //     image: "./projects/"
  //   }
];

// Just a sort w/ comparator, for now orders top to bottom newest to oldest
function sortProjects(projects) {
  return projects.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function genProjects() {
  // Get big container for all of it
  const container = document.querySelector(".projects-container");
  const projects_ordered = sortProjects(projects);

  projects_ordered.forEach((proj) => {
    const proj_ele = document.createElement("div");

    proj_ele.classList.add("project-card");
    proj_ele.innerHTML = `
        <a href="${proj.link}">
            <img class="project-image" alt="${proj.title} Image" src="${proj.image}" />
            <div class="project-details">
                <h3 class="project-title">${proj.title}</h3>
                <p class="project-date">${proj.date}</p>
                <p class="project-desc">${proj.desc}</p>
            </div>
        </a>
    `;
    container.appendChild(proj_ele);
  });
}

document.addEventListener("DOMContentLoaded", genProjects);

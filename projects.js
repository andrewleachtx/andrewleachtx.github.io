// Just a sort w/ comparator, for now orders top to bottom newest to oldest
function sortProjects(projects) {
  return projects.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.date) - new Date(a.date);
  });
}

function genProjects(projects) {
  // Get big container for all of it
  const container = document.querySelector(".projects-container");
  const projects_ordered = sortProjects(projects);

  projects_ordered.forEach((proj) => {
    const proj_ele = document.createElement("div");

    proj_ele.classList.add("projects-card");
    proj_ele.innerHTML = `
        <a href="${proj.link}" target="_blank">
            ${
              proj.pinned
                ? '<img src="../assets/icon-pin.svg" class="icon-pin" alt="Pin Icon" />'
                : ""
            }
            <img class="projects-image" alt="${proj.title} Image" src="${
      proj.image
    }" style="width: 200px; height: 200px;" />
            <div class="projects-details">
                <h3 class="projects-title">${proj.title}</h3>
                <p class="projects-date">${proj.date} • ${proj.timeframe}</p>
                <p class="projects-desc">${proj.desc}</p>
                <p class="projects-readtime">${proj.readtime}</p>
            </div>
        </a>
    `;
    container.appendChild(proj_ele);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("../projects.json")
    .then((res) => res.json())
    .then((data) => {
      genProjects(data.projects);
    })
    .catch((err) => {
      console.error(err);
    });
});

const projects = [
  {
    title: "Ray Tracer",
    date: "April 2024",
    timeframe: "1 month",
    readtime: "15 minute read",
    image: "../projects/raytracer/assets/scene.png",
    link: "../projects/raytracer/raytracer.html",
    desc: "C++ ray tracing engine (from scratch) featuring constructive solid geometry, anti-aliasing, multithreading, and 9 scenes.",
    pinned: true,
  },
  {
    title: "Rasterizer",
    date: "January 2024",
    timeframe: "2 weeks",
    readtime: "5 minute read",
    image: "../projects/rasterizer/assets/shenrons.png",
    link: "../projects/rasterizer/rasterizer.html",
    desc: "C++ rasterizer from coordinate data to image. Showcases BCC interpolation, z-buffers, lighting, and mesh transforms.",
    pinned: false,
  },
  {
    title: "OpenGL Object Shaders",
    date: "February 2024",
    timeframe: "1 week",
    readtime: "",
    link: "../projects/objectshaders/objshaders.html",
    image: "../projects/objectshaders/assets/cel_jade.gif",
    desc: "C++ OpenGL shaders featuring Blinn-Phong (3+ materials), silhouette, and cel shading with variable time and lighting."
  },
  {
    title: "Personal Website",
    date: "June 2024",
    timeframe: "Ongoing",
    readtime: "",
    image: "../assets/site.png",
    link: "https://github.com/andrewleachtx/andrewleachtx.github.io",
    desc: "This website - built on native HTML, CSS, and JavaScript.",
    pinned: false,
  },
  {
    title: "pypocketwatch",
    date: "May 2024",
    timeframe: "2 weeks",
    readtime: "5 minute read",
    image: "../assets/pypocketwatch.png",
    link: "https://github.com/andrewleachtx/pypocketwatch/",
    desc: "Daily updating script to scrape, filter, and report online noise relating to the sale of the Seiko SARY085, my favorite watch.",
    pinned: false,
  },
  {
    title: "TBD...",
    date: "Eventually...",
    timeframe: "???",
    readtime: "",
    image: "",
    link: "",
    desc: "Many more projects have yet to be migrated to this site.",
    pinned: false,
  },
  //   {
  //     title: "Deferred Renderer",
  //     date: "March 2024",
  //     image: "./projects/"
  //   }
];

// Just a sort w/ comparator, for now orders top to bottom newest to oldest
function sortProjects(projects) {
  return projects.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.date) - new Date(a.date);
  });
}

function genProjects() {
  // Get big container for all of it
  const container = document.querySelector(".projects-container");
  const projects_ordered = sortProjects(projects);

  projects_ordered.forEach((proj) => {
    const proj_ele = document.createElement("div");

    proj_ele.classList.add("projects-card");
    proj_ele.innerHTML = `
        <a href="${proj.link}">
            ${proj.pinned ? '<img src="../assets/icon-pin.svg" class="icon-pin" alt="Pin Icon" />' : ''}
            <img class="projects-image" alt="${proj.title} Image" src="${proj.image}" style="width: 200px; height: 200px;" />
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

document.addEventListener("DOMContentLoaded", genProjects);

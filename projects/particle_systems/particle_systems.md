# Particle Systems
C++ physics engine with OpenGL rendering with particles, bounding sphere-ray optimization, portals (physics only), and particle shotgun mechanics. 

## Disclaimer
Textures and visuals are not mine, just the code.

## Scenes
  - Pictures don't do it justice; please watch it in action on the [YouTube demo](https://www.youtube.com/watch?v=VYosMS7UIFw). To be fair, YouTube compression also doesn't do it justice.

## Features
This is basically an extension of my bouncing ball or **1 point 6 planes**, but $\geq 1$ points, or particles. Some notable features are:

- Spherical coordinate usage to generate (pseudo)random "shotgun" spread from the camera in a ray outward.
- Ray-plane and ray-triangle intersection, including support for any Mesh composed of triangles.
  - The **Stanford bunny** was used in the video!
- To avoid costly intersection tests, a bounding volume (sphere) was wrapped around this Stanford bunny. If we aren't close to the bunny, why iterate over all primitives (triangles) that define our mesh?
- Portals! I sunk probably 10 hours alone messing with stencil buffers and other techniques to rerender the scene from a new perspective in OpenGL - to no avail. However, the physics is there and this is evident in the video.
- Intense texture mapping that I've never done before was nice to prove to myself it was possible, despite the time sink it was to get it right.


## Resources
  - [Dear ImGUI](https://github.com/ocornut/imgui)
  - [Dr. Shinjiro Sueda](https://people.engr.tamu.edu/sueda/index.html) CSCE 441 assignment skeleton code.
  - [Dr. John Keyser](https://people.engr.tamu.edu/keyser/index.html)
  - Lecture materials and notes.
  - Various obj files and textures were referenced online for this project, those of which are not included in the repo nor are they included in the submission.
  - Sebastian Lague - [Coding Adventure: Portals](https://www.youtube.com/watch?v=cWpFZbjtSQg)
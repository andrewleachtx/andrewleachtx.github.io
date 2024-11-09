# 1 Point 6 Planes
This is my first ever physics simulation that ties in both a `simulation` and `render` loop all occurring at the same time. It is a pretty big deal for me!

## Visuals

<div align="center">
    <img src="assets/overview.png" width=75% alt="Overview" />
</div>

As it is moving, [this](https://www.youtube.com/watch?v=TuYdcpQFQr0) brief video does it better justice!

## Overview
In this case, we have a single point (with radius) and 6 planes. This is what the code does:

```cpp
while 1 == 1:
├── simulate
│   └── solveConstraints
└── render
    ├── draw planes
    └── draw sphere at point position
```
More accurately,
```cpp
while (cur_time < MAX_TIME && !glfwWindowShouldClose(window)) {
    if (!simulation_frozen) {
        simulate();
    }
    
    render();

    // Swap front and back buffers.
    glfwSwapBuffers(window);
    // Poll for and process events.
    glfwPollEvents();
}
```

## Simulation
There are six planes, initialized with relevant physics data; a point on the plane $\vec{p}$ and the normal $\hat{n}$.

The ball is a point or `glm::vec3` with its own position $\vec{x}$ and velocity $\vec{v}$.

As timestep increases, the ball (point) position is updated according to velocity. For the velocity update, we observe an acceleration based on gravity, wind resistance, and frictional forces.

```cpp
// Full simulation with the loop
static void simulate() {
    float timestep_remaining = SIMULATION_TIMESTEP / DT_SUBSTEPS;
    float dt = timestep_remaining;

    // This is a single timestep
    while (timestep_remaining > FLOAT_EPS) {
        for (int i = 0; i < DT_SUBSTEPS; i++) {
            const glm::vec3& x_cur(ball_x[0]), v_cur(ball_v[0]);

            // We need to get the current acceleration acting on our ball based on gravity, air resistance, and friction
            glm::vec3 a = getAcceleration(0);

            // Integrate with timestep to update xnew, vnew
            glm::vec3 x_new = x_cur + (v_cur * dt);
            glm::vec3 v_new = v_cur + (a * dt);

            // Solve any constraints imposed by updated positions - x_new, v_new, dt are pass by reference
            solveConstraints(x_new, v_new, dt, a);

            // Update states
            ball_x[0] = x_new;
            ball_v[0] = v_new;

            // Update timestep
            timestep_remaining -= dt;
        }
    }

    cur_step++;
    cur_time = cur_step * SIMULATION_TIMESTEP;
}
```

However, we should address `solveConstraints(...)` as without it, we would clip through any of the six planes, which are effectively six **position constraints** (our particle's $\vec{x}$ is constrained on one side of the each plane).

Because my actual cpp code is quite verbose, here is my logic:

```
def solveConstraints(x_new, v_new, dt, a):
    // 1 - COLLISION DETECTION
    for plane in planes:
        if ball passes plane (offset by ball radius)
            handle collision, update timestep to fraction f = d_old / (d_old - d_new)
        
        check for "jitter" - if length(v) small, x on the plane, and the acceleration is towards the plane, set velocity to zero
```         

## Rendering

While the cpp code is full of GL calls, the logic itself is pretty simple:

```
def render():
    drawSun(time)
    drawPlanes()
    drawBall()
```

Note the position the ball is drawn is based on the same "buffer" stored on CPU for the balls position $\vec{x}$ and velocity $\vec{v}$.

## Resources
- [Dr. John Keyser](https://people.engr.tamu.edu/keyser/index.html) CSCE649 physically based modeling instructor.
- [Dear ImGUI](https://github.com/ocornut/imgui)
- [Dr. Shinjiro Sueda](https://people.engr.tamu.edu/sueda/index.html) CSCE441 assignment skeleton code.
- Lecture materials and notes.
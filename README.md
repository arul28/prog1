# README

1. **Ray Casting Setup**:
   - Implemented a ray casting function that shoots rays from an eye position through each pixel of the canvas.
   - Defined the eye position at (0.5, 0.5, -0.5) and the window at z=0.

2. **Triangle Intersection**:
   - Created a function to check if a ray intersects with a triangle using the Möller–Trumbore intersection algorithm.
   - Implemented vector operations helper functions to support the intersection calculations.

3. **Depth Handling**:
   - Added checks to ensure only the closest triangle intersection is rendered.
   - Implemented a check to render only triangles in front of the window plane, fixing issues with triangles appearing between the eye and the window.

4. **Color Rendering**:
   - Set up the rendering to use the diffuse color of the intersected triangle.
   - Implemented a black background for areas where no triangles are intersected.

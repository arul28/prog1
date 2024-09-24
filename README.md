# Program 1 - Arul Sharma

## Implementation

   - Shoots rays from an eye position (0.5, 0.5, -0.5) through each pixel of the canvas
   - Uses a window plane at z=0 for ray-scene intersections
   - Calculates the intersection of the ray with the triangle's plane
   - Uses an edge-testing method to determine if the intersection point lies within the triangle
   - Implements the Blinn-Phong reflection model for realistic lighting


   - Original Scene: Renders colored triangles as was expected
   - Christmas Scene: Creates a custom scene with multiple trees and a moon in the night sky
   - Allows toggling between the original and Christmas scenes using the spacebar.


## Functions Overview

- `raycast()`: Core function for ray casting implementation
- `rayTriangleIntersection()`: Checks for intersection between a ray and a triangle
- `computeBlinnPhong()`: Calculates lighting using the Blinn-Phong model
- `createChristmasTreeScene()`: Generates the Christmas-themed scene
- `renderOriginalScene()`: Renders the original triangle scene
- `renderChristmasScene()`: Renders the Christmas tree scene

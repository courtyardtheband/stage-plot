# Stage Plot

Tool for designing and rendering stage plots, with a cable router, 3D and 2D views, and visual editor. 

# Architecture

Engine: All of the logic that routes cables, edits 3d objects, etc.  
Backend: Server routing  
Frontend: View (ie three.js / react)  


# Tech Stack
Engine: Python. Performance code written in Rust when needed.  
Frontent: React, three.js  
Persistence: json


# Roadmap

1. 2D object editor
2. Persistent objects
3. Ports
4. Manual Cable Running
5. Constraint feedback for cable running (bends, collisions, length)
6. Cable Inventory
7. 2D cable router
8. 2D constraint solver
9. 3D Object editor
  1. Maintain constraint solver. Offset length by height and clip down
10. Gravity effects
    1. Strategy pattern, start with caternary cruve so its simple
11. 3D physics, constraints, collisions
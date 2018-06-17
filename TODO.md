 / Make a particle pool, so that emitters don't just accrue more and more
   particles if they never go off-screen
    / Make a global pool size limit - that is, a maximum number of entities
      across all pools
        / Add setSize method to pools, which allows them to grow/shrink
          dynamically
        / Add PoolManager class/singleton, which allows creating/destroying
          pools of various sizes
 / Make things hoverable:
    / Emitters
    / RadialForces
    / ConstantForce
 / Make things draggable:
    / Emitters
    / RadialForces
    / ConstantForce
    / Fix bug where clicking on any item drags it a bit
 / Make things selectable:
    / Emitters
    / RadialForces
    / ConstantForce
    - Add pulsing animation for selected item
 / Add config panels for things:
    / Emitters
    / RadialForces
    / ConstantForce
 - Improve drawings:
    / Arrow for ConstantForce
    - Radial gradiant for RadialForce sucks...
    / ConstantForce arrow head isn't correct for all angles!
 - Make things deletable:
    - From panel:
        / Emitters
        / RadialForces
        / ConstantForce
    / from keyboard:
        / Emitters
        / RadialForces
        / ConstantForce
 / Change Emitter start/end angle to angle and spread
 / Add velocity to emitters, and add it to emitted particles
 / Make angles in panel degrees
 - Make click detection track distance traveled, rather than comparing
   start/end points?
 / Figure out why I'm inconsistently integrating over time (e.g.,  is it vx +=
   ax * dt, or vx += ax * dt / 1000?)
 / Rename collision.js to geometry.js
 / Make items movable with arrow keys
 - Make buttons to add:
    - Emitters
    - RadialForces
    - ConstantForce
 - Make it work on mobile:
    - Touch events
    - Panels fill screen
 - Add help panel/window:
    - Open via button
    / Open via '?'
 - Make items keep their speed
 - Make items bounce off sides of viewport
 / Make time speed configurable with +/-

 / Investigate why sometimes deleting an item doesn't close the panel
 - Invert mass definition - positive mass should mean attraction

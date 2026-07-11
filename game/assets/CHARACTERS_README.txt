==========================================================
  GAME ART — WHAT'S IN THIS FOLDER
==========================================================

Town / scenery (from the "2D Pixel City Pack", CC-BY 4.0):
   sky.png, skyline.png, build_shop.png, build_club.png,
   build_apartment.png, tree1-3.png, bus.png, sign_bus.png,
   barrel.png

Strolling couple (custom, AI-generated for this project):
   groom_walk_harvest.png
   bride_walk_harvest.png

The big cover / reveal image lives in the SHARED photo
folder used by every template:  ../photos/couple.png
(missing photos fall back to a placeholder automatically).

==========================================================
  REPLACING THE WALK-CYCLE SPRITE SHEETS
==========================================================
To change how the couple looks, overwrite the two
*_walk_harvest.png sheets. Format the game expects:

   - SIDE VIEW, character facing RIGHT.
   - ONE horizontal row of 8 evenly spaced frames.
     Frame 1 = standing idle, frames 2-7 = the walk cycle
     (the game plays seq 2..7 and holds frame 1 when idle).
   - Every frame the SAME size, feet on the same baseline
     so the walk doesn't jitter.
   - Transparent PNG background, no shadows, no grid lines.

Prompt to paste into an image tool:

"A side-view walk-cycle sprite sheet of a cute chibi young
man (or woman), big rounded head and small body, clean soft
cartoon / pixel game-sprite style. ONE horizontal row of 8
frames, character facing RIGHT: frame 1 standing idle,
frames 2-8 a smooth walking cycle with swinging arms and
legs. Every frame the same size with the feet on the same
baseline so it loops cleanly. Transparent background, no
shadows, no text, no grid lines."

After swapping the sheets, adjust the frame metadata in
game/index.html → WALK_SETS.harvest (fw/fh = single-frame
width/height, n = frame count) if your sheet differs.

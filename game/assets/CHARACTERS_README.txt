==========================================================
  ADD YOUR OWN CHIBI CHARACTERS
==========================================================

Drop these image files into this  assets/  folder. The game
picks them up automatically on the next reload — no code edits.

All should be PNG with a TRANSPARENT background and the
characters FACING THE VIEWER (front-facing), like the cute
chibi couple in your reference invitation.

----------------------------------------------------------
1) couple.png        (the "reveal" image)
----------------------------------------------------------
   - The two of you together, front-facing.
   - Shown big on the cover screen, and again on the final
     "You found everything!" celebration.
   - Recommended size: ~600–900 px tall. Transparent bg.

----------------------------------------------------------
2) groom.png   and   3) bride.png      (the strolling couple)
----------------------------------------------------------
   - One front-facing character each, standing pose.
   - These become the couple you walk around town with
     (they do a gentle hop while walking).
   - Recommended size: ~300–500 px tall each. Transparent bg.
   - IMPORTANT: provide BOTH groom.png and bride.png to
     replace the strolling couple. If either is missing, the
     stroll falls back to the built-in pixel couple.

----------------------------------------------------------
Notes
----------------------------------------------------------
   - Only have couple.png? That's fine — the cover & reveal
     use it, and the stroll keeps the pixel couple until you
     add groom.png + bride.png.
   - Transparent background matters so they sit nicely on the
     street (export as PNG, not JPG).
   - Front-facing is best; the characters don't turn left/
     right, they face you and hop as they move.

Where to get the art:
   - Export from a chibi/avatar maker, an AI image tool
     (ask for "front-facing chibi character, transparent
     background"), or have it drawn. Match the style of your
     reference for a consistent look.

==========================================================
  WALK-CYCLE SPRITE SHEETS  (for a real walking animation)
==========================================================
To make the strolling couple actually walk (swinging arms +
legs) instead of just a still image, generate a WALK-CYCLE
SPRITE SHEET for each person and save them as:

      assets/groom_walk.png
      assets/bride_walk.png

Sheet format the game expects:
   - SIDE VIEW (character faces RIGHT).
   - One horizontal row, 9 frames, evenly spaced.
     Frame 1 = standing/idle, frames 2–9 = the walk cycle.
   - Every frame the SAME size, same baseline (feet on the
     same bottom line) so it doesn't jitter.
   - Transparent (PNG) background.

Paste these straight into ChatGPT / your image tool:

----- GROOM PROMPT --------------------------------------
"A side-view walk-cycle sprite sheet of a cute chibi young
man, big rounded head and small body, fair skin, messy
short black hair, large round dark-brown eyes, friendly
smile, rosy blush cheeks. He wears an all-black outfit: a
black short-sleeve band t-shirt with a white skull-and-
crossbones print on the chest, black pants, and white
sneakers. Clean, soft cartoon / pixel game-sprite style.
Lay it out as ONE horizontal row of 9 frames, character
facing RIGHT: frame 1 standing idle, frames 2-9 a smooth
walking cycle with swinging arms and legs. Every frame the
same size with the feet on the same baseline so it loops
cleanly. Transparent background, no shadows, no text, no
grid lines."

----- BRIDE PROMPT --------------------------------------
"A side-view walk-cycle sprite sheet of a cute chibi young
woman wearing a black hijab that frames her face, big
rounded head and small body, fair skin, large round dark-
brown eyes, friendly smile, rosy blush cheeks. She wears an
all-black adventure outfit: a black jacket over a black
top, black cargo pants with side pockets, and brown lace-up
boots. Clean, soft cartoon / pixel game-sprite style. Lay
it out as ONE horizontal row of 9 frames, character facing
RIGHT: frame 1 standing idle, frames 2-9 a smooth walking
cycle with swinging arms and legs. Every frame the same
size with the feet on the same baseline so it loops
cleanly. Transparent background, no shadows, no text, no
grid lines."

When you have both files, drop them in assets/ (overwriting
the placeholder groom_walk.png / bride_walk.png) and tell me
— I'll line up the frames so they walk correctly.

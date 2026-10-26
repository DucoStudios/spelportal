"""Miniatyrbilder till spelkatalogen, ritade av Codex (image_generation, prenumerationen).
Varje bild visar vad man faktiskt gör i spelet, så att man förstår spelet innan man klickar in.
Första bilden (STIL) blir stilreferens för resten så att katalogen hänger ihop.
    python3 -I scripts/codex-thumbnails.py [spel-id ...]  -> thumbs/src/<id>.png (hoppar över det som finns)
Därefter: python3 -I scripts/codex-thumbnails.py --webp  -> thumbs/<id>.webp (640x400, det sidan laddar)
"""
import os, sys, subprocess
from concurrent.futures import ThreadPoolExecutor

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = f"{ROOT}/thumbs/src"
OUT = f"{ROOT}/thumbs"
STYLE = ("Bright, crisp modern pixel-art video game cover illustration with chunky clean pixels and bold dark outlines, "
         "like a polished retro arcade game. Deep navy-purple night background (#100923) with a few tiny pixel stars, "
         "neon accents in cyan (#44e6d8), hot pink (#ff4e9d) and warm yellow (#ffd746) plus the natural colors the scene needs. "
         "Cheerful and inviting for children aged 5 to 12, readable at a small size: few large shapes, strong contrast, "
         "no clutter. Show the game being played: the player's action must be obvious at a glance (use motion lines, "
         "a dotted trajectory, a pointing hand or arrows where it helps). No UI panels, no score counters, no logos, "
         "no frame or border. No words or sentences anywhere.")
LETTERS_OK = "Exception for this image only: the large single letters described in the scene are allowed and must be spelled exactly as written."
COMPOSITION = ("Composition: landscape 3:2. The key action must sit inside the central square of the image, because the "
               "image is also cropped to a square on phones. Keep the top-left corner calm and empty (a badge is drawn there).")

# spel-id: (scen, tillåt bokstäver)
SCENES = {
    "ordspraks-pusslet": ("A match-3 board of colorful gem tiles; three matching gems in a row burst with sparkles, and above the board a glowing parchment banner reveals a row of word slots lighting up one by one (blank slots, no text).", False),
    "sex-burkar-sortern": ("Six glass jars standing in a row, each marked only with a big simple icon (house, gift heart, piggy, book, rocket, star). A gold coin falls from the top with motion lines and a child's pointing finger taps the right jar.", False),
    "gap-monstren": ("Small grumpy cloud-like thought bubbles with silly monster faces slowly sinking down; a child's finger pops one with a bright burst, and the popped bubble turns into a shining star and a green sprout.", False),
    "saftstand-erbjudandet": ("A kid running a lemonade stand with a striped awning; a customer in front has a thought bubble showing what they need (a hot sun and a thirsty face), and three different offer cards (a big cup, a cup with a cookie, a small cup) lie on the counter, one glowing as the right choice.", False),
    "sikta-ratt": ("A slingshot pulled back by a hand with a yellow ball, a dotted arc trajectory flying toward a red and white bullseye target on a moving post, a small wind flag fluttering to the side.", False),
    "bibelhjalten": ("Biblical scene: young shepherd boy David with a sling and a few sheep, facing the huge armored giant Goliath across a valley. In front of David two glowing path arrows split left and right, showing the player chooses what happens next.", False),
    "superhjalte-spranget": ("A small caped kid superhero mid-jump between floating platforms, collecting a shining star, with a checkpoint flag on one platform and a finish flag on the highest one.", False),
    "bokstavsbilen": ("A cute car seen from behind driving on a three-lane road, with big glowing letters A, B and C floating above the three lanes ahead; left and right arrows beside the car show it switches lanes to reach the right letter.", True),
    "gavokedjan": ("A ring of four small thirsty plants in pots around a central basket of harvested grain; little hands pass grain and water along a glowing chain to each plant, one plant drooping and waiting for its turn.", False),
    "klossfall": ("Falling colored tetromino blocks dropping into a tall dark well; a completed row flashes white and clears with sparkles, a block rotating with a curved arrow.", False),
    "ordracet": ("A racing theme: a French flag on a pennant, a big blank word card at the top, four answer buttons below with one lighting up green, and a stopwatch with motion lines.", False),
    "ormen": ("A cheerful green pixel snake slithering across a grid, about to eat a glowing seed, with a special golden glowing bonus seed nearby.", False),
    "ljudmatchen": ("A big loudspeaker with sound waves, a small child with headphones pointing at one of four picture cards (an apple, a cat, a car, a sun); the apple card glows as the match. A tiny French flag near the speaker.", False),
    "meningsbyggaren": ("Colorful blank word blocks floating above a glowing rail; a hand clicks one block into place so the blocks line up in order like a train on the rail. A small French flag on the side.", False),
    "memory-plattorna": ("A grid of face-down memory tiles; two tiles are flipped over showing the same cute picture (a strawberry) with a sparkle, a hand flipping a third tile.", False),
    "pusselvridaren": ("A square picture puzzle of a sunny landscape split into tiles; a few tiles are rotated the wrong way, one tile is turning with a curved 90 degree arrow, a hand swapping two tiles.", False),
    "traffa-ratt": ("A finger drawing a glowing ramp line in the air; a ball falls onto it and rolls along the drawn line into a goal cup with a star above.", False),
    "flykten": ("A kid running toward the viewer on a three-lane road, dodging a crate obstacle by switching lanes, while a huge blue ocean wave curls up behind them.", False),
    "alfabetet-fargerna": ("For the youngest: big friendly letters A, B and C next to bright paint blobs in red, blue and yellow; a loudspeaker with sound waves and a small child's hand pointing at the letter A.", True),
    "malarboken": ("A coloring book page of a simple house and a flower; a paint bucket pours color that fills the roof red, the walls half colored, a palette of colors on the side.", False),
    "ordresan": ("A winding adventure map path with six station flags, the first ones checked off; French landmarks along the way (the Eiffel Tower, a croissant, a bakery), a little traveler figure on the path.", False),
    "ordgatan": ("A word-guessing grid of five letter tiles per row: the top row spells T, A, B, L, E with some tiles cyan (right place), some orange (wrong place) and some dark gray; empty rows below.", True),
    "poppa-ballongerna": ("A drawn glowing ramp line guiding a rolling ball that pops a balloon marked 1, about to hit balloons marked 2 and 3 in order.", True),
    "raddaagget": ("An egg rolling slowly down a hand-drawn curved ramp, slowing down to land softly in a cozy bird's nest, with tiny speed lines fading out.", False),
    "blockvarlden": ("A 3D voxel block world: grassy and dirt cubes, a small block house being built, a pickaxe breaking a block and a new block being placed.", False),
    "schack": ("A chessboard seen at an angle mid-game, a white knight jumping with a dotted L-shaped move path, the black king and queen in focus.", False),
    "ekorrhjulet": ("A squirrel stepping out of a spinning hamster wheel onto a path of assets (a tiny apartment house, an apple tree growing coins, a small shop) that drop coins into its paws by themselves.", False),
    "kroppens-tempel": ("A happy kid stretching and jumping beside a plate of healthy food (vegetables, fish, water), with a small glowing temple outline behind them and a quiz card with a heart icon.", False),
    "ror-pa-dig": ("Two kids doing jumping jacks and running in place in a living room, motion lines, a big stopwatch and music notes.", False),
    "byggkost-eller-sallanmat": ("Food falling from above (broccoli, fish, an apple, a cupcake, candy) toward two baskets: one with a strong flexed arm icon for everyday food, one with a party hat icon for treats; a broccoli landing in the strong basket.", False),
    "vishetens-vag": ("A child standing at a fork in a forest path holding a lantern, one path bright and wise, the other dim; an ancient scroll glowing above.", False),
    "kulbanan": ("A grid board with wooden ramp blocks placed by the player; a ball follows a dotted turquoise predicted path from block to block to a goal flag.", False),
    "kulrullaren": ("A shiny ball rolling along a winding 3D track floating in the sky, curving through rings of gold coins, a checkpoint flag on the track.", False),
    "gardsriket": ("A small growing farm: crop fields, a water well, a windmill turning, a barn, coins floating up from the fields as passive income.", False),
    "kubkrossaren": ("A brick-breaker scene: a dotted aim line from a launcher at the bottom, several balls bouncing up and smashing colored blocks with chunks flying, blocks creeping down toward a red danger line.", False),
    "ordmastaren": ("A stack of word flash cards, an open book, a microphone with sound waves and a flame streak icon; a small French flag. A child saying a word out loud.", False),
    "fruktfangaren": ("A basket moving left and right catching a falling strawberry, with other fruits falling (banana, apple, pear); a loudspeaker with sound waves above calling out which fruit to catch.", False),
    "bistroblixten": ("A cozy French bistro counter: a croissant, a coffee cup and a baguette being placed onto a tray in order, an order ticket with icons, a guest waiting at the counter.", False),
    "accentjakten": ("Big letters with French accents É, È and Ê floating, a magnifying glass highlighting É, and a stopwatch with motion lines.", True),
    "ordbron": ("A bridge being built across a canyon plank by plank, each new plank a word card snapping into place, a little character walking forward onto the newest plank.", False),
    "dansstopp": ("Kids dancing with music notes flying around, then one big glowing traffic-light style stop signal turning red as they freeze mid-pose.", False),
    "reaktionsraketen": ("A rocket blasting upward while glowing energy cores pop up around it; a finger taps one core and it bursts into a combo spark trail.", False),
    "balansbanan": ("A glowing ball balancing on a tilting beam inside a highlighted target zone, swirling wind gusts pushing from the side.", False),
    "andningsdykaren": ("A calm child diver underwater following a big slowly pulsing bubble upward, collecting glowing pearls, soft seaweed and fish around.", False),
    "brobyggarna": ("A hand drawing a glowing safe path line across a canyon around sharp rocks; a little cart rolls along the drawn path to a flag on the other side.", False),
    "fargfusion": ("Colored round orbs merging: two red orbs combine into an orange orb with a sparkle, other orbs of different colors around, a rainbow star glowing at the top as the goal.", False),
    "molnhoppet": ("A small character bouncing upward from one fluffy cloud to the next higher cloud, motion arcs, stars in the night sky above.", False),
    "tornverkstan": ("A crane dropping a new floor onto a tall stacked tower that reaches above the clouds, the floor landing perfectly with a sparkle.", False),
    "minimarknaden": ("A little market checkout: a kid packing groceries (bread, milk, apples) into a bag for a smiling customer, with a short queue of happy customers waiting.", False),
    "myntmatchen": ("Euro coins (1 euro, 50 cent, 20 cent) sliding onto a tray to exactly match a price tag shown with only a coin icon, a check mark sparkle.", False),
    "spargrissprint": ("A running piggy bank catching falling coins and smart choices (a book, a plant) while dodging impulse items (a candy bar, a random toy).", False),
    "ideverkstan": ("A workshop table where small glowing idea lightbulbs combine into one bigger invention (a cart with wheels and a basket) that helps an elderly neighbor carry groceries.", False),
    "vanskapskompassen": ("A big friendly compass in the foreground; behind it a child at a crossroads choosing the path toward a lonely friend sitting on a bench, a warm glow on the kind path.", False),
    "hjalparjakten": ("A magnifying glass held over a small town scene revealing helpful acts: a kid carrying groceries for an old lady, someone picking up dropped books, glowing hearts above them.", False),
    "talamodstornet": ("An hourglass beside a calm child carefully waiting to place a block on a steady stacked tower, the moment highlighted by a soft glow.", False),
    "tacksamhetstradet": ("A tree blossoming as small glowing moments float up into its branches as flowers (a heart, a sun, a family hug, a shared meal).", False),
    "barmhartighetsresan": ("Biblical scene of the Good Samaritan: on a rocky road a traveler kneels to help an injured man, a donkey beside them, the road winding onward.", False),
    "bygg-pa-klippan": ("Split scene in a storm: a sturdy house standing firm on a big rock on one side, a house on sand collapsing on the other; lightning and rain.", False),
    "andens-frukttradgard": ("A lush garden tree with nine different glowing fruits (grapes, apple, pear, orange, plum, cherry, lemon, fig, pomegranate), a child watering it.", False),
    "ord-som-bygger": ("Two children talking; their speech bubbles are colorful bricks stacking into a little bridge between them, one child listening with a hand to the ear.", False),
    "bibelresan-66": ("For adults, slightly calmer and more mature: an open Bible with a glowing journey map path rising out of it, made of 66 stepping stones shaped like book spines, a few already lit.", False),
    "blockrutan": ("An 8 by 8 grid partly filled with colored blocks; below it three block pieces, one being dragged by a hand into the grid to complete a full row that lights up.", False),
}
STIL = "superhjalte-spranget"


def prompt(gid, ref):
    scene, letters = SCENES[gid]
    out = os.path.relpath(f"{SRC}/{gid}.png", ROOT)
    r = ("The attached image is a style reference for pixel size, outline weight, palette and background only. "
         "Do not copy its content.\n\n" if ref else "")
    return (f"You have an image_generation tool available. Use it now to create exactly one landscape image (3:2) and save "
            f"the resulting PNG file to this exact path: {out}\n\n{r}Style: {STYLE}\n\nScene: {scene}\n\n"
            f"{LETTERS_OK if letters else ''}\n\n{COMPOSITION}\n\n"
            "After saving the file at the exact path above, confirm the path and stop. Do not create or edit any other files.")


def gen(gid, ref=None):
    path = f"{SRC}/{gid}.png"
    if os.path.exists(path): return gid, "fanns"
    cmd = ["codex", "exec", "--skip-git-repo-check", "-s", "workspace-write", "-C", ROOT] + (["-i", ref] if ref else []) + ["-"]
    for _ in range(2):
        r = subprocess.run(cmd, input=prompt(gid, ref), capture_output=True, text=True)
        if os.path.exists(path): return gid, "klar"
    return gid, "MISSLYCKADES: " + (r.stdout + r.stderr)[-400:]


def webp():
    from PIL import Image
    for f in sorted(os.listdir(SRC)):
        if not f.endswith(".png"): continue
        im = Image.open(f"{SRC}/{f}").convert("RGB")
        w, h = im.size
        th = round(w / 1.6)  # 16:10, mittbeskärning
        if th < h: im = im.crop((0, (h - th) // 2, w, (h - th) // 2 + th))
        im.resize((640, 400), Image.LANCZOS).save(f"{OUT}/{f[:-4]}.webp", "WEBP", quality=82)
    print("webp klara")


if __name__ == "__main__":
    if sys.argv[1:] == ["--webp"]: webp(); sys.exit()
    os.makedirs(SRC, exist_ok=True)
    only = sys.argv[1:] or list(SCENES)
    if STIL in only: print(*gen(STIL), flush=True)
    ref = f"{SRC}/{STIL}.png"
    rest = [g for g in only if g != STIL]
    with ThreadPoolExecutor(3) as ex:
        for gid, s in ex.map(lambda g: gen(g, ref if os.path.exists(ref) else None), rest):
            print(gid, s, flush=True)

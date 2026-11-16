# Midgard Geo-Tactics — Project Context & Architecture

Read this file at the start of a new Antigravity session on any PC/laptop to restore full context of the project.

---

## 1. Build & Run
- **Workspace**: `midgard-geo-tactics`
- **Entry**: `index.html` (loads `./styles.css` and `./dist/app.bundle.js`)
- **Bundle Command (REQUIRED after editing `src/`)**: `node build.js`
- **Syntax Check**: `node --check dist/app.bundle.js`
- **Optional Local Server**: `node server.js`

---

## 2. Core User Rules & Non-Negotiable Constraints
1. **NEVER implement Disgaea "Lift & Throw"** — explicitly rejected by the user.
2. **Art Style**: Original **Ragnarök × FFT/Disgaea Matte Anime Pixel-Art** (`#17131c` dark umbral outlines, 3-tone matte cel-shading, multi-pixel anime eyes). **No neon glow** and **no blocky stick figures**.
3. **Exact 8 Equipment Slots**: `Headgear`, `Armor`, `Right Hand`, `Left Hand`, `Legs`, `Shoes`, `Amulet`, `Trinket`. Equipped items render live on the unit's paperdoll sprite.
4. **Starting Party & Progression**:
   - Start with **4 Heroes** (*Seyren [Swordsman]*, *Margaretha [Acolyte]*, *Cecil [Archer]*, *Kathryne [Mage]*) at **Base Lv. 1 / Job Lv. 1** in basic starter gear.
   - **8 remaining heroes** join via **5–10% (`8.5%`) post-battle roll** or **Guild Tavern recruitment** with Zeny (up to 10 deployed in battle).
   - **Max Job Level `40`**: Every 1st Job has **8 skills (`4` Branch A + `4` Branch B)** and advances at **Job Lv. 40** into a choice of **2 distinct 2nd-Job Paths** (each with **8 more `4 + 4` skills**).
5. **UI Design**:
   - Mirrors the user's preferred **GRIDHUNT Modal Layout**: Top header (`Zeny`, `Weight`, `Hero & Equip (E)`, `Inventory (I)`, `Skills & Job (K)`, `World Map (M)`, `Inn / Heal (R)`, `Town Shop & Forge`), full-stage canvas (`1720×960`), Right Sidebar (`300px`), and `.ro-modal` floating windows.
   - **Fonts**: `Cinzel` + `Inter` for non-battle UI; Battle UI (`.bm`) keeps its separate font (`--font-battle`).

---

## 3. Current Implemented Systems (`src/`)

### `src/data/jobs.js`
- `MAX_JOB_LV = 40`
- 8-skill (`4 + 4`) Split Job Trees + Dual-Path 2nd Job Advancements for `Swordsman` (*Battle Knight* / *Tank Knight*), `Acolyte` (*High Priest* / *Battle Monk*), `Archer` (*Sniper* / *Ranger Trapper*), `Mage` (*High Wizard* / *Professor*), `Thief` (*Assassin Cross* / *Stalker*), `Spearman` (*Dragon Knight* / *Paladin*), `Bard` (*Minstrel* / *Maestro Virtuoso*), and `Blacksmith` (*Whitesmith* / *Master Forger*).

### `src/data/database.js`
- `ELEMENTS` & `ELEMENT_MATRIX` (`getElementMultiplier`), `STATUS_DEFS` (`freeze`, `stun`, `poison`, `lex`, `provoke`, `blessing`, `agi`) with 7×7 pixel icons.
- **3-Tab Inventory Catalog**: `CONSUMABLE_ITEMS` (Items), `PAPERDOLL_ITEMS` (8-slot Equips), `MISC_ITEMS` (Monster Loot & Upgrade Ores), `CRAFT_RECIPES`, `RO_CARDS`.
- **Ragnarök Block-Grid Midgard Map**: `MIDGARD_BLOCKS` (13 interconnected blocks on a `5×4` grid: Towns `prontera`, `izlude`, `geffen`, `morocc`, `payon`; Fields/Dungeons `prt_fild08`, `prt_sewb1`, `moc_fild07`, `pay_fild01`, `pay_dun00`, `gef_fild07`, `mjolnir_02`, `glast_01`).

### `src/render/paperdoll.js`
- `drawUnitSprite` (8-slot matte anime paperdoll + Slime, Wolf, Baphomet [MVP], Moonlight Flower [MVP] + status overlays for Ice Block, Stun Stars, Venom Bubbles, Lex Aeterna Cross).
- `getItemIconDataURL(item, kind)` — cached 20×20 pixel-art icons for `item`, `equip`, `misc`, and `card`.

### `src/engine/game.js`
- `22×22` 2.5D multi-elevation (`H1–H4`) isometric battle grid, Disgaea Geo Panels & Crystal Geo Chain Cascades, RAID `SPD` Turn Meter, `Freeze` $\rightarrow$ `Wind 1.75x Ice Shatter`, `Lex Aeterna 2x` mark.
- `getItemAvailability(itemId, excludeHeroId)` — tracks owned vs. worn copies across recruited heroes (greyed out in Hero & Equip when worn by another hero; hidden from Inventory `Equips` when 0 spare copies).
- **5–10 min (`300–600s`) respawn timers** on defeated monster packs & MVPs, N/S/E/W block portals, Town Inn/Trader/Craft/Refinery/Tavern services, and Inventory Weight (`450 + STR*8`).

### `src/main.js`, `index.html`, `styles.css`
- Floating `.ro-modal` windows (`#charModal`, `#invModal`, `#skillModal`, `#atlasModal`, `#npcModal`) with keyboard shortcuts (`E`, `I`, `K`, `M`, `Esc`).
- **Inventory (`I`)**: `Grid` / `List` view toggle, pixel-art icons beside item names, per-item Hero `<select>` dropdown + `Use` / `Equip` button, worn gear hidden from `Equips`, and RO Monster Cards shown in `Misc`.
- **Post-Battle Report**: Bulleted Victory Loot list (`<ul><li>`).

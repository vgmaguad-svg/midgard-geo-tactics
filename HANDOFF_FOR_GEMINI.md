# Midgard Geo-Tactics — Project Handoff & Architecture Guide for Gemini

> **IMPORTANT INSTRUCTIONS FOR GEMINI (READ FIRST):**
> 1. **Do NOT duplicate, overwrite, or blindly rewrite** the systems already implemented below. Read the existing `src/` files first before making changes.
> 2. **Always ask the user to choose** before replacing or redesigning any existing system: present **(A) Keep / build on the current design & update** vs **(B) Your new proposed update/design**, and let the user decide.
> 3. **Always run `node build.js`** after editing anything in `src/`, because `index.html` loads `./dist/app.bundle.js` (to avoid `file://` CORS issues with ES modules).

---

## 1. Project Location & Build Commands
- **Project Root**: `C:\Users\James\.gemini\antigravity\scratch\midgard-geo-tactics`
- **Entry Point**: `index.html` (loads `./styles.css` and `./dist/app.bundle.js`)
- **Build Bundle**: `node build.js` (generates `dist/app.bundle.js`)
- **Syntax Check**: `node --check dist/app.bundle.js`
- **Optional Dev Server**: `node server.js` (via `package.json`)

---

## 2. Strict User Rules & Non-Negotiable Constraints
1. **NEVER implement Disgaea "Lift & Throw"** — the user explicitly stated they never want this mechanic.
2. **Art Style**: Original **Ragnarök × FFT/Disgaea Matte Anime Pixel-Art** (`#17131c` dark umbral outlines, 3-tone matte cel-shading, multi-pixel anime eyes). **No neon glow** and **no blocky stick figures**.
3. **Exact 8 Equipment Slots**: `Headgear`, `Armor`, `Right Hand`, `Left Hand`, `Legs`, `Shoes`, `Amulet`, `Trinket` (`EQUIP_SLOT_ORDER` in `src/data/database.js`). Equipped items visually appear on the unit's paperdoll sprite.
4. **Starting Party & Progression**:
   - Start with **4 Heroes** (*Seyren [Swordsman]*, *Margaretha [Acolyte]*, *Cecil [Archer]*, *Kathryne [Mage]*) at **Base Lv. 1 / Job Lv. 1** in **basic starter gear only**.
   - **8 remaining heroes** start unrecruited and join via a **5–10% (`8.5%`) post-battle roll** or **Zeny recruitment in Town Taverns** (up to 10 deployed in battle).
   - **Separate Base Level & Job Level**: Base Lv grants Stat Points (`+3/lv`); Job Lv grants Skill Points (`+1/lv`). Advancing to **2nd Job** (*Knight, Priest, Hunter, Wizard, etc.*) requires **Job Lv. 10**.
5. **3-Category Inventory**:
   - **Items** (`CONSUMABLE_ITEMS`): Potions, Panacea, Yggdrasil Berry.
   - **Equips** (`PAPERDOLL_ITEMS`): 8-slot gear, unlocked via battle drops, chests, crafting, or Town Traders.
   - **Misc** (`MISC_ITEMS`): Monster loot, crafting materials, upgrade ores (`Phracon`, `Oridecon`, `Elunium`), sellable for Zeny.

---

## 3. File Structure & What Is Already Implemented

### `src/data/database.js`
- **Geo & Elements**: `GEO_PANELS` (`r, b, g, y, v`), `ELEMENTS` (`Neutral, Fire, Water, Wind, Earth, Holy, Shadow, Undead, Poison`), `ELEMENT_MATRIX`, `getElementMultiplier(atkElem, defElem)`.
- **Status Effects**: `STATUS_DEFS` (`freeze`, `stun`, `poison`, `lex`, `provoke`, `blessing`, `agi`) with 7×7 pixel-art badge bitmaps (`g`).
- **3-Tab Inventory Data**: `CONSUMABLE_ITEMS`, `MISC_ITEMS`, `CRAFT_RECIPES`, `EQUIP_SLOT_ORDER`, `PAPERDOLL_ITEMS`, `RO_CARDS`.
- **Roster & Monsters**: `INITIAL_ROSTER` (4 starter Lv.1/Job Lv.1 + 8 recruitable), `MONSTER_TEMPLATES`, `WORLD_ENCOUNTERS`.
- **Ragnarök Block-Grid World Map**: `MIDGARD_BLOCKS` (13 interconnected blocks on a `5 × 4` grid: Towns `prontera`, `izlude`, `geffen`, `morocc`, `payon`; Fields/Dungeons `prt_fild08`, `prt_sewb1`, `moc_fild07`, `pay_fild01`, `pay_dun00`, `gef_fild07`, `mjolnir_02`, `glast_01`), each with unique monsters, levels, attributes, loot tables, chests, and N/S/E/W neighbors.

### `src/render/paperdoll.js`
- Matte anime pixel-art renderer (`drawUnitSprite`) that draws all **8 equipment slots** dynamically on every hero and humanoid monster, plus custom sprites for Porings/Marins, Desert Wolves, Baphomet [MVP], and Moonlight Flower [MVP].
- `drawStatusBadge`, `getStatusIconDataURL`, `drawRoleBadge`, `getRoleIconDataURL`, `drawGeoSymbolPixel`.
- Direct sprite overlays for active statuses: translucent Ice Crystal Block (`freeze`), orbiting golden stars (`stun`), rising venom bubbles (`poison`), golden cross (`lex`).

### `src/engine/game.js`
- **Tactical Battle Engine (`MidgardGeoGame`)**:
  - `22 × 22` 2.5D multi-elevation (`H1–H4`) isometric grid (`BATTLE_MAPS`, `ELEVATION_MAPS`) with camera drag-pan, scroll-zoom, Fit Grid, and Follow Turn.
  - Disgaea Geo Panels, destructible Crystal Geo Symbols (`damageGeoSymbol` cascade + Bonus Gauge `Lv. 1–9`), and adjacent-ally Team Chain Combos (`CHAIN x2/x3/x4`).
  - RAID-style `SPD`-based Turn Meter (`0%–100%`) with `1x / 2x / 4x` speed and `Auto / Manual` toggle.
  - Full Ragnarök combat math (`recalcHero`, `damage`, `inflictStatus`, `pickBestOffensiveSkill`): Freeze $\rightarrow$ Water property conversion + `1.75x ICE SHATTER!` with Wind skills, `Lex Aeterna` `2.0x` next-hit mark, Poison `-10% HP/turn`, High Ground bonus.
- **Open World Block Engine**:
  - N/S/E/W edge portals (`getZonePortals`), block switching (`changeWorldZone`), Treasure Chests (`openWorldChest`), Town NPC interactions (`interactWorldNpc`).
  - **5–10 minute (`300s–600s`) per-pack and MVP respawn timers** (`tickMvpRespawnTimers`) with live `MM:SS` tombstones on the map.
  - Town & Inventory helpers: `useConsumableOnHero`, `buyConsumable`, `buyEquipInTown`, `sellMiscItem`, `sellAllLootMisc`, `craftRecipe`, `restAtInn`, `equipItemOnHero`, `unequipSlotOnHero`, `grantHeroExp`, `promoteHeroJob`.

### `src/main.js`, `index.html`, `styles.css`
- **Open World Left HUD**: Visual `5 × 4` **Map of Midgard Block Grid** (click any block to travel) + **Current Block Spawns** with live `MM:SS` respawn timers.
- **Bottom Party Dock**: Live portraits, Base/Job Lv, HP, and Turn Meter for the active squad (`4` up to `10`).
- **Right Drawer (`Char & Bag` | `Party & Equips` | `Town & Upgrades`)**:
  - **Quick Sortable Party Selector** (`Deployed`, `Base Lv`, `Job Lv`, `ATK/MATK`, `SPD`).
  - **`Char & Bag`**: Full Ragnarök stats (`Base Lv/EXP`, `Job Lv/EXP`, `STR/AGI/VIT/INT/DEX/LUK`, `ATK/MATK/DEF/MDEF/HIT/FLEE/CRIT/ASPD/SPD`), **8-Slot Drag-and-Drop Paperdoll**, Stat/Skill allocation, and **3-Tab Inventory (`🧪 Items` | `⚔️ Equips` | `💎 Misc`)**.
  - **`Party & Equips`**: Side-by-side overview of all recruited heroes showing their stats and **all 8 equipped items at a glance**, plus Tavern recruitment.
  - **`Town & Upgrades`**: Inn (`50z`), Town Trader (Buy/Sell), Crafting Bench, and `+1–+10` Hollgrehenn Refinement + Card Compounding.

---

## 4. Good Next-Step Ideas Ready to Offer the User (Ask Before Building!)
When you take over, do **not** overwrite the systems above. Instead, summarize where things stand and **ask the user** which of these (or your own ideas) they want next:
1. **Manual Tactical Skill Bar & Target Damage Preview**: In `MANUAL` mode, show a bottom-center action bar (`Move`, `Attack`, `Skill 1/2/3` with cooldowns, `Use Consumable`, `Wait`) and hover damage/elemental-multiplier predictions before committing.
2. **Ragnarök Card Art Popups & Unique Card Passives**: Make socketed cards trigger real RO mechanics (`Hunter Fly` lifesteal, `Baphomet` 3×3 splash cleave, `Bloody Knight` auto-cast Meteor) + classic RO Card Drop modal.
3. **Save / Load Progress (`localStorage` + Export/Import) & Endless Geffen Tower**: Persist recruited heroes, levels, `+10` gear, and inventory across browser reloads, plus an endless tower climb for God-tier loot.

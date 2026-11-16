// src/data/database.js
// Complete Data Definitions for Midgard Geo-Tactics:
// - Ragnarök Online Elemental Affinity Matrix & Status Effects
// - 3-Category Inventory: Items (Consumables), Equips (8-Slot Paperdoll), Misc (Loot, Crafting & Upgrades)
// - Classic Ragnarök Midgard Block-Grid World Map (Towns, Fields, Dungeons, 5-10 min Respawns)
// - 8-Skill Split 1st Jobs (4+4) & Job Lv. 40 Dual-Path 2nd Job Advancements (from ./jobs.js)

export {
  MAX_JOB_LV,
  JOB_TREES,
  getHeroJobTree,
  getHeroAvailableSkills,
  getHeroActiveSkillsForCombat
} from './jobs.js';

import { MAX_JOB_LV, getHeroJobTree } from './jobs.js';

export const GEO_PANELS = {
  r: { id: 'r', name: 'Ember Geo', col: '#a83e32', border: '#d45b4c', desc: '+25% ATK & MATK', score: 3 },
  b: { id: 'b', name: 'Ward Geo', col: '#346296', border: '#548ac4', desc: '+25% DEF & MDEF', score: 2.2 },
  g: { id: 'g', name: 'Spring Geo', col: '#3e7d4c', border: '#5ca86d', desc: 'Heals 8% HP & Cleanses Poison', score: 1.8 },
  y: { id: 'y', name: 'Gale Geo', col: '#b08f32', border: '#d9b54a', desc: '+30% RAID Turn Speed', score: 2.4 },
  v: { id: 'v', name: 'Void Geo', col: '#6d3e8c', border: '#955cba', desc: '-20% DEF & -5% HP/Turn', score: -3.5 }
};

export const ELEMENTS = {
  Neutral: { name: 'Neutral', col: '#9ca3af', bg: '#1f242d' },
  Fire:    { name: 'Fire',    col: '#e0533c', bg: '#2e1916' },
  Water:   { name: 'Water',   col: '#4a90d9', bg: '#162436' },
  Wind:    { name: 'Wind',    col: '#d9b84a', bg: '#2b2514' },
  Earth:   { name: 'Earth',   col: '#a67c52', bg: '#292018' },
  Holy:    { name: 'Holy',    col: '#f2df8d', bg: '#2e2a18' },
  Shadow:  { name: 'Shadow',  col: '#9c6bc4', bg: '#23182e' },
  Undead:  { name: 'Undead',  col: '#8a6b94', bg: '#211826' },
  Poison:  { name: 'Poison',  col: '#59a665', bg: '#16291a' }
};

export const ELEMENT_MATRIX = {
  Neutral: { Neutral: 1.0, Fire: 1.0, Water: 1.0, Wind: 1.0, Earth: 1.0, Holy: 1.0, Shadow: 1.0, Undead: 1.0, Poison: 1.0 },
  Fire:    { Neutral: 1.0, Fire: 0.5, Water: 0.7, Wind: 1.0, Earth: 1.75, Holy: 1.0, Shadow: 1.0, Undead: 1.75, Poison: 1.25 },
  Water:   { Neutral: 1.0, Fire: 1.75, Water: 0.5, Wind: 0.7, Earth: 1.0, Holy: 1.0, Shadow: 1.0, Undead: 1.0, Poison: 1.0 },
  Wind:    { Neutral: 1.0, Fire: 1.0, Water: 1.75, Wind: 0.5, Earth: 0.7, Holy: 1.0, Shadow: 1.0, Undead: 1.0, Poison: 1.0 },
  Earth:   { Neutral: 1.0, Fire: 0.7, Water: 1.0, Wind: 1.75, Earth: 0.5, Holy: 1.0, Shadow: 1.0, Undead: 1.0, Poison: 1.25 },
  Holy:    { Neutral: 1.0, Fire: 1.0, Water: 1.0, Wind: 1.0, Earth: 1.0, Holy: 0.5, Shadow: 1.75, Undead: 1.75, Poison: 1.25 },
  Shadow:  { Neutral: 1.0, Fire: 1.0, Water: 1.0, Wind: 1.0, Earth: 1.0, Holy: 1.75, Shadow: 0.5, Undead: 0.7, Poison: 1.0 },
  Poison:  { Neutral: 1.15, Fire: 1.25, Water: 1.0, Wind: 1.25, Earth: 1.25, Holy: 0.75, Shadow: 0.75, Undead: 0.5, Poison: 0.5 }
};

export function getElementMultiplier(atkElem, defElem) {
  const row = ELEMENT_MATRIX[atkElem || 'Neutral'] || ELEMENT_MATRIX.Neutral;
  return row[defElem || 'Neutral'] ?? 1.0;
}

export const STATUS_DEFS = {
  freeze: {
    id: 'freeze', name: 'Frozen', short: 'FRZ', isDebuff: true, col: '#7fd0ff', c: '#4a90d9',
    desc: 'Frozen in ice: skips next turn, -25% DEF, becomes Water property (175% DMG from Wind)!',
    g: ['0010100','0101010','1011101','0111110','1011101','0101010','0010100']
  },
  stun: {
    id: 'stun', name: 'Stunned', short: 'STN', isDebuff: true, col: '#ffd45e', c: '#d99b26',
    desc: 'Stunned with spinning stars: skips next turn and cannot dodge.',
    g: ['0001000','1001001','0111110','1110111','0111110','1001001','0001000']
  },
  poison: {
    id: 'poison', name: 'Poisoned', short: 'PSN', isDebuff: true, col: '#b88ae6', c: '#6e4294',
    desc: 'Deadly venom: loses 10% Max HP each turn and suffers -20% DEF.',
    g: ['0011100','0111110','0101010','0111110','0011100','0101010','0010100']
  },
  lex: {
    id: 'lex', name: 'Lex Aeterna', short: 'LEX 2x', isDebuff: true, col: '#ffe08a', c: '#e6b83c',
    desc: 'Lex Aeterna Mark: the next attack against this target deals DOUBLE (2.0x) DAMAGE!',
    g: ['0001000','0001000','1111111','0001000','0001000','0001000','0001000']
  },
  provoke: {
    id: 'provoke', name: 'Provoked', short: 'PRV', isDebuff: true, col: '#e87864', c: '#c94038',
    desc: 'Provoked: forced to target the Tank and suffers -20% DEF.',
    g: ['1100011','1110111','0110110','0000000','0110110','1110111','1100011']
  },
  blessing: {
    id: 'blessing', name: 'Blessing', short: 'BLS', isDebuff: false, col: '#8fe3a0', c: '#5ca86d',
    desc: 'Archbishop Blessing: +25% ATK & MATK and cleanses Poison.',
    g: ['0001000','0011100','1111111','0011100','0011100','0011100','0001000']
  },
  agi: {
    id: 'agi', name: 'Increase AGI', short: 'AGI+', isDebuff: false, col: '#7fd0ff', c: '#3b82c4',
    desc: 'Increase AGI / Bragi: +30% RAID Turn Meter Speed (SPD) & +15% FLEE/DEF.',
    g: ['0001110','0011100','0111000','1111111','0001110','0011000','0110000']
  }
};

export const ROLE_BADGES = {
  Tank:     { c: '#346296', t: 'Tank — draws aggro & guards allies', g: ['1111111','1111111','1111111','1111111','0111110','0011100','0001000'] },
  Healer:   { c: '#3e7d4c', t: 'Healer — mends HP & casts Lex Aeterna / Blessing', g: ['0011100','0011100','1111111','1111111','1111111','0011100','0011100'] },
  Support:  { c: '#a68229', t: 'Support — accelerates SPD & buffs ATK', g: ['0001000','0011100','0110110','1100011','0001000','0011100','0110110'] },
  Fighter:  { c: '#a34033', t: 'Fighter — frontline cleave, Stun & knockback', g: ['0000011','0000111','0001110','1011100','0111000','0110000','1001000'] },
  Ranged:   { c: '#b56728', t: 'Ranged — Freeze / Shatter combos & AoE', g: ['0001000','0000100','1111110','1111111','1111110','0000100','0001000'] },
  Assassin: { c: '#6d3e8c', t: 'Assassin — high SPD, Envenom Poison & crits', g: ['0001000','0011100','0011100','0011100','0111110','0001000','0001000'] },
  Monster:  { c: '#7a443b', t: 'Field Monster', g: ['0011100','0111110','1101011','1111111','0111110','0010100','0000000'] },
  Boss:     { c: '#5c1f1a', t: 'MVP Boss — Midgard apex monster', g: ['0000000','1010101','1010101','1111111','1111111','1111111','0000000'] }
};

// ============================================================================
// 1. ITEMS (CONSUMABLES) — Tab 1 of Inventory
// ============================================================================
export const CONSUMABLE_ITEMS = {
  pot_red: {
    id: 'pot_red', name: 'Red Potion', icon: '🧪', col: '#d9483b',
    buyPrice: 45, sellPrice: 22, hpRestore: 75, spRestore: 0,
    desc: 'Restores 75 HP to a hero.'
  },
  pot_orange: {
    id: 'pot_orange', name: 'Orange Potion', icon: '🧪', col: '#e88b33',
    buyPrice: 120, sellPrice: 60, hpRestore: 175, spRestore: 0,
    desc: 'Restores 175 HP to a hero.'
  },
  pot_white: {
    id: 'pot_white', name: 'White Potion', icon: '⚗️', col: '#dce6f2',
    buyPrice: 260, sellPrice: 130, hpRestore: 380, spRestore: 0,
    desc: 'Restores 380 HP to a hero.'
  },
  pot_blue: {
    id: 'pot_blue', name: 'Blue Potion', icon: '💠', col: '#4a90d9',
    buyPrice: 180, sellPrice: 90, hpRestore: 0, spRestore: 60,
    desc: 'Restores 60 SP to a hero.'
  },
  item_panacea: {
    id: 'item_panacea', name: 'Panacea', icon: '🌿', col: '#5ca86d',
    buyPrice: 150, sellPrice: 75, hpRestore: 40, spRestore: 0, cureAll: true,
    desc: 'Cures Poison, Freeze, Stun, and restores 40 HP.'
  },
  item_ygg: {
    id: 'item_ygg', name: 'Yggdrasil Berry', icon: '🍇', col: '#ffd45e',
    buyPrice: 950, sellPrice: 475, hpRestore: 9999, spRestore: 999, cureAll: true,
    desc: 'Fully restores 100% HP & SP and cures all status ailments.'
  }
};

// ============================================================================
// 2. MISC (LOOT, CRAFTING, UPGRADE ORES & SELLABLES) — Tab 3 of Inventory
// ============================================================================
export const MISC_ITEMS = {
  msc_jellopy: {
    id: 'msc_jellopy', name: 'Jellopy', icon: '💧', category: 'Loot',
    sellPrice: 25, desc: 'Gelatinous orb dropped by Porings. Sell for Zeny or craft Potions.'
  },
  msc_mucus: {
    id: 'msc_mucus', name: 'Sticky Mucus', icon: '🟢', category: 'Loot',
    sellPrice: 38, desc: 'Dropped by Culvert slimes. Used in crafting basic armor & potions.'
  },
  msc_claw: {
    id: 'msc_claw', name: 'Desert Wolf Claw', icon: '🦴', category: 'Loot',
    sellPrice: 65, desc: 'Sharp fang-claw from Morroc Desert Wolves. Used to forge blades.'
  },
  msc_shell: {
    id: 'msc_shell', name: 'Worm Peeling', icon: '🪲', category: 'Loot',
    sellPrice: 52, desc: 'Tough carapace from Prontera Culvert Thief Bugs.'
  },
  msc_wood: {
    id: 'msc_wood', name: 'Elder Branch', icon: '🪵', category: 'Loot',
    sellPrice: 78, desc: 'Enchanted wood dropped by Payon Elder Willows. Used for staves & bows.'
  },
  msc_foxtail: {
    id: 'msc_foxtail', name: 'Nine-Tail Fox Fur', icon: '🦊', category: 'Loot',
    sellPrice: 165, desc: 'Mystic fur from Payon Shrine & Moonlight Flower. Used in high-tier crafting.'
  },
  msc_voucher: {
    id: 'msc_voucher', name: 'Orcish Voucher', icon: '🪙', category: 'Loot',
    sellPrice: 140, desc: 'War badge carried by Orc Warriors. Used to craft Chivalry gear.'
  },
  msc_horn: {
    id: 'msc_horn', name: 'Evil Horn', icon: '😈', category: 'Loot',
    sellPrice: 280, desc: 'Cursed horn from Glast Heim demons & Baphomet. Used for God-tier crafting.'
  },
  msc_phracon: {
    id: 'msc_phracon', name: 'Phracon', icon: '🪨', category: 'Upgrade',
    sellPrice: 100, desc: 'Lv.1 Weapon Upgrade Metal used for crafting & refining.'
  },
  msc_oridecon: {
    id: 'msc_oridecon', name: 'Oridecon', icon: '🔶', category: 'Upgrade',
    sellPrice: 300, desc: 'Rare Weapon Refinement Ore (+1 to +10 Right Hand upgrades).'
  },
  msc_elunium: {
    id: 'msc_elunium', name: 'Elunium', icon: '🔷', category: 'Upgrade',
    sellPrice: 280, desc: 'Rare Armor Refinement Ore (+1 to +10 Armor upgrades).'
  }
};

export const CRAFT_RECIPES = [
  {
    id: 'cr_red_pot', outType: 'consumable', outId: 'pot_red', outQty: 2, zeny: 20,
    mats: { msc_jellopy: 2, msc_mucus: 1 },
    desc: 'Brew 2× Red Potions from Poring Jellopy & Sticky Mucus.'
  },
  {
    id: 'cr_sword', outType: 'equip', outId: 'rh_sword', outQty: 1, zeny: 180,
    mats: { msc_claw: 2, msc_phracon: 1 },
    desc: 'Forge Iron Broadsword (+11 ATK, +4 HIT).'
  },
  {
    id: 'cr_buckler', outType: 'equip', outId: 'lh_buckler', outQty: 1, zeny: 160,
    mats: { msc_shell: 2, msc_phracon: 1 },
    desc: 'Forge Iron Guard Buckler (+6 DEF, +1 VIT).'
  },
  {
    id: 'cr_staff', outType: 'equip', outId: 'rh_staff', outQty: 1, zeny: 320,
    mats: { msc_wood: 3, msc_oridecon: 1 },
    desc: 'Craft Geffen Arcane Staff (+15 MATK, +4 INT).'
  },
  {
    id: 'cr_crest', outType: 'equip', outId: 'hg_crest', outQty: 1, zeny: 480,
    mats: { msc_voucher: 3, msc_elunium: 1 },
    desc: 'Forge Chivalry Crest Helm (+7 DEF, +2 STR, +2 VIT).'
  },
  {
    id: 'cr_excalibur', outType: 'equip', outId: 'rh_excalibur', outQty: 1, zeny: 950,
    mats: { msc_horn: 3, msc_foxtail: 2, msc_oridecon: 2 },
    desc: 'Forge Excalibur Holy Broadsword (+21 ATK, +10 MATK, Holy Element).'
  }
];

// ============================================================================
// 3. EQUIPS (8-SLOT PAPERDOLL) — Tab 2 of Inventory
// ============================================================================
export const EQUIP_SLOT_ORDER = [
  { key: 'headgear',  label: 'Headgear',   short: 'HEAD', icon: '👑' },
  { key: 'armor',     label: 'Armor',      short: 'ARM',  icon: '🛡️' },
  { key: 'rightHand', label: 'Right Hand', short: 'R-HD', icon: '⚔️' },
  { key: 'leftHand',  label: 'Left Hand',  short: 'L-HD', icon: '🔰' },
  { key: 'legs',      label: 'Legs',       short: 'LEGS', icon: '👖' },
  { key: 'shoes',     label: 'Shoes',      short: 'SHOE', icon: '👢' },
  { key: 'amulet',    label: 'Amulet',     short: 'AMUL', icon: '📿' },
  { key: 'trinket',   label: 'Trinket',    short: 'TRNK', icon: '💍' }
];

export const PAPERDOLL_ITEMS = {
  // 1. HEADGEAR
  hg_none:        { id: 'hg_none', slot: 'headgear', name: 'No Headgear', style: 'none', tier: 0, starter: true, buyPrice: 0, sellPrice: 0, stats: {} },
  hg_bandana:     { id: 'hg_bandana', slot: 'headgear', name: 'Fighter Cloth Headband', style: 'bandana', tier: 1, starter: false, buyPrice: 220, sellPrice: 110, stats: { atk: 3, agi: 2 } },
  hg_helm:        { id: 'hg_helm', slot: 'headgear', name: 'Prontera Iron Sallet', style: 'helm', tier: 2, starter: false, buyPrice: 420, sellPrice: 210, stats: { def: 5, vit: 1 } },
  hg_hood:        { id: 'hg_hood', slot: 'headgear', name: 'Morroc Thief Hood', style: 'hood', tier: 1, starter: false, buyPrice: 260, sellPrice: 130, stats: { def: 2, spd: 4, flee: 5, luk: 2 } },
  hg_feather:     { id: 'hg_feather', slot: 'headgear', name: 'Payon Hunter Feather Cap', style: 'featherhood', tier: 2, starter: false, buyPrice: 450, sellPrice: 225, stats: { dex: 3, spd: 3, atk: 4, hit: 6 } },
  hg_wizard:      { id: 'hg_wizard', slot: 'headgear', name: 'Geffen Pointed Wizard Hat', style: 'wizard', tier: 2, starter: false, buyPrice: 480, sellPrice: 240, stats: { int: 4, matk: 7, mdef: 4 } },
  hg_mitre:       { id: 'hg_mitre', slot: 'headgear', name: 'Cathedral Priest Biretta', style: 'mitre', tier: 2, starter: false, buyPrice: 460, sellPrice: 230, stats: { int: 3, vit: 2, def: 3, mdef: 5 } },
  hg_hat:         { id: 'hg_hat', slot: 'headgear', name: 'Wanderer Plume Hat', style: 'hat', tier: 2, starter: false, buyPrice: 440, sellPrice: 220, stats: { dex: 2, agi: 3, spd: 4 } },
  hg_crest:       { id: 'hg_crest', slot: 'headgear', name: 'Chivalry Crest Helm', style: 'crest', tier: 3, starter: false, buyPrice: 780, sellPrice: 390, stats: { def: 7, str: 2, vit: 2 } },
  hg_crown:       { id: 'hg_crown', slot: 'headgear', name: 'Moonlight Golden Circlet', style: 'crown', tier: 4, starter: false, buyPrice: 1450, sellPrice: 725, stats: { int: 4, matk: 9, def: 4, mdef: 6 } },
  hg_horns:       { id: 'hg_horns', slot: 'headgear', name: 'Majestic Baphomet Horns', style: 'horns', tier: 4, starter: false, buyPrice: 1650, sellPrice: 825, stats: { atk: 11, str: 3, def: 5 } },
  hg_valk:        { id: 'hg_valk', slot: 'headgear', name: 'Valkyrie Winged Helm', style: 'valk_helm', tier: 4, starter: false, buyPrice: 1550, sellPrice: 775, stats: { def: 8, mdef: 5, vit: 3, spd: 4 } },

  // 2. ARMOR
  ar_cotton:      { id: 'ar_cotton', slot: 'armor', name: 'Cotton Adventurer Shirt', armorCol: '#857d70', trimCol: '#595145', robe: false, bulk: false, tier: 0, starter: true, buyPrice: 80, sellPrice: 40, stats: { def: 2 } },
  ar_leather:     { id: 'ar_leather', slot: 'armor', name: 'Padded Leather Jacket', armorCol: '#69513b', trimCol: '#997c5c', robe: false, bulk: false, tier: 0, starter: true, buyPrice: 120, sellPrice: 60, stats: { def: 4 } },
  ar_novice_robe: { id: 'ar_novice_robe', slot: 'armor', name: 'Simple Linen Tunic Robe', armorCol: '#706a78', trimCol: '#a69d8c', robe: true, bulk: false, tier: 0, starter: true, buyPrice: 100, sellPrice: 50, stats: { def: 2, mdef: 3, int: 1 } },
  ar_swordsman:   { id: 'ar_swordsman', slot: 'armor', name: 'Iron Brigandine Plate', armorCol: '#6d7782', trimCol: '#3f78c9', robe: false, bulk: true, tier: 2, starter: false, buyPrice: 520, sellPrice: 260, stats: { def: 9, vit: 2 } },
  ar_crusader:    { id: 'ar_crusader', slot: 'armor', name: 'Templar Sanctified Mail', armorCol: '#546875', trimCol: '#d4b259', robe: false, bulk: true, tier: 4, starter: false, buyPrice: 1200, sellPrice: 600, stats: { def: 12, mdef: 5, vit: 3 } },
  ar_mercenary:   { id: 'ar_mercenary', slot: 'armor', name: 'Crimson Coat of Rage', armorCol: '#7d2e29', trimCol: '#c9a455', robe: false, bulk: false, tier: 3, starter: false, buyPrice: 740, sellPrice: 370, stats: { def: 7, str: 3, atk: 4 } },
  ar_thief:       { id: 'ar_thief', slot: 'armor', name: 'Shadow Shinobi Suit', armorCol: '#282730', trimCol: '#7a4bb0', robe: false, bulk: false, tier: 2, starter: false, buyPrice: 480, sellPrice: 240, stats: { def: 5, agi: 4, spd: 4, flee: 6 } },
  ar_lancer:      { id: 'ar_lancer', slot: 'armor', name: 'Halberdier Scale Hauberk', armorCol: '#2e6e67', trimCol: '#d0ba75', robe: false, bulk: false, tier: 3, starter: false, buyPrice: 760, sellPrice: 380, stats: { def: 8, str: 2, vit: 2 } },
  ar_archer:      { id: 'ar_archer', slot: 'armor', name: 'Payon Ranger Coat', armorCol: '#516932', trimCol: '#8a6a3a', robe: false, bulk: false, tier: 2, starter: false, buyPrice: 460, sellPrice: 230, stats: { def: 5, dex: 3, agi: 2, hit: 5 } },
  ar_mage:        { id: 'ar_mage', slot: 'armor', name: 'Geffen Silk Robe', armorCol: '#4c2e78', trimCol: '#c9a455', robe: true, bulk: false, tier: 2, starter: false, buyPrice: 510, sellPrice: 255, stats: { def: 4, mdef: 6, int: 4, matk: 5 } },
  ar_acolyte:     { id: 'ar_acolyte', slot: 'armor', name: 'Prontera Holy Vestment', armorCol: '#d6d0c0', trimCol: '#cfa94e', robe: true, bulk: false, tier: 2, starter: false, buyPrice: 500, sellPrice: 250, stats: { def: 6, mdef: 6, int: 3, vit: 2 } },

  // 3. RIGHT HAND
  rh_shortsword:  { id: 'rh_shortsword', slot: 'rightHand', name: 'Bronze Short Sword', style: 'dagger', tier: 0, starter: true, buyPrice: 120, sellPrice: 60, stats: { atk: 5 } },
  rh_club:        { id: 'rh_club', slot: 'rightHand', name: 'Wooden Novice Mace', style: 'mace', tier: 0, starter: true, buyPrice: 110, sellPrice: 55, stats: { atk: 4, matk: 5, vit: 1 } },
  rh_shortbow:    { id: 'rh_shortbow', slot: 'rightHand', name: 'Willow Short Bow', style: 'bow', tier: 0, starter: true, buyPrice: 120, sellPrice: 60, stats: { atk: 5, dex: 1 } },
  rh_wand:        { id: 'rh_wand', slot: 'rightHand', name: 'Apprentice Oak Wand', style: 'staff', tier: 0, starter: true, buyPrice: 110, sellPrice: 55, stats: { atk: 3, matk: 6, int: 1 } },
  rh_sword:       { id: 'rh_sword', slot: 'rightHand', name: 'Iron Broadsword', style: 'sword', tier: 1, starter: false, buyPrice: 320, sellPrice: 160, stats: { atk: 11, hit: 4 } },
  rh_greatsword:  { id: 'rh_greatsword', slot: 'rightHand', name: 'Two-Handed Claymore', style: 'greatsword', tier: 3, starter: false, buyPrice: 820, sellPrice: 410, stats: { atk: 17, str: 2, spd: -2 } },
  rh_spear:       { id: 'rh_spear', slot: 'rightHand', name: 'Partizan Halberd', style: 'spear', tier: 3, starter: false, buyPrice: 780, sellPrice: 390, stats: { atk: 15, vit: 2 } },
  rh_dagger:      { id: 'rh_dagger', slot: 'rightHand', name: 'Damascus Venom Blade', style: 'dagger', tier: 2, starter: false, buyPrice: 540, sellPrice: 270, stats: { atk: 12, spd: 5, luk: 3 } },
  rh_katar:       { id: 'rh_katar', slot: 'rightHand', name: 'Jur Katar of Quaking', style: 'katar', tier: 4, starter: false, buyPrice: 1350, sellPrice: 675, stats: { atk: 18, spd: 7, crit: 8, luk: 4 } },
  rh_bow:         { id: 'rh_bow', slot: 'rightHand', name: 'Payon Composite Bow', style: 'bow', tier: 2, starter: false, buyPrice: 520, sellPrice: 260, stats: { atk: 13, dex: 3, spd: 3, hit: 6 } },
  rh_staff:       { id: 'rh_staff', slot: 'rightHand', name: 'Geffen Arcane Staff', style: 'staff', tier: 2, starter: false, buyPrice: 560, sellPrice: 280, stats: { atk: 6, matk: 15, int: 4 } },
  rh_crosier:     { id: 'rh_crosier', slot: 'rightHand', name: 'Sanctuary Holy Crosier', style: 'crosier', tier: 2, starter: false, buyPrice: 540, sellPrice: 270, stats: { atk: 7, matk: 14, int: 3, vit: 2 } },
  rh_axe:         { id: 'rh_axe', slot: 'rightHand', name: 'Blacksmith Cleaver Axe', style: 'axe', tier: 3, starter: false, buyPrice: 860, sellPrice: 430, stats: { atk: 18, str: 3 } },
  rh_lute:        { id: 'rh_lute', slot: 'rightHand', name: 'Bragi Troubadour Lute', style: 'lute', tier: 3, starter: false, buyPrice: 740, sellPrice: 370, stats: { atk: 10, matk: 12, spd: 6, dex: 2 } },
  rh_excalibur:   { id: 'rh_excalibur', slot: 'rightHand', name: 'Excalibur Holy Broadsword', style: 'excalibur', elem: 'Holy', tier: 4, starter: false, buyPrice: 1850, sellPrice: 925, stats: { atk: 21, matk: 10, str: 3, spd: 2 } },

  // 4. LEFT HAND
  lh_none:        { id: 'lh_none', slot: 'leftHand', name: 'Empty Left Hand', style: 'none', tier: 0, starter: true, buyPrice: 0, sellPrice: 0, stats: {} },
  lh_wood_buckler:{ id: 'lh_wood_buckler', slot: 'leftHand', name: 'Wooden Round Guard', style: 'buckler', tier: 0, starter: true, buyPrice: 90, sellPrice: 45, stats: { def: 3 } },
  lh_buckler:     { id: 'lh_buckler', slot: 'leftHand', name: 'Iron Guard Buckler', style: 'buckler', tier: 1, starter: false, buyPrice: 280, sellPrice: 140, stats: { def: 6, vit: 1 } },
  lh_tower:       { id: 'lh_tower', slot: 'leftHand', name: 'Crusader Cross Shield', style: 'tower', tier: 3, starter: false, buyPrice: 720, sellPrice: 360, stats: { def: 11, mdef: 4, vit: 3, spd: -2 } },
  lh_valk:        { id: 'lh_valk', slot: 'leftHand', name: 'Valkyrja Crest Shield', style: 'valk_shield', tier: 4, starter: false, buyPrice: 1400, sellPrice: 700, stats: { def: 10, mdef: 6, vit: 2, spd: 2 } },
  lh_offdagger:   { id: 'lh_offdagger', slot: 'leftHand', name: 'Off-Hand Parrying Dirk', style: 'offdagger', tier: 2, starter: false, buyPrice: 480, sellPrice: 240, stats: { atk: 6, spd: 4, flee: 4 } },
  lh_tome:        { id: 'lh_tome', slot: 'leftHand', name: 'Sage Ancient Grimoire', style: 'tome', tier: 2, starter: false, buyPrice: 520, sellPrice: 260, stats: { int: 3, matk: 7, mdef: 4, def: 3 } },

  // 5. LEGS
  lg_cloth:       { id: 'lg_cloth', slot: 'legs', name: 'Simple Cloth Trousers', legsCol: '#453f38', kneeCol: '#595145', tier: 0, starter: true, buyPrice: 60, sellPrice: 30, stats: { def: 1 } },
  lg_leather:     { id: 'lg_leather', slot: 'legs', name: 'Sturdy Leather Breeches', legsCol: '#3d3028', kneeCol: '#6e5239', tier: 1, starter: false, buyPrice: 240, sellPrice: 120, stats: { def: 4, str: 1, spd: 2 } },
  lg_plate:       { id: 'lg_plate', slot: 'legs', name: 'Iron Greaves & Cuisses', legsCol: '#49525e', kneeCol: '#aeb8c4', tier: 3, starter: false, buyPrice: 640, sellPrice: 320, stats: { def: 6, vit: 2 } },
  lg_shadow:      { id: 'lg_shadow', slot: 'legs', name: 'Shinobi Shadow Leggings', legsCol: '#1d1c24', kneeCol: '#6d3e8c', tier: 2, starter: false, buyPrice: 460, sellPrice: 230, stats: { def: 3, agi: 3, spd: 4, flee: 5 } },
  lg_ranger:      { id: 'lg_ranger', slot: 'legs', name: 'Payon Forest Striders', legsCol: '#333b28', kneeCol: '#8a6a3a', tier: 2, starter: false, buyPrice: 440, sellPrice: 220, stats: { def: 4, dex: 2, agi: 2 } },

  // 6. SHOES
  sh_sandals:     { id: 'sh_sandals', slot: 'shoes', name: 'Simple Leather Sandals', bootCol: '#5c4938', trimCol: '#8c7662', tier: 0, starter: true, buyPrice: 60, sellPrice: 30, stats: { def: 1, spd: 1 } },
  sh_boots:       { id: 'sh_boots', slot: 'shoes', name: 'Leather Combat Boots', bootCol: '#2e221a', trimCol: '#6e5239', tier: 1, starter: false, buyPrice: 240, sellPrice: 120, stats: { def: 3, spd: 3, agi: 1 } },
  sh_iron:        { id: 'sh_iron', slot: 'shoes', name: 'Chivalry Iron Sabatons', bootCol: '#59626e', trimCol: '#c9a24b', tier: 3, starter: false, buyPrice: 620, sellPrice: 310, stats: { def: 5, vit: 1 } },
  sh_tabi:        { id: 'sh_tabi', slot: 'shoes', name: 'Silent Assassin Tabi', bootCol: '#1b1a21', trimCol: '#a83e32', tier: 2, starter: false, buyPrice: 450, sellPrice: 225, stats: { def: 2, spd: 6, flee: 5, luk: 2 } },
  sh_sleipnir:    { id: 'sh_sleipnir', slot: 'shoes', name: 'Winged Hermes Greaves', bootCol: '#346296', trimCol: '#e6c975', tier: 4, starter: false, buyPrice: 1450, sellPrice: 725, stats: { def: 4, mdef: 4, spd: 8, agi: 3 } },

  // 7. AMULET
  am_none:        { id: 'am_none', slot: 'amulet', name: 'No Amulet', gemCol: '#595145', tier: 0, starter: true, buyPrice: 0, sellPrice: 0, stats: {} },
  am_rosary:      { id: 'am_rosary', slot: 'amulet', name: 'Prontera Silver Rosary', gemCol: '#5ca86d', tier: 1, starter: false, buyPrice: 280, sellPrice: 140, stats: { int: 2, vit: 2, mdef: 4, def: 2 } },
  am_necklace:    { id: 'am_necklace', slot: 'amulet', name: 'Warrior Wolf-Tooth Torque', gemCol: '#d45b4c', tier: 2, starter: false, buyPrice: 460, sellPrice: 230, stats: { str: 3, atk: 5 } },
  am_falcon:      { id: 'am_falcon', slot: 'amulet', name: 'Payon Hawk-Eye Pendant', gemCol: '#d9b54a', tier: 2, starter: false, buyPrice: 480, sellPrice: 240, stats: { dex: 3, spd: 4, crit: 3, hit: 6 } },
  am_brisingamen: { id: 'am_brisingamen', slot: 'amulet', name: 'Amber Goddess Talisman', gemCol: '#e6c975', tier: 4, starter: false, buyPrice: 1550, sellPrice: 775, stats: { str: 2, int: 3, vit: 2, spd: 3, matk: 6 } },

  // 8. TRINKET
  tr_none:        { id: 'tr_none', slot: 'trinket', name: 'No Trinket', relicCol: '#4a4238', tier: 0, starter: true, buyPrice: 0, sellPrice: 0, stats: {} },
  tr_belt:        { id: 'tr_belt', slot: 'trinket', name: 'Iron Vanguard Belt Buckle', relicCol: '#aeb8c4', tier: 1, starter: false, buyPrice: 260, sellPrice: 130, stats: { str: 2, vit: 2, hp: 25 } },
  tr_brooch:      { id: 'tr_brooch', slot: 'trinket', name: 'Thief Wind-Step Brooch', relicCol: '#548ac4', tier: 2, starter: false, buyPrice: 460, sellPrice: 230, stats: { agi: 3, spd: 5, flee: 5 } },
  tr_glove:       { id: 'tr_glove', slot: 'trinket', name: 'Archer Draw-String Bracer', relicCol: '#b56728', tier: 2, starter: false, buyPrice: 460, sellPrice: 230, stats: { dex: 3, atk: 4, crit: 2, hit: 5 } },
  tr_earring:     { id: 'tr_earring', slot: 'trinket', name: 'Geffen Sage Focus Crystal', relicCol: '#955cba', tier: 2, starter: false, buyPrice: 480, sellPrice: 240, stats: { int: 3, matk: 6, mdef: 3 } }
};

export const RO_CARDS = [
  { id: 'c_poring', name: 'Poring Card', desc: '+2 LUK, +4 FLEE, +3 SPD', stats: { luk: 2, flee: 4, spd: 3 } },
  { id: 'c_fabre', name: 'Fabre Card', desc: '+35 Max HP, +2 VIT', stats: { hp: 35, vit: 2 } },
  { id: 'c_wolf', name: 'Desert Wolf Card', desc: '+5 ATK, +3 CRIT', stats: { atk: 5, crit: 3 } },
  { id: 'c_skeleton', name: 'Skeleton Worker Card', desc: '+8 ATK, +5 HIT', stats: { atk: 8, hit: 5 } },
  { id: 'c_thara', name: 'Thara Frog Card', desc: '+6 DEF, +2 VIT', stats: { def: 6, vit: 2 } },
  { id: 'c_sohee', name: 'Sohee Card', desc: '+8 MATK, +3 INT', stats: { matk: 8, int: 3 } },
  { id: 'c_mvp_bapho', name: 'Baphomet [MVP] Card', desc: '+14 ATK, +6 SPD, +8 CRIT', stats: { atk: 14, spd: 6, crit: 8 } },
  { id: 'c_mvp_moon', name: 'Moonlight [MVP] Card', desc: '+12 MATK/ATK, +10 SPD', stats: { atk: 10, matk: 12, spd: 10 } }
];

// ============================================================================
// STARTING PARTY OF 4 AT BASE LV. 1 / JOB LV. 1 + 8 UNRECRUITED HEROES
// ============================================================================
export const INITIAL_ROSTER_RAW = [
  {
    id: 'h_seyren', name: 'Seyren', job: 'Swordsman', nextJob: 'Knight', role: 'Tank', elem: 'Neutral',
    lv: 1, baseExp: 0, baseExpNext: 100, jobLv: 1, jobMaxLv: 10, jobExp: 0, jobExpNext: 80,
    recruited: true, deployed: true, recruitCost: 0,
    baseHp: 175, baseAtk: 17, baseMatk: 8, baseDef: 12, baseMdef: 5, baseSpd: 92, move: 4, range: 1, jump: 2, magic: false,
    str: 9, agi: 6, vit: 10, int: 2, dex: 7, luk: 3, statPts: 3, skillPts: 1,
    equips: {
      headgear: 'hg_none', armor: 'ar_leather', rightHand: 'rh_shortsword', leftHand: 'lh_wood_buckler',
      legs: 'lg_cloth', shoes: 'sh_sandals', amulet: 'am_none', trinket: 'tr_none'
    },
    refineWep: 0, refineArmor: 0, cards: [],
    skin: '#cfa07e', hairStyle: 'spiky', hairCol: '#59281e',
    skills: [
      { id: 'provoke', n: 'Provoke', type: 'taunt', elem: 'Neutral', status: 'provoke', statusChance: 1.0, r: 3, pow: 1.0, cd: 4, lv: 1, maxLv: 10, desc: 'Taunts enemies within 3 tiles, inflicting PROVOKE (-20% DEF) and raising own DEF.' },
      { id: 'bash', n: 'Fatal Bash', type: 'knockback', elem: 'Fire', status: 'stun', statusChance: 0.5, r: 1, pow: 1.38, cd: 2, lv: 1, maxLv: 10, desc: 'Fire-infused heavy strike with 50% chance to STUN and knock target back 1 tile.' }
    ]
  },
  {
    id: 'h_margaretha', name: 'Margaretha', job: 'Acolyte', nextJob: 'Priest', role: 'Healer', elem: 'Holy',
    lv: 1, baseExp: 0, baseExpNext: 100, jobLv: 1, jobMaxLv: 10, jobExp: 0, jobExpNext: 80,
    recruited: true, deployed: true, recruitCost: 0,
    baseHp: 130, baseAtk: 10, baseMatk: 19, baseDef: 7, baseMdef: 12, baseSpd: 96, move: 4, range: 4, jump: 2, magic: true,
    str: 3, agi: 7, vit: 7, int: 11, dex: 8, luk: 5, statPts: 3, skillPts: 1,
    equips: {
      headgear: 'hg_none', armor: 'ar_novice_robe', rightHand: 'rh_club', leftHand: 'lh_none',
      legs: 'lg_cloth', shoes: 'sh_sandals', amulet: 'am_none', trinket: 'tr_none'
    },
    refineWep: 0, refineArmor: 0, cards: [],
    skin: '#e3c3a8', hairStyle: 'long', hairCol: '#c28538',
    skills: [
      { id: 'heal', n: 'Sanctuary Heal', type: 'heal', elem: 'Holy', r: 4, pow: 2.1, cd: 1, lv: 1, maxLv: 10, desc: 'Restores HP to injured ally and cures Poison & Stun.' },
      { id: 'lex', n: 'Lex Aeterna', type: 'strike', elem: 'Holy', status: 'lex', statusChance: 1.0, r: 4, pow: 1.1, cd: 3, lv: 1, maxLv: 10, desc: 'Holy strike that marks an enemy with LEX AETERNA: next hit deals 2.0x damage!' },
      { id: 'blessing_agi', n: 'Blessing & Agi Up', type: 'buff', elem: 'Holy', r: 3, pow: 1.0, cd: 4, lv: 1, maxLv: 10, desc: 'Grants nearby allies BLESSING (+25% ATK/MATK) and INCREASE AGI (+30% SPD).' }
    ]
  },
  {
    id: 'h_cecil', name: 'Cecil', job: 'Archer', nextJob: 'Hunter', role: 'Ranged', elem: 'Wind',
    lv: 1, baseExp: 0, baseExpNext: 100, jobLv: 1, jobMaxLv: 10, jobExp: 0, jobExpNext: 80,
    recruited: true, deployed: true, recruitCost: 0,
    baseHp: 125, baseAtk: 18, baseMatk: 9, baseDef: 7, baseMdef: 6, baseSpd: 102, move: 4, range: 5, jump: 2, magic: false,
    str: 5, agi: 10, vit: 5, int: 4, dex: 11, luk: 5, statPts: 3, skillPts: 1,
    equips: {
      headgear: 'hg_none', armor: 'ar_cotton', rightHand: 'rh_shortbow', leftHand: 'lh_none',
      legs: 'lg_cloth', shoes: 'sh_sandals', amulet: 'am_none', trinket: 'tr_none'
    },
    refineWep: 0, refineArmor: 0, cards: [],
    hasFalcon: false,
    skin: '#c58f6c', hairStyle: 'long', hairCol: '#4a2d18',
    skills: [
      { id: 'blitz_shower', n: 'Venom Arrow Shower', type: 'blast', elem: 'Poison', status: 'poison', statusChance: 0.55, r: 1, pow: 0.95, cd: 3, lv: 1, maxLv: 10, desc: 'Rains poison-tipped arrows on target and adjacent foes (55% POISON).' },
      { id: 'wind_strafe', n: 'Gale Double Strafe', type: 'strike', elem: 'Wind', r: 5, pow: 1.5, cd: 2, lv: 1, maxLv: 10, desc: 'Twin Wind arrows that deal 175% SHATTER damage to Water or FROZEN foes!' }
    ]
  },
  {
    id: 'h_kathryne', name: 'Kathryne', job: 'Mage', nextJob: 'Wizard', role: 'Ranged', elem: 'Water',
    lv: 1, baseExp: 0, baseExpNext: 100, jobLv: 1, jobMaxLv: 10, jobExp: 0, jobExpNext: 80,
    recruited: true, deployed: true, recruitCost: 0,
    baseHp: 112, baseAtk: 8, baseMatk: 22, baseDef: 5, baseMdef: 14, baseSpd: 90, move: 4, range: 4, jump: 2, magic: true,
    str: 2, agi: 6, vit: 5, int: 12, dex: 9, luk: 4, statPts: 3, skillPts: 1,
    equips: {
      headgear: 'hg_none', armor: 'ar_novice_robe', rightHand: 'rh_wand', leftHand: 'lh_none',
      legs: 'lg_cloth', shoes: 'sh_sandals', amulet: 'am_none', trinket: 'tr_none'
    },
    refineWep: 0, refineArmor: 0, cards: [],
    skin: '#d9b8a0', hairStyle: 'twin', hairCol: '#b56e8a',
    skills: [
      { id: 'frost_diver', n: 'Frost Diver', type: 'strike', elem: 'Water', status: 'freeze', statusChance: 0.65, r: 4, pow: 1.25, cd: 2, lv: 1, maxLv: 10, desc: 'Water spell with 65% chance to FREEZE target in ice (Water property).' },
      { id: 'jupitel', n: 'Jupitel Thunder', type: 'knockback', elem: 'Wind', r: 4, pow: 1.5, cd: 3, lv: 1, maxLv: 10, desc: 'Wind lightning sphere: 175% SHATTER damage to FROZEN enemies + knockback!' },
      { id: 'storm_fire', n: 'Fire Pillar Blast', type: 'blast', elem: 'Fire', r: 1, pow: 1.2, cd: 3, lv: 1, maxLv: 10, desc: 'Fire AoE blast: 175% damage to Earth Orcs and Undead Sohees.' }
    ]
  },

  // === UNRECRUITED HEROES ===
  {
    id: 'h_eremes', name: 'Eremes', job: 'Thief', nextJob: 'Assassin', role: 'Assassin', elem: 'Poison',
    lv: 2, baseExp: 0, baseExpNext: 130, jobLv: 2, jobMaxLv: 10, jobExp: 0, jobExpNext: 100,
    recruited: false, deployed: false, recruitCost: 420,
    baseHp: 140, baseAtk: 20, baseMatk: 8, baseDef: 8, baseMdef: 6, baseSpd: 112, move: 5, range: 1, jump: 3, magic: false,
    str: 8, agi: 12, vit: 5, int: 3, dex: 8, luk: 7, statPts: 3, skillPts: 1,
    equips: { headgear: 'hg_none', armor: 'ar_cotton', rightHand: 'rh_shortsword', leftHand: 'lh_none', legs: 'lg_cloth', shoes: 'sh_sandals', amulet: 'am_none', trinket: 'tr_none' },
    refineWep: 0, refineArmor: 0, cards: [],
    skin: '#b58669', hairStyle: 'spiky', hairCol: '#a8b2bd',
    skills: [{ id: 'envenom', n: 'Envenom Double Strike', type: 'strike', elem: 'Poison', status: 'poison', statusChance: 0.75, r: 1, pow: 1.75, cd: 2, lv: 1, maxLv: 10, desc: 'Dual strike with 75% chance to inflict POISON.' }]
  },
  {
    id: 'h_kael', name: 'Kael', job: 'Mercenary', nextJob: 'Lord Knight', role: 'Fighter', elem: 'Fire',
    lv: 2, baseExp: 0, baseExpNext: 130, jobLv: 2, jobMaxLv: 10, jobExp: 0, jobExpNext: 100,
    recruited: false, deployed: false, recruitCost: 460,
    baseHp: 165, baseAtk: 21, baseMatk: 8, baseDef: 10, baseMdef: 5, baseSpd: 96, move: 4, range: 1, jump: 2, magic: false,
    str: 10, agi: 7, vit: 8, int: 3, dex: 7, luk: 4, statPts: 3, skillPts: 1,
    equips: { headgear: 'hg_none', armor: 'ar_leather', rightHand: 'rh_shortsword', leftHand: 'lh_none', legs: 'lg_cloth', shoes: 'sh_sandals', amulet: 'am_none', trinket: 'tr_none' },
    refineWep: 0, refineArmor: 0, cards: [],
    skin: '#d8ac8a', hairStyle: 'spiky', hairCol: '#6e351f',
    skills: [{ id: 'magnum', n: 'Magnum Break', type: 'sweep', elem: 'Fire', r: 1, pow: 1.25, cd: 3, lv: 1, maxLv: 10, desc: 'Fire-element shockwave cleave hitting all adjacent enemies.' }]
  },
  {
    id: 'h_randel', name: 'Randel', job: 'Crusader', nextJob: 'Paladin', role: 'Tank', elem: 'Holy',
    lv: 3, baseExp: 0, baseExpNext: 165, jobLv: 3, jobMaxLv: 10, jobExp: 0, jobExpNext: 120,
    recruited: false, deployed: false, recruitCost: 520,
    baseHp: 195, baseAtk: 16, baseMatk: 12, baseDef: 15, baseMdef: 9, baseSpd: 88, move: 4, range: 1, jump: 2, magic: false,
    str: 8, agi: 5, vit: 11, int: 6, dex: 7, luk: 4, statPts: 3, skillPts: 1,
    equips: { headgear: 'hg_none', armor: 'ar_leather', rightHand: 'rh_club', leftHand: 'lh_wood_buckler', legs: 'lg_cloth', shoes: 'sh_sandals', amulet: 'am_none', trinket: 'tr_none' },
    refineWep: 0, refineArmor: 0, cards: [],
    skin: '#bf8e6b', hairStyle: 'noble', hairCol: '#8c6f39',
    skills: [
      { id: 'devotion', n: 'Guard & Taunt', type: 'taunt', elem: 'Holy', status: 'provoke', statusChance: 1.0, r: 3, pow: 1.0, cd: 4, lv: 1, maxLv: 10, desc: 'Forces nearby monsters to target Randel while raising shield DEF.' },
      { id: 'smite', n: 'Holy Shield Smite', type: 'knockback', elem: 'Holy', status: 'stun', statusChance: 0.6, r: 1, pow: 1.4, cd: 3, lv: 1, maxLv: 10, desc: 'Holy shield bash with 60% chance to STUN and knockback.' }
    ]
  },
  {
    id: 'h_alphoccio', name: 'Alphoccio', job: 'Bard', nextJob: 'Minstrel', role: 'Support', elem: 'Wind',
    lv: 3, baseExp: 0, baseExpNext: 165, jobLv: 3, jobMaxLv: 10, jobExp: 0, jobExpNext: 120,
    recruited: false, deployed: false, recruitCost: 500,
    baseHp: 145, baseAtk: 16, baseMatk: 14, baseDef: 8, baseMdef: 8, baseSpd: 106, move: 4, range: 4, jump: 2, magic: true,
    str: 5, agi: 9, vit: 6, int: 8, dex: 10, luk: 6, statPts: 3, skillPts: 1,
    equips: { headgear: 'hg_none', armor: 'ar_cotton', rightHand: 'rh_shortbow', leftHand: 'lh_none', legs: 'lg_cloth', shoes: 'sh_sandals', amulet: 'am_none', trinket: 'tr_none' },
    refineWep: 0, refineArmor: 0, cards: [],
    skin: '#9c7258', hairStyle: 'noble', hairCol: '#242129',
    skills: [{ id: 'bragi', n: 'Poem of Bragi', type: 'buff', elem: 'Wind', r: 3, pow: 1.0, cd: 4, lv: 1, maxLv: 10, desc: 'Allies within 3 tiles gain BLESSING (+25% ATK) & INCREASE AGI (+30% SPD).' }]
  },
  {
    id: 'h_howard', name: 'Howard', job: 'Blacksmith', nextJob: 'Whitesmith', role: 'Fighter', elem: 'Earth',
    lv: 4, baseExp: 0, baseExpNext: 200, jobLv: 4, jobMaxLv: 10, jobExp: 0, jobExpNext: 140,
    recruited: false, deployed: false, recruitCost: 560,
    baseHp: 175, baseAtk: 22, baseMatk: 7, baseDef: 11, baseMdef: 5, baseSpd: 92, move: 4, range: 1, jump: 2, magic: false,
    str: 11, agi: 6, vit: 9, int: 3, dex: 8, luk: 5, statPts: 3, skillPts: 1,
    equips: { headgear: 'hg_none', armor: 'ar_leather', rightHand: 'rh_club', leftHand: 'lh_none', legs: 'lg_cloth', shoes: 'sh_sandals', amulet: 'am_none', trinket: 'tr_none' },
    refineWep: 0, refineArmor: 0, cards: [],
    hasCart: true,
    skin: '#b98363', hairStyle: 'spiky', hairCol: '#994726',
    skills: [{ id: 'cartrev', n: 'Hammer Fall & Cart Ram', type: 'sweep', elem: 'Earth', status: 'stun', statusChance: 0.5, r: 1, pow: 1.3, cd: 3, lv: 1, maxLv: 10, desc: 'Earth-shattering slam hitting adjacent enemies with 50% STUN.' }]
  },
  {
    id: 'h_orla', name: 'Orla', job: 'Spearman', nextJob: 'Dragoon', role: 'Fighter', elem: 'Wind',
    lv: 4, baseExp: 0, baseExpNext: 200, jobLv: 4, jobMaxLv: 10, jobExp: 0, jobExpNext: 140,
    recruited: false, deployed: false, recruitCost: 550,
    baseHp: 170, baseAtk: 21, baseMatk: 8, baseDef: 11, baseMdef: 6, baseSpd: 95, move: 4, range: 2, jump: 2, magic: false,
    str: 10, agi: 8, vit: 8, int: 4, dex: 8, luk: 4, statPts: 3, skillPts: 1,
    equips: { headgear: 'hg_none', armor: 'ar_leather', rightHand: 'rh_shortsword', leftHand: 'lh_none', legs: 'lg_cloth', shoes: 'sh_sandals', amulet: 'am_none', trinket: 'tr_none' },
    refineWep: 0, refineArmor: 0, cards: [],
    skin: '#e0b796', hairStyle: 'long', hairCol: '#996b28',
    skills: [{ id: 'pierce', n: 'Thunder Spear Pierce', type: 'strike', elem: 'Wind', r: 2, pow: 1.6, cd: 3, lv: 1, maxLv: 10, desc: 'Wind-charged spear thrust reaching 2 tiles away.' }]
  },
  {
    id: 'h_chen', name: 'Chen', job: 'Monk', nextJob: 'Champion', role: 'Fighter', elem: 'Holy',
    lv: 5, baseExp: 0, baseExpNext: 240, jobLv: 5, jobMaxLv: 10, jobExp: 0, jobExpNext: 165,
    recruited: false, deployed: false, recruitCost: 600,
    baseHp: 165, baseAtk: 22, baseMatk: 12, baseDef: 10, baseMdef: 8, baseSpd: 106, move: 5, range: 1, jump: 3, magic: false,
    str: 10, agi: 10, vit: 8, int: 6, dex: 8, luk: 5, statPts: 3, skillPts: 1,
    equips: { headgear: 'hg_none', armor: 'ar_cotton', rightHand: 'rh_club', leftHand: 'lh_none', legs: 'lg_cloth', shoes: 'sh_sandals', amulet: 'am_none', trinket: 'tr_none' },
    refineWep: 0, refineArmor: 0, cards: [],
    skin: '#d2a684', hairStyle: 'spiky', hairCol: '#1c1b20',
    skills: [{ id: 'triple', n: 'Raging Triple Blow', type: 'knockback', elem: 'Holy', status: 'stun', statusChance: 0.45, r: 1, pow: 1.7, cd: 3, lv: 1, maxLv: 10, desc: '3-hit Spirit combo with knockback and 45% STUN.' }]
  },
  {
    id: 'h_celia', name: 'Celia', job: 'Sage', nextJob: 'Professor', role: 'Healer', elem: 'Water',
    lv: 5, baseExp: 0, baseExpNext: 240, jobLv: 5, jobMaxLv: 10, jobExp: 0, jobExpNext: 165,
    recruited: false, deployed: false, recruitCost: 620,
    baseHp: 138, baseAtk: 10, baseMatk: 21, baseDef: 7, baseMdef: 13, baseSpd: 100, move: 4, range: 4, jump: 2, magic: true,
    str: 3, agi: 8, vit: 7, int: 11, dex: 9, luk: 5, statPts: 3, skillPts: 1,
    equips: { headgear: 'hg_none', armor: 'ar_novice_robe', rightHand: 'rh_wand', leftHand: 'lh_none', legs: 'lg_cloth', shoes: 'sh_sandals', amulet: 'am_none', trinket: 'tr_none' },
    refineWep: 0, refineArmor: 0, cards: [],
    skin: '#e0c0a6', hairStyle: 'long', hairCol: '#4a7050',
    skills: [
      { id: 'deluge_mend', n: 'Recovery Wave', type: 'heal', elem: 'Water', r: 4, pow: 2.0, cd: 1, lv: 1, maxLv: 10, desc: 'Restores HP to injured party members and cures debuffs.' },
      { id: 'frost_sage', n: 'Frost Nova', type: 'strike', elem: 'Water', status: 'freeze', statusChance: 0.6, r: 4, pow: 1.25, cd: 2, lv: 1, maxLv: 10, desc: 'Chills an enemy with 60% chance to FREEZE.' }
    ]
  }
];

// Normalize every hero to Job Lv. 1..40 with their 8-Skill (4+4) Split Job Tree initialized!
export const INITIAL_ROSTER = INITIAL_ROSTER_RAW.map((h) => {
  const baseJob = h.job;
  const tree = getHeroJobTree({ baseJob, job: baseJob });
  const skillLvs = {};
  (tree?.skills || []).forEach((sk) => {
    skillLvs[sk.id] = sk.reqJobLv <= (h.jobLv || 1) ? 1 : 0;
  });
  return {
    ...h,
    baseJob,
    jobMaxLv: MAX_JOB_LV,
    jobPath: null,
    skillLvs
  };
});

export const MONSTER_TEMPLATES = {
  Poring: {
    name: 'Poring & Drops', role: 'Monster', elem: 'Water', lv: 1, hp: 95, atk: 18, def: 4, spd: 90, move: 4, range: 1, magic: false,
    spriteKind: 'slime', col: '#d47c8e', leafCol: '#4d8048', scale: 1.0
  },
  Marin: {
    name: 'Marin Slime', role: 'Monster', elem: 'Water', lv: 3, hp: 130, atk: 24, def: 6, spd: 95, move: 4, range: 1, magic: false,
    spriteKind: 'slime', col: '#698fb8', leafCol: '#4d8048', scale: 1.05
  },
  Wolf: {
    name: 'Desert Wolf', role: 'Monster', elem: 'Earth', lv: 5, hp: 155, atk: 28, def: 8, spd: 102, move: 5, range: 1, magic: false,
    spriteKind: 'wolf', col: '#635142', maneCol: '#8c7662', scale: 1.0
  },
  Sohee: {
    name: 'Payon Sohee', role: 'Monster', elem: 'Undead', lv: 8, hp: 205, atk: 35, def: 11, spd: 98, move: 4, range: 4, magic: true,
    skill: { n: 'Soul Drain Bolt', type: 'strike', elem: 'Shadow', status: 'poison', statusChance: 0.35, pow: 1.3, cd: 3 },
    spriteKind: 'human', skin: '#c4b8d4', hairStyle: 'long', hairCol: '#241e30',
    equips: { headgear: 'hg_mitre', armor: 'ar_mage', rightHand: 'rh_staff', leftHand: 'lh_none', legs: 'lg_cloth', shoes: 'sh_sandals', amulet: 'am_rosary', trinket: 'tr_earring' },
    scale: 0.96
  },
  Orc: {
    name: 'Orc Warrior', role: 'Monster', elem: 'Earth', lv: 11, hp: 315, atk: 44, def: 16, spd: 86, move: 4, range: 1, magic: false,
    skill: { n: 'Orc Headbutt', type: 'strike', elem: 'Earth', status: 'stun', statusChance: 0.35, pow: 1.25, cd: 3 },
    spriteKind: 'human', skin: '#5d754c', hairStyle: 'spiky', hairCol: '#26211d',
    equips: { headgear: 'hg_horns', armor: 'ar_mercenary', rightHand: 'rh_axe', leftHand: 'lh_buckler', legs: 'lg_leather', shoes: 'sh_boots', amulet: 'am_necklace', trinket: 'tr_belt' },
    scale: 1.18
  },
  Moonlight: {
    name: 'Moonlight Flower [MVP]', role: 'Boss', elem: 'Fire', lv: 10, hp: 620, atk: 48, def: 15, spd: 104, move: 4, range: 4, magic: true,
    skill: { n: 'Nine-Tail Foxfire', type: 'blast', elem: 'Fire', status: 'stun', statusChance: 0.45, r: 1, pow: 1.15, cd: 2 },
    spriteKind: 'moonlight', scale: 1.38
  },
  Baphomet: {
    name: 'Baphomet [MVP]', role: 'Boss', elem: 'Shadow', lv: 15, hp: 920, atk: 60, def: 22, spd: 98, move: 4, range: 2, magic: false,
    skill: { n: 'Hell Crescent Cleave', type: 'sweep', elem: 'Shadow', status: 'poison', statusChance: 0.5, r: 2, pow: 1.15, cd: 3 },
    spriteKind: 'baphomet', scale: 1.45
  }
};

export const WORLD_ENCOUNTERS = {
  porings: {
    key: 'porings', name: 'Poring & Drops Meadow', lead: 'Poring', recLv: 'Lv. 1–3', elem: 'Water', map: 'culvert',
    zeny: 180, baseExp: 85, jobExp: 70, dropCard: 'c_poring',
    lootTable: ['hg_bandana', 'rh_sword', 'lg_leather', 'sh_boots'],
    miscDrops: ['msc_jellopy', 'msc_mucus', 'msc_phracon'],
    foes: [['Poring', 3], ['Marin', 1]]
  },
  culvert_bugs: {
    key: 'culvert_bugs', name: 'Prontera Culvert Sewers', lead: 'Marin', recLv: 'Lv. 3–5', elem: 'Water', map: 'culvert',
    zeny: 250, baseExp: 115, jobExp: 95, dropCard: 'c_fabre',
    lootTable: ['hg_bandana', 'lh_buckler', 'am_rosary', 'tr_belt'],
    miscDrops: ['msc_shell', 'msc_mucus', 'msc_phracon'],
    foes: [['Marin', 3], ['Wolf', 1]]
  },
  wolves: {
    key: 'wolves', name: 'Morroc Desert Wolf Pack', lead: 'Wolf', aggro: true, recLv: 'Lv. 4–7', elem: 'Earth', map: 'culvert',
    zeny: 320, baseExp: 145, jobExp: 120, dropCard: 'c_wolf',
    lootTable: ['hg_hood', 'rh_dagger', 'rh_bow', 'ar_thief', 'ar_archer', 'lg_ranger', 'sh_tabi', 'am_falcon', 'tr_brooch'],
    miscDrops: ['msc_claw', 'msc_phracon'],
    foes: [['Wolf', 4]]
  },
  payon_woods: {
    key: 'payon_woods', name: 'Payon Bamboo Trail', lead: 'Wolf', recLv: 'Lv. 5–8', elem: 'Earth', map: 'shrine',
    zeny: 380, baseExp: 185, jobExp: 155, dropCard: 'c_wolf',
    lootTable: ['hg_feather', 'ar_archer', 'rh_bow', 'lg_ranger', 'tr_glove'],
    miscDrops: ['msc_wood', 'msc_claw', 'msc_oridecon'],
    foes: [['Wolf', 2], ['Sohee', 2]]
  },
  sohees: {
    key: 'sohees', name: 'Payon Cave — Sohee Coven', lead: 'Sohee', recLv: 'Lv. 7–10', elem: 'Undead', map: 'shrine',
    zeny: 440, baseExp: 220, jobExp: 185, dropCard: 'c_sohee',
    lootTable: ['hg_wizard', 'hg_mitre', 'ar_mage', 'ar_acolyte', 'rh_staff', 'rh_crosier', 'lh_tome', 'tr_earring'],
    miscDrops: ['msc_foxtail', 'msc_wood', 'msc_elunium'],
    foes: [['Sohee', 3], ['Wolf', 2]]
  },
  moonlight: {
    key: 'moonlight', name: 'Moonlight Flower [MVP]', lead: 'Moonlight', recLv: 'Lv. 9–12', elem: 'Fire', boss: true, map: 'shrine',
    zeny: 1250, baseExp: 480, jobExp: 420, respawnMinSec: 300, respawnMaxSec: 600, dropCard: 'c_mvp_moon',
    lootTable: ['hg_crown', 'hg_hat', 'rh_lute', 'ar_lancer', 'lh_valk', 'sh_sleipnir', 'am_brisingamen', 'tr_glove'],
    miscDrops: ['msc_foxtail', 'msc_oridecon', 'msc_elunium'],
    foes: [['Moonlight', 1], ['Sohee', 2], ['Marin', 2]]
  },
  orcs: {
    key: 'orcs', name: 'Geffen Orc Village Raid', lead: 'Orc', aggro: true, recLv: 'Lv. 9–14', elem: 'Earth', map: 'rampart',
    zeny: 540, baseExp: 310, jobExp: 260, dropCard: 'c_thara',
    lootTable: ['hg_helm', 'hg_crest', 'ar_swordsman', 'ar_mercenary', 'rh_greatsword', 'rh_axe', 'rh_spear', 'lh_tower', 'lg_plate', 'sh_iron', 'am_necklace'],
    miscDrops: ['msc_voucher', 'msc_oridecon', 'msc_elunium'],
    foes: [['Orc', 2], ['Sohee', 1], ['Wolf', 2]]
  },
  baphomet: {
    key: 'baphomet', name: 'Baphomet [MVP]', lead: 'Baphomet', recLv: 'Lv. 12–18', elem: 'Shadow', boss: true, map: 'rampart',
    zeny: 1550, baseExp: 720, jobExp: 640, respawnMinSec: 300, respawnMaxSec: 600, dropCard: 'c_mvp_bapho',
    lootTable: ['hg_horns', 'hg_valk', 'rh_excalibur', 'rh_katar', 'ar_crusader', 'lh_valk', 'sh_sleipnir', 'am_brisingamen'],
    miscDrops: ['msc_horn', 'msc_oridecon', 'msc_elunium'],
    foes: [['Baphomet', 1], ['Orc', 2], ['Wolf', 2]]
  }
};

// ============================================================================
// RAGNARÖK BLOCK-GRID MIDGARD WORLD MAP (5 cols × 4 rows)
// Like classic RO: each map block has a code (prt_fild08, pay_dun00, etc.),
// distinct monsters, levels, attributes, loot, 5-10 min respawns, and Town hubs!
// ============================================================================
export const MIDGARD_BLOCKS = {
  // Row 0 (North)
  glast_01: {
    id: 'glast_01', code: 'glast_01', gx: 0, gy: 0, type: 'dungeon',
    name: 'Glast Heim Abbey', recLv: 'Lv. 12–18', elem: 'Shadow',
    sub: 'Cursed Chivalry Ruins · ★ Baphomet [MVP] · 5–10m Respawn',
    neighbors: { east: 'gef_fild07', south: 'geffen' },
    palette: { grass: ['#21232b', '#242730', '#1e2028', '#272a33'], path: ['#47424a', '#403b43'], marsh: ['#2b1e2d', '#251927', '#302232', '#221724'], camp: ['#4a3e4d'], water: ['#1b1728', '#1e1a2c'] },
    spawns: [['orcs', 22, 26], ['orcs', 40, 20], ['baphomet', 32, 8]],
    chests: [{ id: 'ch_gh_1', x: 18, y: 12, name: 'Chivalry Vault', zeny: 680, itemPool: ['hg_crest', 'ar_crusader', 'lh_tower'] }]
  },
  gef_fild07: {
    id: 'gef_fild07', code: 'gef_fild07', gx: 1, gy: 0, type: 'field',
    name: 'Geffen Orc Woods', recLv: 'Lv. 9–14', elem: 'Earth',
    sub: 'West Midgard Highlands · Orc Warriors & Orcish Vouchers',
    neighbors: { west: 'glast_01', east: 'mjolnir_02', south: 'geffen' },
    palette: { grass: ['#2c3b28', '#2f3f2b', '#293725', '#32432e'], path: ['#665740', '#5e503a'], marsh: ['#28362a', '#243126', '#2b3a2d', '#222e24'], camp: ['#63533d'], water: ['#1f3b4d', '#224154'] },
    spawns: [['orcs', 24, 24], ['orcs', 44, 18], ['wolves', 34, 34]],
    chests: [{ id: 'ch_gf_1', x: 48, y: 12, name: 'Orcish Supply Crate', zeny: 420, itemPool: ['rh_axe', 'rh_greatsword', 'am_necklace'] }]
  },
  mjolnir_02: {
    id: 'mjolnir_02', code: 'mjolnir_02', gx: 2, gy: 0, type: 'field',
    name: 'Mt. Mjolnir Foothills', recLv: 'Lv. 6–10', elem: 'Earth',
    sub: 'Northern Prontera Trail · Wolves & Sohees · Oridecon Deposits',
    neighbors: { west: 'gef_fild07', south: 'prontera' },
    palette: { grass: ['#31422c', '#35472f', '#2e3e29', '#384b32'], path: ['#706049', '#685943'], marsh: ['#2b382c', '#273328', '#2f3d30', '#253026'], camp: ['#6b5a3e'], water: ['#22455c', '#264b63'] },
    spawns: [['wolves', 20, 22], ['sohees', 40, 20], ['orcs', 32, 10]],
    chests: [{ id: 'ch_mj_1', x: 16, y: 12, name: 'Miner Ore Cache', zeny: 350, itemPool: ['hg_helm', 'ar_swordsman', 'lg_plate'] }]
  },

  // Row 1 (Central Heartland & Towns)
  geffen: {
    id: 'geffen', code: 'geffen', gx: 1, gy: 1, type: 'town',
    name: 'Geffen Magic City', recLv: 'Safe Town', elem: 'Neutral',
    sub: 'Tower of Magic · Mage Trader · Inn · Refinery · Job Hall',
    neighbors: { north: 'gef_fild07', west: 'glast_01', east: 'prontera', south: 'morocc' },
    palette: { grass: ['#35424f', '#394754', '#313d4a', '#3c4a59'], path: ['#7f7a8a', '#757080'], marsh: ['#454054', '#3f3a4d', '#4a4559', '#3c374a'], camp: ['#948ca3'], water: ['#2c5175', '#315980'] },
    npcs: [
      { id: 'gef_inn', name: 'Geffen Inn (Rest 50z)', x: 28, y: 18, action: 'inn', col: '#ffe9a8', skin: '#f0d0b8', hairStyle: 'long', hairCol: '#593a28', equips: { headgear: 'hg_mitre', armor: 'ar_acolyte', rightHand: 'rh_wand' } },
      { id: 'gef_trader', name: 'Magic Trader (Shop & Craft)', x: 18, y: 20, action: 'trader', col: '#7fd0ff', skin: '#e0b796', hairStyle: 'twin', hairCol: '#7b4ca8', equips: { headgear: 'hg_wizard', armor: 'ar_mage', rightHand: 'rh_staff' } },
      { id: 'gef_forge', name: 'Refiner & Card Master', x: 38, y: 20, action: 'forge', col: '#ffb36b', skin: '#b98363', hairStyle: 'spiky', hairCol: '#59281e', equips: { headgear: 'hg_bandana', armor: 'ar_swordsman', rightHand: 'rh_axe' } },
      { id: 'gef_job', name: 'Job Change Master', x: 28, y: 29, action: 'job', col: '#ffe08a', skin: '#cfa07e', hairStyle: 'noble', hairCol: '#8c6f39', equips: { headgear: 'hg_crown', armor: 'ar_crusader', rightHand: 'rh_excalibur' } }
    ],
    spawns: [], chests: []
  },
  prontera: {
    id: 'prontera', code: 'prontera', gx: 2, gy: 1, type: 'town',
    name: 'Prontera Capital', recLv: 'Safe Town', elem: 'Holy',
    sub: 'Royal Hub · Trader (Items/Equips/Sell) · Inn · Upgrades · Job Change · Tavern',
    neighbors: { north: 'mjolnir_02', west: 'geffen', east: 'izlude', south: 'prt_fild08' },
    palette: { grass: ['#394f33', '#3d5436', '#35492f', '#405839'], path: ['#8c8273', '#827869'], marsh: ['#4c5748', '#465042', '#525d4e', '#495445'], camp: ['#a89878'], water: ['#2b5b78', '#2f6280'] },
    npcs: [
      { id: 'prt_inn', name: 'Prontera Inn & Kafra (Rest 50z)', x: 28, y: 18, action: 'inn', col: '#ffe9a8', skin: '#f0d0b8', hairStyle: 'long', hairCol: '#593a28', equips: { headgear: 'hg_mitre', armor: 'ar_acolyte', rightHand: 'rh_wand' } },
      { id: 'prt_trader', name: 'Prontera Trader (Buy/Sell/Craft)', x: 16, y: 19, action: 'trader', col: '#7fd0ff', skin: '#e0b796', hairStyle: 'long', hairCol: '#3f5e78', equips: { headgear: 'hg_hat', armor: 'ar_archer', rightHand: 'rh_bow' } },
      { id: 'prt_forge', name: 'Hollgrehenn (+10 Upgrade & Cards)', x: 40, y: 19, action: 'forge', col: '#ffb36b', skin: '#b98363', hairStyle: 'spiky', hairCol: '#59281e', equips: { headgear: 'hg_bandana', armor: 'ar_swordsman', rightHand: 'rh_axe', leftHand: 'lh_buckler' } },
      { id: 'prt_job', name: 'Job Change Master (Job Lv.10)', x: 22, y: 30, action: 'job', col: '#ffe08a', skin: '#cfa07e', hairStyle: 'noble', hairCol: '#8c6f39', equips: { headgear: 'hg_crest', armor: 'ar_crusader', rightHand: 'rh_excalibur' } },
      { id: 'prt_tavern', name: 'Guild Tavern (Recruit Heroes)', x: 35, y: 30, action: 'tavern', col: '#8fe3a0', skin: '#cfa07e', hairStyle: 'noble', hairCol: '#8c6f39', equips: { headgear: 'hg_hat', armor: 'ar_mercenary', rightHand: 'rh_lute' } }
    ],
    spawns: [], chests: []
  },
  izlude: {
    id: 'izlude', code: 'izlude', gx: 3, gy: 1, type: 'town',
    name: 'Izlude Port Town', recLv: 'Safe Town', elem: 'Water',
    sub: 'Swordsman Association · Arena Harbor · Trader · Inn · Upgrades',
    neighbors: { west: 'prontera', south: 'prt_sewb1', east: 'payon' },
    palette: { grass: ['#364c45', '#3a524a', '#324740', '#3e574f'], path: ['#8a8275', '#80786b'], marsh: ['#455450', '#3f4d49', '#4a5955', '#3c4a46'], camp: ['#9e9585'], water: ['#235a7d', '#27638a'] },
    npcs: [
      { id: 'iz_inn', name: 'Harbor Inn (Rest 50z)', x: 28, y: 19, action: 'inn', col: '#ffe9a8', skin: '#f0d0b8', hairStyle: 'long', hairCol: '#593a28', equips: { headgear: 'hg_mitre', armor: 'ar_acolyte', rightHand: 'rh_wand' } },
      { id: 'iz_trader', name: 'Izlude Trader (Buy/Sell/Craft)', x: 18, y: 22, action: 'trader', col: '#7fd0ff', skin: '#e0b796', hairStyle: 'long', hairCol: '#3f5e78', equips: { headgear: 'hg_helm', armor: 'ar_swordsman', rightHand: 'rh_sword' } },
      { id: 'iz_job', name: 'Swordsman Job Master', x: 38, y: 22, action: 'job', col: '#ffe08a', skin: '#cfa07e', hairStyle: 'noble', hairCol: '#8c6f39', equips: { headgear: 'hg_crest', armor: 'ar_crusader', rightHand: 'rh_excalibur' } }
    ],
    spawns: [], chests: []
  },

  // Row 2 (South Fields & Payon Region)
  prt_fild08: {
    id: 'prt_fild08', code: 'prt_fild08', gx: 2, gy: 2, type: 'field',
    name: 'Prontera South Field', recLv: 'Lv. 1–3', elem: 'Water',
    sub: 'Classic Starter Block · Poring, Drops & Marin · 5–10m Respawn',
    neighbors: { north: 'prontera', east: 'prt_sewb1', south: 'moc_fild07' },
    palette: { grass: ['#354a2d', '#384f30', '#31452a', '#3b5332'], path: ['#7a684b', '#705f44'], marsh: ['#2b3f35', '#273a30', '#2f453a', '#24362d'], camp: ['#6b5a3e'], water: ['#20465e', '#234c66'] },
    spawns: [['porings', 20, 26], ['porings', 36, 32], ['porings', 44, 18]],
    chests: [{ id: 'ch_pf8_1', x: 14, y: 14, name: 'Novice Supply Box', zeny: 180, itemPool: ['hg_bandana', 'rh_sword', 'sh_boots'] }]
  },
  prt_sewb1: {
    id: 'prt_sewb1', code: 'prt_sewb1', gx: 3, gy: 2, type: 'dungeon',
    name: 'Prontera Culvert B1', recLv: 'Lv. 3–5', elem: 'Water',
    sub: 'Underground Sewers · Marin & Cave Wolves · 5–10m Respawn',
    neighbors: { north: 'izlude', west: 'prt_fild08', east: 'pay_fild01' },
    palette: { grass: ['#27332e', '#2a3731', '#242f2a', '#2d3b35'], path: ['#595248', '#504940'], marsh: ['#223029', '#1e2b25', '#26362e', '#1c2822'], camp: ['#595043'], water: ['#193342', '#1c3849'] },
    spawns: [['culvert_bugs', 22, 24], ['culvert_bugs', 38, 18], ['culvert_bugs', 42, 34]],
    chests: [{ id: 'ch_sb1_1', x: 48, y: 12, name: 'Culvert Relic Chest', zeny: 240, itemPool: ['lh_buckler', 'am_rosary', 'tr_belt'] }]
  },
  payon: {
    id: 'payon', code: 'payon', gx: 4, gy: 1, type: 'town',
    name: 'Payon Forest Town', recLv: 'Safe Town', elem: 'Earth',
    sub: 'Archer Village · Trader · Inn · Upgrades · Job Change · Tavern',
    neighbors: { west: 'izlude', south: 'pay_fild01' },
    palette: { grass: ['#2f422b', '#33472e', '#2b3d27', '#364b31'], path: ['#785e47', '#6e5640'], marsh: ['#34422f', '#2f3d2a', '#394734', '#2c3827'], camp: ['#8a6d52'], water: ['#224d63', '#26546c'] },
    npcs: [
      { id: 'pay_inn', name: 'Payon Inn (Rest 50z)', x: 28, y: 19, action: 'inn', col: '#ffe9a8', skin: '#f0d0b8', hairStyle: 'long', hairCol: '#593a28', equips: { headgear: 'hg_mitre', armor: 'ar_acolyte', rightHand: 'rh_wand' } },
      { id: 'pay_trader', name: 'Payon Trader (Buy/Sell/Craft)', x: 18, y: 21, action: 'trader', col: '#7fd0ff', skin: '#c58f6c', hairStyle: 'long', hairCol: '#4a2d18', equips: { headgear: 'hg_feather', armor: 'ar_archer', rightHand: 'rh_bow' } },
      { id: 'pay_forge', name: 'Payon Master Refiner', x: 38, y: 21, action: 'forge', col: '#ffb36b', skin: '#b98363', hairStyle: 'spiky', hairCol: '#59281e', equips: { headgear: 'hg_bandana', armor: 'ar_mercenary', rightHand: 'rh_axe' } },
      { id: 'pay_tavern', name: 'Payon Tavern (Recruit)', x: 28, y: 30, action: 'tavern', col: '#8fe3a0', skin: '#cfa07e', hairStyle: 'noble', hairCol: '#8c6f39', equips: { headgear: 'hg_hat', armor: 'ar_mercenary', rightHand: 'rh_lute' } }
    ],
    spawns: [], chests: []
  },
  pay_fild01: {
    id: 'pay_fild01', code: 'pay_fild01', gx: 4, gy: 2, type: 'field',
    name: 'Payon Forest Trail', recLv: 'Lv. 5–8', elem: 'Earth',
    sub: 'Bamboo Woods · Wolves & Shrine Sohees · Elder Branches',
    neighbors: { north: 'payon', west: 'prt_sewb1', south: 'pay_dun00' },
    palette: { grass: ['#283b29', '#2b402c', '#253626', '#2e442f'], path: ['#664f3b', '#5e4936'], marsh: ['#24332a', '#202e26', '#28382f', '#1d2922'], camp: ['#634d39'], water: ['#1d3b4f', '#204157'] },
    spawns: [['payon_woods', 22, 22], ['payon_woods', 40, 28], ['wolves', 30, 14]],
    chests: [{ id: 'ch_pf1_1', x: 48, y: 12, name: 'Hunter Cache', zeny: 360, itemPool: ['hg_feather', 'ar_archer', 'rh_bow'] }]
  },

  // Row 3 (South Desert & Deep Payon Cave)
  morocc: {
    id: 'morocc', code: 'morocc', gx: 1, gy: 2, type: 'town',
    name: 'Morroc Oasis Town', recLv: 'Safe Town', elem: 'Fire',
    sub: 'Desert Oasis · Assassin Trader · Inn · Upgrades · Tavern',
    neighbors: { north: 'geffen', east: 'moc_fild07' },
    palette: { grass: ['#786342', '#7d6745', '#735e3e', '#826b48'], path: ['#99835c', '#8f7954'], marsh: ['#635237', '#5c4c33', '#69573b', '#574830'], camp: ['#a89167'], water: ['#2b6885', '#307291'] },
    npcs: [
      { id: 'moc_inn', name: 'Oasis Inn (Rest 50z)', x: 28, y: 19, action: 'inn', col: '#ffe9a8', skin: '#f0d0b8', hairStyle: 'long', hairCol: '#593a28', equips: { headgear: 'hg_mitre', armor: 'ar_acolyte', rightHand: 'rh_wand' } },
      { id: 'moc_trader', name: 'Desert Merchant (Buy/Sell/Craft)', x: 18, y: 21, action: 'trader', col: '#7fd0ff', skin: '#b58669', hairStyle: 'spiky', hairCol: '#a8b2bd', equips: { headgear: 'hg_hood', armor: 'ar_thief', rightHand: 'rh_dagger' } },
      { id: 'moc_forge', name: 'Desert Smith (+10 Upgrades)', x: 38, y: 21, action: 'forge', col: '#ffb36b', skin: '#b98363', hairStyle: 'spiky', hairCol: '#59281e', equips: { headgear: 'hg_bandana', armor: 'ar_swordsman', rightHand: 'rh_axe' } }
    ],
    spawns: [], chests: []
  },
  moc_fild07: {
    id: 'moc_fild07', code: 'moc_fild07', gx: 2, gy: 3, type: 'field',
    name: 'Sograt Desert Dunes', recLv: 'Lv. 4–7', elem: 'Earth',
    sub: 'Arid Wastes · Desert Wolf Packs · Thief & Archer Gear',
    neighbors: { north: 'prt_fild08', west: 'morocc' },
    palette: { grass: ['#6e5939', '#735d3c', '#695536', '#78613f'], path: ['#8c754d', '#826c46'], marsh: ['#5c4a30', '#54442b', '#614e33', '#4f3f28'], camp: ['#7d6644'], water: ['#24566e', '#285e78'] },
    spawns: [['wolves', 22, 22], ['wolves', 38, 28], ['wolves', 44, 14]],
    chests: [{ id: 'ch_mf7_1', x: 14, y: 34, name: 'Caravan Strongbox', zeny: 320, itemPool: ['hg_hood', 'rh_dagger', 'tr_brooch'] }]
  },
  pay_dun00: {
    id: 'pay_dun00', code: 'pay_dun00', gx: 4, gy: 3, type: 'dungeon',
    name: 'Payon Cave 1F', recLv: 'Lv. 7–12', elem: 'Undead',
    sub: 'Haunted Shrine · Sohee Covens & ★ Moonlight Flower [MVP]',
    neighbors: { north: 'pay_fild01' },
    palette: { grass: ['#232736', '#262b3b', '#202431', '#292e40'], path: ['#52443d', '#4a3d37'], marsh: ['#1f2230', '#1b1e2b', '#232736', '#191b26'], camp: ['#4d3f39'], water: ['#182838', '#1b2d3f'] },
    spawns: [['sohees', 20, 26], ['sohees', 36, 30], ['moonlight', 48, 14]],
    chests: [{ id: 'ch_pd0_1', x: 18, y: 12, name: 'Shrine Reliquary', zeny: 480, itemPool: ['hg_wizard', 'ar_mage', 'rh_staff', 'lh_tome'] }]
  }
};

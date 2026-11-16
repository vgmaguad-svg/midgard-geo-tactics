// src/engine/game.js
// Core Engine for Midgard Geo-Tactics:
// - Classic Ragnarök Status Effects (Freeze, Stun, Poison, Lex Aeterna 2x Mark, Provoke, Blessing, Increase AGI)
// - Ragnarök Elemental Affinity Table (Water, Wind, Fire, Earth, Holy, Shadow, Undead, Poison) + Ice Shatter Combos
// - Starting Party of 4 Heroes in Basic Starter Gear + 5-10% Post-Battle Hero Join & Loot Drops
// - Massive 22x22 2.5D Multi-Elevation Isometric Grid + Interactive Camera Pan/Zoom

import {
  GEO_PANELS,
  ELEMENTS,
  getElementMultiplier,
  STATUS_DEFS,
  ROLE_BADGES,
  CONSUMABLE_ITEMS,
  MISC_ITEMS,
  CRAFT_RECIPES,
  PAPERDOLL_ITEMS,
  RO_CARDS,
  INITIAL_ROSTER,
  MONSTER_TEMPLATES,
  WORLD_ENCOUNTERS,
  MIDGARD_BLOCKS,
  MAX_JOB_LV,
  getHeroJobTree,
  getHeroAvailableSkills,
  getHeroActiveSkillsForCombat
} from '../data/database.js';
import {
  drawRoleBadge,
  drawStatusBadge,
  drawUnitSprite,
  drawGeoSymbolPixel,
  sh
} from '../render/paperdoll.js';

export const BATTLE_MAPS = {
  culvert: [
    '......................',
    '...v..............b...',
    '....v............bb...',
    '......#........#......',
    '........rrr...........',
    '...g....rrr....y......',
    '...gg.........yy......',
    '......#........#......',
    '..........vv..........',
    '....b.....vv.....r....',
    '....bb..........rr....',
    '..........yy..........',
    '......#........#......',
    '.....g..........b.....',
    '.....gg...rr...bb.....',
    '..........rr..........',
    '......#........#......',
    '....v............g....',
    '......................',
    '......................',
    '......................',
    '......................'
  ],
  shrine: [
    '......................',
    '.....g..........v.....',
    '.....gg........vv.....',
    '.......#......#.......',
    '..........bb..........',
    '...r......bb......y...',
    '...rr............yy...',
    '.......#......#.......',
    '.........vvv..........',
    '....g....vvv.....b....',
    '....gg..........bb....',
    '..........rr..........',
    '.......#..rr..#.......',
    '.....y..........g.....',
    '.....yy........gg.....',
    '..........bb..........',
    '.......#......#.......',
    '....r............v....',
    '......................',
    '......................',
    '......................',
    '......................'
  ],
  rampart: [
    '......................',
    '....r............b....',
    '....rr..........bb....',
    '......#........#......',
    '.........yyyy.........',
    '...g.....yyyy.....v...',
    '...gg............vv...',
    '......#..rrrr..#......',
    '.........rrrr.........',
    '...b..............r...',
    '...bb....gggg....rr...',
    '.........gggg.........',
    '......#........#......',
    '.........bbbb.........',
    '...v.....bbbb.....y...',
    '...vv............yy...',
    '......#........#......',
    '....g............r....',
    '......................',
    '......................',
    '......................',
    '......................'
  ]
};

function build22x22Elevation(type) {
  const grid = [];
  for (let y = 0; y < 22; y++) {
    const row = [];
    for (let x = 0; x < 22; x++) {
      let h = 1;
      if (type === 'rampart') {
        if (x >= 5 && x <= 16 && y >= 3 && y <= 17) h = 2;
        if (x >= 8 && x <= 13 && y >= 5 && y <= 14) h = 3;
        if ((x === 10 || x === 11) && (y === 8 || y === 9)) h = 4;
      } else if (type === 'shrine') {
        if ((x <= 4 || x >= 17) && y >= 2 && y <= 16) h = 2;
        if (x >= 7 && x <= 14 && y >= 6 && y <= 13) h = 2;
        if (x >= 9 && x <= 12 && y >= 8 && y <= 11) h = 3;
      } else {
        if (x >= 6 && x <= 15 && (y <= 6 || y >= 13)) h = 2;
        if (x >= 8 && x <= 13 && y >= 7 && y <= 12) h = 3;
      }
      row.push(h);
    }
    grid.push(row);
  }
  return grid;
}

export const ELEVATION_MAPS = {
  culvert: build22x22Elevation('culvert'),
  shrine: build22x22Elevation('shrine'),
  rampart: build22x22Elevation('rampart')
};

const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const ELEV_STEP_PX = 12;

export class MidgardGeoGame {
  constructor(canvas, uiCallbacks) {
    this.cv = canvas;
    this.ctx = canvas.getContext('2d');
    this.ui = uiCallbacks;

    this.CW = 1720;
    this.CH = 960;
    this.GW = 22;
    this.GH = 22;
    this.TW = 84;
    this.TH = 42;
    this.OX = 860;
    this.OY = 95;
    this.S = 3;

    this.bCam = {
      x: 0,
      y: 0,
      zoom: 0.92,
      followTurn: false,
      dragging: false,
      dragMoved: false,
      startX: 0,
      startY: 0
    };

    this.mode = 'battle';
    this.autoBattle = true;
    this.speed = 1;
    this.paused = false;
    this.started = true;
    this.instant = false;

    this.zeny = 650;
    this.oridecon = 2;
    this.elunium = 2;

    // 3-Tab Inventory: Items (Consumables), Equips (unlockedItems), Misc (Loot/Crafting/Ores)
    this.consumables = {
      pot_red: 5,
      pot_orange: 2,
      pot_blue: 2,
      item_panacea: 2
    };
    this.miscBag = {
      msc_jellopy: 3,
      msc_phracon: 2,
      msc_oridecon: 2,
      msc_elunium: 2
    };

    this.unlockedItems = new Set(
      Object.values(PAPERDOLL_ITEMS)
        .filter((it) => it.starter)
        .map((it) => it.id)
    );
    this.lootCounts = {};
    this.lastDroppedItems = [];
    this.lastDroppedMisc = [];
    this.lastDroppedCard = null;
    this.lastRecruitedHero = null;

    this.ownedCards = [{ ...RO_CARDS[0], count: 1 }];

    this.roster = structuredClone(INITIAL_ROSTER);
    this.roster.forEach((h) => this.recalcHero(h));

    this.units = [];
    this.geoSymbols = [];
    this.fx = [];
    this.floaters = [];
    this.timers = [];
    this.tweens = [];
    this.gt = 0;
    this.rt = 0;
    this.battleId = 0;
    this.result = null;
    this.current = null;
    this.selected = null;
    this.hover = null;
    this.turnCount = 0;
    this.bonusGauge = 25;
    this.bonusRank = 1;
    this.curEnc = WORLD_ENCOUNTERS.porings;
    this.MAP = BATTLE_MAPS.culvert.map((r) => r.split(''));
    this.HEIGHTS = ELEVATION_MAPS.culvert;
    this.manualResolve = null;

    this.AC = null;
    this.masterGain = null;
    this.noiseBuf = null;
    this.muted = false;

    this.WW = 64;
    this.WH = 48;
    this.WT = 48;
    this.currentZoneId = 'prontera';
    this.CAMP = { x: 28, y: 24 };
    this.wmap = new Uint8Array(this.WW * this.WH);
    this.wbase = new Uint8Array(this.WW * this.WH);
    this.wvar = new Uint8Array(this.WW * this.WH);
    this.mm = document.createElement('canvas');
    this.mm.width = this.WW * 3;
    this.mm.height = this.WH * 3;

    this.fade = 0;
    this.curMob = null;
    this.tombstones = [];
    this.mvpRespawnTimers = {}; // key -> remainingMs
    this.openedChests = new Set();
    this.zoneMobsState = {}; // zoneId -> array of mobs
    this.toastMsg = '';
    this.toastUntil = 0;
    this.camX = 0;
    this.camY = 0;
    this.lastStep = 0;
    this.clickMark = null;
    this.huntsCompleted = {};
    this.keys = {};

    this.seed = 20261116;
  }

  rnd() {
    this.seed = (this.seed + 0x6d2b79f5) | 0;
    let t = Math.imul(this.seed ^ (this.seed >>> 15), 1 | this.seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  start() {
    this.generateOpenWorld();
    this.initOpenWorldEntities();
    this.setupBattle(20261116, WORLD_ENCOUNTERS.porings);
    this.selected = this.units.find((u) => u.side === 'hero') || null;
    document.body.className = this.mode;
    this.bindEvents();
    this.ui.onSyncAll();
    if (this.mode === 'battle' && this.started) {
      this.runBattleLoop(this.battleId);
    }
  }

  resetBattleCamera() {
    this.bCam.x = 0;
    this.bCam.y = 0;
    this.bCam.zoom = 0.92;
  }

  // =========================================================================
  // 8-SLOT PAPERDOLL, RAGNARÖK SUB-STATS, SEPARATE BASE/JOB EXP & LOOT BAG
  // =========================================================================
  recalcHero(h) {
    const bonus = {
      str: 0, agi: 0, vit: 0, int: 0, dex: 0, luk: 0,
      atk: 0, matk: 0, def: 0, mdef: 0, spd: 0, hp: 0, crit: 0, hit: 0, flee: 0
    };

    for (const itemId of Object.values(h.equips || {})) {
      const item = PAPERDOLL_ITEMS[itemId];
      if (!item?.stats) continue;
      for (const [k, v] of Object.entries(item.stats)) {
        if (bonus[k] !== undefined) bonus[k] += v;
      }
    }

    for (const c of h.cards || []) {
      for (const [k, v] of Object.entries(c.stats || {})) {
        if (bonus[k] !== undefined) bonus[k] += v;
      }
    }

    // Apply Passive Skill Bonuses from 8-Skill (4+4) Split Job Trees
    for (const sk of getHeroAvailableSkills(h)) {
      const slv = h.skillLvs?.[sk.id] || 0;
      if (slv > 0 && sk.stat) {
        for (const [k, v] of Object.entries(sk.stat)) {
          if (bonus[k] !== undefined) bonus[k] += v * slv;
        }
      }
    }

    // Small Job Level mastery bonus (+1 to primary stats every 4 Job Levels)
    const jobBonus = Math.floor((h.jobLv || 1) / 4);
    if (h.magic) bonus.int += jobBonus;
    else bonus.str += jobBonus;

    h.bonus = bonus;

    const str = h.str + bonus.str;
    const agi = h.agi + bonus.agi;
    const vit = h.vit + bonus.vit;
    const int = h.int + bonus.int;
    const dex = h.dex + bonus.dex;
    const luk = h.luk + bonus.luk;

    const refW = h.refineWep || 0;
    const refA = h.refineArmor || 0;

    const prevRatio = h.maxhp ? h.hp / h.maxhp : 1;
    h.maxhp = Math.round(h.baseHp + (h.lv - 1) * 18 + vit * 5 + refA * 12 + bonus.hp);
    h.hp = Math.max(1, Math.min(h.maxhp, Math.round(h.maxhp * prevRatio)));
    h.maxsp = Math.round(45 + int * 5 + h.lv * 4);
    h.sp = h.maxsp;

    // Classic Ragnarök Online Combat Sub-Stats
    h.physAtk = Math.round(h.baseAtk + (h.lv - 1) * 1.5 + str * 1.45 + dex * 0.35 + bonus.atk + refW * 3);
    h.matk = Math.round((h.baseMatk || 10) + (h.lv - 1) * 1.5 + int * 1.65 + dex * 0.35 + bonus.matk + (h.magic ? bonus.atk * 0.6 : 0) + refW * 3);
    // `h.atk` is the active primary offense used by combat calculations (MATK for magic classes, ATK for physical classes)
    h.atk = h.magic ? h.matk : h.physAtk;

    h.def = Math.round(h.baseDef + (h.lv - 1) * 0.7 + vit * 0.75 + bonus.def + refA * 2);
    h.mdef = Math.round((h.baseMdef || 6) + (h.lv - 1) * 0.5 + int * 0.8 + vit * 0.25 + bonus.mdef + refA);
    h.hit = Math.round(175 + h.lv + dex * 2 + bonus.hit);
    h.flee = Math.round(100 + h.lv + agi * 2 + bonus.flee);
    h.spd = Math.round(h.baseSpd + agi * 0.85 + bonus.spd);
    h.aspd = Math.min(190, Math.round(150 + agi * 0.6 + dex * 0.2 + bonus.spd * 0.35));
    h.crit = Math.min(75, Math.round(2 + luk * 0.5 + bonus.crit));

    if (this.units) {
      const live = this.units.find((u) => u.roster === h);
      if (live) {
        live.maxhp = h.maxhp;
        live.hp = Math.min(live.maxhp, live.hp);
        live.atk = h.atk;
        live.matk = h.matk;
        live.def = h.def;
        live.mdef = h.mdef;
        live.spd = h.spd;
        live.equips = structuredClone(h.equips);
        live.hasFalcon = h.hasFalcon;
        live.hasCart = h.hasCart;
      }
    }
  }

  canPromoteJob(h) {
    return !!(h && !h.promoted && (h.jobLv || 1) >= (h.jobMaxLv || MAX_JOB_LV));
  }

  promoteHeroJob(h, pathKey = 'A') {
    if (!this.canPromoteJob(h)) {
      this.toast(`${h.name} needs Job Lv. ${MAX_JOB_LV} to change jobs!`);
      return false;
    }
    const tree = getHeroJobTree(h);
    const chosenPath = tree?.paths?.[pathKey] || tree?.paths?.A;
    if (!chosenPath) return false;

    const oldJob = h.job;
    h.job = chosenPath.name;
    h.jobPath = pathKey;
    h.promoted = true;
    h.jobLv = 1;
    h.jobMaxLv = MAX_JOB_LV;
    h.jobExp = 0;
    h.jobExpNext = 90;
    h.baseHp += 65;
    h.baseAtk += 8;
    h.baseMatk = (h.baseMatk || 10) + 8;
    h.baseDef += 5;
    h.baseMdef = (h.baseMdef || 6) + 5;
    h.baseSpd += 4;

    if (chosenPath.name === 'Tank Knight' || chosenPath.name === 'Paladin') h.role = 'Tank';
    else if (chosenPath.name === 'Battle Knight' || chosenPath.name === 'Battle Monk' || chosenPath.name === 'Dragon Knight') h.role = 'Fighter';
    else if (chosenPath.name === 'Sniper' || chosenPath.name === 'High Wizard') h.role = 'Ranged';
    else if (chosenPath.name === 'High Priest') h.role = 'Healer';

    if (chosenPath.name === 'Sniper') h.hasFalcon = true;
    if (chosenPath.name === 'Whitesmith') h.hasCart = true;

    if (!h.skillLvs) h.skillLvs = {};
    chosenPath.skills.forEach((sk) => {
      if (sk.reqJobLv <= 1 && !h.skillLvs[sk.id]) h.skillLvs[sk.id] = 1;
    });

    this.recalcHero(h);
    h.hp = h.maxhp;
    this.sfx('win');
    this.toast(`★ JOB CHANGE! ${h.name} advanced from ${oldJob} to ${h.job}!`);
    this.ui.onLog(`<b>★ 2nd Job Advancement!</b> ${h.name} reached Job Lv.${MAX_JOB_LV} and became a <b>${h.job}</b>!`, 'k');
    this.ui.onSyncAll();
    return true;
  }

  upgradeSkill(h, skillId) {
    if (!h || h.skillPts <= 0) return false;
    const sk = getHeroAvailableSkills(h).find((s) => s.id === skillId);
    if (!sk) return false;
    const unlocked = (h.jobLv || 1) >= (sk.reqJobLv || 1) || (h.promoted && sk.tier === 1);
    if (!unlocked) return false;
    if (!h.skillLvs) h.skillLvs = {};
    const cur = h.skillLvs[skillId] || 0;
    if (cur >= (sk.maxLv || 10)) return false;
    h.skillLvs[skillId] = cur + 1;
    h.skillPts--;
    this.recalcHero(h);
    this.sfx('buff');
    this.ui.onSyncAll();
    return true;
  }

  grantHeroExp(h, baseGain, jobGain) {
    h.baseExp = (h.baseExp || 0) + baseGain;
    h.jobExp = (h.jobExp || 0) + jobGain;
    let leveledBase = false;
    let leveledJob = false;

    while (h.baseExp >= (h.baseExpNext || 100) && h.lv < 99) {
      h.baseExp -= h.baseExpNext || 100;
      h.lv++;
      h.baseExpNext = Math.round(100 * Math.pow(1.20, h.lv - 1));
      h.statPts = (h.statPts || 0) + 3;
      leveledBase = true;
    }

    const maxJ = h.jobMaxLv || MAX_JOB_LV;
    while (h.jobExp >= (h.jobExpNext || 55) && h.jobLv < maxJ) {
      h.jobExp -= h.jobExpNext || 55;
      h.jobLv++;
      h.jobExpNext = Math.round(55 * Math.pow(1.08, h.jobLv - 1));
      h.skillPts = (h.skillPts || 0) + 1;
      leveledJob = true;
    }
    if (h.jobLv >= maxJ) h.jobExp = h.jobExpNext || 55;

    this.recalcHero(h);
    if (leveledBase || leveledJob) {
      h.hp = h.maxhp;
    }
    return { leveledBase, leveledJob };
  }

  getMaxWeight() {
    const strSum = this.getActiveParty().reduce((a, h) => a + (h.str || 5), 0);
    return 450 + strSum * 8;
  }

  getTotalWeight() {
    let w = 0;
    for (const [k, cnt] of Object.entries(this.consumables || {})) {
      if (cnt > 0) w += cnt * (CONSUMABLE_ITEMS[k]?.wt || 10);
    }
    for (const [k, cnt] of Object.entries(this.miscBag || {})) {
      if (cnt > 0) w += cnt * (MISC_ITEMS[k]?.wt || 8);
    }
    for (const itemId of this.unlockedItems || []) {
      const it = PAPERDOLL_ITEMS[itemId];
      if (it && !it.starter) w += (it.tier || 1) * 15 + 10;
    }
    return w;
  }

  isOverweight90() {
    return this.getTotalWeight() >= this.getMaxWeight() * 0.9;
  }

  getItemAvailability(itemId, excludeHeroId = null) {
    const it = PAPERDOLL_ITEMS[itemId];
    if (!it) return { totalOwned: 0, wornBy: [], availableCount: 0 };
    if (itemId.endsWith('_none')) {
      return { totalOwned: 99, wornBy: [], availableCount: 99 };
    }
    // Count initial copies owned by recruited starter heroes + any looted/bought/crafted copies
    const starterCopies = it.starter
      ? INITIAL_ROSTER.slice(0, 4).filter((r) => Object.values(r.equips || {}).includes(itemId)).length
      : 0;
    const totalOwned = starterCopies + (this.lootCounts[itemId] || (this.unlockedItems.has(itemId) && !it.starter ? 1 : 0));
    const wornBy = this.getRecruitedHeroes().filter(
      (r) => r.id !== excludeHeroId && r.equips?.[it.slot] === itemId
    );
    const availableCount = Math.max(0, totalOwned - wornBy.length);
    return { totalOwned, wornBy, availableCount };
  }

  equipItemOnHero(h, itemId) {
    const it = PAPERDOLL_ITEMS[itemId];
    if (!it || !h) return false;
    if (!this.isItemUnlocked(itemId)) return false;
    const avail = this.getItemAvailability(itemId, h.id);
    if (h.equips[it.slot] !== itemId && avail.availableCount <= 0) {
      const wearerNames = avail.wornBy.map((w) => w.name).join(', ');
      this.toast(`${it.name} is currently worn by ${wearerNames || 'another hero'}!`);
      return false;
    }
    h.equips[it.slot] = itemId;
    this.recalcHero(h);
    this.sfx('step');
    this.ui.onSyncAll();
    return true;
  }

  unequipSlotOnHero(h, slotKey) {
    if (!h || !slotKey) return false;
    const defaultStarterBySlot = {
      headgear: 'hg_none',
      armor: h.magic ? 'ar_novice_robe' : 'ar_cotton',
      rightHand: h.magic ? 'rh_wand' : h.role === 'Ranged' ? 'rh_shortbow' : 'rh_shortsword',
      leftHand: 'lh_none',
      legs: 'lg_cloth',
      shoes: 'sh_sandals',
      amulet: 'am_none',
      trinket: 'tr_none'
    };
    h.equips[slotKey] = defaultStarterBySlot[slotKey] || 'hg_none';
    this.recalcHero(h);
    this.sfx('step');
    this.ui.onSyncAll();
    return true;
  }

  // =========================================================================
  // 3-TAB INVENTORY: CONSUMABLES, MISC LOOT, TOWN TRADER & CRAFTING
  // =========================================================================
  useConsumableOnHero(itemId, h) {
    const def = CONSUMABLE_ITEMS[itemId];
    if (!def || !h || (this.consumables[itemId] || 0) <= 0) return false;

    this.consumables[itemId]--;
    if (def.hpRestore > 0) {
      h.hp = Math.min(h.maxhp, h.hp + def.hpRestore);
    }
    if (def.spRestore > 0) {
      h.sp = Math.min(h.maxsp || 60, (h.sp || 0) + def.spRestore);
    }
    const live = this.units?.find((u) => u.roster === h);
    if (live && live.alive) {
      live.hp = Math.min(live.maxhp, h.hp);
      if (def.cureAll && live.statuses) {
        live.statuses.poison = 0;
        live.statuses.freeze = 0;
        live.statuses.stun = 0;
      }
      this.float(live, `+${def.name}!`, '#8fe3a0', 14);
    }
    this.sfx('heal');
    this.toast(`Used ${def.name} on ${h.name}!`);
    this.ui.onSyncAll();
    return true;
  }

  buyConsumable(itemId, qty = 1) {
    const def = CONSUMABLE_ITEMS[itemId];
    if (!def) return false;
    const cost = def.buyPrice * qty;
    if (this.zeny < cost) {
      this.toast(`Not enough Zeny! Need ${cost}z.`);
      return false;
    }
    this.zeny -= cost;
    this.consumables[itemId] = (this.consumables[itemId] || 0) + qty;
    this.sfx('buff');
    this.toast(`Bought ${qty}× ${def.name} for ${cost}z.`);
    this.ui.onSyncAll();
    return true;
  }

  buyEquipInTown(itemId) {
    const it = PAPERDOLL_ITEMS[itemId];
    if (!it || !it.buyPrice) return false;
    if (this.zeny < it.buyPrice) {
      this.toast(`Need ${it.buyPrice}z to buy ${it.name}!`);
      return false;
    }
    this.zeny -= it.buyPrice;
    this.unlockLootItem(itemId);
    this.sfx('buff');
    this.toast(`Purchased [${it.name}] from Town Trader!`);
    this.ui.onSyncAll();
    return true;
  }

  sellMiscItem(itemId, qty = 1) {
    const def = MISC_ITEMS[itemId];
    const have = this.miscBag[itemId] || 0;
    if (!def || have <= 0) return false;
    const sellQty = Math.min(have, qty);
    this.miscBag[itemId] -= sellQty;
    if (itemId === 'msc_oridecon') this.oridecon = Math.max(0, this.oridecon - sellQty);
    if (itemId === 'msc_elunium') this.elunium = Math.max(0, this.elunium - sellQty);
    const gain = def.sellPrice * sellQty;
    this.zeny += gain;
    this.sfx('step');
    this.toast(`Sold ${sellQty}× ${def.name} for +${gain}z!`);
    this.ui.onSyncAll();
    return true;
  }

  sellAllLootMisc() {
    let totalGain = 0;
    let totalCount = 0;
    for (const [id, count] of Object.entries(this.miscBag)) {
      const def = MISC_ITEMS[id];
      if (!def || def.category !== 'Loot' || count <= 0) continue;
      totalGain += def.sellPrice * count;
      totalCount += count;
      this.miscBag[id] = 0;
    }
    if (totalCount === 0) {
      this.toast('No Loot items in Misc bag to sell!');
      return false;
    }
    this.zeny += totalGain;
    this.sfx('win');
    this.toast(`Sold ${totalCount} Loot items to Town Trader for +${totalGain}z!`);
    this.ui.onSyncAll();
    return true;
  }

  craftRecipe(recipeId) {
    const rec = CRAFT_RECIPES.find((r) => r.id === recipeId);
    if (!rec) return false;
    if (this.zeny < rec.zeny) {
      this.toast(`Need ${rec.zeny}z to craft!`);
      return false;
    }
    for (const [mId, req] of Object.entries(rec.mats)) {
      if ((this.miscBag[mId] || 0) < req) {
        this.toast(`Missing material: ${MISC_ITEMS[mId]?.name || mId}!`);
        return false;
      }
    }
    this.zeny -= rec.zeny;
    for (const [mId, req] of Object.entries(rec.mats)) {
      this.miscBag[mId] -= req;
      if (mId === 'msc_oridecon') this.oridecon = Math.max(0, this.oridecon - req);
      if (mId === 'msc_elunium') this.elunium = Math.max(0, this.elunium - req);
    }
    if (rec.outType === 'consumable') {
      this.consumables[rec.outId] = (this.consumables[rec.outId] || 0) + (rec.outQty || 1);
      this.toast(`Crafted ${rec.outQty}× ${CONSUMABLE_ITEMS[rec.outId]?.name}!`);
    } else {
      this.unlockLootItem(rec.outId);
      this.toast(`Crafted [${PAPERDOLL_ITEMS[rec.outId]?.name}]!`);
    }
    this.sfx('win');
    this.ui.onSyncAll();
    return true;
  }

  restAtInn(fee = 50) {
    const Z = this.getCurrentZone();
    if (Z.type === 'town' && this.zeny >= fee) {
      this.zeny -= fee;
    }
    this.roster.forEach((h) => {
      this.recalcHero(h);
      h.hp = h.maxhp;
      h.sp = h.maxsp;
    });
    this.sfx('heal');
    this.sfx('buff');
    this.toast(`Rested at ${Z.name} Inn! Party 100% HP & SP restored.`);
    this.ui.onSyncAll();
  }

  recruitHeroInTown(heroId) {
    const h = this.roster.find((r) => r.id === heroId);
    if (!h || h.recruited) return false;
    if (this.zeny < h.recruitCost) return false;

    this.zeny -= h.recruitCost;
    h.recruited = true;
    if (this.getActiveParty().length < 10) {
      h.deployed = true;
    }
    this.sfx('win');
    this.ui.onLog(`<b>Recruited in Prontera!</b> ${h.name} (${h.job}) joined your party!`, 'k');
    this.toast(`${h.name} (${h.job}) joined your squad!`);
    if (this.mode === 'battle') {
      this.setupBattle((Date.now() % 100000) | 0, this.curEnc);
      this.started = true;
      this.runBattleLoop(this.battleId);
    }
    this.ui.onSyncAll();
    return true;
  }

  getRecruitedHeroes() {
    return this.roster.filter((h) => h.recruited);
  }

  getUnrecruitedHeroes() {
    return this.roster.filter((h) => !h.recruited);
  }

  getActiveParty() {
    return this.roster.filter((h) => h.recruited && h.deployed).slice(0, 10);
  }

  isItemUnlocked(itemId) {
    return this.unlockedItems.has(itemId);
  }

  unlockLootItem(itemId) {
    this.unlockedItems.add(itemId);
    this.lootCounts[itemId] = (this.lootCounts[itemId] || 0) + 1;
  }

  // =========================================================================
  // AUDIO SYNTHESIZER
  // =========================================================================
  audioInit() {
    if (this.AC) {
      if (this.AC.state === 'suspended') this.AC.resume();
      return;
    }
    try {
      this.AC = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.AC.createGain();
      this.masterGain.gain.value = 0.38;
      this.masterGain.connect(this.AC.destination);
      this.noiseBuf = this.AC.createBuffer(1, (this.AC.sampleRate * 0.6) | 0, this.AC.sampleRate);
      const d = this.noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    } catch (e) {
      this.AC = null;
    }
  }

  tone(f0, f1, dur, type, vol, delay = 0) {
    if (!this.AC) return;
    const t = this.AC.currentTime + delay;
    const o = this.AC.createOscillator();
    const g = this.AC.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g);
    g.connect(this.masterGain);
    o.start(t);
    o.stop(t + dur + 0.03);
  }

  noise(dur, f0, f1, q, vol, type) {
    if (!this.AC) return;
    const t = this.AC.currentTime;
    const s = this.AC.createBufferSource();
    const f = this.AC.createBiquadFilter();
    const g = this.AC.createGain();
    s.buffer = this.noiseBuf;
    f.type = type;
    f.Q.value = q;
    f.frequency.setValueAtTime(f0, t);
    f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    s.connect(f);
    f.connect(g);
    g.connect(this.masterGain);
    s.start(t);
    s.stop(t + dur + 0.03);
  }

  sfx(name, arg = 1) {
    if (!this.AC || this.muted || this.instant || this.paused) return;
    try {
      switch (name) {
        case 'hit': this.noise(0.09, 900, 500, 1, 0.5, 'bandpass'); this.tone(170, 60, 0.11, 'triangle', 0.45); break;
        case 'crit': this.tone(1300, 1900, 0.13, 'square', 0.1); break;
        case 'slash': this.noise(0.13, 3200, 700, 2, 0.28, 'bandpass'); break;
        case 'arrow': this.noise(0.16, 2500, 5200, 5, 0.2, 'bandpass'); break;
        case 'cast': this.tone(320, 960, 0.26, 'sine', 0.18); this.tone(480, 1440, 0.26, 'sine', 0.08); break;
        case 'blast': this.noise(0.4, 900, 120, 0.7, 0.65, 'lowpass'); this.tone(130, 40, 0.32, 'sawtooth', 0.2); break;
        case 'sweep': this.noise(0.26, 400, 2400, 0.8, 0.45, 'lowpass'); this.tone(110, 55, 0.2, 'triangle', 0.35); break;
        case 'heal': this.tone(660, 660, 0.16, 'sine', 0.18); this.tone(990, 990, 0.28, 'sine', 0.16, 0.1); break;
        case 'buff': [440, 554, 659, 880].forEach((f, i) => this.tone(f, f, 0.15, 'triangle', 0.15, i * 0.07)); break;
        case 'taunt': this.tone(147, 110, 0.42, 'sawtooth', 0.18); this.tone(220, 165, 0.42, 'sawtooth', 0.1); break;
        case 'freeze': this.tone(1100, 480, 0.28, 'sine', 0.22); this.noise(0.18, 3500, 1800, 3, 0.2, 'bandpass'); break;
        case 'lex': this.tone(784, 1568, 0.32, 'triangle', 0.22); break;
        case 'die': this.tone(320, 70, 0.5, 'triangle', 0.28); this.noise(0.3, 500, 120, 0.7, 0.22, 'lowpass'); break;
        case 'chain': this.tone(640 + arg * 170, 860 + arg * 170, 0.09, 'square', 0.09); break;
        case 'step': this.noise(0.035, 260, 180, 1, 0.08, 'lowpass'); break;
        case 'start': this.tone(196, 196, 0.3, 'sawtooth', 0.14); this.tone(294, 294, 0.45, 'sawtooth', 0.14, 0.22); break;
        case 'win': [523, 659, 784, 1047].forEach((f, i) => this.tone(f, f, 0.3, 'triangle', 0.22, i * 0.15)); break;
        case 'lose': [392, 330, 262, 196].forEach((f, i) => this.tone(f, f, 0.36, 'triangle', 0.22, i * 0.2)); break;
      }
    } catch (e) {}
  }

  // =========================================================================
  // ASYNC TIMERS & TWEENS
  // =========================================================================
  wait(ms) {
    if (this.instant) return Promise.resolve();
    return new Promise((r) => this.timers.push({ at: this.gt + ms, r }));
  }

  tween(o, to, ms) {
    if (this.instant) {
      Object.assign(o, to);
      return Promise.resolve();
    }
    return new Promise((r) => {
      const from = {};
      for (const k in to) from[k] = o[k];
      this.tweens.push({ o, from, to, t0: this.gt, ms, r });
    });
  }

  tickBattle(dt) {
    this.gt += dt;
    for (let i = this.tweens.length - 1; i >= 0; i--) {
      const w = this.tweens[i];
      const p = Math.min(1, (this.gt - w.t0) / w.ms);
      for (const k in w.to) w.o[k] = w.from[k] + (w.to[k] - w.from[k]) * p;
      if (p >= 1) {
        this.tweens.splice(i, 1);
        w.r();
      }
    }
    for (let i = this.timers.length - 1; i >= 0; i--) {
      if (this.gt >= this.timers[i].at) {
        const t = this.timers[i];
        this.timers.splice(i, 1);
        t.r();
      }
    }
    this.fx = this.fx.filter((f) => f.manual || this.gt - f.t0 < f.dur);
    this.floaters = this.floaters.filter((f) => this.gt - f.t0 < f.dur);

    if (this.bCam.followTurn && this.current && !this.bCam.dragging) {
      const rawX = (this.current.px - this.current.py) * (this.TW / 2);
      const rawY = (this.current.px + this.current.py) * (this.TH / 2) - 360;
      this.bCam.x += (-rawX * 0.35 - this.bCam.x) * Math.min(1, dt * 0.004);
      this.bCam.y += (-rawY * 0.35 - this.bCam.y) * Math.min(1, dt * 0.004);
    }
  }

  // =========================================================================
  // 2.5D MULTI-ELEVATION ISOMETRIC PROJECTION (22x22 GRID + CAMERA ZOOM/PAN)
  // =========================================================================
  tileHeight(x, y) {
    const ix = Math.max(0, Math.min(this.GW - 1, Math.round(x)));
    const iy = Math.max(0, Math.min(this.GH - 1, Math.round(y)));
    return this.HEIGHTS[iy]?.[ix] || 1;
  }

  iso(x, y, customH = null) {
    const h = customH !== null ? customH : this.tileHeight(x, y);
    const z = this.bCam.zoom;
    const tw = this.TW * z;
    const th = this.TH * z;
    const elevPx = (h - 1) * ELEV_STEP_PX * z;
    return {
      x: this.OX + this.bCam.x + (x - y) * (tw / 2),
      y: this.OY + this.bCam.y + (x + y) * (th / 2) - elevPx
    };
  }

  dist(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  pScore(n) {
    const ch = this.MAP[n.y]?.[n.x];
    const geoVal = GEO_PANELS[ch]?.score || 0;
    const elevVal = (this.tileHeight(n.x, n.y) - 1) * 0.7;
    return geoVal + elevVal;
  }

  setupBattle(sd, enc) {
    this.battleId++;
    this.seed = sd | 0;
    this.units = [];
    this.geoSymbols = [];
    this.fx = [];
    this.floaters = [];
    this.timers = [];
    this.tweens = [];
    this.result = null;
    this.current = null;
    this.paused = false;
    this.turnCount = 0;
    this.bonusGauge = 25;
    this.bonusRank = 1;
    this.manualResolve = null;

    this.curEnc = enc || this.curEnc;
    const mapKey = this.curEnc.map || 'culvert';
    const rawMap = BATTLE_MAPS[mapKey] || BATTLE_MAPS.culvert;
    this.MAP = rawMap.map((row) => row.split(''));
    this.HEIGHTS = ELEVATION_MAPS[mapKey] || ELEVATION_MAPS.culvert;

    const symbolCandidates = [];
    for (let y = 3; y < this.GH - 3; y++) {
      for (let x = 4; x < this.GW - 4; x++) {
        const ch = this.MAP[y][x];
        if (GEO_PANELS[ch]) symbolCandidates.push({ x, y, ch });
      }
    }
    const geoKeys = Object.keys(GEO_PANELS);
    if (symbolCandidates.length >= 3) {
      const picks = [
        symbolCandidates[0],
        symbolCandidates[Math.floor(symbolCandidates.length * 0.48)],
        symbolCandidates[symbolCandidates.length - 1]
      ];
      picks.forEach((sc, idx) => {
        const nextKey = geoKeys[(geoKeys.indexOf(sc.ch) + 1) % geoKeys.length];
        const symDef = GEO_PANELS[nextKey];
        this.geoSymbols.push({
          id: `sym_${idx}`,
          name: `${symDef.name} Symbol`,
          symbolColorKey: nextKey,
          col: symDef.col,
          x: sc.x,
          y: sc.y,
          hp: 75,
          maxhp: 75,
          alive: true
        });
      });
    }

    const HPOS = [
      [6, 12], [4, 14], [3, 12], [5, 15],
      [6, 9], [6, 16], [4, 10], [3, 16], [2, 14], [4, 18]
    ];
    const activeParty = this.getActiveParty();
    activeParty.forEach((h, i) => {
      this.recalcHero(h);
      const pos = HPOS[i % HPOS.length];
      const u = this.mkUnit('hero', h.name, h.job, h.role, pos[0], pos[1], {
        hp: Math.max(1, Math.min(h.maxhp, h.hp)),
        maxhp: h.maxhp,
        atk: h.atk,
        def: h.def,
        spd: h.spd,
        move: h.move,
        range: h.range,
        jump: h.jump || 2,
        magic: h.magic,
        elem: h.elem || 'Neutral',
        skills: (() => {
          const act = getHeroActiveSkillsForCombat(h);
          return act.length ? act : structuredClone(h.skills || []);
        })(),
        equips: structuredClone(h.equips),
        skin: h.skin,
        hairStyle: h.hairStyle,
        hairCol: h.hairCol,
        hasFalcon: h.hasFalcon,
        hasCart: h.hasCart,
        roster: h,
        rosterId: h.id,
        scale: 1.0
      });
      if (!this.selected) this.selected = u;
    });

    const FRONT = [
      [12, 7], [13, 10], [14, 6], [14, 12],
      [11, 9], [15, 8], [13, 13], [15, 5]
    ];
    const BACK = [
      [16, 7], [17, 10], [16, 12], [18, 8], [17, 5], [18, 11]
    ];
    for (const [mKey, count] of this.curEnc.foes) {
      const T = MONSTER_TEMPLATES[mKey];
      for (let i = 0; i < count; i++) {
        const rear = T.range > 1 || T.role === 'Boss';
        const p = rear ? (BACK.shift() || FRONT.shift()) : (FRONT.shift() || BACK.shift());
        this.mkUnit('foe', T.name + (count > 1 ? ` ${i + 1}` : ''), mKey, T.role, p[0], p[1], {
          hp: T.hp,
          maxhp: T.hp,
          atk: T.atk,
          def: T.def,
          spd: T.spd,
          move: T.move,
          range: T.range,
          jump: 2,
          magic: T.magic,
          elem: T.elem || 'Neutral',
          skills: T.skill ? [structuredClone(T.skill)] : [],
          spriteKind: T.spriteKind,
          col: T.col,
          leafCol: T.leafCol,
          maneCol: T.maneCol,
          skin: T.skin,
          hairStyle: T.hairStyle,
          hairCol: T.hairCol,
          equips: T.equips ? structuredClone(T.equips) : null,
          scale: T.scale || 1.0
        });
      }
    }

    if (!this.instant) {
      this.ui.onClearLog();
      this.ui.onHideReport();
      this.ui.onSyncAll();
    }
  }

  mkUnit(side, name, job, role, x, y, props) {
    const skills = props.skills || [];
    const cds = {};
    skills.forEach((sk) => {
      cds[sk.id || sk.n] = 0;
    });

    const u = {
      id: this.units.length,
      side,
      name,
      job,
      role,
      elem: props.elem || 'Neutral',
      x,
      y,
      px: x,
      py: y,
      hp: props.hp,
      maxhp: props.maxhp,
      atk: props.atk,
      def: props.def,
      spd: props.spd,
      move: props.move,
      range: props.range,
      jump: props.jump || 2,
      magic: !!props.magic,
      skills,
      skill: skills[0] || null,
      cds,
      equips: props.equips || {},
      spriteKind: props.spriteKind || 'human',
      col: props.col,
      leafCol: props.leafCol,
      maneCol: props.maneCol,
      skin: props.skin,
      hairStyle: props.hairStyle,
      hairCol: props.hairCol,
      hasFalcon: !!props.hasFalcon,
      hasCart: !!props.hasCart,
      roster: props.roster || null,
      rosterId: props.rosterId || null,
      meter: Math.floor(this.rnd() * 300),
      // Classic Ragnarök Status Effects & Buff Timers
      statuses: {
        freeze: 0,
        stun: 0,
        poison: 0,
        lex: 0,
        provoke: 0,
        blessing: 0,
        agi: 0
      },
      taunt: null,
      alive: true,
      gone: false,
      boss: role === 'Boss',
      scale: props.scale || 1,
      face: side === 'hero' ? 1 : -1,
      pose: 'idle',
      poseT: 0,
      flash: 0,
      alpha: 1,
      dmg: 0,
      healed: 0,
      taken: 0,
      kills: 0
    };
    this.units.push(u);
    return u;
  }

  // =========================================================================
  // 2.5D ELEVATION REACHABILITY, STATUS EFFECTS & ELEMENTAL COMBAT
  // =========================================================================
  occ(x, y) {
    return this.units.find((u) => u.alive && u.x === x && u.y === y);
  }

  symAt(x, y) {
    return this.geoSymbols.find((s) => s.alive && s.x === x && s.y === y);
  }

  blocked(x, y) {
    return x < 0 || y < 0 || x >= this.GW || y >= this.GH || this.MAP[y][x] === '#' || !!this.symAt(x, y);
  }

  effectiveRange(u, atX = u.x, atY = u.y) {
    const h = this.tileHeight(atX, atY);
    const highGroundBonus = u.range > 2 && h >= 2 ? 1 : 0;
    return u.range + highGroundBonus;
  }

  crowdPenalty(u, tile) {
    let pen = 0;
    for (const other of this.units) {
      if (!other.alive || other === u) continue;
      const d = this.dist(tile, other);
      if (d === 1) {
        pen += u.range > 2 || u.role === 'Healer' ? 16 : 6;
      } else if (d === 2 && (u.range > 2 || u.role === 'Healer')) {
        pen += 5;
      }
    }
    return pen;
  }

  reach(u) {
    const seen = new Map();
    const q = [{ x: u.x, y: u.y, d: 0, prev: null, occ: false }];
    seen.set(u.y * this.GW + u.x, q[0]);
    for (let i = 0; i < q.length; i++) {
      const c = q[i];
      if (c.d >= u.move) continue;
      const curH = this.tileHeight(c.x, c.y);
      for (const [dx, dy] of DIRS) {
        const nx = c.x + dx;
        const ny = c.y + dy;
        const k = ny * this.GW + nx;
        if (this.blocked(nx, ny) || seen.has(k)) continue;
        const nextH = this.tileHeight(nx, ny);
        if (Math.abs(nextH - curH) > (u.jump || 2)) continue;

        const o = this.occ(nx, ny);
        if (o && o.side !== u.side) continue;
        const n = { x: nx, y: ny, d: c.d + 1, prev: c, occ: !!o };
        seen.set(k, n);
        q.push(n);
      }
    }
    return q.filter((n) => !n.occ);
  }

  field(t) {
    const f = new Array(this.GW * this.GH).fill(999);
    const q = [{ x: t.x, y: t.y }];
    f[t.y * this.GW + t.x] = 0;
    for (let i = 0; i < q.length; i++) {
      const c = q[i];
      for (const [dx, dy] of DIRS) {
        const nx = c.x + dx;
        const ny = c.y + dy;
        if (this.blocked(nx, ny) || f[ny * this.GW + nx] < 999) continue;
        f[ny * this.GW + nx] = f[c.y * this.GW + c.x] + 1;
        q.push({ x: nx, y: ny });
      }
    }
    return f;
  }

  face(u, t) {
    const s = (t.x - u.x) - (t.y - u.y);
    if (s) u.face = Math.sign(s);
  }

  topOf(u) {
    const h = this.tileHeight(u.px, u.py);
    const p = this.iso(u.px, u.py, h);
    const z = this.bCam.zoom;
    return {
      x: p.x,
      y: p.y - (u.spriteKind === 'slime' || u.spriteKind === 'wolf' ? 18 : 30) * this.S * (u.scale || 1) * z
    };
  }

  float(u, text, col, size = 17, lift = 0) {
    if (this.instant) return;
    const p = this.topOf(u);
    this.floaters.push({
      text,
      col,
      size,
      x: p.x + (this.rnd() * 22 - 11),
      y: p.y - lift - 6,
      t0: this.gt,
      dur: 1020
    });
  }

  ring(u, col, big = 1) {
    if (!this.instant) {
      this.fx.push({ type: 'ring', x: u.x, y: u.y, col, t0: this.gt, dur: 520, r: big });
    }
  }

  burst(u, col, n = 8) {
    if (this.instant) return;
    const p = this.topOf(u);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * 6.28;
      const v = 40 + Math.random() * 90;
      this.fx.push({
        type: 'spark',
        x: p.x,
        y: p.y + 30,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v - 40,
        col,
        t0: this.gt,
        dur: 380 + Math.random() * 200
      });
    }
  }

  slashFx(t, col = '#ffffff') {
    if (!this.instant) {
      const p = this.topOf(t);
      this.fx.push({
        type: 'slash',
        x: p.x,
        y: p.y + 34,
        col,
        t0: this.gt,
        dur: 200,
        a: Math.random() * 1.2 - 0.6
      });
    }
  }

  // Inflict a Ragnarök Status Effect or Buff on target `t`
  inflictStatus(src, t, statusId, turns = 2) {
    if (!t.alive || !statusId) return false;
    const def = STATUS_DEFS[statusId];
    if (!def) return false;

    // Classic RO rule: Lex Aeterna cannot be applied to a currently Frozen unit
    if (statusId === 'lex' && t.statuses.freeze > 0) return false;

    // Bosses have 40% resistance to Freeze/Stun, but always take Lex Aeterna / Poison / Provoke
    if (t.boss && (statusId === 'freeze' || statusId === 'stun') && this.rnd() < 0.4) {
      this.float(t, 'RESIST!', '#9ca3af', 13, 16);
      return false;
    }

    t.statuses[statusId] = Math.max(t.statuses[statusId] || 0, turns);
    if (statusId === 'freeze') {
      this.sfx('freeze');
      this.burst(t, '#9ad4ff', 8);
      this.float(t, 'FROZEN! (Water)', '#7fd0ff', 16, 18);
      this.ui.onLog(`<b>${t.name}</b> is <b>FROZEN</b> in solid ice (Water property)!`, 'h');
    } else if (statusId === 'stun') {
      this.sfx('crit');
      this.float(t, 'STUNNED!', '#ffd45e', 16, 18);
      this.ui.onLog(`<b>${t.name}</b> is <b>STUNNED</b>!`, 'h');
    } else if (statusId === 'poison') {
      this.burst(t, '#7c4d9c', 6);
      this.float(t, 'POISONED!', '#a87bd9', 15, 16);
      this.ui.onLog(`<b>${t.name}</b> is <b>POISONED</b> (-10% HP/turn & -20% DEF)!`, 'h');
    } else if (statusId === 'lex') {
      this.sfx('lex');
      this.ring(t, '#ffe08a', 1.4);
      this.float(t, 'LEX AETERNA (2x)!', '#ffe08a', 16, 20);
      this.ui.onLog(`<b>${src ? src.name : 'Priest'}</b> marked <b>${t.name}</b> with <b>Lex Aeterna (Next Hit 2x DMG)</b>!`, 'k');
    }
    return true;
  }

  applyDmg(src, t, d, crit, col) {
    t.hp -= d;
    t.taken += d;
    if (src) src.dmg += d;
    this.float(t, (crit ? 'CRIT ' : '') + d, col || (crit ? '#ffd45e' : t.side === 'hero' ? '#ff8a7a' : '#ffffff'), crit ? 22 : 16);
    this.sfx('hit');
    if (crit) this.sfx('crit');
    if (!this.instant) {
      t.flash = 1;
      this.tween(t, { flash: 0 }, 240);
    }
    if (t.hp <= 0) {
      t.hp = 0;
      t.alive = false;
      if (src) src.kills++;
      this.sfx('die');
      this.addBonusGauge(t.boss ? 45 : 14);
      this.ui.onLog(`<b>${t.name}</b> falls.`, t.side === 'hero' ? 'f' : 'k');
      if (this.instant) {
        t.gone = true;
      } else {
        t.pose = 'dead';
        t.poseT = 0;
        this.tween(t, { alpha: 0, poseT: 1 }, 700).then(() => {
          t.gone = true;
        });
      }
    }
  }

  damage(src, t, mult, skillObj = null) {
    const sk = skillObj || src.skill;
    const lvBonus = 1 + ((sk?.lv || 1) - 1) * 0.05;
    const srcH = this.tileHeight(src.x, src.y);
    const tgtH = this.tileHeight(t.x, t.y);
    const elevMult = srcH > tgtH ? 1.15 : 1.0;
    if (srcH > tgtH && this.rnd() < 0.45) {
      this.float(src, 'HIGH GROUND!', '#e6c877', 13, 18);
    }

    // 1. Determine Attack Element & Target Element (Frozen targets become Water property!)
    const wepElem = PAPERDOLL_ITEMS[src.equips?.rightHand]?.elem;
    const atkElem = sk?.elem || wepElem || src.elem || 'Neutral';
    const wasFrozen = (t.statuses?.freeze || 0) > 0;
    const defElem = wasFrozen ? 'Water' : t.elem || 'Neutral';
    const elemMult = getElementMultiplier(atkElem, defElem);

    // 2. Attacker Blessing (+25% ATK/MATK) & Ember Geo Panel (+25% ATK)
    const blessMult = (src.statuses?.blessing || 0) > 0 ? 1.25 : 1.0;
    const geoAtkMult = this.MAP[src.y]?.[src.x] === 'r' ? 1.25 : 1.0;
    let d = src.atk * mult * lvBonus * elevMult * elemMult * blessMult * geoAtkMult;

    // 3. Target DEF Modifiers (Poison -20%, Provoke -20%, Freeze -25%, Agi +15%, Void Geo -20%)
    let defMod = 1.0;
    if ((t.statuses?.poison || 0) > 0) defMod *= 0.8;
    if ((t.statuses?.provoke || 0) > 0) defMod *= 0.8;
    if (wasFrozen) defMod *= 0.75;
    if ((t.statuses?.agi || 0) > 0) defMod *= 1.15;
    if (this.MAP[t.y]?.[t.x] === 'v') defMod *= 0.8;

    d *= 100 / (100 + t.def * 1.5 * defMod);
    if (this.MAP[t.y]?.[t.x] === 'b') d *= 0.75;

    // 4. Critical Hit (Stunned targets take +10% extra crit chance)
    const critChance = 0.14 + ((t.statuses?.stun || 0) > 0 ? 0.12 : 0);
    const crit = this.rnd() < critChance;
    if (crit) {
      d *= 1.5;
      if (src.hasFalcon) this.float(t, 'BLITZ BEAT!', '#ffd45e', 14, 22);
    }

    // 5. LEX AETERNA DOUBLE DAMAGE MARK (2.0x Damage & Consumes Mark!)
    let lexTriggered = false;
    if ((t.statuses?.lex || 0) > 0) {
      d *= 2.0;
      t.statuses.lex = 0;
      lexTriggered = true;
    }

    d = Math.max(1, Math.round(d * (0.9 + this.rnd() * 0.2)));

    // Elemental Weakness / Ice Shatter / Lex Aeterna Visual Callouts
    if (wasFrozen && atkElem === 'Wind') {
      t.statuses.freeze = 0;
      this.burst(t, '#9ad4ff', 10);
      this.float(t, `ICE SHATTER! ${elemMult}x`, '#7fd0ff', 16, 24);
      this.ui.onLog(`<b>ICE SHATTER COMBO!</b> ${src.name}'s Wind attack shattered Frozen ${t.name} for <b>1.75x</b> damage!`, 'k');
    } else if (wasFrozen) {
      t.statuses.freeze = 0; // Any hit breaks the ice after taking damage
    } else if (elemMult >= 1.5) {
      this.float(t, `${atkElem.toUpperCase()} WEAKNESS!`, ELEMENTS[atkElem]?.col || '#ffe08a', 14, 20);
    }

    if (lexTriggered) {
      this.ring(t, '#ffe08a', 1.7);
      this.float(t, `LEX AETERNA 2x!`, '#ffe08a', 18, 28);
    }

    this.applyDmg(src, t, d, crit, lexTriggered ? '#ffe08a' : null);

    // 6. Roll Skill Status Effect Infliction (Freeze, Stun, Poison, Lex Aeterna)
    if (t.alive && sk?.status && this.rnd() < (sk.statusChance || 0.5)) {
      const dur = sk.status === 'poison' || sk.status === 'lex' ? 3 : 1;
      this.inflictStatus(src, t, sk.status, dur);
    }

    for (const sym of this.geoSymbols) {
      if (sym.alive && this.dist(sym, t) <= 1) {
        this.damageGeoSymbol(src, sym, Math.round(d * 0.85), 1);
      }
    }
    return d;
  }

  async applyKnockback(src, t) {
    if (!t.alive) return;
    const dx = Math.sign(t.x - src.x);
    const dy = Math.sign(t.y - src.y);
    const nx = t.x + (dx || 0);
    const ny = t.y + (dx ? 0 : dy || 1);

    const curH = this.tileHeight(t.x, t.y);
    const nextH = this.tileHeight(nx, ny);
    const hitWallOrUnit = this.blocked(nx, ny) || !!this.occ(nx, ny) || nextH > curH;

    if (hitWallOrUnit) {
      const crushDmg = Math.max(12, Math.round(src.atk * 0.45));
      this.float(t, `WALL CRUSH! -${crushDmg}`, '#ff9f59', 15, 18);
      this.applyDmg(src, t, crushDmg, false, '#ff9f59');
    } else {
      t.x = nx;
      t.y = ny;
      this.float(t, 'KNOCKBACK!', '#7fd0ff', 14, 16);
      await this.tween(t, { px: nx, py: ny }, 130);
    }
  }

  damageGeoSymbol(src, sym, amt, chainDepth = 1) {
    if (!sym.alive) return;
    sym.hp -= amt;
    if (sym.hp <= 0) {
      sym.alive = false;
      this.sfx('blast');
      const panelColorKey = this.MAP[sym.y]?.[sym.x];
      const newColorKey = sym.symbolColorKey;

      let count = 0;
      const chainedSymbols = [];
      for (let y = 0; y < this.GH; y++) {
        for (let x = 0; x < this.GW; x++) {
          if (this.MAP[y][x] === panelColorKey) {
            count++;
            this.MAP[y][x] = chainDepth === 1 ? newColorKey : '.';
            this.fx.push({ type: 'ring', x, y, col: sym.col, t0: this.gt, dur: 650, r: 1.35 });

            const victim = this.occ(x, y);
            if (victim && victim.side === 'foe') {
              const gDmg = Math.max(28, Math.round(victim.maxhp * (0.18 + chainDepth * 0.06)));
              this.applyDmg(src, victim, gDmg, true, '#7fd0ff');
            }

            const otherSym = this.geoSymbols.find((s) => s.alive && s.x === x && s.y === y);
            if (otherSym) chainedSymbols.push(otherSym);
          }
        }
      }

      this.addBonusGauge(35 * chainDepth + count * 2);
      this.ui.onLog(
        `<b>${chainDepth}x GEO CHAIN CASCADE!</b> ${sym.name} converted ${count} tiles (Bonus Gauge Lv.${this.bonusRank})!`,
        'k'
      );

      for (const nextSym of chainedSymbols) {
        this.damageGeoSymbol(src, nextSym, 9999, chainDepth + 1);
      }
      this.ui.onSyncAll();
    }
  }

  addBonusGauge(pts) {
    this.bonusGauge += pts;
    while (this.bonusGauge >= 100 && this.bonusRank < 9) {
      this.bonusGauge -= 100;
      this.bonusRank++;
    }
    if (this.bonusRank >= 9) this.bonusGauge = 100;
  }

  heal(t, amt, src) {
    const a = Math.min(amt, t.maxhp - t.hp);
    t.hp += a;
    if (src) src.healed += a;
    // Sanctuary Heal also cleanses Poison & Stun!
    if (t.statuses) {
      t.statuses.poison = 0;
      t.statuses.stun = 0;
    }
    this.float(t, '+' + a, '#8fe3a0', 17);
    this.burst(t, '#8fe3a0', 6);
    this.sfx('heal');
  }

  async moveTo(u, n) {
    if (!n || n.d === 0) return;
    const path = [];
    for (let c = n; c.prev; c = c.prev) path.unshift(c);
    u.x = n.x;
    u.y = n.y;
    u.pose = 'walk';
    let px = u.px;
    let py = u.py;
    for (const s of path) {
      const sd = (s.x - px) - (s.y - py);
      if (sd) u.face = Math.sign(sd);
      this.sfx('step');
      await this.tween(u, { px: s.x, py: s.y }, 125);
      px = s.x;
      py = s.y;
    }
    u.pose = 'idle';
  }

  async strike(u, t, mult, quick = false, skillObj = null) {
    this.face(u, t);
    const rhId = u.equips?.rightHand || 'rh_shortsword';
    const W = PAPERDOLL_ITEMS[rhId]?.style || 'sword';
    const sk = skillObj || u.skill;
    const elemCol = ELEMENTS[sk?.elem || u.elem]?.col || '#8fd3ff';

    if (u.magic && !quick) {
      u.pose = 'cast';
      this.burst(u, elemCol, 5);
      this.sfx('cast');
      await this.wait(210);
      const o = { type: 'orb', manual: true, x: u.x, y: u.y, col: elemCol };
      if (!this.instant) this.fx.push(o);
      await this.tween(o, { x: t.x, y: t.y }, 65 + 34 * this.dist(u, t));
      o.manual = false;
      o.t0 = -1e9;
      this.damage(u, t, mult, sk);
      this.burst(t, elemCol, 10);
      await this.wait(140);
      u.pose = 'idle';
    } else if (W === 'bow' && !quick) {
      u.pose = 'attack';
      u.poseT = 0;
      await this.tween(u, { poseT: 0.6 }, 155);
      const o = { type: 'arrow', manual: true, x: u.x, y: u.y, tx: t.x, ty: t.y };
      if (!this.instant) this.fx.push(o);
      this.sfx('arrow');
      await this.tween(o, { x: t.x, y: t.y }, 55 + 28 * this.dist(u, t));
      o.manual = false;
      o.t0 = -1e9;
      this.damage(u, t, mult, sk);
      this.slashFx(t, elemCol);
      await this.tween(u, { poseT: 1 }, 110);
      u.pose = 'idle';
    } else {
      const dx = t.x - u.x;
      const dy = t.y - u.y;
      const L = Math.hypot(dx, dy) || 1;
      const k = Math.min(L - 0.55, 0.45 + (L - 1) * 0.6);
      u.pose = 'attack';
      u.poseT = 0;
      this.sfx('slash');
      await this.tween(u, { poseT: 0.55, px: u.x + (dx / L) * k, py: u.y + (dy / L) * k }, quick ? 100 : 145);
      this.damage(u, t, mult, sk);
      this.slashFx(t);
      await this.tween(u, { poseT: 1, px: u.x, py: u.y }, quick ? 110 : 165);
      u.pose = 'idle';
    }
  }

  async chain(u, t) {
    if (!t.alive) return;
    const helpers = this.units
      .filter((a) => a.alive && a.side === u.side && a !== u && (a.statuses?.freeze || 0) <= 0 && (a.statuses?.stun || 0) <= 0 && this.dist(a, t) === 1)
      .slice(0, 3);
    let n = 0;
    for (const h of helpers) {
      if (!t.alive) break;
      n++;
      this.float(h, `CHAIN x${n + 1}`, '#7fd0ff', 14, 14);
      this.sfx('chain', n);
      await this.strike(h, t, 0.42 * (1 + 0.15 * n), true, null);
    }
    if (n > 0) this.addBonusGauge(n * 6);
  }

  async shout(u, label, col, snd) {
    this.float(u, label, '#ffe9a8', 15, 16);
    this.sfx(snd);
    u.pose = 'cast';
    this.ring(u, col, 1.6);
    this.burst(u, col, 8);
    await this.wait(320);
    u.pose = 'idle';
  }

  isSkillReady(u, sk) {
    if (!sk) return false;
    return (u.cds?.[sk.id || sk.n] || 0) <= 0;
  }

  putSkillOnCooldown(u, sk) {
    if (!sk || !u.cds) return;
    u.cds[sk.id || sk.n] = sk.cd || 3;
  }

  // Chooses the best ready offensive skill for `u` against target `t` (evaluates Ice Shatter, Elemental Weakness & Statuses!)
  pickBestOffensiveSkill(u, t) {
    const readySkills = (u.skills || []).filter(
      (sk) => this.isSkillReady(u, sk) && ['strike', 'blast', 'sweep', 'knockback'].includes(sk.type)
    );
    if (!readySkills.length) return null;

    const tgtElem = (t.statuses?.freeze || 0) > 0 ? 'Water' : t.elem || 'Neutral';
    let bestSk = readySkills[0];
    let bestScore = -999;

    for (const sk of readySkills) {
      const elemMult = getElementMultiplier(sk.elem || u.elem, tgtElem);
      let sc = sk.pow * elemMult * 10;
      if ((t.statuses?.freeze || 0) > 0 && sk.elem === 'Wind') sc += 30; // Prioritize Jupitel Thunder / Gale Strafe on Frozen target!
      if (sk.status === 'lex' && (t.statuses?.lex || 0) <= 0 && (t.statuses?.freeze || 0) <= 0) sc += 25;
      if (sk.status === 'freeze' && (t.statuses?.freeze || 0) <= 0) sc += 14;
      if (sk.status === 'poison' && (t.statuses?.poison || 0) <= 0) sc += 12;
      if (sk.status === 'stun' && (t.statuses?.stun || 0) <= 0) sc += 12;
      if (sc > bestScore) {
        bestScore = sc;
        bestSk = sk;
      }
    }
    return bestSk;
  }

  async maybeTaunt(u, foes) {
    const sk = (u.skills || []).find((s) => s.type === 'taunt' && this.isSkillReady(u, s));
    if (!sk) return;
    const near = foes.filter((f) => f.alive && this.dist(u, f) <= sk.r);
    if (!near.length) return;
    await this.shout(u, sk.n, '#d86a4a', 'taunt');
    for (const f of near) {
      f.taunt = { by: u, n: 2 };
      f.statuses.provoke = 2;
      this.float(f, 'PROVOKE! (-20% DEF)', '#d86a4a', 13);
    }
    u.statuses.agi = Math.max(u.statuses.agi || 0, 2);
    this.putSkillOnCooldown(u, sk);
    this.ui.onLog(`<b>${u.name}</b> uses ${sk.n} on ${near.length} enemies (-20% DEF).`, 'h');
  }

  async actAI(u, foes, allies) {
    const tiles = this.reach(u);
    const nearFoe = (n) => Math.min(...foes.map((f) => this.dist(n, f)));

    // 1. Healer AI: Sanctuary Heal -> Blessing & Agi Up -> Lex Aeterna!
    const healSk = (u.skills || []).find((s) => s.type === 'heal' && this.isSkillReady(u, s));
    if (healSk) {
      const list = allies
        .filter((a) => a.hp < a.maxhp * 0.78 || a.statuses?.poison > 0)
        .sort((a, b) => a.hp / a.maxhp - b.hp / b.maxhp);
      for (const t of list) {
        let best = null;
        for (const n of tiles) {
          if (t !== u && this.dist(n, t) > this.effectiveRange(u, n.x, n.y)) continue;
          const s = Math.min(nearFoe(n), 5) * 2 + this.pScore(n) - this.crowdPenalty(u, n) - n.d * 0.1;
          if (!best || s > best.s) best = { s, n };
        }
        if (best) {
          await this.moveTo(u, best.n);
          this.face(u, t);
          this.float(u, healSk.n, '#ffe9a8', 15, 16);
          u.pose = 'cast';
          this.burst(u, '#8fe3a0', 6);
          await this.wait(250);
          const lvMult = 1 + ((healSk.lv || 1) - 1) * 0.06;
          this.heal(t, Math.round(u.atk * healSk.pow * lvMult * (0.9 + this.rnd() * 0.2)), u);
          this.ring(t, '#8fe3a0');
          this.putSkillOnCooldown(u, healSk);
          await this.wait(190);
          u.pose = 'idle';
          return;
        }
      }
    }

    // 2. Support / Priest Buff AI (Blessing & Increase AGI!)
    const buffSk = (u.skills || []).find((s) => s.type === 'buff' && this.isSkillReady(u, s));
    if (buffSk && nearFoe(u) <= 9) {
      let best = null;
      for (const n of tiles) {
        const unbuffedAllies = allies.filter((a) => this.dist(n, a) <= buffSk.r && (a.statuses?.blessing || 0) <= 0).length;
        const s = unbuffedAllies * 4 + Math.min(nearFoe(n), 4) + this.pScore(n) - this.crowdPenalty(u, n);
        if (!best || s > best.s) best = { s, n, c: unbuffedAllies };
      }
      if (best && best.c >= 2) {
        await this.moveTo(u, best.n);
        await this.shout(u, buffSk.n, '#5ca86d', 'buff');
        for (const a of allies) {
          if (this.dist(u, a) <= buffSk.r) {
            a.statuses.blessing = 3;
            a.statuses.agi = 3;
            a.statuses.poison = 0; // Blessing cures poison!
            this.float(a, 'BLESSING & AGI+', '#8fe3a0', 13);
            this.ring(a, '#5ca86d');
          }
        }
        this.putSkillOnCooldown(u, buffSk);
        this.ui.onLog(`<b>${u.name}</b> casts <b>${buffSk.n}</b> (+25% ATK & +30% SPD)!`, 'h');
        await this.wait(210);
        return;
      }
    }

    // 3. Attackers, Mages, Priests (Lex Aeterna) & Tanks
    let cands = foes;
    if (u.taunt && u.taunt.n > 0 && u.taunt.by.alive) cands = [u.taunt.by];
    let best = null;
    for (const t of cands) {
      for (const n of tiles) {
        const effR = this.effectiveRange(u, n.x, n.y);
        const d = this.dist(n, t);
        if (d > effR || d === 0) continue;
        let s = 60 * (1 - t.hp / t.maxhp) + this.pScore(n) * 2 - this.crowdPenalty(u, n) - n.d * 0.2;
        if ((t.statuses?.lex || 0) > 0) s += 25; // Focus targets marked with Lex Aeterna 2x!
        if ((t.statuses?.freeze || 0) > 0 && u.elem === 'Wind') s += 28; // Focus Frozen targets with Wind!
        if (effR > 2) s += d * 2.5 - 5 * foes.filter((f) => this.dist(n, f) <= 2).length;
        else s += 3.5 * allies.filter((a) => a !== u && this.dist(a, t) === 1).length;
        if (!best || s > best.s) best = { s, t, n };
      }
    }

    if (!best) {
      const sortedFoes = cands.slice().sort((a, b) => this.dist(u, a) - this.dist(u, b));
      const tgt = sortedFoes[u.id % Math.min(3, sortedFoes.length)] || sortedFoes[0];
      const f = this.field(tgt);
      let bn = null;
      for (const n of tiles) {
        const s = f[n.y * this.GW + n.x] * 10 - this.pScore(n) + this.crowdPenalty(u, n) + n.d * 0.01;
        if (!bn || s < bn.s) bn = { s, n };
      }
      if (bn) await this.moveTo(u, bn.n);
      await this.maybeTaunt(u, foes);
      return;
    }

    await this.moveTo(u, best.n);
    await this.maybeTaunt(u, foes);
    const t = best.t;
    this.face(u, t);

    const sk = this.pickBestOffensiveSkill(u, t);

    if (sk && sk.type === 'sweep') {
      const hit = foes.filter((f) => f.alive && this.dist(u, f) <= sk.r);
      if (hit.length >= 1) {
        this.float(u, sk.n, '#ffe9a8', 15, 16);
        u.pose = 'attack';
        u.poseT = 0;
        this.ring(u, ELEMENTS[sk.elem]?.col || '#e8d8b0', sk.r + 0.6);
        this.sfx('sweep');
        await this.tween(u, { poseT: 0.6 }, 180);
        for (const f of hit) {
          this.damage(u, f, sk.pow, sk);
          this.slashFx(f);
        }
        await this.tween(u, { poseT: 1 }, 180);
        u.pose = 'idle';
        this.putSkillOnCooldown(u, sk);
        this.ui.onLog(`<b>${u.name}</b> uses <b>${sk.n}</b> (${sk.elem || 'Neutral'}) on ${hit.length} targets.`, u.side === 'hero' ? 'h' : 'f');
        return;
      }
    }

    if (sk && sk.type === 'blast') {
      this.float(u, sk.n, '#ffe9a8', 15, 16);
      const others = foes.filter((f) => f.alive && f !== t && this.dist(f, t) <= sk.r);
      await this.strike(u, t, sk.pow, false, sk);
      const col = ELEMENTS[sk.elem]?.col || '#8fd3ff';
      this.ring(t, col, sk.r + 0.6);
      if (u.magic) this.sfx('blast');
      for (const f of others) {
        this.damage(u, f, sk.pow, sk);
        this.burst(f, col, 6);
      }
      this.putSkillOnCooldown(u, sk);
      this.ui.onLog(`<b>${u.name}</b> unleashes <b>${sk.n}</b> (${sk.elem || 'Neutral'}).`, u.side === 'hero' ? 'h' : 'f');
      await this.wait(135);
      return;
    }

    if (sk && sk.type === 'knockback') {
      this.float(u, sk.n, '#ffe9a8', 15, 16);
      await this.strike(u, t, sk.pow, false, sk);
      this.putSkillOnCooldown(u, sk);
      await this.applyKnockback(u, t);
      await this.chain(u, t);
      return;
    }

    if (sk && sk.type === 'strike') {
      this.float(u, sk.n, '#ffe9a8', 15, 16);
      await this.strike(u, t, sk.pow, false, sk);
      this.putSkillOnCooldown(u, sk);
      await this.chain(u, t);
      return;
    }

    await this.strike(u, t, 1, false, null);
    await this.chain(u, t);
  }

  async takeTurn(u) {
    this.current = u;
    this.ui.onSyncAll();

    // 1. Geo Panel Turn Start Effects
    const pn = this.MAP[u.y]?.[u.x];
    if (pn === 'g' && u.hp < u.maxhp) this.heal(u, Math.round(u.maxhp * 0.08));
    if (pn === 'v') {
      this.applyDmg(null, u, Math.round(u.maxhp * 0.05), false, '#c58ae6');
      if (!u.alive) {
        await this.wait(340);
        this.current = null;
        return;
      }
    }

    // 2. Poison Status Damage Tick (-10% Max HP)
    if ((u.statuses?.poison || 0) > 0) {
      const pDmg = Math.max(8, Math.round(u.maxhp * 0.1));
      this.burst(u, '#7c4d9c', 5);
      this.applyDmg(null, u, pDmg, false, '#a87bd9');
      if (!u.alive) {
        await this.wait(340);
        this.current = null;
        return;
      }
    }

    // Decrement Skill Cooldowns
    if (u.cds) {
      for (const k in u.cds) if (u.cds[k] > 0) u.cds[k]--;
    }

    // 3. Check Hard Crowd-Control Statuses (FREEZE or STUN skips turn!)
    if ((u.statuses?.freeze || 0) > 0) {
      this.float(u, 'FROZEN! (Turn Skipped)', '#7fd0ff', 15, 16);
      u.statuses.freeze--;
      await this.wait(360);
      this.current = null;
      return;
    }
    if ((u.statuses?.stun || 0) > 0) {
      this.float(u, 'STUNNED! (Turn Skipped)', '#ffd45e', 15, 16);
      u.statuses.stun--;
      await this.wait(360);
      this.current = null;
      return;
    }

    await this.wait(90);

    const foes = this.units.filter((o) => o.alive && o.side !== u.side);
    const allies = this.units.filter((o) => o.alive && o.side === u.side);

    if (foes.length) {
      if (!this.autoBattle && u.side === 'hero') {
        this.selected = u;
        this.ui.onSyncAll();
        await new Promise((resolve) => {
          this.manualResolve = resolve;
        });
        this.manualResolve = null;
      } else {
        await this.actAI(u, foes, allies);
      }
    }

    // Decrement Duration of Remaining Buffs/Debuffs (except Lex Aeterna which is consumed on next hit)
    for (const k of ['poison', 'provoke', 'blessing', 'agi']) {
      if (u.statuses?.[k] > 0) u.statuses[k]--;
    }
    if (u.taunt && --u.taunt.n <= 0) u.taunt = null;
    if (this.MAP[u.y]?.[u.x] === 'y') u.meter += 240;
    this.current = null;
  }

  stepMeters(list) {
    for (let g = 0; g < 5000; g++) {
      let b = null;
      for (const e of list) if (e.m >= 1000 && (!b || e.m > b.m)) b = e;
      if (b) {
        b.m -= 1000;
        return b;
      }
      for (const e of list) {
        const agiMult = (e.u.statuses?.agi || 0) > 0 ? 1.3 : 1.0;
        e.m += e.u.spd * agiMult;
      }
    }
    return null;
  }

  nextActor() {
    const list = this.units.filter((u) => u.alive).map((u) => ({ u, m: u.meter }));
    const b = this.stepMeters(list);
    for (const e of list) e.u.meter = e.m;
    return b.u;
  }

  predictOrder(n = 11) {
    const list = this.units.filter((u) => u.alive && u !== this.current).map((u) => ({ u, m: u.meter }));
    const out = [];
    if (this.current && this.current.alive) list.push({ u: this.current, m: this.current.meter });
    while (out.length < n && list.length) {
      const b = this.stepMeters(list);
      if (!b) break;
      out.push(b.u);
    }
    return out;
  }

  async runBattleLoop(id) {
    while (id === this.battleId) {
      const u = this.nextActor();
      this.turnCount++;
      await this.takeTurn(u);
      if (id !== this.battleId) return null;

      const hAlive = this.units.some((x) => x.alive && x.side === 'hero');
      const fAlive = this.units.some((x) => x.alive && x.side === 'foe');
      if (!hAlive || !fAlive || this.turnCount > 900) {
        this.result = !fAlive ? 'Victory' : !hAlive ? 'Defeat' : 'Draw';
        if (!this.instant) {
          this.handleBattleEndRewards(this.result === 'Victory');
          this.sfx(this.result === 'Victory' ? 'win' : 'lose');
          this.ui.onSyncAll();
          setTimeout(() => {
            if (id === this.battleId) this.ui.onShowReport();
          }, 700);
        }
        return this.result;
      }
      if (!this.instant) this.ui.onSyncAll();
      await this.wait(110);
    }
    return null;
  }

  handleBattleEndRewards(won) {
    const top = this.units
      .filter((x) => x.side === 'hero')
      .sort((a, b) => b.dmg - a.dmg)
      .slice(0, 3);
    this.ui.onLog(`<b>${this.result}</b> after ${this.turnCount} turns.`, 'k');
    this.ui.onLog(`Top damage: ${top.map((x) => `${x.name} ${x.dmg}`).join(', ')}`, 'k');

    this.lastDroppedItems = [];
    this.lastDroppedMisc = [];
    this.lastDroppedCard = null;
    this.lastRecruitedHero = null;

    if (!won) return;

    const bonusZeny = this.bonusRank * 65;
    const zGain = (this.curEnc.zeny || 240) + bonusZeny;
    const baseExpGain = Math.round((this.curEnc.baseExp || 90) * (1 + (this.bonusRank - 1) * 0.15));
    const jobExpGain = Math.round((this.curEnc.jobExp || 75) * (1 + (this.bonusRank - 1) * 0.15));
    this.zeny += zGain;
    this.oridecon += 1;
    this.elunium += 1;
    this.miscBag.msc_oridecon = (this.miscBag.msc_oridecon || 0) + 1;
    this.miscBag.msc_elunium = (this.miscBag.msc_elunium || 0) + 1;

    this.lastExpGain = { baseExp: baseExpGain, jobExp: jobExpGain };

    this.getActiveParty().forEach((h) => {
      const { leveledBase, leveledJob } = this.grantHeroExp(h, baseExpGain, jobExpGain);
      if (leveledBase || leveledJob) {
        const jobReady = this.canPromoteJob(h) ? ` <b style="color:#ffe08a">[JOB CHANGE READY!]</b>` : '';
        this.ui.onLog(
          `<b>Level Up!</b> ${h.name} reached <b>Base Lv.${h.lv} / Job Lv.${h.jobLv}</b>!${jobReady}`,
          'k'
        );
      }
    });

    if (this.curEnc.boss) {
      const minS = this.curEnc.respawnMinSec || 300;
      const maxS = this.curEnc.respawnMaxSec || 600;
      this.mvpRespawnTimers[this.curEnc.key] = (minS + Math.random() * (maxS - minS)) * 1000;
    }

    // Drop Misc Crafting/Sellable Loot
    const miscPool = this.curEnc.miscDrops || ['msc_jellopy', 'msc_mucus'];
    const miscCount = 2 + (this.curEnc.boss ? 2 : 0);
    for (let i = 0; i < miscCount; i++) {
      const mId = miscPool[Math.floor(Math.random() * miscPool.length)];
      const mDef = MISC_ITEMS[mId];
      if (mDef) {
        this.miscBag[mId] = (this.miscBag[mId] || 0) + 1;
        this.lastDroppedMisc.push(mDef);
      }
    }

    const pool = this.curEnc.lootTable || ['hg_bandana', 'rh_sword', 'lh_buckler'];
    const numDrops = 1 + (this.bonusRank >= 2 || this.curEnc.boss ? 1 : 0) + (Math.random() < 0.35 ? 1 : 0);
    for (let i = 0; i < numDrops; i++) {
      const pickId = pool[Math.floor(Math.random() * pool.length)];
      const itemDef = PAPERDOLL_ITEMS[pickId];
      if (itemDef) {
        this.unlockLootItem(pickId);
        this.lastDroppedItems.push(itemDef);
      }
    }

    if (this.curEnc.boss || Math.random() < 0.45) {
      const dropId = this.curEnc.dropCard || 'c_poring';
      const cardDef = RO_CARDS.find((c) => c.id === dropId) || RO_CARDS[0];
      const existing = this.ownedCards.find((c) => c.id === cardDef.id);
      if (existing) existing.count++;
      else this.ownedCards.push({ ...cardDef, count: 1 });
      this.lastDroppedCard = cardDef;
    }

    const unrecruited = this.getUnrecruitedHeroes();
    const joinChance = 0.085;
    if (unrecruited.length > 0 && Math.random() < joinChance) {
      const newHero = unrecruited[Math.floor(Math.random() * unrecruited.length)];
      newHero.recruited = true;
      if (this.getActiveParty().length < 10) {
        newHero.deployed = true;
      }
      this.lastRecruitedHero = newHero;
      this.ui.onLog(`<b>★ NEW HERO JOINED!</b> ${newHero.name} (${newHero.job}) was impressed by your victory and joined your party!`, 'k');
    }

    const dropNames = this.lastDroppedItems.map((it) => `[${it.name}]`).join(', ');
    this.ui.onLog(
      `🎁 Loot Dropped: <b>${dropNames}</b>${this.lastDroppedCard ? `, <b>[${this.lastDroppedCard.name}]</b>` : ''}, +${zGain}z!`,
      'k'
    );
  }

  // =========================================================================
  // 2.5D MULTI-ELEVATION ISOMETRIC BATTLE RENDERING (22x22 GRID)
  // =========================================================================
  diamond(p, inset = 0) {
    const z = this.bCam.zoom;
    const w = (this.TW * z) / 2 - inset * 2;
    const h = (this.TH * z) / 2 - inset;
    this.ctx.beginPath();
    this.ctx.moveTo(p.x, p.y - h);
    this.ctx.lineTo(p.x + w, p.y);
    this.ctx.lineTo(p.x, p.y + h);
    this.ctx.lineTo(p.x - w, p.y);
    this.ctx.closePath();
  }

  draw25DTilePrism(x, y, reachableSet) {
    const ctx = this.ctx;
    const z = this.bCam.zoom;
    const h = this.tileHeight(x, y);
    const p = this.iso(x, y, h);
    const w2 = (this.TW * z) / 2;
    const h2 = (this.TH * z) / 2;
    const slabDepth = (h * ELEV_STEP_PX + 9) * z;

    ctx.fillStyle = h >= 3 ? '#2c333d' : '#242930';
    ctx.beginPath();
    ctx.moveTo(p.x - w2, p.y);
    ctx.lineTo(p.x, p.y + h2);
    ctx.lineTo(p.x, p.y + h2 + slabDepth);
    ctx.lineTo(p.x - w2, p.y + slabDepth);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = h >= 3 ? '#1f242b' : '#181c22';
    ctx.beginPath();
    ctx.moveTo(p.x + w2, p.y);
    ctx.lineTo(p.x, p.y + h2);
    ctx.lineTo(p.x, p.y + h2 + slabDepth);
    ctx.lineTo(p.x + w2, p.y + slabDepth);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(0,0,0,0.42)';
    ctx.lineWidth = 1;
    for (let tier = 1; tier < h; tier++) {
      const ty = tier * ELEV_STEP_PX * z;
      ctx.beginPath();
      ctx.moveTo(p.x - w2, p.y + ty);
      ctx.lineTo(p.x, p.y + h2 + ty);
      ctx.lineTo(p.x + w2, p.y + ty);
      ctx.stroke();
    }

    const n = (x * 7 + y * 13 + x * y * 3) % 4;
    const tierPalettes = {
      1: ['#293327', '#2d372a', '#263026', '#2f3829'],
      2: ['#323d30', '#364133', '#2f3a2e', '#384232'],
      3: ['#3d473b', '#414b3e', '#394338', '#434d3f'],
      4: ['#4a5347', '#4e574a', '#464f44', '#50594b']
    };
    const pal = tierPalettes[h] || tierPalettes[1];
    ctx.fillStyle = pal[n];
    this.diamond(p, 0);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.38)';
    ctx.lineWidth = 1;
    ctx.stroke();

    const m = this.MAP[y][x];
    const pulse = 0.5 + 0.5 * Math.sin(this.rt / 560);
    if (GEO_PANELS[m]) {
      ctx.globalAlpha = 0.45 + 0.1 * pulse;
      ctx.fillStyle = GEO_PANELS[m].col;
      this.diamond(p, 1);
      ctx.fill();
      ctx.globalAlpha = 0.88;
      ctx.strokeStyle = GEO_PANELS[m].border;
      ctx.lineWidth = 1.4;
      this.diamond(p, 4);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    if (h >= 3 && this.MAP[y][x] !== '#') {
      ctx.fillStyle = 'rgba(230, 200, 119, 0.26)';
      ctx.font = '600 9px "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`H${h}`, p.x, p.y + 3);
    }

    if (reachableSet.has(`${x},${y}`)) {
      ctx.fillStyle = 'rgba(127, 208, 255, 0.28)';
      this.diamond(p, 2);
      ctx.fill();
      ctx.strokeStyle = '#7fd0ff';
      ctx.lineWidth = 1.3;
      ctx.stroke();
    }
  }

  drawPillarObstacle(x, y) {
    const p = this.iso(x, y);
    const ctx = this.ctx;
    const sc = this.S * this.bCam.zoom;
    ctx.save();
    ctx.translate(Math.round(p.x), Math.round(p.y + 4));
    ctx.scale(sc, sc);
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(-9, -1, 18, 2);
    const fill = (rx, ry, rw, rh, c) => {
      ctx.fillStyle = c;
      ctx.fillRect(rx, ry, rw, rh);
    };
    fill(-7, -14, 14, 14, '#525861');
    fill(-8, -16, 16, 3, '#68707a');
    fill(-8, -3, 16, 3, '#3e434a');
    fill(-5, -12, 4, 8, '#68707a');
    ctx.restore();
  }

  drawBattleUnit(u) {
    const ctx = this.ctx;
    const z = this.bCam.zoom;
    const h = this.tileHeight(u.px, u.py);
    const p = this.iso(u.px, u.py, h);
    const sc = this.S * (u.scale || 1) * z;

    ctx.save();
    ctx.globalAlpha = u.alpha * 0.26;
    ctx.fillStyle = u.side === 'hero' ? '#4f8fd6' : '#d6564a';
    ctx.beginPath();
    ctx.ellipse(p.x, p.y + 2, 20 * z, 9 * z, 0, 0, 6.3);
    ctx.fill();

    ctx.globalAlpha = u.alpha;
    ctx.fillStyle = 'rgba(0,0,0,0.42)';
    ctx.beginPath();
    ctx.ellipse(p.x, p.y + 2, (11 * sc) / 2.2, (4.5 * sc) / 2.2, 0, 0, 6.3);
    ctx.fill();

    if (u === this.current) {
      ctx.strokeStyle = '#ffe08a';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.ellipse(p.x, p.y + 2, 25 * z, 11.5 * z, 0, 0, 6.3);
      ctx.stroke();
    }
    if (u === this.selected) {
      ctx.strokeStyle = '#7fd0ff';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.ellipse(p.x, p.y + 2, 29 * z, 13.5 * z, 0, 0, 6.3);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.translate(Math.round(p.x), Math.round(p.y + 3));
    ctx.scale(u.face * sc, sc);
    if (u.pose === 'dead') ctx.rotate(-u.poseT * 1.35);

    const tint = u.flash > 0.5 ? '#ffffff' : u.flash > 0.05 ? '#e8695a' : null;
    drawUnitSprite(ctx, u, this.rt, tint);
    ctx.restore();

    if (u.alive) {
      const t = this.topOf(u);
      const w = (u.boss ? 56 : 34) * z;
      const x = t.x - w / 2;
      const y = t.y - 8;
      ctx.fillStyle = '#0b0d10';
      ctx.fillRect(x - 1, y - 1, w + 2, 7.5);
      ctx.fillStyle = u.side === 'hero' ? '#5fae5a' : '#c8503f';
      ctx.fillRect(x, y, (w * u.hp) / u.maxhp, 4);
      const agiMult = (u.statuses?.agi || 0) > 0 ? '#7fd0ff' : '#d9a83e';
      ctx.fillStyle = agiMult;
      ctx.fillRect(x, y + 4.5, w * Math.min(1, (u.meter || 0) / 1000), 2);

      // Render Crisp 7x7 Matte Pixel Status Effect Badges above the HP Bar!
      let sx = x;
      for (const stKey of Object.keys(STATUS_DEFS)) {
        if ((u.statuses?.[stKey] || 0) > 0) {
          drawStatusBadge(ctx, stKey, sx, y - 15, 1.35);
          sx += 14;
        }
      }

      drawRoleBadge(ctx, u.role, x - 20, y - 8, 2);

      if (u === this.hover || u === this.selected || u === this.current) {
        ctx.font = '600 13px "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        const effElem = (u.statuses?.freeze || 0) > 0 ? 'Water [Frozen]' : u.elem || 'Neutral';
        const s = `${u.name} · ${u.job} (${effElem})`;
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#0b0d10';
        ctx.strokeText(s, t.x, y - 20);
        ctx.fillStyle = u === this.current ? '#ffe08a' : '#ffffff';
        ctx.fillText(s, t.x, y - 20);
      }
    }
  }

  drawBattleFx(ground) {
    const ctx = this.ctx;
    const z = this.bCam.zoom;
    for (const f of this.fx) {
      const p = f.manual ? 0 : (this.gt - f.t0) / f.dur;
      if (ground !== (f.type === 'ring')) continue;
      if (f.type === 'ring') {
        const q = this.iso(f.x, f.y);
        ctx.globalAlpha = Math.max(0, 1 - p);
        ctx.strokeStyle = f.col;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(q.x, q.y, (10 + p * 34) * f.r * z, (5 + p * 17) * f.r * z, 0, 0, 6.3);
        ctx.stroke();
        ctx.globalAlpha = 1;
      } else if (f.type === 'spark') {
        const t = (this.gt - f.t0) / 1000;
        ctx.globalAlpha = Math.max(0, 1 - p);
        ctx.fillStyle = f.col;
        ctx.fillRect(f.x + f.vx * t, f.y + f.vy * t + 120 * t * t, 4, 4);
        ctx.globalAlpha = 1;
      } else if (f.type === 'slash') {
        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(f.a);
        ctx.globalAlpha = Math.max(0, 1 - p);
        ctx.strokeStyle = f.col;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(0, 0, 22 * z, -1.2 + p * 1.5, 0.4 + p * 1.5);
        ctx.stroke();
        ctx.restore();
        ctx.globalAlpha = 1;
      } else if (f.type === 'orb') {
        const q = this.iso(f.x, f.y);
        ctx.fillStyle = f.col;
        ctx.globalAlpha = 0.35;
        ctx.beginPath();
        ctx.arc(q.x, q.y - 44 * z, 13 * z, 0, 6.3);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(q.x, q.y - 44 * z, 7 * z, 0, 6.3);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.fillRect(q.x - 2, q.y - 47 * z, 3, 3);
      } else if (f.type === 'arrow') {
        const q = this.iso(f.x, f.y);
        const e = this.iso(f.tx, f.ty);
        const an = Math.atan2(e.y - q.y, e.x - q.x) || 0;
        ctx.save();
        ctx.translate(q.x, q.y - 40 * z);
        ctx.rotate(an);
        ctx.fillStyle = '#d8cfb8';
        ctx.fillRect(-14, -1, 26, 2);
        ctx.fillStyle = '#e6ecf2';
        ctx.fillRect(12, -2, 5, 4);
        ctx.restore();
      }
    }
  }

  drawTurnOrderStrip() {
    const ctx = this.ctx;
    const list = this.predictOrder(10);
    const bw = 48;
    const x0 = this.CW / 2 - ((list.length + 1) * (bw + 6)) / 2;
    ctx.font = '600 11.5px "Segoe UI", sans-serif';
    ctx.fillStyle = '#8d97a5';
    ctx.textAlign = 'left';
    ctx.fillText('RAID SPEED TURN ORDER (fastest SPD acts next · Drag map to Pan · Scroll to Zoom)', x0, 16);

    const items = (this.current ? [this.current] : []).concat(list).slice(0, 11);
    items.forEach((u, i) => {
      const x = x0 + i * (bw + 6);
      const y = 22;
      const now = this.current && i === 0;
      ctx.fillStyle = '#161a21';
      ctx.fillRect(x, y, bw, bw);

      ctx.save();
      ctx.beginPath();
      ctx.rect(x, y, bw, bw);
      ctx.clip();
      const nonHuman = u.spriteKind === 'slime' || u.spriteKind === 'wolf';
      ctx.translate(x + bw / 2 - (nonHuman ? 8 : 2), y + bw / 2 + (nonHuman ? 20 : 44));
      ctx.scale(2, 2);
      drawUnitSprite(ctx, { ...u, pose: 'idle', poseT: 0 }, this.rt);
      ctx.restore();

      ctx.lineWidth = now ? 3 : 1.5;
      ctx.strokeStyle = now ? '#ffe08a' : u.side === 'hero' ? '#4f7fb5' : '#a8483c';
      ctx.strokeRect(x + 0.5, y + 0.5, bw - 1, bw - 1);
      drawRoleBadge(ctx, u.role, x + 2, y + 2, 1);

      if (now) {
        ctx.fillStyle = '#ffe08a';
        ctx.textAlign = 'center';
        ctx.fillText('NOW', x + bw / 2, y + bw + 12);
      }
    });
  }

  renderBattle() {
    const ctx = this.ctx;
    const g = ctx.createRadialGradient(this.CW / 2, this.CH / 2, 80, this.CW / 2, this.CH / 2, 960);
    g.addColorStop(0, '#1c232e');
    g.addColorStop(1, '#090b0f');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, this.CW, this.CH);

    const reachableSet = new Set();
    if (!this.autoBattle && this.current && this.current.side === 'hero' && this.manualResolve) {
      for (const n of this.reach(this.current)) {
        reachableSet.add(`${n.x},${n.y}`);
      }
    }

    for (let y = 0; y < this.GH; y++) {
      for (let x = 0; x < this.GW; x++) {
        this.draw25DTilePrism(x, y, reachableSet);
      }
    }

    this.drawBattleFx(true);

    const list = this.units.filter((u) => !u.gone).map((u) => ({ d: u.px + u.py + this.tileHeight(u.px, u.py) * 0.01, u }));
    for (let y = 0; y < this.GH; y++) {
      for (let x = 0; x < this.GW; x++) {
        if (this.MAP[y][x] === '#') list.push({ d: x + y, rock: [x, y] });
      }
    }
    for (const sym of this.geoSymbols) {
      if (sym.alive) list.push({ d: sym.x + sym.y + 0.1, sym });
    }

    list.sort((a, b) => a.d - b.d);
    for (const e of list) {
      if (e.rock) this.drawPillarObstacle(e.rock[0], e.rock[1]);
      else if (e.sym) {
        const p = this.iso(e.sym.x, e.sym.y);
        drawGeoSymbolPixel(ctx, e.sym, p.x, p.y, this.rt, this.S * this.bCam.zoom);
      } else {
        this.drawBattleUnit(e.u);
      }
    }

    this.drawBattleFx(false);

    ctx.textAlign = 'center';
    for (const f of this.floaters) {
      const p = (this.gt - f.t0) / f.dur;
      ctx.globalAlpha = p < 0.7 ? 1 : Math.max(0, 1 - (p - 0.7) / 0.3);
      ctx.font = `700 ${f.size}px "Segoe UI", sans-serif`;
      const y = f.y - 38 * (1 - (1 - p) * (1 - p));
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#0b0d10';
      ctx.strokeText(f.text, f.x, y);
      ctx.fillStyle = f.col;
      ctx.fillText(f.text, f.x, y);
    }
    ctx.globalAlpha = 1;

    this.drawTurnOrderStrip();

    if (!this.autoBattle && this.current && this.current.side === 'hero' && this.manualResolve) {
      ctx.fillStyle = 'rgba(11, 15, 22, 0.88)';
      ctx.fillRect(this.CW / 2 - 310, this.CH - 44, 620, 32);
      ctx.strokeStyle = '#7fd0ff';
      ctx.strokeRect(this.CW / 2 - 310, this.CH - 44, 620, 32);
      ctx.fillStyle = '#ffe9a8';
      ctx.font = '600 13.5px "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        `MANUAL TURN: ${this.current.name} (${this.current.job}) — Click blue tile to move or click an enemy to strike!`,
        this.CW / 2,
        this.CH - 23
      );
    }
  }

  // =========================================================================
  // RAGNARÖK BLOCK-GRID MIDGARD WORLD MAP (5-10 MIN RESPAWNS, TOWNS, N/S/E/W PORTALS)
  // =========================================================================
  getCurrentZone() {
    return MIDGARD_BLOCKS[this.currentZoneId] || MIDGARD_BLOCKS.prontera;
  }

  getZonePortals(Z) {
    const out = [];
    const nb = Z.neighbors || {};
    if (nb.north && MIDGARD_BLOCKS[nb.north]) {
      const tz = MIDGARD_BLOCKS[nb.north];
      out.push({ id: `p_n_${Z.id}`, dir: 'north', x: 32, y: 4, targetZone: tz.id, targetX: 32, targetY: 41, label: `▲ North -> [${tz.code}] ${tz.name}`, col: '#7fd0ff' });
    }
    if (nb.south && MIDGARD_BLOCKS[nb.south]) {
      const tz = MIDGARD_BLOCKS[nb.south];
      out.push({ id: `p_s_${Z.id}`, dir: 'south', x: 32, y: 43, targetZone: tz.id, targetX: 32, targetY: 7, label: `▼ South -> [${tz.code}] ${tz.name}`, col: '#8fe3a0' });
    }
    if (nb.west && MIDGARD_BLOCKS[nb.west]) {
      const tz = MIDGARD_BLOCKS[nb.west];
      out.push({ id: `p_w_${Z.id}`, dir: 'west', x: 4, y: 24, targetZone: tz.id, targetX: 56, targetY: 24, label: `◀ West -> [${tz.code}] ${tz.name}`, col: '#ffe08a' });
    }
    if (nb.east && MIDGARD_BLOCKS[nb.east]) {
      const tz = MIDGARD_BLOCKS[nb.east];
      out.push({ id: `p_e_${Z.id}`, dir: 'east', x: 59, y: 24, targetZone: tz.id, targetX: 7, targetY: 24, label: `▶ East -> [${tz.code}] ${tz.name}`, col: '#c58ae6' });
    }
    return out;
  }

  changeWorldZone(zoneId, customX = null, customY = null) {
    if (!MIDGARD_BLOCKS[zoneId]) return;
    this.currentZoneId = zoneId;
    const Z = this.getCurrentZone();
    this.CAMP = Z.type === 'town' ? { x: 28, y: 24 } : { x: 10, y: 36 };
    this.generateOpenWorld();
    this.initOpenWorldEntities(customX ?? (Z.type === 'town' ? 28 : 32), customY ?? (Z.type === 'town' ? 24 : 24));
    this.fade = 0.75;
    this.sfx('cast');
    this.toast(`Entered [${Z.code}] ${Z.name} (${Z.recLv})`);
    this.ui.onSyncAll();
  }

  generateOpenWorld() {
    const WW = this.WW, WH = this.WH;
    const Z = this.getCurrentZone();
    const isTown = Z.type === 'town';
    const T_GRASS = 0, T_PATH = 1, T_MARSH = 2, T_CAMP = 3, T_WATER = 4, T_TREE = 5, T_ROCK = 6;

    // Deterministic hash seed from block code
    let s = 2166136261;
    for (let k = 0; k < Z.id.length; k++) s = Math.imul(s ^ Z.id.charCodeAt(k), 16777619);

    const r = () => {
      s = (s + 0x6d2b79f5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const G = 9, gw = Math.ceil(WW / G) + 2, gh = Math.ceil(WH / G) + 2;
    const lat = () => {
      const a = [];
      for (let i = 0; i < gw * gh; i++) a.push(r());
      return a;
    };
    const A = lat(), B = lat();
    const nz = (L, x, y) => {
      const fx = x / G, fy = y / G, ix = fx | 0, iy = fy | 0, tx = fx - ix, ty = fy - iy;
      const sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty);
      const a = L[iy * gw + ix], b = L[iy * gw + ix + 1], c = L[(iy + 1) * gw + ix], d = L[(iy + 1) * gw + ix + 1];
      return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
    };

    const open = (cx, cy, rad, type) => {
      for (let y = cy - rad; y <= cy + rad; y++) {
        for (let x = cx - rad; x <= cx + rad; x++) {
          if (x < 1 || y < 1 || x >= WW - 1 || y >= WH - 1 || (x - cx) * (x - cx) + (y - cy) * (y - cy) > rad * rad + 1) continue;
          const i = y * WW + x;
          this.wmap[i] = type != null ? type : this.wmap[i] === T_PATH ? T_PATH : this.wbase[i];
        }
      }
    };
    const road = (pts) => {
      for (let k = 0; k < pts.length - 1; k++) {
        const [ax, ay] = pts[k], [bx, by] = pts[k + 1], n = Math.max(Math.abs(bx - ax), Math.abs(by - ay)) * 2;
        for (let j = 0; j <= n; j++) {
          const x = Math.round(ax + ((bx - ax) * j) / n), y = Math.round(ay + ((by - ay) * j) / n);
          open(x, y, 1, null);
          for (const [dx, dy] of [[0, 0], [1, 0], [0, 1]]) {
            const xx = x + dx, yy = y + dy;
            if (xx > 0 && yy > 0 && xx < WW - 1 && yy < WH - 1) this.wmap[yy * WW + xx] = T_PATH;
          }
        }
      }
    };

    for (let y = 0; y < WH; y++) {
      for (let x = 0; x < WW; x++) {
        const i = y * WW + x, n1 = nz(A, x, y), n2 = nz(B, x, y);
        this.wvar[i] = (r() * 4) | 0;
        const marsh = x + n1 * 14 > 43, forest = y + n2 * 10 < 17 && !marsh;
        let t = marsh ? T_MARSH : T_GRASS;
        this.wbase[i] = t;
        if (!isTown && marsh && n2 > 0.68) t = T_WATER;
        if (!isTown && !marsh && n1 > 0.82 && y > 20) t = T_WATER;
        if (t !== T_WATER) {
          const p = r();
          if (isTown) {
            if ((x < 7 || x > 56 || y < 5 || y > 43) && p < 0.35) t = T_TREE;
          } else if (forest ? p < 0.34 : marsh ? p < 0.08 : p < 0.05) {
            t = Z.type === 'dungeon' ? T_ROCK : T_TREE;
          } else if (p > 0.97) {
            t = T_ROCK;
          }
        }
        if (x === 0 || y === 0 || x === WW - 1 || y === WH - 1) t = T_TREE;
        this.wmap[i] = t;
      }
    }

    const portals = this.getZonePortals(Z);
    if (isTown) {
      for (let y = 12; y <= 35; y++) {
        for (let x = 12; x <= 44; x++) {
          this.wmap[y * WW + x] = (x + y) % 5 === 0 ? T_CAMP : T_PATH;
        }
      }
      open(28, 24, 4, T_CAMP);
      for (const p of portals) {
        road([[28, 24], [p.x, p.y]]);
        open(p.x, p.y, 3, T_CAMP);
      }
    } else {
      const campPos = this.CAMP;
      open(campPos.x, campPos.y, 3, T_CAMP);
      open(32, 24, 3, null);
      for (const [, sx, sy] of Z.spawns || []) {
        road([[32, 24], [sx, sy]]);
        open(sx, sy, 3, null);
      }
      for (const p of portals) {
        road([[32, 24], [p.x, p.y]]);
        open(p.x, p.y, 3, T_CAMP);
      }
      for (const ch of Z.chests || []) {
        road([[32, 24], [ch.x, ch.y]]);
        open(ch.x, ch.y, 2, null);
      }
    }

    const c = this.mm.getContext('2d');
    const pal = Z.palette;
    const col = [pal.grass[0], pal.path[0], pal.marsh[0], pal.camp[0], pal.water[0], '#1b2e1e', '#5a6069'];
    for (let y = 0; y < WH; y++) {
      for (let x = 0; x < WW; x++) {
        c.fillStyle = col[this.wmap[y * WW + x]] || '#3a4c30';
        c.fillRect(x * 3, y * 3, 3, 3);
      }
    }
  }

  initOpenWorldEntities(spawnX = null, spawnY = null) {
    const Z = this.getCurrentZone();
    const sx = spawnX ?? (Z.type === 'town' ? 28 : 32);
    const sy = spawnY ?? 24;

    if (!this.zoneMobsState[this.currentZoneId]) {
      this.zoneMobsState[this.currentZoneId] = (Z.spawns || []).map(([key, x, y], i) => {
        const E = WORLD_ENCOUNTERS[key];
        const T = MONSTER_TEMPLATES[E.lead || E.foes?.[0]?.[0]] || MONSTER_TEMPLATES.Poring;
        const isOnCooldown = E.boss && (this.mvpRespawnTimers[key] || 0) > 0;
        return {
          id: i + 50,
          key,
          zoneId: this.currentZoneId,
          E,
          hx: x,
          hy: y,
          x,
          y,
          px: x,
          py: y,
          face: -1,
          alive: !isOnCooldown,
          respawnLeftMs: 0, // 5-10 min respawn countdown when defeated
          timer: Math.random() * 2000,
          moving: false,
          chase: false,
          spriteKind: T.spriteKind,
          col: T.col,
          leafCol: T.leafCol,
          maneCol: T.maneCol,
          skin: T.skin,
          hairStyle: T.hairStyle,
          hairCol: T.hairCol,
          equips: T.equips ? structuredClone(T.equips) : {},
          scale: T.scale || 1,
          count: E.foes.reduce((a, f) => a + f[1], 0)
        };
      });
    }
    this.mobs = this.zoneMobsState[this.currentZoneId];

    const active = this.getActiveParty();
    const leaderHero = active[0] || this.roster[0];
    this.P = {
      id: 0,
      rosterId: leaderHero.id,
      x: sx,
      y: sy,
      px: sx,
      py: sy,
      face: 1,
      path: [],
      moving: false,
      skin: leaderHero.skin,
      hairStyle: leaderHero.hairStyle,
      hairCol: leaderHero.hairCol,
      equips: leaderHero.equips,
      scale: 1
    };

    this.followers = active.slice(1, 6).map((h, i) => ({
      id: i + 1,
      rosterId: h.id,
      x: Math.max(1, this.P.x - 1 - (i % 3)),
      y: this.P.y + Math.floor(i / 3),
      px: Math.max(1, this.P.x - 1 - (i % 3)),
      py: this.P.y + Math.floor(i / 3),
      face: 1,
      moving: false,
      skin: h.skin,
      hairStyle: h.hairStyle,
      hairCol: h.hairCol,
      equips: h.equips,
      hasFalcon: h.hasFalcon,
      hasCart: h.hasCart,
      scale: 1
    }));
    this.trail = this.followers.map((f) => [f.x, f.y]);
  }

  walkable(x, y) {
    return x >= 0 && y >= 0 && x < this.WW && y < this.WH && this.wmap[y * this.WW + x] < 4;
  }

  atCamp() {
    const Z = this.getCurrentZone();
    if (Z.type === 'town') return true;
    return Math.abs(this.P.x - this.CAMP.x) + Math.abs(this.P.y - this.CAMP.y) <= 5;
  }

  toast(m) {
    this.toastMsg = m;
    this.toastUntil = this.rt + 4200;
  }

  stepEnt(e, dt, spd) {
    const dx = e.x - e.px, dy = e.y - e.py, d = Math.hypot(dx, dy);
    if (d < 0.001) {
      e.px = e.x;
      e.py = e.y;
      return true;
    }
    if (Math.abs(dx) > 0.01) e.face = Math.sign(dx);
    const m = (spd * dt) / 1000;
    if (m >= d) {
      e.px = e.x;
      e.py = e.y;
      return true;
    }
    e.px += (dx / d) * m;
    e.py += (dy / d) * m;
    return false;
  }

  wpath(sx, sy, tx, ty) {
    if (!this.walkable(tx, ty)) return [];
    const prev = new Int32Array(this.WW * this.WH).fill(-1);
    const start = sy * this.WW + sx, goal = ty * this.WW + tx;
    const q = [start];
    prev[start] = start;
    for (let i = 0; i < q.length; i++) {
      const c = q[i];
      if (c === goal) break;
      const cx = c % this.WW, cy = (c / this.WW) | 0;
      for (const [dx, dy] of DIRS) {
        const nx = cx + dx, ny = cy + dy;
        if (!this.walkable(nx, ny)) continue;
        const k = ny * this.WW + nx;
        if (prev[k] >= 0) continue;
        prev[k] = c;
        q.push(k);
      }
    }
    if (prev[goal] < 0) return [];
    const out = [];
    for (let k = goal; k !== start; k = prev[k]) out.unshift([k % this.WW, (k / this.WW) | 0]);
    return out;
  }

  tickMvpRespawnTimers(dt) {
    // 1. Tick MVP Boss global timers
    for (const key of Object.keys(this.mvpRespawnTimers)) {
      if (this.mvpRespawnTimers[key] > 0) {
        this.mvpRespawnTimers[key] = Math.max(0, this.mvpRespawnTimers[key] - dt);
        if (this.mvpRespawnTimers[key] === 0) {
          for (const zId of Object.keys(this.zoneMobsState)) {
            for (const m of this.zoneMobsState[zId]) {
              if (m.key === key) {
                m.alive = true;
                m.respawnLeftMs = 0;
                m.x = m.px = m.hx;
                m.y = m.py = m.hy;
              }
            }
          }
          const E = WORLD_ENCOUNTERS[key];
          this.sfx('taunt');
          this.toast(`★ MVP RESPAWNED! ${E ? E.name : key} has returned!`);
          this.ui.onLog(`<b>★ MVP RESPAWNED!</b> <b>${E ? E.name : key}</b> has risen from its tombstone!`, 'k');
          this.ui.onSyncAll();
        }
      }
    }

    // 2. Tick 5-10 min (300s-600s) block monster pack respawn timers across all Midgard blocks
    for (const zId of Object.keys(this.zoneMobsState)) {
      for (const m of this.zoneMobsState[zId]) {
        if (!m.alive && !m.E.boss && m.respawnLeftMs > 0) {
          m.respawnLeftMs = Math.max(0, m.respawnLeftMs - dt);
          if (m.respawnLeftMs === 0) {
            m.alive = true;
            m.x = m.px = m.hx;
            m.y = m.py = m.hy;
            if (zId === this.currentZoneId) {
              this.ui.onLog(`<b>Monster Respawn:</b> ${m.E.name} appeared in [${zId}]!`, 'h');
            }
          }
        }
      }
    }
  }

  interactWorldNpc(npc) {
    this.sfx('heal');
    if (npc.action === 'kafra' || npc.action === 'inn') {
      this.restAtInn(50);
    } else if (npc.action === 'tavern') {
      this.toast('Opened Guild Tavern & Party Roster!');
      if (this.ui.onOpenTab) this.ui.onOpenTab('party');
    } else if (npc.action === 'forge') {
      this.toast('Opened Hollgrehenn Refinery (+10 Upgrades & Cards)!');
      if (this.ui.onOpenTab) this.ui.onOpenTab('town');
    } else if (npc.action === 'trader') {
      this.toast('Opened Town Trader (Buy Potions/Gear, Craft & Sell Misc Loot)!');
      if (this.ui.onOpenTab) this.ui.onOpenTab('town');
    } else if (npc.action === 'job') {
      this.toast('Opened Job Change Hall (Requires Job Lv. 10)!');
      if (this.ui.onOpenTab) this.ui.onOpenTab('char');
    }
  }

  openWorldChest(ch) {
    if (this.openedChests.has(ch.id)) return;
    this.openedChests.add(ch.id);
    this.zeny += ch.zeny || 250;
    this.oridecon += 1;
    const pool = ch.itemPool || ['hg_bandana', 'rh_sword'];
    const pickId = pool[Math.floor(Math.random() * pool.length)];
    const it = PAPERDOLL_ITEMS[pickId];
    if (it) {
      this.unlockLootItem(pickId);
      this.lastDroppedItems = [it];
    }
    this.sfx('win');
    this.toast(`Opened ${ch.name}! Looted [${it ? it.name : 'Gear'}], +${ch.zeny}z, +1 Oridecon!`);
    this.ui.onLog(`<b>Treasure Chest!</b> Opened <b>${ch.name}</b> and found <b>[${it ? it.name : 'Gear'}]</b> & +${ch.zeny}z!`, 'k');
    this.ui.onSyncAll();
  }

  worldTick(dt) {
    const Z = this.getCurrentZone();
    const active = this.getActiveParty();
    const leaderHero = active[0] || this.roster[0];
    this.P.equips = leaderHero.equips;

    if (this.stepEnt(this.P, dt, 6.5)) {
      let nx = null;
      const kx = (this.keys.arrowright || this.keys.d ? 1 : 0) - (this.keys.arrowleft || this.keys.a ? 1 : 0);
      const ky = (this.keys.arrowdown || this.keys.s ? 1 : 0) - (this.keys.arrowup || this.keys.w ? 1 : 0);
      if (kx || ky) {
        this.P.path = [];
        if (kx && this.walkable(this.P.x + kx, this.P.y)) nx = [this.P.x + kx, this.P.y];
        else if (ky && this.walkable(this.P.x, this.P.y + ky)) nx = [this.P.x, this.P.y + ky];
      } else if (this.P.path.length) {
        nx = this.P.path.shift();
      }
      if (nx) {
        this.trail.unshift([this.P.x, this.P.y]);
        this.trail.length = Math.min(this.trail.length, this.followers.length);
        this.P.x = nx[0];
        this.P.y = nx[1];
        this.P.moving = true;
        if (this.rt - this.lastStep > 260) {
          this.lastStep = this.rt;
          this.sfx('step');
        }
      } else {
        this.P.moving = false;
      }
    }

    this.followers.forEach((f, i) => {
      const h = active[i + 1];
      if (h) f.equips = h.equips;
      const t = this.trail[i];
      if (t) {
        f.x = t[0];
        f.y = t[1];
      }
      f.moving = !this.stepEnt(f, dt, 6.5);
    });

    // Check N/S/E/W Block Warp Portals
    for (const portal of this.getZonePortals(Z)) {
      if (Math.hypot(this.P.px - portal.x, this.P.py - portal.y) < 1.25) {
        this.P.path = [];
        this.changeWorldZone(portal.targetZone, portal.targetX, portal.targetY);
        return;
      }
    }

    // Check Dungeon Treasure Chests
    for (const ch of Z.chests || []) {
      if (!this.openedChests.has(ch.id) && Math.hypot(this.P.px - ch.x, this.P.py - ch.y) < 1.2) {
        this.openWorldChest(ch);
      }
    }

    const safe = this.atCamp();
    for (const m of this.mobs) {
      if (!m.alive) continue;
      const arrived = this.stepEnt(m, dt, m.chase ? 3.4 : 1.5);
      m.moving = !arrived;
      if (arrived) {
        const dP = Math.abs(this.P.x - m.x) + Math.abs(this.P.y - m.y);
        m.chase = !!m.E.aggro && dP <= 5 && !safe;
        if (m.chase) {
          const o = DIRS.map((d) => [m.x + d[0], m.y + d[1]])
            .filter(
              ([x, y]) =>
                this.walkable(x, y) &&
                Math.abs(x - this.CAMP.x) + Math.abs(y - this.CAMP.y) > 5 &&
                Math.abs(x - m.hx) + Math.abs(y - m.hy) <= 9
            )
            .sort(
              (a, b) =>
                Math.abs(a[0] - this.P.x) + Math.abs(a[1] - this.P.y) -
                (Math.abs(b[0] - this.P.x) + Math.abs(b[1] - this.P.y))
            );
          if (o.length && Math.abs(o[0][0] - this.P.x) + Math.abs(o[0][1] - this.P.y) < dP) {
            m.x = o[0][0];
            m.y = o[0][1];
          }
        } else if (!m.E.boss && (m.timer -= dt) <= 0) {
          m.timer = 900 + Math.random() * 2400;
          const d = DIRS[(Math.random() * 4) | 0];
          const nx = m.x + d[0], ny = m.y + d[1];
          if (
            this.walkable(nx, ny) &&
            Math.abs(nx - m.hx) + Math.abs(ny - m.hy) <= 4 &&
            Math.abs(nx - this.CAMP.x) + Math.abs(ny - this.CAMP.y) > 5
          ) {
            m.x = nx;
            m.y = ny;
          }
        }
      }
      if (Math.abs(m.px - this.P.px) < 0.8 && Math.abs(m.py - this.P.py) < 0.8) {
        this.startEncounter(m);
        return;
      }
    }
  }

  startEncounter(m) {
    this.curMob = m;
    this.P.path = [];
    for (const k in this.keys) this.keys[k] = false;
    this.mode = 'battle';
    document.body.className = 'battle';
    this.fade = 1;
    this.setupBattle((Date.now() % 100000) | 0, m.E);
    this.started = true;
    this.sfx('start');
    this.ui.onLog(`The hunt begins: <b>${m.E.name} (${m.E.recLv || ''})</b>.`, 'k');
    this.ui.onSyncAll();
    this.runBattleLoop(this.battleId);
  }

  returnToMap() {
    const win = this.result === 'Victory';
    for (const u of this.units) {
      if (u.side === 'hero' && u.roster) {
        u.roster.hp = u.alive ? u.hp : Math.round(u.maxhp * 0.35);
      }
    }
    this.battleId++;
    this.started = false;
    this.result = null;
    this.timers = [];
    this.tweens = [];
    this.ui.onHideReport();

    if (win && this.curMob) {
      this.curMob.alive = false;
      const minS = this.curMob.E.respawnMinSec || 300;
      const maxS = this.curMob.E.respawnMaxSec || 600;
      const respawnMs = (minS + Math.random() * (maxS - minS)) * 1000;
      this.curMob.respawnLeftMs = respawnMs;
      if (this.curMob.E.boss) {
        this.mvpRespawnTimers[this.curMob.key] = respawnMs;
      }
      this.huntsCompleted[this.curMob.key] = (this.huntsCompleted[this.curMob.key] || 0) + 1;
      const dropNames = this.lastDroppedItems.map((it) => it.name).join(', ');
      this.toast(`Victory! Looted: ${dropNames || 'Zeny & Materials'}${this.lastRecruitedHero ? ` · ★ ${this.lastRecruitedHero.name} joined!` : ''}`);
    } else if (this.result === 'Defeat') {
      this.changeWorldZone('prontera', 28, 24);
      this.roster.forEach((h) => {
        h.hp = Math.round(h.maxhp * 0.5);
      });
      this.toast('Returned to Prontera Capital. Visit the Inn (50z) to recover to 100%!');
    }

    this.mode = 'world';
    document.body.className = 'world';
    this.fade = 1;
    this.ui.onSyncAll();
  }

  restAtCamp() {
    this.roster.forEach((h) => {
      this.recalcHero(h);
      h.hp = h.maxhp;
    });
    for (const zId of Object.keys(this.zoneMobsState)) {
      for (const m of this.zoneMobsState[zId]) {
        if (!m.E.boss || (this.mvpRespawnTimers[m.key] || 0) <= 0) {
          m.alive = true;
          m.x = m.px = m.hx;
          m.y = m.py = m.hy;
        }
      }
    }
    this.fade = 0.55;
    this.sfx('heal');
    this.sfx('buff');
    this.toast('Kafra Service fully restored your party HP & SP!');
    this.ui.onSyncAll();
  }

  drawWorldProp(o) {
    const ctx = this.ctx;
    const X = o.x * this.WT + 24;
    const Y = o.yy * this.WT + 44;
    ctx.save();
    ctx.translate(X, Y);
    ctx.scale(3, 3);
    const fill = (rx, ry, rw, rh, c) => {
      ctx.fillStyle = c;
      ctx.fillRect(rx, ry, rw, rh);
    };
    if (o.k === 'tree') {
      if (o.m) {
        fill(-1, -16, 3, 16, '#4a4238');
        fill(-6, -13, 5, 2, '#4a4238');
        fill(2, -17, 6, 2, '#4a4238');
      } else {
        const d = o.v & 1 ? '#1f3a26' : '#223d22';
        fill(-1, -5, 3, 5, '#3d2c1e');
        fill(-8, -12, 16, 8, d);
        fill(-6, -18, 12, 7, '#27482d');
        fill(-4, -23, 8, 6, '#2f5634');
      }
    } else if (o.k === 'rock') {
      fill(-7, -7, 14, 7, '#5a5f66');
      fill(-5, -11, 10, 5, '#6b7078');
    } else if (o.k === 'tent') {
      const c = o.c;
      fill(-11, -4, 22, 4, sh(c, -0.3));
      fill(-9, -8, 18, 4, c);
      fill(-7, -12, 14, 4, c);
      fill(-5, -16, 10, 4, sh(c, 0.1));
      fill(-2, -9, 4, 9, '#221a14');
    } else if (o.k === 'building') {
      // Matte pixel Ragnarok Guild / Refinery / Tavern building facade
      const roof = o.c || '#7a3b32';
      fill(-16, -18, 32, 16, '#6e6558');
      fill(-14, -16, 28, 12, '#8c8273');
      fill(-18, -24, 36, 7, sh(roof, -0.2));
      fill(-16, -28, 32, 5, roof);
      fill(-12, -31, 24, 3, sh(roof, 0.15));
      fill(-4, -11, 8, 11, '#2a2018');
      fill(-11, -13, 4, 5, '#ffe08a');
      fill(7, -13, 4, 5, '#ffe08a');
    } else if (o.k === 'fountain') {
      const f = ((this.rt / 180) | 0) % 2;
      fill(-14, -6, 28, 6, '#7a828c');
      fill(-12, -8, 24, 4, '#3a7ca5');
      fill(-4, -16, 8, 10, '#9aa2ad');
      fill(-2, -21 - f, 4, 6, '#8fd3ff');
      fill(-6, -14 + f, 12, 2, '#b8e4ff');
    } else if (o.k === 'portal') {
      const pulse = Math.sin(this.rt / 200) * 1.5;
      ctx.restore();
      ctx.save();
      ctx.translate(X, Y - 14);
      ctx.strokeStyle = o.col || '#7fd0ff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(0, 6, 22 + pulse, 10 + pulse * 0.5, 0, 0, 6.3);
      ctx.stroke();
      ctx.globalAlpha = 0.32;
      ctx.fillStyle = o.col || '#7fd0ff';
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.font = '700 12.5px "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#0b0d10';
      ctx.strokeText(o.label, 0, -18);
      ctx.fillStyle = o.col || '#7fd0ff';
      ctx.fillText(o.label, 0, -18);
      ctx.restore();
      return;
    } else if (o.k === 'chest') {
      fill(-6, -7, 12, 7, '#7a4b24');
      fill(-6, -9, 12, 3, '#9c6434');
      fill(-6, -5, 12, 1, '#e6c877');
      fill(-1, -6, 2, 3, '#ffe08a');
      ctx.restore();
      ctx.save();
      ctx.translate(X, Y - 34);
      ctx.font = '600 11.5px "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#0b0d10';
      ctx.strokeText(`🎁 ${o.label}`, 0, 0);
      ctx.fillStyle = '#ffe08a';
      ctx.fillText(`🎁 ${o.label}`, 0, 0);
      ctx.restore();
      return;
    } else if (o.k === 'fire') {
      const f = ((this.rt / 120) | 0) % 2;
      fill(-5, -2, 10, 2, '#3d2c1e');
      fill(-3, -7 + f, 6, 5, '#e8742c');
      fill(-2, -10 + f, 4, 4, '#f2b23c');
    } else if (o.k === 'tombstone') {
      fill(-6, -13, 12, 13, '#525861');
      fill(-4, -16, 8, 3, '#68707a');
      fill(-1, -14, 2, 9, '#e6c877');
      fill(-3, -12, 6, 2, '#e6c877');
      ctx.restore();
      if (o.timerText) {
        ctx.save();
        ctx.translate(X, Y - 52);
        ctx.font = '700 12.5px "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#0b0d10';
        ctx.strokeText(`💀 ${o.name} — Respawn ${o.timerText}`, 0, 0);
        ctx.fillStyle = '#ffd45e';
        ctx.fillText(`💀 ${o.name} — Respawn ${o.timerText}`, 0, 0);
        ctx.restore();
      }
      return;
    }
    ctx.restore();
  }

  drawWorldEntity(e, label, col, boss) {
    const ctx = this.ctx;
    const sx = (e.px + 0.5) * this.WT;
    const sy = (e.py + 0.5) * this.WT + 14;
    const k = 2 * (e.scale || 1);
    ctx.fillStyle = 'rgba(0,0,0,0.38)';
    ctx.beginPath();
    ctx.ellipse(sx, sy, 9 * k, 3.5 * k, 0, 0, 6.3);
    ctx.fill();

    ctx.save();
    ctx.translate(Math.round(sx), Math.round(sy));
    ctx.scale((e.face || 1) * k, k);
    drawUnitSprite(ctx, { ...e, pose: e.moving ? 'walk' : 'idle', poseT: 0 }, this.rt);
    ctx.restore();

    if (e.chase) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(sx + 14, sy - 54, 18, 16);
      ctx.strokeStyle = '#17131c';
      ctx.strokeRect(sx + 14, sy - 54, 18, 16);
      ctx.fillStyle = '#d93829';
      ctx.font = 'bold 13px "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('!', sx + 23, sy - 41);
    }

    if (label) {
      const ty = sy - 30 * k - 4;
      ctx.font = '600 12.5px "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#0b0d10';
      ctx.strokeText(label, sx, ty);
      ctx.fillStyle = col;
      ctx.fillText(label, sx, ty);
      if (boss) drawRoleBadge(ctx, 'Boss', sx - 9, ty - 32, 2);
    }
  }

  renderWorld() {
    const ctx = this.ctx;
    const Z = this.getCurrentZone();
    const WW = this.WW, WH = this.WH, WT = this.WT, CW = this.CW, CH = this.CH;
    const GC = Z.palette.grass;
    const MC = Z.palette.marsh;
    const PC = Z.palette.path;
    const WC = Z.palette.water;
    const CC = Z.palette.camp[0];

    this.camX = Math.round(Math.max(0, Math.min(WW * WT - CW, (this.P.px + 0.5) * WT - CW / 2)));
    this.camY = Math.round(Math.max(0, Math.min(WH * WT - CH, (this.P.py + 0.5) * WT - CH / 2)));

    const x0 = (this.camX / WT) | 0;
    const y0 = (this.camY / WT) | 0;
    const x1 = Math.min(WW - 1, x0 + Math.ceil(CW / WT));
    const y1 = Math.min(WH - 1, y0 + Math.ceil(CH / WT) + 1);
    const wt = (this.rt / 600) | 0;
    const objs = [];

    ctx.save();
    ctx.translate(-this.camX, -this.camY);

    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const i = y * WW + x;
        const t = this.wmap[i];
        const v = this.wvar[i];
        const X = x * WT;
        const Y = y * WT;
        const b = t >= 5 ? this.wbase[i] : t;

        ctx.fillStyle = b === 0 ? GC[v] : b === 2 ? MC[v] : b === 1 ? PC[v & 1] : b === 3 ? CC : WC[(v + wt) & 1];
        ctx.fillRect(X, Y, WT, WT);

        if (t === 5) objs.push({ y: y + 0.6, k: 'tree', x, yy: y, v, m: this.wbase[i] === 2 });
        else if (t === 6) objs.push({ y: y + 0.6, k: 'rock', x, yy: y });
      }
    }

    if (this.clickMark && this.rt - this.clickMark.t < 700) {
      const p = (this.rt - this.clickMark.t) / 700;
      ctx.globalAlpha = 1 - p;
      ctx.strokeStyle = '#ffe08a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse((this.clickMark.x + 0.5) * WT, (this.clickMark.y + 0.5) * WT + 10, 8 + p * 14, 4 + p * 7, 0, 0, 6.3);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    const isTown = Z.type === 'town';
    if (isTown) {
      objs.push(
        { y: 23.6, k: 'fountain', x: 28, yy: 23 },
        { y: 15.6, k: 'building', x: 16, yy: 15, c: '#7a4432' },
        { y: 15.6, k: 'building', x: 40, yy: 15, c: '#345a7d' },
        { y: 26.6, k: 'building', x: 20, yy: 26, c: '#486e4a' }
      );
      const unrec = this.getUnrecruitedHeroes().slice(0, 4);
      unrec.forEach((uh, idx) => {
        const tx = 12 + idx * 2.5;
        const ty = 20 + (idx % 2);
        objs.push({
          y: ty + 0.5,
          e: { ...uh, px: tx, py: ty, face: 1, moving: false, scale: 0.95 },
          label: `${uh.name} (${uh.job} · ${uh.recruitCost}z)`,
          col: '#8fe3a0',
          boss: false
        });
      });
    } else {
      objs.push(
        { y: this.CAMP.y - 2 + 0.6, k: 'tent', x: this.CAMP.x - 2, yy: this.CAMP.y - 2, c: '#8a7a5a' },
        { y: this.CAMP.y + 0.6, k: 'fire', x: this.CAMP.x, yy: this.CAMP.y }
      );
    }

    // Interactive Town/Camp NPCs
    for (const npc of Z.npcs || []) {
      objs.push({
        y: npc.y + 0.5,
        e: { ...npc, px: npc.x, py: npc.y, face: 1, moving: false, scale: 1.0 },
        label: `★ ${npc.name}`,
        col: npc.col || '#ffe9a8',
        boss: false
      });
    }

    // N/S/E/W Block Warp Portals
    const portals = this.getZonePortals(Z);
    for (const portal of portals) {
      objs.push({
        y: portal.y + 0.3,
        k: 'portal',
        x: portal.x,
        yy: portal.y,
        label: portal.label,
        col: portal.col
      });
    }

    // Dungeon Treasure Chests
    for (const ch of Z.chests || []) {
      if (!this.openedChests.has(ch.id)) {
        objs.push({
          y: ch.y + 0.5,
          k: 'chest',
          x: ch.x,
          yy: ch.y,
          label: ch.name
        });
      }
    }

    // Active Monsters & 5-10 min Respawn Tombstones (for both MVPs & defeated packs!)
    for (const m of this.mobs) {
      if (m.alive) {
        objs.push({
          y: m.py + 0.5,
          e: m,
          label: `${m.E.name} (${m.E.recLv || ''}, ${m.E.elem || 'Neutral'})${m.E.boss ? '' : ` ×${m.count}`}`,
          col: m.E.boss ? '#ffd45e' : '#f0b0a6',
          boss: m.E.boss
        });
      } else {
        const remMs = m.E.boss ? (this.mvpRespawnTimers[m.key] || 0) : (m.respawnLeftMs || 0);
        const remSec = Math.ceil(remMs / 1000);
        const mm = String(Math.floor(remSec / 60)).padStart(2, '0');
        const ss = String(remSec % 60).padStart(2, '0');
        objs.push({
          y: m.hy + 0.6,
          k: 'tombstone',
          x: m.hx,
          yy: m.hy,
          name: m.E.name,
          timerText: `${mm}:${ss}`
        });
      }
    }

    const active = this.getActiveParty();
    const leader = active[0] || this.roster[0];
    objs.push({
      y: this.P.py + 0.5,
      e: this.P,
      label: `${leader.name} (Lv.${leader.lv}/${leader.jobLv} · Squad ${active.length})`,
      col: '#9fc3ea',
      boss: false
    });
    for (const f of this.followers) objs.push({ y: f.py + 0.5, e: f });

    objs.sort((a, b) => a.y - b.y);
    for (const o of objs) {
      if (o.e) this.drawWorldEntity(o.e, o.label, o.col, o.boss);
      else this.drawWorldProp(o);
    }
    ctx.restore();

    ctx.textAlign = 'left';
    ctx.font = '600 22px Georgia, serif';
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#0b0d10';
    ctx.strokeText(`[${Z.code}] ${Z.name}`, 18, 34);
    ctx.fillStyle = '#e6c877';
    ctx.fillText(`[${Z.code}] ${Z.name}`, 18, 34);

    ctx.font = '600 12.5px "Segoe UI", sans-serif';
    ctx.strokeText(`${Z.sub} (${Z.recLv} · ${Z.elem})`, 18, 54);
    ctx.fillStyle = '#a8b5c4';
    ctx.fillText(`${Z.sub} (${Z.recLv} · ${Z.elem})`, 18, 54);

    const mx = CW - this.mm.width - 16;
    const my = 16;
    ctx.fillStyle = '#0b0d10';
    ctx.fillRect(mx - 3, my - 3, this.mm.width + 6, this.mm.height + 6);
    ctx.drawImage(this.mm, mx, my);

    for (const p of portals) {
      ctx.fillStyle = p.col || '#7fd0ff';
      ctx.fillRect(mx + p.x * 3 - 3, my + p.y * 3 - 3, 7, 7);
    }
    for (const m of this.mobs) {
      if (m.alive) {
        ctx.fillStyle = m.E.boss ? '#ffd45e' : '#ff5a4a';
        const s = m.E.boss ? 8 : 5;
        ctx.fillRect(mx + m.px * 3 - s / 2 + 1, my + m.py * 3 - s / 2 + 1, s, s);
      }
    }
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(mx + this.P.px * 3 - 2, my + this.P.py * 3 - 2, 6, 6);
    ctx.strokeStyle = '#c9a455';
    ctx.lineWidth = 1;
    ctx.strokeRect(mx - 2.5, my - 2.5, this.mm.width + 5, this.mm.height + 5);

    if (this.rt < this.toastUntil) {
      ctx.font = '600 15px "Segoe UI", sans-serif';
      const w = ctx.measureText(this.toastMsg).width + 36;
      ctx.fillStyle = 'rgba(8,10,14,0.88)';
      ctx.fillRect(CW / 2 - w / 2, 74, w, 36);
      ctx.strokeStyle = '#c9a455';
      ctx.lineWidth = 1;
      ctx.strokeRect(CW / 2 - w / 2 + 0.5, 74.5, w - 1, 35);
      ctx.fillStyle = '#ffe9a8';
      ctx.textAlign = 'center';
      ctx.fillText(this.toastMsg, CW / 2, 97);
    }
  }

  // =========================================================================
  // INPUT, DRAG-PAN & ZOOM
  // =========================================================================
  pickBattleUnit(ev) {
    const r = this.cv.getBoundingClientRect();
    const mx = ((ev.clientX - r.left) * this.CW) / r.width;
    const my = ((ev.clientY - r.top) * this.CH) / r.height;
    let best = null;
    for (const u of this.units) {
      if (u.gone) continue;
      const p = this.iso(u.px, u.py);
      const t = this.topOf(u);
      if (Math.abs(mx - p.x) < 32 * (u.scale || 1) * this.bCam.zoom && my > t.y - 6 && my < p.y + 10) {
        const d = Math.abs(mx - p.x) + Math.abs(my - (p.y + t.y) / 2) - (u.px + u.py);
        if (!best || d < best.d) best = { d, u };
      }
    }
    return best ? best.u : null;
  }

  screenToBattleGrid(ev) {
    const r = this.cv.getBoundingClientRect();
    const mx = ((ev.clientX - r.left) * this.CW) / r.width;
    const my = ((ev.clientY - r.top) * this.CH) / r.height;
    let best = { gx: 0, gy: 0, dist: 1e9 };
    for (let y = 0; y < this.GH; y++) {
      for (let x = 0; x < this.GW; x++) {
        const p = this.iso(x, y);
        const d = Math.hypot(mx - p.x, my - p.y);
        if (d < best.dist) best = { gx: x, gy: y, dist: d };
      }
    }
    return { gx: best.gx, gy: best.gy };
  }

  bindEvents() {
    this.cv.addEventListener('contextmenu', (e) => e.preventDefault());

    this.cv.addEventListener('mousedown', (ev) => {
      if (this.mode === 'battle') {
        this.bCam.dragging = true;
        this.bCam.dragMoved = false;
        this.bCam.startX = ev.clientX - this.bCam.x;
        this.bCam.startY = ev.clientY - this.bCam.y;
      }
    });

    window.addEventListener('mousemove', (ev) => {
      if (this.mode === 'battle' && this.bCam.dragging) {
        const nx = ev.clientX - this.bCam.startX;
        const ny = ev.clientY - this.bCam.startY;
        if (Math.hypot(nx - this.bCam.x, ny - this.bCam.y) > 4) {
          this.bCam.dragMoved = true;
        }
        this.bCam.x = nx;
        this.bCam.y = ny;
      }
    });

    window.addEventListener('mouseup', () => {
      this.bCam.dragging = false;
    });

    this.cv.addEventListener('wheel', (ev) => {
      if (this.mode !== 'battle') return;
      ev.preventDefault();
      const delta = ev.deltaY < 0 ? 0.08 : -0.08;
      this.bCam.zoom = Math.max(0.62, Math.min(1.55, this.bCam.zoom + delta));
    });

    this.cv.addEventListener('click', async (ev) => {
      this.audioInit();
      if (this.bCam.dragMoved) {
        this.bCam.dragMoved = false;
        return;
      }

      if (this.mode === 'world') {
        const r = this.cv.getBoundingClientRect();
        let tx = ((((ev.clientX - r.left) * this.CW) / r.width + this.camX) / this.WT) | 0;
        let ty = ((((ev.clientY - r.top) * this.CH) / r.height + this.camY) / this.WT) | 0;

        const Z = this.getCurrentZone();
        // Check if player clicked on an interactive Town/Camp NPC
        const clickedNpc = (Z.npcs || []).find((n) => Math.abs(n.x - tx) <= 1 && Math.abs(n.y - ty) <= 1);
        if (clickedNpc) {
          this.interactWorldNpc(clickedNpc);
        }

        // Check if player clicked on an unrecruited hero lounging outside Town Tavern
        if (Z.type === 'town') {
          const unrec = this.getUnrecruitedHeroes().slice(0, 4);
          unrec.forEach((uh, idx) => {
            const ux = 12 + idx * 2.5;
            const uy = 20 + (idx % 2);
            if (Math.abs(ux - tx) <= 1.5 && Math.abs(uy - ty) <= 1.5) {
              if (this.ui.onOpenTab) this.ui.onOpenTab('barracks');
              this.toast(`${uh.name} (${uh.job}): "Hire me for ${uh.recruitCost}z at the Guild Tavern!"`);
            }
          });
        }

        if (!this.walkable(tx, ty)) {
          let best = null;
          for (let dy = -2; dy <= 2; dy++) {
            for (let dx = -2; dx <= 2; dx++) {
              if (this.walkable(tx + dx, ty + dy)) {
                const d = Math.abs(dx) + Math.abs(dy);
                if (!best || d < best.d) best = { d, x: tx + dx, y: ty + dy };
              }
            }
          }
          if (!best) return;
          tx = best.x;
          ty = best.y;
        }
        this.P.path = this.wpath(this.P.x, this.P.y, tx, ty);
        this.clickMark = { x: tx, y: ty, t: this.rt };
        return;
      }

      const picked = this.pickBattleUnit(ev);

      if (!this.autoBattle && this.current && this.current.side === 'hero' && this.manualResolve) {
        const u = this.current;
        const resolve = this.manualResolve;
        if (picked && picked.side === 'foe' && picked.alive) {
          this.manualResolve = null;
          const tiles = this.reach(u);
          const inRangeTile = tiles
            .filter((n) => this.dist(n, picked) <= this.effectiveRange(u, n.x, n.y))
            .sort((a, b) => a.d - b.d)[0];
          if (inRangeTile) {
            await this.moveTo(u, inRangeTile);
            await this.strike(u, picked, 1.15);
            await this.chain(u, picked);
          } else {
            await this.actAI(u, this.units.filter((o) => o.alive && o.side === 'foe'), this.units.filter((o) => o.alive && o.side === 'hero'));
          }
          resolve();
          return;
        }

        const { gx, gy } = this.screenToBattleGrid(ev);
        const reachNode = this.reach(u).find((n) => n.x === gx && n.y === gy);
        if (reachNode) {
          this.manualResolve = null;
          await this.moveTo(u, reachNode);
          const foes = this.units.filter((o) => o.alive && o.side === 'foe');
          const targetInReach = foes.find((f) => this.dist(u, f) <= this.effectiveRange(u));
          if (targetInReach) {
            await this.strike(u, targetInReach, 1.1);
            await this.chain(u, targetInReach);
          }
          resolve();
          return;
        }
      }

      if (picked) {
        this.selected = picked;
        if (picked.roster) {
          this.ui.onSelectHero(picked.roster, true);
        } else {
          this.ui.onSyncAll();
        }
      }
    });

    this.cv.addEventListener('mousemove', (ev) => {
      this.hover = this.mode === 'battle' && !this.bCam.dragging ? this.pickBattleUnit(ev) : null;
    });

    this.cv.addEventListener('mouseleave', () => {
      this.hover = null;
    });

    window.addEventListener('keydown', (ev) => {
      if (this.mode !== 'world') return;
      const k = ev.key.toLowerCase();
      this.audioInit();
      if (k.startsWith('arrow')) ev.preventDefault();
      if (k === 'r') this.restAtCamp();
      this.keys[k] = true;
    });

    window.addEventListener('keyup', (ev) => {
      this.keys[ev.key.toLowerCase()] = false;
    });
  }

  frameStep(dt) {
    this.rt += dt;
    this.tickMvpRespawnTimers(dt);
    if (this.mode === 'world') {
      this.worldTick(dt);
      this.renderWorld();
    } else {
      if (this.started && !this.paused && !this.instant) {
        this.tickBattle(dt * this.speed);
      }
      this.renderBattle();
    }
    if (this.fade > 0) {
      this.fade = Math.max(0, this.fade - dt / 420);
      this.ctx.fillStyle = `rgba(0,0,0,${this.fade})`;
      this.ctx.fillRect(0, 0, this.CW, this.CH);
    }
  }
}

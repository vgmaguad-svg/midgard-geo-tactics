(function() {
"use strict";

// --- src/data/jobs.js ---
// src/data/jobs.js
// Complete 8-Skill Split 1st Jobs (4 + 4) & Job Lv. 40 Dual-Path 2nd Job Advancements
// Combines the user's GRIDHUNT 4+4 Job Tree structure with Midgard Geo-Tactics' Elemental & Status Combat Depth!

const MAX_JOB_LV = 40;

const SWORDSMAN_TREE = {
  title1: 'Swordsman',
  branchA: 'Offense Mastery',
  branchB: 'Defense Mastery',
  skills: [
    { id: 'sw_cleave',  name: 'Cleave',            reqJobLv: 1,  maxLv: 10, tier: 1, branch: 'A', type: 'sweep', elem: 'Neutral', pow: 1.15, scale: 0.04, r: 1, cd: 3, desc: 'Active: Sweeping slash hitting all adjacent foes (1.15x + 0.04x/Lv ATK).' },
    { id: 'sw_bash',    name: 'Magnum Bash',       reqJobLv: 8,  maxLv: 10, tier: 1, branch: 'A', type: 'knockback', elem: 'Fire', status: 'stun', statusChance: 0.45, pow: 1.35, scale: 0.05, r: 1, cd: 2, desc: 'Active: Fire-infused blow (1.35x + 0.05x/Lv) with 45% STUN & knockback.' },
    { id: 'sw_quicken', name: 'Sword Quicken',     reqJobLv: 18, maxLv: 10, tier: 1, branch: 'A', stat: { atk: 2, spd: 2 }, desc: 'Passive: +2 ATK and +2 SPD per skill level.' },
    { id: 'sw_frenzy',  name: 'Frenzy Edge',       reqJobLv: 28, maxLv: 10, tier: 1, branch: 'A', stat: { atk: 3, crit: 1 }, desc: 'Passive: +3 ATK and +1% Crit Rate per skill level.' },
    { id: 'sw_rally',   name: 'Provoke & Rally',   reqJobLv: 1,  maxLv: 10, tier: 1, branch: 'B', type: 'taunt', elem: 'Neutral', status: 'provoke', statusChance: 1.0, r: 3, pow: 1.0, cd: 4, desc: 'Active: Taunts enemies within 3 tiles (-20% DEF) and boosts own DEF.' },
    { id: 'sw_sbash',   name: 'Shield Bash',       reqJobLv: 8,  maxLv: 10, tier: 1, branch: 'B', type: 'strike', elem: 'Neutral', status: 'stun', statusChance: 0.60, pow: 1.28, scale: 0.05, r: 1, cd: 3, desc: 'Active: Heavy shield slam (1.28x + 0.05x/Lv) with 60% chance to STUN.' },
    { id: 'sw_endure',  name: 'Endure',            reqJobLv: 18, maxLv: 10, tier: 1, branch: 'B', stat: { def: 2, hp: 18 }, desc: 'Passive: +2 DEF and +18 Max HP per skill level.' },
    { id: 'sw_const',   name: 'Iron Constitution', reqJobLv: 28, maxLv: 10, tier: 1, branch: 'B', stat: { def: 2, mdef: 2, hp: 14 }, desc: 'Passive: +2 DEF, +2 MDEF, and +14 Max HP per level.' }
  ],
  paths: {
    A: {
      name: 'Battle Knight',
      desc: 'Offensive vanguard specializing in two-handed cleaves, aura blades, and piercing thrusts.',
      branchA: 'Vanguard Arts',
      branchB: 'Aura & Swiftness',
      skills: [
        { id: 'bk_bowl',   name: 'Bowling Bash',   reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'A', type: 'blast', elem: 'Fire', pow: 1.35, scale: 0.06, r: 1, cd: 3, desc: 'Active: Heavy Fire-edged slam hitting target + adjacent foes.' },
        { id: 'bk_spiral', name: 'Spiral Pierce',  reqJobLv: 10, maxLv: 10, tier: 2, branch: 'A', type: 'strike', elem: 'Wind', pow: 1.75, scale: 0.07, r: 2, cd: 3, desc: 'Active: Wind-charged piercing thrust (1.75x + 0.07x/Lv, shatters Frozen).' },
        { id: 'bk_charge', name: 'Charge Attack',  reqJobLv: 20, maxLv: 10, tier: 2, branch: 'A', type: 'knockback', elem: 'Neutral', status: 'stun', statusChance: 0.5, pow: 1.60, scale: 0.06, r: 1, cd: 2, desc: 'Active: Relentless lunge (1.60x + 0.06x/Lv) with knockback.' },
        { id: 'bk_slayer', name: 'Dragon Slayer',  reqJobLv: 30, maxLv: 10, tier: 2, branch: 'A', stat: { atk: 5, crit: 1.5 }, desc: 'Passive: +5 ATK and +1.5% Crit Rate per skill level.' },
        { id: 'bk_aura',   name: 'Aura Blade',     reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'B', stat: { atk: 4, hit: 2 }, desc: 'Passive: +4 ATK and +2 HIT per skill level.' },
        { id: 'bk_conc',   name: 'Concentration',  reqJobLv: 10, maxLv: 10, tier: 2, branch: 'B', stat: { atk: 3, spd: 2 }, desc: 'Passive: +3 ATK and +2 SPD per skill level.' },
        { id: 'bk_parry',  name: 'Parry Stance',   reqJobLv: 20, maxLv: 10, tier: 2, branch: 'B', stat: { flee: 3, def: 2 }, desc: 'Passive: +3 FLEE and +2 DEF per skill level.' },
        { id: 'bk_bersrk', name: 'Crimson Vigor',  reqJobLv: 30, maxLv: 10, tier: 2, branch: 'B', stat: { hp: 30, atk: 3 }, desc: 'Passive: +30 Max HP and +3 ATK per skill level.' }
      ]
    },
    B: {
      name: 'Tank Knight',
      desc: 'Armored bastion protecting allies with holy shockwaves, heavy shields, and impenetrable wards.',
      branchA: 'Bulwark & Protection',
      branchB: 'Sacred Bastion',
      skills: [
        { id: 'tk_guard',  name: 'Auto Guard',       reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'A', stat: { def: 3, hp: 25 }, desc: 'Passive: +3 DEF and +25 Max HP per skill level.' },
        { id: 'tk_defend', name: 'Defender Stance',  reqJobLv: 10, maxLv: 10, tier: 2, branch: 'A', stat: { def: 3, mdef: 3 }, desc: 'Passive: +3 DEF and +3 MDEF per skill level.' },
        { id: 'tk_sboom',  name: 'Shield Boomerang', reqJobLv: 20, maxLv: 10, tier: 2, branch: 'A', type: 'strike', elem: 'Neutral', status: 'stun', statusChance: 0.55, pow: 1.50, scale: 0.06, r: 3, cd: 2, desc: 'Active: Ranged shield throw (3 tiles) with 55% STUN.' },
        { id: 'tk_aegis',  name: 'Aegis Wall',       reqJobLv: 30, maxLv: 10, tier: 2, branch: 'A', stat: { hp: 45, def: 3 }, desc: 'Passive: +45 Max HP and +3 DEF per skill level.' },
        { id: 'tk_gcross', name: 'Grand Cross',      reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'B', type: 'sweep', elem: 'Holy', pow: 1.25, scale: 0.05, r: 2, cd: 3, desc: 'Active: Holy shockwave hitting foes within 2 tiles (175% vs Shadow/Undead).' },
        { id: 'tk_hcross', name: 'Holy Cross',       reqJobLv: 10, maxLv: 10, tier: 2, branch: 'B', type: 'strike', elem: 'Holy', pow: 1.65, scale: 0.06, r: 1, cd: 2, desc: 'Active: Sacred two-hit strike dealing 1.65x + 0.06x/Lv.' },
        { id: 'tk_provid', name: 'Providence',       reqJobLv: 20, maxLv: 10, tier: 2, branch: 'B', stat: { mdef: 4, spd: 2 }, desc: 'Passive: +4 MDEF and +2 SPD per skill level.' },
        { id: 'tk_faith',  name: 'Devotion Oath',    reqJobLv: 30, maxLv: 10, tier: 2, branch: 'B', stat: { hp: 35, mdef: 3 }, desc: 'Passive: +35 Max HP and +3 MDEF per skill level.' }
      ]
    }
  }
};

const ARCHER_TREE = {
  title1: 'Archer',
  branchA: 'Marksman Archery',
  branchB: 'Agility & Precision',
  skills: [
    { id: 'ar_volley',  name: 'Venom Arrow Shower',    reqJobLv: 1,  maxLv: 10, tier: 1, branch: 'A', type: 'blast', elem: 'Poison', status: 'poison', statusChance: 0.55, pow: 0.92, scale: 0.04, r: 1, cd: 3, desc: 'Active: Rains poison arrows on target + adjacent foes (55% POISON).' },
    { id: 'ar_dstrafe', name: 'Gale Double Strafe',    reqJobLv: 8,  maxLv: 10, tier: 1, branch: 'A', type: 'strike', elem: 'Wind', pow: 1.42, scale: 0.05, r: 5, cd: 2, desc: 'Active: Twin Wind arrows (175% SHATTER damage vs Water/FROZEN!).' },
    { id: 'ar_charge',  name: 'Charge Arrow',          reqJobLv: 18, maxLv: 10, tier: 1, branch: 'A', type: 'knockback', elem: 'Neutral', pow: 1.45, scale: 0.05, r: 5, cd: 3, desc: 'Active: Heavy draw shot (1.45x + 0.05x/Lv) with knockback.' },
    { id: 'ar_vulture', name: "Vulture's Eye",         reqJobLv: 28, maxLv: 10, tier: 1, branch: 'A', stat: { atk: 3, spd: 1 }, desc: 'Passive: +3 ATK and +1 SPD per skill level.' },
    { id: 'ar_owl',     name: "Owl's Eye",             reqJobLv: 1,  maxLv: 10, tier: 1, branch: 'B', stat: { dex: 2, hit: 2 }, desc: 'Passive: +2 DEX and +2 HIT per skill level.' },
    { id: 'ar_conc',    name: 'Improve Concentration', reqJobLv: 8,  maxLv: 10, tier: 1, branch: 'B', stat: { agi: 2, dex: 2 }, desc: 'Passive: +2 AGI and +2 DEX per skill level.' },
    { id: 'ar_keen',    name: 'Keen Sight',            reqJobLv: 18, maxLv: 10, tier: 1, branch: 'B', stat: { crit: 1.2, hit: 2 }, desc: 'Passive: +1.2% Crit Rate and +2 HIT per skill level.' },
    { id: 'ar_nimble',  name: 'Nimble Step',           reqJobLv: 28, maxLv: 10, tier: 1, branch: 'B', stat: { spd: 2, flee: 3 }, desc: 'Passive: +2 SPD and +3 FLEE per skill level.' }
  ],
  paths: {
    A: {
      name: 'Sniper',
      desc: 'Elite long-range sharpshooter with falcon strikes, focused critical arrows, and true sight.',
      branchA: 'Precision Sniping',
      branchB: 'Falcon & Wind',
      skills: [
        { id: 'sn_fwind',  name: 'Focused Arrow Strike', reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'A', type: 'strike', elem: 'Wind', pow: 1.75, scale: 0.06, r: 5, cd: 2, desc: 'Active: Piercing Wind shot dealing 1.75x + 0.06x/Lv.' },
        { id: 'sn_blitz',  name: 'Falcon Assault',       reqJobLv: 10, maxLv: 10, tier: 2, branch: 'A', type: 'blast', elem: 'Neutral', pow: 1.22, scale: 0.05, r: 1, cd: 3, desc: 'Active: Falcon dive hitting target + adjacent foes.' },
        { id: 'sn_trues',  name: 'True Sight',           reqJobLv: 20, maxLv: 10, tier: 2, branch: 'A', stat: { atk: 4, crit: 1.5, hit: 2 }, desc: 'Passive: +4 ATK, +1.5% Crit, and +2 HIT per level.' },
        { id: 'sn_rain',   name: 'Arrow Storm',          reqJobLv: 30, maxLv: 10, tier: 2, branch: 'A', type: 'blast', elem: 'Wind', pow: 1.35, scale: 0.06, r: 2, cd: 4, desc: 'Active: Wide 2-tile Wind arrow barrage.' },
        { id: 'sn_windw',  name: 'Wind Walk',            reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'B', stat: { spd: 3, flee: 3 }, desc: 'Passive: +3 SPD and +3 FLEE per skill level.' },
        { id: 'sn_beast',  name: 'Beast Bane',           reqJobLv: 10, maxLv: 10, tier: 2, branch: 'B', stat: { atk: 4, dex: 2 }, desc: 'Passive: +4 ATK and +2 DEX per skill level.' },
        { id: 'sn_steel',  name: 'Steel Crow',           reqJobLv: 20, maxLv: 10, tier: 2, branch: 'B', stat: { atk: 3, spd: 2, crit: 1 }, desc: 'Passive: +3 ATK, +2 SPD, and +1% Crit per level.' },
        { id: 'sn_reflex', name: 'Phantom Step',         reqJobLv: 30, maxLv: 10, tier: 2, branch: 'B', stat: { agi: 3, flee: 4, hp: 15 }, desc: 'Passive: +3 AGI, +4 FLEE, and +15 HP per level.' }
      ]
    },
    B: {
      name: 'Ranger Trapper',
      desc: 'Tactical skirmisher blending explosive area traps with high mobility and survival.',
      branchA: 'Explosive Traps',
      branchB: 'Wilderness Survival',
      skills: [
        { id: 'tr_blast',  name: 'Blast Mine',        reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'A', type: 'blast', elem: 'Wind', status: 'stun', statusChance: 0.4, pow: 1.25, scale: 0.06, r: 1, cd: 3, desc: 'Active: Wind trap on target + adjacent foes (40% STUN).' },
        { id: 'tr_clay',   name: 'Claymore Trap',     reqJobLv: 10, maxLv: 10, tier: 2, branch: 'A', type: 'blast', elem: 'Fire', pow: 1.40, scale: 0.06, r: 2, cd: 4, desc: 'Active: Wide 2-tile Fire explosion (1.40x + 0.06x/Lv).' },
        { id: 'tr_aim',    name: 'Aimed Bolt',        reqJobLv: 20, maxLv: 10, tier: 2, branch: 'A', type: 'strike', elem: 'Neutral', pow: 1.70, scale: 0.06, r: 5, cd: 2, desc: 'Active: Snipes ensnared foe (1.70x + 0.06x/Lv ATK).' },
        { id: 'tr_deton',  name: 'Detonator Mastery', reqJobLv: 30, maxLv: 10, tier: 2, branch: 'A', stat: { atk: 4, int: 2, hit: 2 }, desc: 'Passive: +4 ATK, +2 INT, and +2 HIT per level.' },
        { id: 'tr_camo',   name: 'Camouflage',        reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'B', stat: { flee: 4, crit: 1.5 }, desc: 'Passive: +4 FLEE and +1.5% Crit Rate per level.' },
        { id: 'tr_nature', name: "Ranger's Resilience",reqJobLv: 10, maxLv: 10, tier: 2, branch: 'B', stat: { hp: 30, def: 2, mdef: 2 }, desc: 'Passive: +30 Max HP, +2 DEF, and +2 MDEF per level.' },
        { id: 'tr_gale',   name: 'Gale Stride',       reqJobLv: 20, maxLv: 10, tier: 2, branch: 'B', stat: { spd: 4, agi: 2 }, desc: 'Passive: +4 SPD and +2 AGI per skill level.' },
        { id: 'tr_fang',   name: 'Warg Strike',       reqJobLv: 30, maxLv: 10, tier: 2, branch: 'B', stat: { atk: 4, spd: 2, hp: 20 }, desc: 'Passive: +4 ATK, +2 SPD, and +20 HP per level.' }
      ]
    }
  }
};

const ACOLYTE_TREE = {
  title1: 'Acolyte',
  branchA: 'Divine Support',
  branchB: 'Holy Combat',
  skills: [
    { id: 'ac_heal',   name: 'Sanctuary Heal',    reqJobLv: 1,  maxLv: 10, tier: 1, branch: 'A', type: 'heal', elem: 'Holy', pow: 2.05, scale: 0.12, r: 4, cd: 1, desc: 'Active: Restores HP to injured ally and cures Poison & Stun.' },
    { id: 'ac_bless',  name: 'Blessing & Agi Up', reqJobLv: 8,  maxLv: 10, tier: 1, branch: 'A', type: 'buff', elem: 'Holy', pow: 1.0, r: 3, cd: 4, desc: 'Active: Grants allies BLESSING (+25% ATK/MATK) & AGI+ (+30% SPD).' },
    { id: 'ac_incagi', name: 'Swift Faith',       reqJobLv: 18, maxLv: 10, tier: 1, branch: 'A', stat: { agi: 2, spd: 2, flee: 2 }, desc: 'Passive: +2 AGI, +2 SPD, and +2 FLEE per level.' },
    { id: 'ac_angel',  name: 'Angelus',           reqJobLv: 28, maxLv: 10, tier: 1, branch: 'A', stat: { def: 2, mdef: 2, hp: 20 }, desc: 'Passive: +2 DEF, +2 MDEF, and +20 Max HP per level.' },
    { id: 'ac_lex',    name: 'Lex Aeterna',       reqJobLv: 1,  maxLv: 10, tier: 1, branch: 'B', type: 'strike', elem: 'Holy', status: 'lex', statusChance: 1.0, pow: 1.15, scale: 0.05, r: 4, cd: 3, desc: 'Active: Marks enemy with LEX AETERNA (Next hit deals 2.0x DMG!).' },
    { id: 'ac_ruwach', name: 'Signum Crucis',     reqJobLv: 8,  maxLv: 10, tier: 1, branch: 'B', type: 'blast', elem: 'Holy', pow: 1.10, scale: 0.05, r: 1, cd: 3, desc: 'Active: Holy burst on target + adjacent foes (175% vs Shadow/Undead).' },
    { id: 'ac_dbane',  name: 'Demon Bane',        reqJobLv: 18, maxLv: 10, tier: 1, branch: 'B', stat: { atk: 3, matk: 3 }, desc: 'Passive: +3 ATK and +3 MATK per skill level.' },
    { id: 'ac_dprot',  name: 'Divine Protection', reqJobLv: 28, maxLv: 10, tier: 1, branch: 'B', stat: { def: 3, hp: 18 }, desc: 'Passive: +3 DEF and +18 Max HP per skill level.' }
  ],
  paths: {
    A: {
      name: 'High Priest',
      desc: 'Master healer and exorcist wielding Sanctuary area heals and Magnus Exorcismus.',
      branchA: 'Sanctuary & Wards',
      branchB: 'Exorcism Light',
      skills: [
        { id: 'hp_sanc',   name: 'Sanctuary',         reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'A', type: 'heal', elem: 'Holy', pow: 2.35, scale: 0.12, r: 4, cd: 1, desc: 'Active: High-potency Sanctuary Heal.' },
        { id: 'hp_assump', name: 'Assumptio',         reqJobLv: 10, maxLv: 10, tier: 2, branch: 'A', stat: { def: 3, mdef: 3, hp: 25 }, desc: 'Passive: +3 DEF, +3 MDEF, and +25 Max HP per level.' },
        { id: 'hp_medit',  name: 'Meditatio',         reqJobLv: 20, maxLv: 10, tier: 2, branch: 'A', stat: { matk: 4, int: 2, hp: 20 }, desc: 'Passive: +4 MATK, +2 INT, and +20 HP per level.' },
        { id: 'hp_colus',  name: 'Coluceo Heal',      reqJobLv: 30, maxLv: 10, tier: 2, branch: 'A', type: 'buff', elem: 'Holy', pow: 1.0, r: 3, cd: 3, desc: 'Active: Radiant Blessing & Agi aura.' },
        { id: 'hp_magnus', name: 'Magnus Exorcismus', reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'B', type: 'blast', elem: 'Holy', pow: 1.35, scale: 0.06, r: 2, cd: 3, desc: 'Active: Grand Holy circle hitting 2-tile radius.' },
        { id: 'hp_judex',  name: 'Judex',             reqJobLv: 10, maxLv: 10, tier: 2, branch: 'B', type: 'strike', elem: 'Holy', status: 'lex', statusChance: 0.65, pow: 1.75, scale: 0.07, r: 4, cd: 2, desc: 'Active: Pillar of light (1.75x + 0.07x/Lv) + 65% Lex Aeterna.' },
        { id: 'hp_ador',   name: 'Adoramus Grace',    reqJobLv: 20, maxLv: 10, tier: 2, branch: 'B', stat: { matk: 5, crit: 1.5 }, desc: 'Passive: +5 MATK and +1.5% Crit Rate per level.' },
        { id: 'hp_suff',   name: 'Suffragium',        reqJobLv: 30, maxLv: 10, tier: 2, branch: 'B', stat: { spd: 4, dex: 2 }, desc: 'Passive: +4 SPD and +2 DEX per skill level.' }
      ]
    },
    B: {
      name: 'Battle Monk',
      desc: 'Martial acolyte channeling spirit spheres into devastating melee combos.',
      branchA: 'Spirit Combo',
      branchB: 'Iron Body & Chi',
      skills: [
        { id: 'mk_triple', name: 'Raging Trifecta',  reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'A', type: 'knockback', elem: 'Holy', status: 'stun', statusChance: 0.5, pow: 1.70, scale: 0.06, r: 1, cd: 2, desc: 'Active: 3-hit Spirit combo with knockback & 50% STUN.' },
        { id: 'mk_finger', name: 'Finger Offensive', reqJobLv: 10, maxLv: 10, tier: 2, branch: 'A', type: 'blast', elem: 'Holy', pow: 1.25, scale: 0.05, r: 1, cd: 3, desc: 'Active: Hurls spirit spheres at target + adjacent foes.' },
        { id: 'mk_asura',  name: 'Guillotine Fist',  reqJobLv: 20, maxLv: 10, tier: 2, branch: 'A', type: 'strike', elem: 'Holy', pow: 2.10, scale: 0.08, r: 1, cd: 4, desc: 'Active: Ultimate spirit strike (2.10x + 0.08x/Lv).' },
        { id: 'mk_ironf',  name: 'Iron Fist',        reqJobLv: 30, maxLv: 10, tier: 2, branch: 'A', stat: { atk: 5, matk: 3 }, desc: 'Passive: +5 ATK and +3 MATK per skill level.' },
        { id: 'mk_steelb', name: 'Steel Body',       reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'B', stat: { def: 4, mdef: 3, hp: 30 }, desc: 'Passive: +4 DEF, +3 MDEF, and +30 Max HP per level.' },
        { id: 'mk_dodge',  name: 'Spiritual Cadence',reqJobLv: 10, maxLv: 10, tier: 2, branch: 'B', stat: { spd: 3, flee: 3 }, desc: 'Passive: +3 SPD and +3 FLEE per skill level.' },
        { id: 'mk_zen',    name: 'Zen Focus',        reqJobLv: 20, maxLv: 10, tier: 2, branch: 'B', stat: { str: 2, int: 2, crit: 1 }, desc: 'Passive: +2 STR, +2 INT, and +1% Crit per level.' },
        { id: 'mk_vigor',  name: 'Chakra Flow',      reqJobLv: 30, maxLv: 10, tier: 2, branch: 'B', stat: { hp: 35, atk: 3 }, desc: 'Passive: +35 Max HP and +3 ATK per skill level.' }
      ]
    }
  }
};

const THIEF_TREE = {
  title1: 'Thief',
  branchA: 'Lethal Strikes',
  branchB: 'Shadow & Evasion',
  skills: [
    { id: 'th_dbl',    name: 'Double Attack',    reqJobLv: 1,  maxLv: 10, tier: 1, branch: 'A', type: 'strike', elem: 'Neutral', pow: 1.45, scale: 0.05, r: 1, cd: 2, desc: 'Active: Swift twin blade strike (1.45x + 0.05x/Lv ATK).' },
    { id: 'th_enven',  name: 'Envenom',          reqJobLv: 8,  maxLv: 10, tier: 1, branch: 'A', type: 'strike', elem: 'Poison', status: 'poison', statusChance: 0.75, pow: 1.40, scale: 0.05, r: 1, cd: 2, desc: 'Active: Poisoned stab (75% POISON: -10% HP/turn & -20% DEF).' },
    { id: 'th_detox',  name: 'Venom Mastery',    reqJobLv: 18, maxLv: 10, tier: 1, branch: 'A', stat: { atk: 3, crit: 1 }, desc: 'Passive: +3 ATK and +1% Crit Rate per skill level.' },
    { id: 'th_ambush', name: 'Backstab Ambush',  reqJobLv: 28, maxLv: 10, tier: 1, branch: 'A', type: 'strike', elem: 'Shadow', pow: 1.60, scale: 0.06, r: 1, cd: 3, desc: 'Active: Shadow flank strike (1.60x + 0.06x/Lv ATK).' },
    { id: 'th_dodge',  name: 'Improve Dodge',    reqJobLv: 1,  maxLv: 10, tier: 1, branch: 'B', stat: { agi: 2, flee: 3 }, desc: 'Passive: +2 AGI and +3 FLEE per skill level.' },
    { id: 'th_steal',  name: 'Pilfer Agility',   reqJobLv: 8,  maxLv: 10, tier: 1, branch: 'B', stat: { spd: 2, luk: 2 }, desc: 'Passive: +2 SPD and +2 LUK per skill level.' },
    { id: 'th_hiding', name: 'Shadow Cloak',     reqJobLv: 18, maxLv: 10, tier: 1, branch: 'B', stat: { flee: 3, mdef: 2 }, desc: 'Passive: +3 FLEE and +2 MDEF per skill level.' },
    { id: 'th_sand',   name: 'Sprinkle Sand',    reqJobLv: 28, maxLv: 10, tier: 1, branch: 'B', type: 'blast', elem: 'Earth', status: 'stun', statusChance: 0.35, pow: 0.95, scale: 0.04, r: 1, cd: 3, desc: 'Active: Blinding sweep hitting target + adjacent foes.' }
  ],
  paths: {
    A: {
      name: 'Assassin Cross',
      desc: 'Deadly dual-blade master unleashing Sonic Blow flurries and Grimtooth shadow waves.',
      branchA: 'Sonic Execution',
      branchB: 'Deadly Poison',
      skills: [
        { id: 'as_sonic',  name: 'Sonic Blow',            reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'A', type: 'strike', elem: 'Neutral', status: 'stun', statusChance: 0.45, pow: 1.85, scale: 0.07, r: 1, cd: 3, desc: 'Active: Rapid 8-hit flurry dealing 1.85x + 0.07x/Lv ATK.' },
        { id: 'as_grim',   name: 'Grimtooth',             reqJobLv: 10, maxLv: 10, tier: 2, branch: 'A', type: 'blast', elem: 'Shadow', pow: 1.25, scale: 0.05, r: 1, cd: 3, desc: 'Active: Shadow wave hitting target + adjacent foes.' },
        { id: 'as_katar',  name: 'Advanced Katar',        reqJobLv: 20, maxLv: 10, tier: 2, branch: 'A', stat: { atk: 4, spd: 2 }, desc: 'Passive: +4 ATK and +2 SPD per skill level.' },
        { id: 'as_sbk',    name: 'Soul Destroyer',        reqJobLv: 30, maxLv: 10, tier: 2, branch: 'A', type: 'strike', elem: 'Shadow', pow: 2.05, scale: 0.08, r: 3, cd: 4, desc: 'Active: Ranged shadow blade (2.05x + 0.08x/Lv).' },
        { id: 'as_edp',    name: 'Enchant Deadly Poison', reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'B', stat: { atk: 4, crit: 1.5 }, desc: 'Passive: +4 ATK and +1.5% Crit Rate per level.' },
        { id: 'as_rhand',  name: 'Dual Wield Mastery',    reqJobLv: 10, maxLv: 10, tier: 2, branch: 'B', stat: { atk: 3, hit: 3 }, desc: 'Passive: +3 ATK and +3 HIT per skill level.' },
        { id: 'as_cloak',  name: 'Cloaking Exceed',       reqJobLv: 20, maxLv: 10, tier: 2, branch: 'B', stat: { spd: 3, flee: 4 }, desc: 'Passive: +3 SPD and +4 FLEE per skill level.' },
        { id: 'as_venom',  name: 'Fatal Reflex',          reqJobLv: 30, maxLv: 10, tier: 2, branch: 'B', stat: { agi: 3, luk: 2, crit: 1 }, desc: 'Passive: +3 AGI, +2 LUK, and +1% Crit per level.' }
      ]
    },
    B: {
      name: 'Stalker',
      desc: 'Elusive shadow rogue specializing in tactical disruption, evasion, and survival.',
      branchA: 'Shadow Disruption',
      branchB: 'Phantom Evasion',
      skills: [
        { id: 'st_raid',   name: 'Sightless Mind',    reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'A', type: 'sweep', elem: 'Shadow', status: 'stun', statusChance: 0.45, pow: 1.25, scale: 0.05, r: 1, cd: 3, desc: 'Active: Ambush flash hitting all adjacent enemies.' },
        { id: 'st_bstab',  name: 'Fatal Backstab',    reqJobLv: 10, maxLv: 10, tier: 2, branch: 'A', type: 'strike', elem: 'Shadow', pow: 1.80, scale: 0.07, r: 1, cd: 2, desc: 'Active: Precision vital strike (1.80x + 0.07x/Lv).' },
        { id: 'st_strip',  name: 'Divest Armor',      reqJobLv: 20, maxLv: 10, tier: 2, branch: 'A', type: 'strike', elem: 'Poison', status: 'poison', statusChance: 0.85, pow: 1.60, scale: 0.06, r: 1, cd: 3, desc: 'Active: Armor-shredding blow (85% POISON / -20% DEF).' },
        { id: 'st_plag',   name: 'Plagiarism',        reqJobLv: 30, maxLv: 10, tier: 2, branch: 'A', stat: { atk: 4, matk: 4 }, desc: 'Passive: +4 ATK and +4 MATK per skill level.' },
        { id: 'st_chase',  name: 'Chase Walk',        reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'B', stat: { spd: 4, flee: 3 }, desc: 'Passive: +4 SPD and +3 FLEE per skill level.' },
        { id: 'st_reject', name: 'Reject Sword',      reqJobLv: 10, maxLv: 10, tier: 2, branch: 'B', stat: { def: 3, flee: 3 }, desc: 'Passive: +3 DEF and +3 FLEE per skill level.' },
        { id: 'st_pres',   name: 'Preserve Instinct', reqJobLv: 20, maxLv: 10, tier: 2, branch: 'B', stat: { hp: 30, mdef: 3 }, desc: 'Passive: +30 Max HP and +3 MDEF per level.' },
        { id: 'st_intimid',name: 'Shadow Step',       reqJobLv: 30, maxLv: 10, tier: 2, branch: 'B', stat: { agi: 3, dex: 3, crit: 1 }, desc: 'Passive: +3 AGI, +3 DEX, and +1% Crit per level.' }
      ]
    }
  }
};

const MAGE_TREE = {
  title1: 'Mage',
  branchA: 'Elemental Bolts',
  branchB: 'Arcane Control',
  skills: [
    { id: 'mg_fball',  name: 'Fire Pillar Blast',    reqJobLv: 1,  maxLv: 10, tier: 1, branch: 'A', type: 'blast', elem: 'Fire', pow: 1.20, scale: 0.05, r: 1, cd: 3, desc: 'Active: Fire AoE blast hitting target + adjacent foes (175% vs Earth/Undead).' },
    { id: 'mg_cbolt',  name: 'Frost Diver',          reqJobLv: 8,  maxLv: 10, tier: 1, branch: 'A', type: 'strike', elem: 'Water', status: 'freeze', statusChance: 0.65, pow: 1.30, scale: 0.06, r: 4, cd: 2, desc: 'Active: Water spell with 65% FREEZE (turns foe Water property!).' },
    { id: 'mg_lbolt',  name: 'Jupitel Thunder',      reqJobLv: 18, maxLv: 10, tier: 1, branch: 'A', type: 'knockback', elem: 'Wind', pow: 1.55, scale: 0.06, r: 4, cd: 3, desc: 'Active: Wind sphere dealing 175% SHATTER damage to FROZEN foes!' },
    { id: 'mg_elem',   name: 'Elemental Lore',       reqJobLv: 28, maxLv: 10, tier: 1, branch: 'A', stat: { matk: 4, int: 1 }, desc: 'Passive: +4 MATK and +1 INT per skill level.' },
    { id: 'mg_sprec',  name: 'Increase SP Recovery', reqJobLv: 1,  maxLv: 10, tier: 1, branch: 'B', stat: { matk: 3, int: 1 }, desc: 'Passive: +3 MATK and +1 INT per skill level.' },
    { id: 'mg_ecoat',  name: 'Energy Coat',          reqJobLv: 8,  maxLv: 10, tier: 1, branch: 'B', stat: { mdef: 2, hp: 20 }, desc: 'Passive: +2 MDEF and +20 Max HP per skill level.' },
    { id: 'mg_fwall',  name: 'Frost Nova',           reqJobLv: 18, maxLv: 10, tier: 1, branch: 'B', type: 'sweep', elem: 'Water', status: 'freeze', statusChance: 0.5, pow: 1.05, scale: 0.04, r: 1, cd: 3, desc: 'Active: Freezing ring damaging & chilling adjacent enemies.' },
    { id: 'mg_soul',   name: 'Soul Strike',          reqJobLv: 28, maxLv: 10, tier: 1, branch: 'B', stat: { spd: 2, dex: 2, mdef: 1 }, desc: 'Passive: +2 SPD, +2 DEX, and +1 MDEF per level.' }
  ],
  paths: {
    A: {
      name: 'High Wizard',
      desc: 'Archmage of destruction calling down Meteor Storms and Jupitel Thunder.',
      branchA: 'Cataclysmic Magic',
      branchB: 'Arcane Amplification',
      skills: [
        { id: 'hw_meteor', name: 'Meteor Storm',           reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'A', type: 'blast', elem: 'Fire', status: 'stun', statusChance: 0.45, pow: 1.30, scale: 0.06, r: 2, cd: 4, desc: 'Active: Meteors strike 2-tile radius (45% STUN).' },
        { id: 'hw_jupit',  name: 'Lord of Vermilion',      reqJobLv: 10, maxLv: 10, tier: 2, branch: 'A', type: 'blast', elem: 'Wind', pow: 1.45, scale: 0.07, r: 2, cd: 3, desc: 'Active: Wind storm dealing 175% SHATTER to Frozen enemies.' },
        { id: 'hw_sgust',  name: 'Storm Gust',             reqJobLv: 20, maxLv: 10, tier: 2, branch: 'A', type: 'blast', elem: 'Water', status: 'freeze', statusChance: 0.70, pow: 1.35, scale: 0.06, r: 2, cd: 3, desc: 'Active: Blizzard vortex (70% FREEZE) hitting 2-tile radius.' },
        { id: 'hw_ganb',   name: 'Napalm Vulcan',          reqJobLv: 30, maxLv: 10, tier: 2, branch: 'A', type: 'strike', elem: 'Shadow', pow: 2.05, scale: 0.08, r: 4, cd: 3, desc: 'Active: Arcane beam dealing 2.05x + 0.08x/Lv MATK.' },
        { id: 'hw_amp',    name: 'Mystical Amplification', reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'B', stat: { matk: 5, int: 2 }, desc: 'Passive: +5 MATK and +2 INT per skill level.' },
        { id: 'hw_qcast',  name: 'Magic Power',            reqJobLv: 10, maxLv: 10, tier: 2, branch: 'B', stat: { spd: 3, dex: 2 }, desc: 'Passive: +3 SPD and +2 DEX per skill level.' },
        { id: 'hw_drain',  name: 'Soul Drain',             reqJobLv: 20, maxLv: 10, tier: 2, branch: 'B', stat: { matk: 4, hp: 25 }, desc: 'Passive: +4 MATK and +25 Max HP per skill level.' },
        { id: 'hw_sight',  name: 'Sight Blaster',          reqJobLv: 30, maxLv: 10, tier: 2, branch: 'B', stat: { mdef: 4, crit: 1.5 }, desc: 'Passive: +4 MDEF and +1.5% Crit Rate per level.' }
      ]
    },
    B: {
      name: 'Professor',
      desc: 'Battle scholar mastering spell weaving, defensive fields, and swift casting.',
      branchA: 'Spell Weaving',
      branchB: 'Scholarly Wards',
      skills: [
        { id: 'pr_bolt',    name: 'Double Casting',   reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'A', type: 'strike', elem: 'Wind', pow: 1.70, scale: 0.07, r: 4, cd: 2, desc: 'Active: Twin Wind bolts (1.70x + 0.07x/Lv MATK).' },
        { id: 'pr_hwave',   name: "Heaven's Drive",   reqJobLv: 10, maxLv: 10, tier: 2, branch: 'A', type: 'blast', elem: 'Earth', pow: 1.25, scale: 0.06, r: 1, cd: 3, desc: 'Active: Earth spikes hitting target + adjacent foes.' },
        { id: 'pr_web',     name: 'Spider Web',       reqJobLv: 20, maxLv: 10, tier: 2, branch: 'A', type: 'strike', elem: 'Fire', status: 'stun', statusChance: 0.6, pow: 1.80, scale: 0.07, r: 4, cd: 3, desc: 'Active: Snares and scorches target (60% STUN).' },
        { id: 'pr_dragon',  name: 'Dragonology',      reqJobLv: 30, maxLv: 10, tier: 2, branch: 'A', stat: { matk: 5, int: 2, hit: 2 }, desc: 'Passive: +5 MATK, +2 INT, and +2 HIT per level.' },
        { id: 'pr_indulge', name: 'Health Conversion',reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'B', stat: { hp: 35, matk: 3 }, desc: 'Passive: +35 Max HP and +3 MATK per skill level.' },
        { id: 'pr_wall',    name: 'Wall of Fog',      reqJobLv: 10, maxLv: 10, tier: 2, branch: 'B', stat: { flee: 4, mdef: 3 }, desc: 'Passive: +4 FLEE and +3 MDEF per skill level.' },
        { id: 'pr_fores',   name: 'Foresight',        reqJobLv: 20, maxLv: 10, tier: 2, branch: 'B', stat: { spd: 4, agi: 2 }, desc: 'Passive: +4 SPD and +2 AGI per skill level.' },
        { id: 'pr_deluge',  name: 'Arcane Field',     reqJobLv: 30, maxLv: 10, tier: 2, branch: 'B', stat: { def: 3, mdef: 3, hp: 20 }, desc: 'Passive: +3 DEF, +3 MDEF, and +20 HP per level.' }
      ]
    }
  }
};

const SPEARMAN_TREE = {
  title1: 'Spearman',
  branchA: 'Polearm Offense',
  branchB: 'Phalanx Guard',
  skills: [
    { id: 'sp_impale',  name: 'Thunder Spear Pierce', reqJobLv: 1,  maxLv: 10, tier: 1, branch: 'A', type: 'strike', elem: 'Wind', pow: 1.48, scale: 0.05, r: 2, cd: 2, desc: 'Active: Wind spear thrust reaching 2 tiles (175% vs Water/FROZEN).' },
    { id: 'sp_stab',    name: 'Spear Stab',           reqJobLv: 8,  maxLv: 10, tier: 1, branch: 'A', type: 'blast', elem: 'Neutral', pow: 1.05, scale: 0.05, r: 1, cd: 3, desc: 'Active: Piercing sweep hitting target + adjacent foes.' },
    { id: 'sp_mast',    name: 'Spear Mastery',        reqJobLv: 18, maxLv: 10, tier: 1, branch: 'A', stat: { atk: 3, hit: 1 }, desc: 'Passive: +3 ATK and +1 HIT per skill level.' },
    { id: 'sp_cav',     name: 'Cavalry Mastery',      reqJobLv: 28, maxLv: 10, tier: 1, branch: 'A', stat: { spd: 2, atk: 2 }, desc: 'Passive: +2 SPD and +2 ATK per skill level.' },
    { id: 'sp_guard',   name: 'Phalanx Brace',        reqJobLv: 1,  maxLv: 10, tier: 1, branch: 'B', type: 'taunt', elem: 'Holy', status: 'provoke', statusChance: 1.0, r: 3, pow: 1.0, cd: 4, desc: 'Active: Taunts foes within 3 tiles and boosts DEF.' },
    { id: 'sp_faith',   name: 'Faith',                reqJobLv: 8,  maxLv: 10, tier: 1, branch: 'B', stat: { hp: 25, mdef: 1 }, desc: 'Passive: +25 Max HP and +1 MDEF per skill level.' },
    { id: 'sp_iron',    name: 'Scale Reinforcement',  reqJobLv: 18, maxLv: 10, tier: 1, branch: 'B', stat: { def: 2, hp: 15 }, desc: 'Passive: +2 DEF and +15 Max HP per skill level.' },
    { id: 'sp_reflect', name: 'Spear Boomerang',      reqJobLv: 28, maxLv: 10, tier: 1, branch: 'B', type: 'strike', elem: 'Neutral', pow: 1.35, scale: 0.05, r: 3, cd: 3, desc: 'Active: Ranged lance throw (3 tiles).' }
  ],
  paths: {
    A: {
      name: 'Dragon Knight',
      desc: 'Fierce polearm breaker unleashing Brandish Spear arcs and Hundred Spears barrages.',
      branchA: 'Dragon Lance Arts',
      branchB: 'Polearm Quicken',
      skills: [
        { id: 'dk_brand',   name: 'Brandish Spear',      reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'A', type: 'sweep', elem: 'Wind', pow: 1.25, scale: 0.05, r: 2, cd: 3, desc: 'Active: Sweeping Wind polearm arc hitting foes within 2 tiles.' },
        { id: 'dk_hund',    name: 'Hundred Spears',      reqJobLv: 10, maxLv: 10, tier: 2, branch: 'A', type: 'strike', elem: 'Neutral', pow: 1.85, scale: 0.07, r: 2, cd: 3, desc: 'Active: Multi-thrust lance combo (1.85x + 0.07x/Lv).' },
        { id: 'dk_breath',  name: 'Dragon Breath',       reqJobLv: 20, maxLv: 10, tier: 2, branch: 'A', type: 'blast', elem: 'Fire', pow: 1.35, scale: 0.06, r: 2, cd: 4, desc: 'Active: Draconic Fire breath hitting 2-tile radius.' },
        { id: 'dk_train',   name: 'Dragon Training',     reqJobLv: 30, maxLv: 10, tier: 2, branch: 'A', stat: { atk: 5, hp: 25 }, desc: 'Passive: +5 ATK and +25 Max HP per skill level.' },
        { id: 'dk_quicken', name: 'Spear Quicken',       reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'B', stat: { spd: 3, atk: 3 }, desc: 'Passive: +3 SPD and +3 ATK per skill level.' },
        { id: 'dk_crush',   name: 'Crush Strike',        reqJobLv: 10, maxLv: 10, tier: 2, branch: 'B', stat: { atk: 4, crit: 1.5 }, desc: 'Passive: +4 ATK and +1.5% Crit Rate per level.' },
        { id: 'dk_vital',   name: 'Vitality Activation', reqJobLv: 20, maxLv: 10, tier: 2, branch: 'B', stat: { hp: 35, def: 2 }, desc: 'Passive: +35 Max HP and +2 DEF per skill level.' },
        { id: 'dk_sonic',   name: 'Sonic Wave',          reqJobLv: 30, maxLv: 10, tier: 2, branch: 'B', stat: { spd: 3, hit: 3 }, desc: 'Passive: +3 SPD and +3 HIT per skill level.' }
      ]
    },
    B: {
      name: 'Paladin',
      desc: "Holy spearman blending Martyr's Reckoning strikes with sacred defensive auras.",
      branchA: 'Sacred Spear',
      branchB: 'Aura of Devotion',
      skills: [
        { id: 'pa_sacrif', name: "Martyr's Reckoning", reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'A', type: 'strike', elem: 'Holy', pow: 1.75, scale: 0.07, r: 2, cd: 2, desc: 'Active: Heavy sacred lance blow (1.75x + 0.07x/Lv).' },
        { id: 'pa_gcross', name: 'Radiant Cross',      reqJobLv: 10, maxLv: 10, tier: 2, branch: 'A', type: 'sweep', elem: 'Holy', pow: 1.25, scale: 0.05, r: 2, cd: 3, desc: 'Active: Holy cross wave hitting 2-tile radius.' },
        { id: 'pa_banish', name: 'Banishing Point',    reqJobLv: 20, maxLv: 10, tier: 2, branch: 'A', type: 'knockback', elem: 'Holy', status: 'stun', statusChance: 0.6, pow: 1.90, scale: 0.07, r: 2, cd: 3, desc: 'Active: Precision holy thrust with 60% STUN.' },
        { id: 'pa_piety',  name: 'Piety',              reqJobLv: 30, maxLv: 10, tier: 2, branch: 'A', stat: { atk: 4, mdef: 3 }, desc: 'Passive: +4 ATK and +3 MDEF per skill level.' },
        { id: 'pa_defaur', name: 'Defender Aura',      reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'B', stat: { def: 3, mdef: 2, hp: 25 }, desc: 'Passive: +3 DEF, +2 MDEF, and +25 Max HP per level.' },
        { id: 'pa_gospel', name: 'Gospel',             reqJobLv: 10, maxLv: 10, tier: 2, branch: 'B', type: 'buff', elem: 'Holy', pow: 1.0, r: 3, cd: 4, desc: 'Active: Inspires allies within 3 tiles with Blessing & AGI+.' },
        { id: 'pa_resist', name: 'Resistant Souls',    reqJobLv: 20, maxLv: 10, tier: 2, branch: 'B', stat: { mdef: 4, hp: 30 }, desc: 'Passive: +4 MDEF and +30 Max HP per skill level.' },
        { id: 'pa_shield', name: 'Shield Spell',       reqJobLv: 30, maxLv: 10, tier: 2, branch: 'B', stat: { def: 4, spd: 2 }, desc: 'Passive: +4 DEF and +2 SPD per skill level.' }
      ]
    }
  }
};

const CHANTER_TREE = {
  title1: 'Bard',
  branchA: 'Ensemble Hymns',
  branchB: 'Sonic Strings',
  skills: [
    { id: 'ch_hymn',    name: 'Poem of Bragi',  reqJobLv: 1,  maxLv: 10, tier: 1, branch: 'A', type: 'buff', elem: 'Wind', pow: 1.0, r: 3, cd: 4, desc: 'Active: Allies within 3 tiles gain BLESSING (+25% ATK) & AGI+ (+30% SPD).' },
    { id: 'ch_idun1',   name: 'Apple of Idun',  reqJobLv: 8,  maxLv: 10, tier: 1, branch: 'A', type: 'heal', elem: 'Holy', pow: 1.65, scale: 0.08, r: 4, cd: 2, desc: 'Active: Soothing melody healing injured ally & curing debuffs.' },
    { id: 'ch_encore',  name: 'Encore Harmony', reqJobLv: 18, maxLv: 10, tier: 1, branch: 'A', stat: { hp: 22, matk: 2 }, desc: 'Passive: +22 Max HP and +2 MATK per skill level.' },
    { id: 'ch_whistle', name: 'A Whistle',      reqJobLv: 28, maxLv: 10, tier: 1, branch: 'A', stat: { spd: 2, flee: 2 }, desc: 'Passive: +2 SPD and +2 FLEE per skill level.' },
    { id: 'ch_mstrk',   name: 'Melody Strike',  reqJobLv: 1,  maxLv: 10, tier: 1, branch: 'B', type: 'strike', elem: 'Wind', pow: 1.38, scale: 0.05, r: 4, cd: 2, desc: 'Active: Sonic Wind note dealing 1.38x + 0.05x/Lv (175% vs Water/FROZEN).' },
    { id: 'ch_disson',  name: 'Dissonance',     reqJobLv: 8,  maxLv: 10, tier: 1, branch: 'B', type: 'blast', elem: 'Neutral', pow: 0.98, scale: 0.04, r: 1, cd: 3, desc: 'Active: Discordant wave hitting target + adjacent foes.' },
    { id: 'ch_music',   name: 'Musical Lesson', reqJobLv: 18, maxLv: 10, tier: 1, branch: 'B', stat: { spd: 2, dex: 2 }, desc: 'Passive: +2 SPD and +2 DEX per skill level.' },
    { id: 'ch_tempo',   name: 'Allegro Tempo',  reqJobLv: 28, maxLv: 10, tier: 1, branch: 'B', stat: { atk: 2, crit: 1 }, desc: 'Passive: +2 ATK and +1% Crit Rate per skill level.' }
  ],
  paths: {
    A: {
      name: 'Minstrel',
      desc: 'Inspirational performer empowering the entire squad with restorative hymns and war songs.',
      branchA: 'Grand Symphonies',
      branchB: 'Harmonious Aura',
      skills: [
        { id: 'mn_idun2',  name: 'Song of Lutie',       reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'A', type: 'heal', elem: 'Holy', pow: 2.0, scale: 0.09, r: 4, cd: 2, desc: 'Active: Restorative song healing injured party member.' },
        { id: 'mn_sieg',   name: 'Drum on Battlefield', reqJobLv: 10, maxLv: 10, tier: 2, branch: 'A', type: 'buff', elem: 'Wind', pow: 1.0, r: 3, cd: 3, desc: 'Active: Wide 3-tile ATK & SPD battle anthem.' },
        { id: 'mn_lokis',  name: "Loki's Veil",         reqJobLv: 20, maxLv: 10, tier: 2, branch: 'A', stat: { mdef: 4, def: 3 }, desc: 'Passive: +4 MDEF and +3 DEF per skill level.' },
        { id: 'mn_swing',  name: 'Swing Dance',         reqJobLv: 30, maxLv: 10, tier: 2, branch: 'A', stat: { spd: 4, agi: 2 }, desc: 'Passive: +4 SPD and +2 AGI per skill level.' },
        { id: 'mn_harmon', name: 'Harmonize',           reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'B', stat: { atk: 3, matk: 3, spd: 2 }, desc: 'Passive: +3 ATK, +3 MATK, and +2 SPD per level.' },
        { id: 'mn_seren',  name: 'Sunset Serenade',     reqJobLv: 10, maxLv: 10, tier: 2, branch: 'B', stat: { hp: 30, def: 2 }, desc: 'Passive: +30 Max HP and +2 DEF per skill level.' },
        { id: 'mn_voice',  name: 'Voice Lessons',       reqJobLv: 20, maxLv: 10, tier: 2, branch: 'B', stat: { matk: 4, int: 2 }, desc: 'Passive: +4 MATK and +2 INT per skill level.' },
        { id: 'mn_siren',  name: "Siren's Voice",       reqJobLv: 30, maxLv: 10, tier: 2, branch: 'B', stat: { flee: 4, hp: 20 }, desc: 'Passive: +4 FLEE and +20 Max HP per skill level.' }
      ]
    },
    B: {
      name: 'Maestro Virtuoso',
      desc: 'Offensive battle bard shredding foes with Arrow Vulcan barrages and Reverberation waves.',
      branchA: 'Virtuoso Barrage',
      branchB: 'Acoustic Resonance',
      skills: [
        { id: 'mv_vulcan', name: 'Arrow Vulcan',      reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'A', type: 'strike', elem: 'Wind', pow: 1.75, scale: 0.07, r: 4, cd: 2, desc: 'Active: Multi-note Wind barrage dealing 1.75x + 0.07x/Lv ATK.' },
        { id: 'mv_reverb', name: 'Reverberation',     reqJobLv: 10, maxLv: 10, tier: 2, branch: 'A', type: 'blast', elem: 'Wind', pow: 1.25, scale: 0.06, r: 1, cd: 3, desc: 'Active: Sonic shockwave hitting target + adjacent foes.' },
        { id: 'mv_metal',  name: 'Metallic Sound',    reqJobLv: 20, maxLv: 10, tier: 2, branch: 'A', type: 'strike', elem: 'Neutral', status: 'stun', statusChance: 0.55, pow: 1.90, scale: 0.07, r: 4, cd: 3, desc: 'Active: Piercing high-note blast (55% STUN).' },
        { id: 'mv_severe', name: 'Severe Rainstorm',  reqJobLv: 30, maxLv: 10, tier: 2, branch: 'A', type: 'blast', elem: 'Wind', pow: 1.35, scale: 0.06, r: 2, cd: 4, desc: 'Active: 2-tile arrow/sound storm (1.35x + 0.06x/Lv).' },
        { id: 'mv_amp',    name: 'Acoustic Amp',      reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'B', stat: { atk: 4, dex: 2 }, desc: 'Passive: +4 ATK and +2 DEX per skill level.' },
        { id: 'mv_cresc',  name: 'Crescendo',         reqJobLv: 10, maxLv: 10, tier: 2, branch: 'B', stat: { atk: 3, crit: 1.5 }, desc: 'Passive: +3 ATK and +1.5% Crit Rate per level.' },
        { id: 'mv_cadenc', name: 'Staccato Cadence',  reqJobLv: 20, maxLv: 10, tier: 2, branch: 'B', stat: { spd: 4, hit: 2 }, desc: 'Passive: +4 SPD and +2 HIT per skill level.' },
        { id: 'mv_fin',    name: 'Grand Finale',      reqJobLv: 30, maxLv: 10, tier: 2, branch: 'B', stat: { atk: 4, matk: 4 }, desc: 'Passive: +4 ATK and +4 MATK per skill level.' }
      ]
    }
  }
};

const BLACKSMITH_TREE = {
  title1: 'Blacksmith',
  branchA: 'Forge & Cleave',
  branchB: 'Iron Tempering',
  skills: [
    { id: 'bs_hfall',  name: 'Hammer Fall',      reqJobLv: 1,  maxLv: 10, tier: 1, branch: 'A', type: 'sweep', elem: 'Earth', status: 'stun', statusChance: 0.50, pow: 1.30, scale: 0.05, r: 1, cd: 3, desc: 'Active: Earth-shattering slam hitting adjacent foes (50% STUN).' },
    { id: 'bs_mammon', name: 'Mammonite',        reqJobLv: 8,  maxLv: 10, tier: 1, branch: 'A', type: 'strike', elem: 'Neutral', pow: 1.55, scale: 0.06, r: 1, cd: 2, desc: 'Active: Heavy golden strike dealing 1.55x + 0.06x/Lv ATK.' },
    { id: 'bs_adren',  name: 'Adrenaline Rush',  reqJobLv: 18, maxLv: 10, tier: 1, branch: 'A', stat: { atk: 3, spd: 2 }, desc: 'Passive: +3 ATK and +2 SPD per skill level.' },
    { id: 'bs_power',  name: 'Power Thrust',     reqJobLv: 28, maxLv: 10, tier: 1, branch: 'A', stat: { atk: 4, crit: 1 }, desc: 'Passive: +4 ATK and +1% Crit Rate per skill level.' },
    { id: 'bs_hilt',   name: 'Hilt Binding',     reqJobLv: 1,  maxLv: 10, tier: 1, branch: 'B', stat: { str: 2, atk: 2 }, desc: 'Passive: +2 STR and +2 ATK per skill level.' },
    { id: 'bs_skin',   name: 'Skin Tempering',   reqJobLv: 8,  maxLv: 10, tier: 1, branch: 'B', stat: { def: 2, mdef: 2 }, desc: 'Passive: +2 DEF and +2 MDEF per skill level.' },
    { id: 'bs_cart',   name: 'Cart Revolution',  reqJobLv: 18, maxLv: 10, tier: 1, branch: 'B', type: 'knockback', elem: 'Earth', pow: 1.40, scale: 0.05, r: 1, cd: 3, desc: 'Active: Heavy cart ram with knockback.' },
    { id: 'bs_iron',   name: 'Iron Temper',      reqJobLv: 28, maxLv: 10, tier: 1, branch: 'B', stat: { hp: 25, def: 2 }, desc: 'Passive: +25 Max HP and +2 DEF per skill level.' }
  ],
  paths: {
    A: {
      name: 'Whitesmith',
      desc: 'Master battle smith crushing enemies with Cart Termination & Maximum Power Thrust.',
      branchA: 'Cart Assault',
      branchB: 'Overthrust Aura',
      skills: [
        { id: 'ws_term',   name: 'Cart Termination',   reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'A', type: 'strike', elem: 'Earth', status: 'stun', statusChance: 0.65, pow: 1.95, scale: 0.07, r: 1, cd: 3, desc: 'Active: Crushing cart impact (65% STUN).' },
        { id: 'ws_melt',   name: 'Meltdown Strike',    reqJobLv: 10, maxLv: 10, tier: 2, branch: 'A', type: 'sweep', elem: 'Fire', pow: 1.35, scale: 0.05, r: 1, cd: 3, desc: 'Active: Blazing hammer cleave hitting all adjacent foes.' },
        { id: 'ws_maxp',   name: 'Max Power Thrust',   reqJobLv: 20, maxLv: 10, tier: 2, branch: 'A', stat: { atk: 6, str: 2 }, desc: 'Passive: +6 ATK and +2 STR per skill level.' },
        { id: 'ws_axe',    name: 'Axe Tornado',        reqJobLv: 30, maxLv: 10, tier: 2, branch: 'A', type: 'sweep', elem: 'Wind', pow: 1.45, scale: 0.06, r: 2, cd: 3, desc: 'Active: Spinning Wind cyclone hitting 2-tile radius.' },
        { id: 'ws_weapon', name: 'Weapon Perfection',  reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'B', stat: { atk: 4, hit: 3 }, desc: 'Passive: +4 ATK and +3 HIT per skill level.' },
        { id: 'ws_guard',  name: 'Forge Guard',        reqJobLv: 10, maxLv: 10, tier: 2, branch: 'B', stat: { def: 3, hp: 30 }, desc: 'Passive: +3 DEF and +30 Max HP per skill level.' },
        { id: 'ws_rush',   name: 'Full Adrenaline',    reqJobLv: 20, maxLv: 10, tier: 2, branch: 'B', stat: { spd: 4, agi: 2 }, desc: 'Passive: +4 SPD and +2 AGI per skill level.' },
        { id: 'ws_greed',  name: 'Master Craft',       reqJobLv: 30, maxLv: 10, tier: 2, branch: 'B', stat: { luk: 3, crit: 1.5 }, desc: 'Passive: +3 LUK and +1.5% Crit Rate per level.' }
      ]
    },
    B: {
      name: 'Master Forger',
      desc: 'Armored siege crafter combining molten Earth & Fire shockwaves with fortress defense.',
      branchA: 'Molten Siege',
      branchB: 'Anvil Bastion',
      skills: [
        { id: 'mf_lava',   name: 'Lava Flow Slam',     reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'A', type: 'blast', elem: 'Fire', pow: 1.35, scale: 0.06, r: 2, cd: 3, desc: 'Active: Molten hammer blast hitting 2-tile radius.' },
        { id: 'mf_quake',  name: 'Earthquake Blow',    reqJobLv: 10, maxLv: 10, tier: 2, branch: 'A', type: 'knockback', elem: 'Earth', status: 'stun', statusChance: 0.6, pow: 1.75, scale: 0.06, r: 1, cd: 3, desc: 'Active: Tectonic strike with 60% STUN & knockback.' },
        { id: 'mf_boom',   name: 'Axe Boomerang',      reqJobLv: 20, maxLv: 10, tier: 2, branch: 'A', type: 'strike', elem: 'Neutral', pow: 1.70, scale: 0.06, r: 3, cd: 2, desc: 'Active: Hurls forged axe up to 3 tiles away.' },
        { id: 'mf_refine', name: 'Oridecon Mastery',   reqJobLv: 30, maxLv: 10, tier: 2, branch: 'A', stat: { atk: 5, def: 3 }, desc: 'Passive: +5 ATK and +3 DEF per skill level.' },
        { id: 'mf_anvil',  name: 'Anvil Bulwark',      reqJobLv: 1,  maxLv: 10, tier: 2, branch: 'B', stat: { def: 4, hp: 40 }, desc: 'Passive: +4 DEF and +40 Max HP per skill level.' },
        { id: 'mf_resist', name: 'Heat Resistance',    reqJobLv: 10, maxLv: 10, tier: 2, branch: 'B', stat: { mdef: 4, vit: 2 }, desc: 'Passive: +4 MDEF and +2 VIT per skill level.' },
        { id: 'mf_taunt',  name: 'Clang Provoke',      reqJobLv: 20, maxLv: 10, tier: 2, branch: 'B', type: 'taunt', elem: 'Neutral', status: 'provoke', statusChance: 1.0, r: 3, pow: 1.0, cd: 4, desc: 'Active: Clangs shield & hammer to provoke nearby enemies.' },
        { id: 'mf_titan',  name: 'Titan Plating',      reqJobLv: 30, maxLv: 10, tier: 2, branch: 'B', stat: { hp: 45, def: 3 }, desc: 'Passive: +45 Max HP and +3 DEF per skill level.' }
      ]
    }
  }
};

const JOB_TREES = {
  Swordsman:  SWORDSMAN_TREE,
  Mercenary:  SWORDSMAN_TREE,
  Crusader:   SWORDSMAN_TREE,
  Archer:     ARCHER_TREE,
  Acolyte:    ACOLYTE_TREE,
  Monk:       ACOLYTE_TREE,
  Thief:      THIEF_TREE,
  Mage:       MAGE_TREE,
  Sage:       MAGE_TREE,
  Spearman:   SPEARMAN_TREE,
  Bard:       CHANTER_TREE,
  Blacksmith: BLACKSMITH_TREE
};

function getHeroJobTree(h) {
  return JOB_TREES[h?.baseJob || h?.job] || SWORDSMAN_TREE;
}

function getHeroAvailableSkills(h) {
  const tree = getHeroJobTree(h);
  if (!tree) return [];
  const t1 = tree.skills || [];
  const t2 = h.promoted && h.jobPath && tree.paths?.[h.jobPath] ? tree.paths[h.jobPath].skills : [];
  return t1.concat(t2);
}

function getHeroActiveSkillsForCombat(h) {
  const all = getHeroAvailableSkills(h);
  const learned = all.filter((sk) => {
    const lv = h.skillLvs?.[sk.id] || 0;
    return lv > 0 && sk.type;
  });
  return learned.map((sk) => {
    const lv = h.skillLvs[sk.id] || 1;
    return {
      ...sk,
      n: sk.name,
      lv,
      pow: (sk.pow || 1.0) + (lv - 1) * (sk.scale || 0.05)
    };
  });
}


// --- src/data/database.js ---
// src/data/database.js
// Complete Data Definitions for Midgard Geo-Tactics:
// - Ragnarök Online Elemental Affinity Matrix & Status Effects
// - 3-Category Inventory: Items (Consumables), Equips (8-Slot Paperdoll), Misc (Loot, Crafting & Upgrades)
// - Classic Ragnarök Midgard Block-Grid World Map (Towns, Fields, Dungeons, 5-10 min Respawns)
// - 8-Skill Split 1st Jobs (4+4) & Job Lv. 40 Dual-Path 2nd Job Advancements (from ./jobs.js)





const GEO_PANELS = {
  r: { id: 'r', name: 'Ember Geo', col: '#a83e32', border: '#d45b4c', desc: '+25% ATK & MATK', score: 3 },
  b: { id: 'b', name: 'Ward Geo', col: '#346296', border: '#548ac4', desc: '+25% DEF & MDEF', score: 2.2 },
  g: { id: 'g', name: 'Spring Geo', col: '#3e7d4c', border: '#5ca86d', desc: 'Heals 8% HP & Cleanses Poison', score: 1.8 },
  y: { id: 'y', name: 'Gale Geo', col: '#b08f32', border: '#d9b54a', desc: '+30% RAID Turn Speed', score: 2.4 },
  v: { id: 'v', name: 'Void Geo', col: '#6d3e8c', border: '#955cba', desc: '-20% DEF & -5% HP/Turn', score: -3.5 }
};

const ELEMENTS = {
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

const ELEMENT_MATRIX = {
  Neutral: { Neutral: 1.0, Fire: 1.0, Water: 1.0, Wind: 1.0, Earth: 1.0, Holy: 1.0, Shadow: 1.0, Undead: 1.0, Poison: 1.0 },
  Fire:    { Neutral: 1.0, Fire: 0.5, Water: 0.7, Wind: 1.0, Earth: 1.75, Holy: 1.0, Shadow: 1.0, Undead: 1.75, Poison: 1.25 },
  Water:   { Neutral: 1.0, Fire: 1.75, Water: 0.5, Wind: 0.7, Earth: 1.0, Holy: 1.0, Shadow: 1.0, Undead: 1.0, Poison: 1.0 },
  Wind:    { Neutral: 1.0, Fire: 1.0, Water: 1.75, Wind: 0.5, Earth: 0.7, Holy: 1.0, Shadow: 1.0, Undead: 1.0, Poison: 1.0 },
  Earth:   { Neutral: 1.0, Fire: 0.7, Water: 1.0, Wind: 1.75, Earth: 0.5, Holy: 1.0, Shadow: 1.0, Undead: 1.0, Poison: 1.25 },
  Holy:    { Neutral: 1.0, Fire: 1.0, Water: 1.0, Wind: 1.0, Earth: 1.0, Holy: 0.5, Shadow: 1.75, Undead: 1.75, Poison: 1.25 },
  Shadow:  { Neutral: 1.0, Fire: 1.0, Water: 1.0, Wind: 1.0, Earth: 1.0, Holy: 1.75, Shadow: 0.5, Undead: 0.7, Poison: 1.0 },
  Poison:  { Neutral: 1.15, Fire: 1.25, Water: 1.0, Wind: 1.25, Earth: 1.25, Holy: 0.75, Shadow: 0.75, Undead: 0.5, Poison: 0.5 }
};

function getElementMultiplier(atkElem, defElem) {
  const row = ELEMENT_MATRIX[atkElem || 'Neutral'] || ELEMENT_MATRIX.Neutral;
  return row[defElem || 'Neutral'] ?? 1.0;
}

const STATUS_DEFS = {
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

const ROLE_BADGES = {
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
const CONSUMABLE_ITEMS = {
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
const MISC_ITEMS = {
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

const CRAFT_RECIPES = [
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
const EQUIP_SLOT_ORDER = [
  { key: 'headgear',  label: 'Headgear',   short: 'HEAD', icon: '👑' },
  { key: 'armor',     label: 'Armor',      short: 'ARM',  icon: '🛡️' },
  { key: 'rightHand', label: 'Right Hand', short: 'R-HD', icon: '⚔️' },
  { key: 'leftHand',  label: 'Left Hand',  short: 'L-HD', icon: '🔰' },
  { key: 'legs',      label: 'Legs',       short: 'LEGS', icon: '👖' },
  { key: 'shoes',     label: 'Shoes',      short: 'SHOE', icon: '👢' },
  { key: 'amulet',    label: 'Amulet',     short: 'AMUL', icon: '📿' },
  { key: 'trinket',   label: 'Trinket',    short: 'TRNK', icon: '💍' }
];

const PAPERDOLL_ITEMS = {
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

const RO_CARDS = [
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
const INITIAL_ROSTER_RAW = [
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
const INITIAL_ROSTER = INITIAL_ROSTER_RAW.map((h) => {
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

const MONSTER_TEMPLATES = {
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

const WORLD_ENCOUNTERS = {
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
const MIDGARD_BLOCKS = {
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


// --- src/render/paperdoll.js ---
// src/render/paperdoll.js
// Original Ragnarök Online × Final Fantasy Tactics / Disgaea Matte Anime Pixel-Art Renderer.
// - Renders all 8 Equipment Slots (Headgear, Armor, Right Hand, Left Hand, Legs, Shoes, Amulet, Trinket).
// - Renders Classic Ragnarök Visual Status Overlays (Ice Crystal Block for Freeze, Spinning Stars for Stun,
//   Venom Bubbles for Poison, Golden Cross Halo for Lex Aeterna 2x Mark) & 7x7 Pixel Status Badges.



const customArtRegistry = new Map();

function registerCustomArt(heroId, layer, imageElement) {
  if (!customArtRegistry.has(heroId)) customArtRegistry.set(heroId, {});
  customArtRegistry.get(heroId)[layer] = imageElement;
}

function clearCustomArtForHero(heroId) {
  customArtRegistry.delete(heroId);
}

const shCache = {};
function sh(hex, f) {
  if (!hex || hex[0] !== '#') return hex || '#777777';
  const k = hex + f;
  if (shCache[k]) return shCache[k];
  const n = parseInt(hex.slice(1), 16);
  let r = n >> 16;
  let g = (n >> 8) & 255;
  let b = n & 255;
  if (f < 0) {
    r *= 1 + f;
    g *= 1 + f;
    b *= 1 + f;
  } else {
    r += (255 - r) * f;
    g += (255 - g) * f;
    b += (255 - b) * f;
  }
  return (shCache[k] = `rgb(${r | 0},${g | 0},${b | 0})`);
}

const OUTLINE = '#17131c';
const STEEL = '#aeb8c4';
const STEEL_HI = '#d5dfe8';
const STEEL_LO = '#6e7885';
const GOLD = '#c9a24b';
const GOLD_HI = '#e6c975';
const WOOD = '#6b492b';
const BONE = '#d4ccb8';

let activeTint = null;

function px(ctx, x, y, w, h, c) {
  ctx.fillStyle = activeTint || c;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

function pxBox(ctx, x, y, w, h, fillCol, topHiCol = null) {
  px(ctx, x - 1, y - 1, w + 2, h + 2, OUTLINE);
  px(ctx, x, y, w, h, fillCol);
  if (topHiCol) px(ctx, x, y, w, 1, topHiCol);
}

function drawRoleBadge(ctx, role, x, y, k = 2) {
  const r = ROLE_BADGES[role];
  if (!r) return;
  const w = 7 * k + 4;
  ctx.fillStyle = OUTLINE;
  ctx.fillRect(x - 1, y - 1, w + 2, w + 2);
  ctx.fillStyle = r.c;
  ctx.fillRect(x, y, w, w);
  ctx.fillStyle = role === 'Boss' ? '#e6c877' : '#ffffff';
  for (let j = 0; j < 7; j++) {
    for (let i = 0; i < 7; i++) {
      if (r.g[j][i] === '1') {
        ctx.fillRect(x + 2 + i * k, y + 2 + j * k, k, k);
      }
    }
  }
}

const roleIconCache = {};
function getRoleIconDataURL(role) {
  if (roleIconCache[role]) return roleIconCache[role];
  const c = document.createElement('canvas');
  c.width = c.height = 20;
  drawRoleBadge(c.getContext('2d'), role, 1, 1, 2);
  return (roleIconCache[role] = c.toDataURL());
}

// Draws a 7x7 Matte Pixel Status Effect Badge (Freeze, Stun, Poison, Lex Aeterna, Provoke, Blessing, AGI)
function drawStatusBadge(ctx, statusId, x, y, k = 1.6) {
  const s = STATUS_DEFS[statusId];
  if (!s) return;
  const w = Math.round(7 * k + 3);
  ctx.fillStyle = OUTLINE;
  ctx.fillRect(Math.round(x - 1), Math.round(y - 1), w + 2, w + 2);
  ctx.fillStyle = s.c;
  ctx.fillRect(Math.round(x), Math.round(y), w, w);
  ctx.fillStyle = '#ffffff';
  for (let j = 0; j < 7; j++) {
    for (let i = 0; i < 7; i++) {
      if (s.g[j][i] === '1') {
        ctx.fillRect(Math.round(x + 1.5 + i * k), Math.round(y + 1.5 + j * k), Math.ceil(k), Math.ceil(k));
      }
    }
  }
}

const statusIconCache = {};
function getStatusIconDataURL(statusId) {
  if (statusIconCache[statusId]) return statusIconCache[statusId];
  const c = document.createElement('canvas');
  c.width = c.height = 18;
  drawStatusBadge(c.getContext('2d'), statusId, 1, 1, 2);
  return (statusIconCache[statusId] = c.toDataURL());
}

// ============================================================================
// 8-SLOT MATTE PIXEL-ART PAPERDOLL LAYERS
// ============================================================================

function drawBlacksmithCart(ctx, walking, rt) {
  const wheelTurn = walking ? ((rt / 80) | 0) % 2 : 0;
  pxBox(ctx, -26, -15, 14, 9, '#6e4c2e', '#8c6440');
  px(ctx, -25, -12, 12, 1, OUTLINE);
  px(ctx, -24, -18, 5, 3, '#9c8d70');
  px(ctx, -18, -19, 5, 4, '#78828c');
  px(ctx, -12, -10, 6, 2, WOOD);
  pxBox(ctx, -22, -7, 7, 6, '#3b2818', '#808891');
  px(ctx, -19 + wheelTurn, -5, 2, 2, GOLD);
}

function drawHunterFalcon(ctx, br, rt) {
  const flap = Math.round(Math.sin(rt / 110) * 2);
  const fy = -34 + br + Math.round(Math.sin(rt / 240));
  pxBox(ctx, -14, fy, 7, 5, '#6e5239', '#997756');
  px(ctx, -16, fy - 2 + flap, 5, 3, '#8c694a');
  px(ctx, -12, fy + 3, 4, 2, '#d9d2c5');
  px(ctx, -8, fy - 2, 4, 4, '#ded8cc');
  px(ctx, -6, fy - 1, 1, 1, OUTLINE);
  px(ctx, -4, fy - 1, 2, 2, GOLD_HI);
}

function drawHeadgearSlot(ctx, hgStyle, hy, trimCol, armorCol) {
  if (!hgStyle || hgStyle === 'none') return;
  const T = trimCol || GOLD;
  const A = armorCol || '#523282';

  switch (hgStyle) {
    case 'helm':
      pxBox(ctx, -7, hy - 13, 14, 6, STEEL, STEEL_HI);
      px(ctx, -7, hy - 7, 4, 5, STEEL_LO);
      px(ctx, 0, hy - 8, 6, 1, OUTLINE);
      px(ctx, -2, hy - 16, 4, 3, T);
      break;
    case 'crest':
      pxBox(ctx, -7, hy - 13, 14, 6, STEEL, STEEL_HI);
      px(ctx, -7, hy - 7, 4, 5, STEEL_LO);
      pxBox(ctx, -8, hy - 18, 12, 5, '#a8342b', '#cc493f');
      px(ctx, -9, hy - 15, 3, 8, '#8a2720');
      break;
    case 'valk_helm':
      pxBox(ctx, -7, hy - 13, 14, 5, STEEL_HI, '#ffffff');
      px(ctx, -2, hy - 15, 5, 3, GOLD_HI);
      pxBox(ctx, -12, hy - 16, 5, 7, '#ebe6d8', '#ffffff');
      pxBox(ctx, -14, hy - 19, 4, 5, '#ffffff');
      pxBox(ctx, 6, hy - 16, 4, 6, '#ebe6d8', '#ffffff');
      break;
    case 'bandana':
      pxBox(ctx, -6, hy - 11, 13, 3, '#d9d1c0', '#ebe5d8');
      px(ctx, -10, hy - 10, 4, 2, '#c2b9a7');
      px(ctx, -12, hy - 8, 3, 4, '#a69d8c');
      break;
    case 'hood':
      pxBox(ctx, -7, hy - 13, 14, 5, A, sh(A, 0.16));
      pxBox(ctx, -8, hy - 10, 4, 11, sh(A, -0.22));
      break;
    case 'featherhood':
      pxBox(ctx, -7, hy - 13, 14, 4, '#475e2c', '#5e7a3b');
      px(ctx, -3, hy - 19, 2, 6, '#ebe5d8');
      px(ctx, -4, hy - 21, 2, 3, '#ffffff');
      px(ctx, -2, hy - 15, 2, 2, '#b5382e');
      break;
    case 'wizard':
      pxBox(ctx, -10, hy - 11, 20, 2, sh(A, -0.25));
      pxBox(ctx, -6, hy - 15, 12, 4, A, sh(A, 0.15));
      pxBox(ctx, -4, hy - 19, 9, 4, A);
      pxBox(ctx, -2, hy - 23, 6, 4, sh(A, -0.15));
      px(ctx, 1, hy - 25, 4, 2, sh(A, -0.25));
      px(ctx, -6, hy - 12, 12, 1, GOLD);
      break;
    case 'mitre':
      pxBox(ctx, -5, hy - 17, 11, 6, '#ebe5d8', '#ffffff');
      pxBox(ctx, -3, hy - 21, 7, 4, '#ebe5d8');
      px(ctx, -5, hy - 12, 11, 1, GOLD);
      px(ctx, 0, hy - 19, 2, 7, GOLD);
      px(ctx, -2, hy - 17, 6, 1, GOLD);
      break;
    case 'hat':
      pxBox(ctx, -9, hy - 11, 18, 2, sh(A, -0.25));
      pxBox(ctx, -6, hy - 15, 12, 4, A, sh(A, 0.15));
      px(ctx, -6, hy - 12, 12, 1, T);
      px(ctx, -8, hy - 17, 3, 4, '#d9d1c0');
      break;
    case 'crown':
      pxBox(ctx, -6, hy - 13, 12, 4, GOLD, GOLD_HI);
      px(ctx, -6, hy - 15, 2, 2, GOLD_HI);
      px(ctx, -1, hy - 16, 3, 3, GOLD_HI);
      px(ctx, 4, hy - 15, 2, 2, GOLD_HI);
      px(ctx, 0, hy - 13, 2, 2, '#b5382e');
      break;
    case 'horns':
      for (const s of [-1, 1]) {
        pxBox(ctx, s * 6 - 1, hy - 15, 3, 5, '#38302c', '#524742');
        pxBox(ctx, s * 8 - 1, hy - 19, 3, 5, '#29221f');
        px(ctx, s * 10 - 1, hy - 21, 2, 3, BONE);
      }
      break;
  }
}

function drawLeftHandSlot(ctx, lhStyle, br, trimCol) {
  if (!lhStyle || lhStyle === 'none') return;
  const T = trimCol || '#346296';

  if (lhStyle === 'buckler') {
    pxBox(ctx, -13, -19 + br, 8, 11, STEEL, STEEL_HI);
    px(ctx, -12, -18 + br, 6, 9, T);
    px(ctx, -10, -15 + br, 2, 3, GOLD_HI);
  } else if (lhStyle === 'tower') {
    pxBox(ctx, -14, -22 + br, 9, 17, STEEL, STEEL_HI);
    px(ctx, -13, -21 + br, 7, 15, T);
    px(ctx, -10, -19 + br, 2, 11, GOLD_HI);
    px(ctx, -12, -15 + br, 6, 2, GOLD_HI);
  } else if (lhStyle === 'valk_shield') {
    pxBox(ctx, -14, -21 + br, 9, 15, '#e6e1d3', '#ffffff');
    px(ctx, -13, -20 + br, 7, 13, '#3b6ea8');
    px(ctx, -11, -17 + br, 3, 7, GOLD_HI);
  } else if (lhStyle === 'offdagger') {
    pxBox(ctx, -14, -12 + br, 7, 2, STEEL, STEEL_HI);
    px(ctx, -8, -13 + br, 2, 4, WOOD);
  } else if (lhStyle === 'tome') {
    pxBox(ctx, -13, -17 + br, 7, 9, '#5e2c28', GOLD);
    px(ctx, -12, -15 + br, 5, 6, '#e6e1d3');
  }
}

function drawRightHandSlot(ctx, wStyle) {
  switch (wStyle) {
    case 'sword':
      px(ctx, -2, -1, 3, 2, WOOD);
      px(ctx, 1, -3, 2, 6, GOLD);
      pxBox(ctx, 3, -1, 12, 2, STEEL, STEEL_HI);
      break;
    case 'excalibur':
      px(ctx, -3, -1, 4, 2, '#346296');
      px(ctx, 1, -4, 2, 8, GOLD_HI);
      pxBox(ctx, 3, -2, 14, 3, GOLD_HI, '#ffffff');
      break;
    case 'greatsword':
      px(ctx, -4, -1, 5, 2, WOOD);
      px(ctx, 1, -4, 2, 8, GOLD);
      pxBox(ctx, 3, -2, 18, 4, STEEL, STEEL_HI);
      px(ctx, 3, 1, 18, 1, STEEL_LO);
      break;
    case 'spear':
      px(ctx, -9, -1, 25, 2, WOOD);
      pxBox(ctx, 15, -2, 5, 4, STEEL, STEEL_HI);
      px(ctx, 13, -3, 2, 6, '#a8342b');
      break;
    case 'dagger':
      px(ctx, -2, -1, 3, 2, WOOD);
      px(ctx, 1, -2, 1, 4, GOLD);
      pxBox(ctx, 2, -1, 8, 2, STEEL, STEEL_HI);
      break;
    case 'katar':
      pxBox(ctx, -2, -3, 5, 6, '#7a2924', GOLD);
      pxBox(ctx, 3, -2, 12, 4, STEEL, STEEL_HI);
      break;
    case 'bow':
      px(ctx, -8, 0, 16, 2, WOOD);
      px(ctx, -10, -2, 3, 2, GOLD);
      px(ctx, 7, -2, 3, 2, GOLD);
      px(ctx, -10, -3, 20, 1, '#d8d2c5');
      break;
    case 'staff':
      px(ctx, -7, -1, 20, 2, WOOD);
      pxBox(ctx, 12, -3, 5, 6, '#548ac4', '#8fd3ff');
      px(ctx, 11, -2, 1, 4, GOLD);
      break;
    case 'crosier':
      px(ctx, -7, -1, 20, 2, GOLD);
      pxBox(ctx, 13, -5, 5, 6, GOLD_HI);
      px(ctx, 14, -2, 3, 3, '#69b878');
      break;
    case 'mace':
      px(ctx, -2, -1, 11, 2, WOOD);
      pxBox(ctx, 9, -4, 6, 8, STEEL, STEEL_HI);
      break;
    case 'axe':
      px(ctx, -2, -1, 12, 2, WOOD);
      pxBox(ctx, 8, -5, 6, 9, STEEL, STEEL_HI);
      px(ctx, 9, 2, 4, 2, STEEL_LO);
      break;
    case 'lute':
      px(ctx, -3, -1, 12, 2, WOOD);
      pxBox(ctx, 6, -4, 8, 7, '#b57c36', '#d99f52');
      px(ctx, 8, -2, 3, 3, OUTLINE);
      break;
  }
}

function drawMatteAnimeHero(ctx, u, rt) {
  const custom = customArtRegistry.get(u.rosterId || u.id);
  if (custom?.body) {
    ctx.drawImage(custom.body, -16, -36, 32, 38);
    return;
  }

  const isFrozen = (u.statuses?.freeze || 0) > 0;
  const walking = !isFrozen && (u.pose === 'walk' || u.moving);
  const ph = walking ? Math.sin(rt / 60) : 0;
  const legStep = Math.round(ph * 2);
  const br = !walking && !isFrozen && Math.sin(rt / 400 + (u.id || 0) * 1.7) > 0.5 ? 1 : 0;
  const e = u.poseT || 0;

  const eq = u.equips || {};
  const hgItem = PAPERDOLL_ITEMS[eq.headgear] || PAPERDOLL_ITEMS.hg_none;
  const arItem = PAPERDOLL_ITEMS[eq.armor] || PAPERDOLL_ITEMS.ar_cotton;
  const rhItem = PAPERDOLL_ITEMS[eq.rightHand] || PAPERDOLL_ITEMS.rh_shortsword;
  const lhItem = PAPERDOLL_ITEMS[eq.leftHand] || PAPERDOLL_ITEMS.lh_none;
  const lgItem = PAPERDOLL_ITEMS[eq.legs] || PAPERDOLL_ITEMS.lg_cloth;
  const shItem = PAPERDOLL_ITEMS[eq.shoes] || PAPERDOLL_ITEMS.sh_sandals;
  const amItem = PAPERDOLL_ITEMS[eq.amulet] || PAPERDOLL_ITEMS.am_none;
  const trItem = PAPERDOLL_ITEMS[eq.trinket] || PAPERDOLL_ITEMS.tr_none;

  const W = rhItem.style;
  const A = arItem.armorCol || '#857d70';
  const A_LO = sh(A, -0.26);
  const A_HI = sh(A, 0.16);
  const T = arItem.trimCol || GOLD;
  const LEGS_COL = lgItem.legsCol || '#453f38';
  const KNEE_COL = lgItem.kneeCol || STEEL;
  const BOOT_COL = shItem.bootCol || '#5c4938';
  const BOOT_TRIM = shItem.trimCol || GOLD;
  const bk = arItem.bulk ? 1 : 0;

  if (u.pose === 'cast') {
    ctx.save();
    ctx.strokeStyle = u.role === 'Healer' ? '#5ca86d' : '#548ac4';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(0, 0, 13, 5.5, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  if (u.hasCart) drawBlacksmithCart(ctx, walking, rt);
  if (u.hasFalcon) drawHunterFalcon(ctx, br, rt);

  pxBox(ctx, -6 - bk, -17 + br, 3, 7, A_LO);

  if (arItem.robe) {
    pxBox(ctx, -6, -9, 12, 7, A_LO);
    px(ctx, -6, -4, 12, 2, LEGS_COL);
    px(ctx, -6, -3, 12, 1, T);
    pxBox(ctx, -4 + legStep, -2, 4, 2, BOOT_COL, BOOT_TRIM);
    pxBox(ctx, 1 - legStep, -2, 4, 2, BOOT_COL, BOOT_TRIM);
  } else {
    pxBox(ctx, -4 + legStep, -8, 3, 6, LEGS_COL);
    px(ctx, -4 + legStep, -6, 3, 2, KNEE_COL);
    pxBox(ctx, 1 - legStep, -8, 3, 6, sh(LEGS_COL, -0.18));
    px(ctx, 1 - legStep, -6, 3, 2, KNEE_COL);
    pxBox(ctx, -4 + legStep, -2, 4, 2, BOOT_COL, BOOT_TRIM);
    pxBox(ctx, 1 - legStep, -2, 4, 2, BOOT_COL, BOOT_TRIM);
  }

  pxBox(ctx, -5 - bk, -18 + br, 10 + bk * 2, 10 - br, A, A_HI);
  px(ctx, -5 - bk, -9, 10 + bk * 2, 1, T);
  px(ctx, -1, -17 + br, 2, 8, T);

  px(ctx, -1, -9, 3, 2, trItem.relicCol || GOLD_HI);
  pxBox(ctx, -1, -17 + br, 3, 2, amItem.gemCol || '#5ca86d');

  if (arItem.bulk) {
    pxBox(ctx, -8, -20 + br, 5, 4, STEEL, STEEL_HI);
    pxBox(ctx, 3, -20 + br, 5, 4, STEEL, STEEL_HI);
  }

  drawLeftHandSlot(ctx, lhItem.style, br, T);

  const hy = -18 + br;
  const skin = u.skin || '#d8ac8a';
  const skinLo = sh(skin, -0.18);
  const hair = u.hairCol || '#59281e';
  const hairHi = sh(hair, 0.16);
  const hairLo = sh(hair, -0.24);

  if (u.hairStyle === 'long' || u.hairStyle === 'twin') {
    pxBox(ctx, -7, hy - 8, 4, 11, hairLo);
    if (u.hairStyle === 'twin') pxBox(ctx, 4, hy - 8, 4, 11, hairLo);
  }

  pxBox(ctx, -5, hy - 10, 11, 10, skin);
  px(ctx, -5, hy - 1, 11, 1, skinLo);

  px(ctx, 0, hy - 6, 2, 3, OUTLINE);
  px(ctx, 0, hy - 6, 1, 1, '#ffffff');
  px(ctx, 4, hy - 6, 2, 3, OUTLINE);
  px(ctx, 4, hy - 6, 1, 1, '#ffffff');

  pxBox(ctx, -6, hy - 12, 12, 3, hair, hairHi);
  px(ctx, -6, hy - 9, 3, 7, hair);
  px(ctx, -2, hy - 9, 2, 2, hair);
  px(ctx, 2, hy - 9, 2, 2, hair);
  if (u.hairStyle === 'spiky') {
    px(ctx, -8, hy - 11, 2, 2, hair);
    px(ctx, 6, hy - 12, 2, 2, hairHi);
  }

  drawHeadgearSlot(ctx, hgItem.style, hy, T, A);

  let aA = -0.3;
  let wA = -1.15;
  if (W === 'bow') {
    aA = -0.2;
    wA = -1.57;
  }
  if (W === 'staff' || W === 'crosier') {
    wA = -1.45;
  }
  if (u.pose === 'attack') {
    if (W === 'bow') aA = -1.45;
    else if (W === 'spear') {
      aA = -0.5 - 0.9 * Math.sin(e * Math.PI);
      wA = -0.12;
    } else {
      aA = -2.6 + 1.7 * e;
      wA = -2.4 + 2.9 * e;
    }
  }
  if (u.pose === 'cast') {
    aA = -2.2;
    wA = -1.57;
  }
  if (walking) aA += ph * 0.25;

  ctx.save();
  ctx.translate(4, -15 + br);
  ctx.rotate(aA);
  ctx.save();
  ctx.translate(0, 7);
  ctx.rotate(wA - aA);
  drawRightHandSlot(ctx, W);
  ctx.restore();
  pxBox(ctx, -1, 0, 3, 6, A_HI);
  px(ctx, -1, 6, 3, 2, skin);
  ctx.restore();
}

// ============================================================================
// RAGNARÖK MONSTER & MVP BOSS PIXEL SPRITES
// ============================================================================
function drawSlimeSprite(ctx, u, rt) {
  const isFrozen = (u.statuses?.freeze || 0) > 0;
  const bounce = isFrozen ? 0 : Math.round(Math.abs(Math.sin(rt / 160 + (u.id || 0))) * 2);
  const c = u.col || '#698fb8';
  const cHi = sh(c, 0.22);
  const cLo = sh(c, -0.25);

  pxBox(ctx, -7, -10 - bounce, 14, 10, c, cHi);
  px(ctx, -8, -7 - bounce, 16, 6, c);
  px(ctx, -7, -2 - bounce, 14, 2, cLo);
  px(ctx, 0, -6 - bounce, 2, 2, OUTLINE);
  px(ctx, 4, -6 - bounce, 2, 2, OUTLINE);
  px(ctx, 0, -6 - bounce, 1, 1, '#ffffff');
  pxBox(ctx, -1, -14 - bounce, 3, 3, u.leafCol || '#4d8048');
}

function drawWolfSprite(ctx, u, rt) {
  const isFrozen = (u.statuses?.freeze || 0) > 0;
  const walking = !isFrozen && (u.pose === 'walk' || u.moving);
  const o = walking ? Math.round(Math.sin(rt / 55) * 2) : 0;
  const F = u.col || '#635142';
  const F_LO = sh(F, -0.28);
  const F_HI = sh(F, 0.16);
  const M = u.maneCol || '#8c7662';

  px(ctx, -8 + o, -5, 2, 5, F_LO);
  px(ctx, -5 - o, -5, 2, 5, F);
  px(ctx, 3 + o, -5, 2, 5, F_LO);
  px(ctx, 6 - o, -5, 2, 5, F);
  pxBox(ctx, -9, -12, 16, 7, F, F_HI);
  pxBox(ctx, 1, -14, 7, 7, M);
  pxBox(ctx, 5, -16, 7, 7, F, F_HI);
  px(ctx, 5, -19, 2, 3, F_LO);
  px(ctx, 9, -19, 2, 3, F_LO);
  px(ctx, 11, -13, 4, 3, F_LO);
  px(ctx, 9, -14, 2, 2, '#d9534f');
}

function drawBaphometMvpSprite(ctx, u, rt) {
  const br = Math.sin(rt / 340) > 0 ? 1 : 0;
  pxBox(ctx, -12, -26 + br, 16, 22, '#35214a', '#4d316b');
  pxBox(ctx, -6, -8, 4, 8, '#29221f');
  pxBox(ctx, 2, -8, 4, 8, '#29221f');
  pxBox(ctx, -8, -24 + br, 16, 15, '#3b312d', '#544640');
  px(ctx, -4, -22 + br, 8, 2, GOLD);
  pxBox(ctx, -6, -34 + br, 12, 10, '#29221f');
  px(ctx, 1, -30 + br, 2, 2, '#d94136');
  px(ctx, 5, -30 + br, 2, 2, '#d94136');
  for (const s of [-1, 1]) {
    pxBox(ctx, s * 7 - 2, -39 + br, 4, 6, BONE);
    pxBox(ctx, s * 11 - 2, -43 + br, 4, 6, sh(BONE, -0.2));
  }
  ctx.save();
  const swing = u.pose === 'attack' ? -1.4 + (u.poseT || 0) * 2.2 : -0.4;
  ctx.translate(6, -18 + br);
  ctx.rotate(swing);
  px(ctx, -1, -22, 2, 34, WOOD);
  pxBox(ctx, 1, -24, 14, 5, '#8c4da8', '#b87cd4');
  px(ctx, 11, -19, 4, 6, '#8c4da8');
  ctx.restore();
}

function drawMoonlightMvpSprite(ctx, u, rt) {
  const br = Math.sin(rt / 340) > 0 ? 1 : 0;
  for (let i = -2; i <= 2; i++) {
    pxBox(ctx, -14, -15 + br + i * 3, 9, 4, '#d49b3b', '#edd074');
  }
  drawMatteAnimeHero(
    ctx,
    {
      ...u,
      skin: '#f0d5be',
      hairStyle: 'long',
      hairCol: '#d49b3b',
      equips: {
        headgear: 'hg_crown',
        armor: 'ar_mercenary',
        rightHand: 'rh_crosier',
        leftHand: 'lh_none',
        legs: 'lg_cloth',
        shoes: 'sh_sandals',
        amulet: 'am_brisingamen',
        trinket: 'tr_glove'
      }
    },
    rt
  );
}

// Renders Visual Status Overlays directly on top of the unit sprite (Freeze Ice Block, Stun Stars, Poison Bubbles, Lex Cross)
function drawUnitStatusOverlays(ctx, u, rt) {
  const st = u.statuses;
  if (!st) return;

  // 1. FREEZE: Translucent matte pixel Ice Crystal Block encasing the unit!
  if (st.freeze > 0) {
    ctx.save();
    ctx.globalAlpha = 0.65;
    pxBox(ctx, -10, -24, 20, 24, '#4a90d9', '#9ad4ff');
    px(ctx, -7, -20, 4, 16, '#c7e7ff');
    px(ctx, 3, -16, 3, 12, '#2d68a8');
    ctx.restore();
  }

  // 2. STUN: Orbiting golden pixel stars above the head!
  if (st.stun > 0) {
    for (let i = 0; i < 3; i++) {
      const ang = rt / 140 + (i * Math.PI * 2) / 3;
      const sx = Math.round(Math.cos(ang) * 9);
      const sy = -33 + Math.round(Math.sin(ang) * 3);
      pxBox(ctx, sx - 1, sy - 1, 3, 3, GOLD_HI);
    }
  }

  // 3. POISON: Rising violet-green venom bubbles!
  if (st.poison > 0) {
    const b1 = ((rt / 90) | 0) % 14;
    const b2 = (((rt / 90) | 0) + 7) % 14;
    pxBox(ctx, -8, -10 - b1, 3, 3, '#7c4d9c', '#59a665');
    pxBox(ctx, 6, -8 - b2, 3, 3, '#59a665', '#8fe3a0');
  }

  // 4. LEX AETERNA: Floating Golden Cross Mark (Next Hit 2x DMG!)
  if (st.lex > 0) {
    const bob = Math.round(Math.sin(rt / 180) * 2);
    pxBox(ctx, -1, -42 + bob, 3, 9, GOLD_HI, '#ffffff');
    pxBox(ctx, -4, -39 + bob, 9, 3, GOLD_HI, '#ffffff');
  }
}

function drawUnitSprite(ctx, u, rt, tint = null) {
  // Apply subtle status tint if poisoned or frozen
  let effTint = tint;
  if (!effTint && u.statuses) {
    if (u.statuses.freeze > 0) effTint = null; // ice block overlay handles freeze
  }
  activeTint = effTint;
  const kind = u.spriteKind || 'human';
  if (kind === 'slime') drawSlimeSprite(ctx, u, rt);
  else if (kind === 'wolf' || kind === 'beast') drawWolfSprite(ctx, u, rt);
  else if (kind === 'baphomet') drawBaphometMvpSprite(ctx, u, rt);
  else if (kind === 'moonlight') drawMoonlightMvpSprite(ctx, u, rt);
  else drawMatteAnimeHero(ctx, u, rt);
  activeTint = null;

  drawUnitStatusOverlays(ctx, u, rt);
}

function drawGeoSymbolPixel(ctx, sym, pxCoord, pyCoord, rt, scale = 3) {
  const bob = Math.round(Math.sin(rt / 260 + sym.x) * 2);
  ctx.save();
  ctx.translate(Math.round(pxCoord), Math.round(pyCoord + 2));
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.beginPath();
  ctx.ellipse(0, 2, 14, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.scale(scale, scale);
  const c = sym.col;
  const cDark = sh(c, -0.28);
  const cLight = sh(c, 0.22);

  pxBox(ctx, -1, -18 + bob, 2, 2, cLight);
  pxBox(ctx, -3, -16 + bob, 6, 2, c, cLight);
  pxBox(ctx, -5, -14 + bob, 10, 3, c);
  pxBox(ctx, -7, -11 + bob, 14, 3, cDark);
  pxBox(ctx, -4, -8 + bob, 8, 2, cDark);
  px(ctx, -3, -14 + bob, 2, 5, cLight);
  ctx.restore();
}

// ============================================================================
// MATTE PIXEL-ART INVENTORY ITEM & EQUIPMENT ICONS (CACHED 20x20 DATA URLs)
// ============================================================================
const itemIconCache = {};

function getItemIconDataURL(item, kind = 'equip') {
  if (!item) return '';
  const cacheKey = `${kind}_${item.id || item.style || item.name}`;
  if (itemIconCache[cacheKey]) return itemIconCache[cacheKey];

  const c = document.createElement('canvas');
  c.width = 20;
  c.height = 20;
  const g = c.getContext('2d');
  const p = (x, y, w, h, col) => {
    g.fillStyle = col;
    g.fillRect(x, y, w, h);
  };
  const box = (x, y, w, h, col, hi = null) => {
    p(x - 1, y - 1, w + 2, h + 2, OUTLINE);
    p(x, y, w, h, col);
    if (hi) p(x, y, w, 1, hi);
  };

  if (kind === 'item') {
    if (item.id === 'item_panacea') {
      box(7, 4, 6, 10, '#4f9960', '#8fe3a0');
      p(8, 2, 4, 3, '#3b7548');
      p(6, 13, 8, 3, '#c9a24b');
    } else if (item.id === 'item_ygg') {
      box(5, 6, 10, 9, '#d9b54a', '#ffe9a8');
      p(8, 3, 4, 3, '#5ca86d');
      p(7, 8, 2, 2, '#ffffff');
    } else {
      // Potion flask
      const col = item.col || '#d9483b';
      box(8, 3, 4, 3, '#a68058');
      box(6, 6, 8, 10, col, sh(col, 0.28));
      p(7, 8, 2, 4, '#ffffff');
    }
  } else if (kind === 'card') {
    box(5, 3, 10, 14, '#4c2e78', '#c58ae6');
    p(7, 5, 6, 6, '#e6c877');
    p(9, 7, 2, 2, '#4c2e78');
    p(7, 13, 6, 2, '#dce1e8');
  } else if (kind === 'misc') {
    if (item.category === 'Upgrade') {
      const col = item.id === 'msc_oridecon' ? '#d98a3c' : item.id === 'msc_elunium' ? '#4a90d9' : '#8d97a5';
      box(5, 5, 10, 10, col, sh(col, 0.25));
      p(7, 7, 3, 3, '#ffffff');
    } else {
      const col = item.id === 'msc_jellopy' ? '#e88ba0' : item.id === 'msc_mucus' ? '#5ca86d' : item.id === 'msc_horn' ? '#7c4d9c' : '#c9a24b';
      box(6, 6, 8, 9, col, sh(col, 0.25));
      p(8, 4, 4, 2, col);
    }
  } else {
    // 8-Slot Equipment Icons
    const slot = item.slot;
    const style = item.style;
    if (slot === 'headgear') {
      const col = style === 'wizard' ? '#4c2e78' : style === 'crown' || style === 'valk_helm' ? GOLD : style === 'bandana' ? '#a83e32' : STEEL;
      box(4, 7, 12, 7, col, sh(col, 0.22));
      if (style === 'wizard') box(7, 3, 6, 4, col, sh(col, 0.22));
      if (style === 'horns') { p(3, 4, 2, 4, GOLD_HI); p(15, 4, 2, 4, GOLD_HI); }
    } else if (slot === 'armor') {
      const col = item.armorCol || '#6d7782';
      const trim = item.trimCol || GOLD;
      box(5, 4, 10, 12, col, sh(col, 0.2));
      p(3, 4, 3, 5, col);
      p(14, 4, 3, 5, col);
      p(9, 6, 2, 9, trim);
    } else if (slot === 'rightHand') {
      if (style === 'bow') {
        box(6, 3, 3, 14, '#7a5230', '#a67549');
        p(10, 3, 1, 14, '#dcd5c7');
      } else if (style === 'staff' || style === 'crosier') {
        box(9, 5, 2, 12, '#7a5230');
        box(7, 3, 6, 4, style === 'crosier' ? GOLD : '#548ac4', '#ffffff');
      } else if (style === 'axe' || style === 'mace') {
        box(9, 6, 2, 11, '#6e4a2a');
        box(5, 3, 8, 5, STEEL, STEEL_HI);
      } else {
        // Blade / Sword / Dagger / Spear / Katar
        const bladeCol = item.elem === 'Holy' ? GOLD_HI : STEEL_HI;
        box(9, 2, 3, 11, bladeCol, '#ffffff');
        box(6, 13, 9, 2, GOLD);
        p(9, 15, 3, 3, '#593a28');
      }
    } else if (slot === 'leftHand') {
      if (style === 'tome') {
        box(5, 4, 10, 12, '#4c2e78', '#955cba');
        p(7, 6, 6, 2, GOLD_HI);
      } else if (style === 'offdagger') {
        box(9, 4, 2, 10, STEEL_HI, '#ffffff');
        box(7, 13, 6, 2, GOLD);
      } else {
        box(5, 4, 10, 11, STEEL, STEEL_HI);
        p(9, 6, 2, 7, GOLD);
        p(7, 8, 6, 2, GOLD);
      }
    } else if (slot === 'legs') {
      const col = item.legsCol || '#49525e';
      box(5, 4, 4, 12, col, sh(col, 0.2));
      box(11, 4, 4, 12, col, sh(col, 0.2));
    } else if (slot === 'shoes') {
      const col = item.bootCol || '#5c4938';
      box(4, 8, 5, 8, col, sh(col, 0.2));
      box(11, 8, 5, 8, col, sh(col, 0.2));
    } else if (slot === 'amulet') {
      p(6, 4, 8, 1, GOLD);
      p(5, 5, 1, 5, GOLD);
      p(14, 5, 1, 5, GOLD);
      box(7, 9, 6, 6, item.gemCol || '#5ca86d', '#ffffff');
    } else {
      // Trinket
      box(6, 6, 8, 8, item.relicCol || GOLD, '#ffffff');
    }
  }

  return (itemIconCache[cacheKey] = c.toDataURL());
}


// --- src/engine/game.js ---
// src/engine/game.js
// Core Engine for Midgard Geo-Tactics:
// - Classic Ragnarök Status Effects (Freeze, Stun, Poison, Lex Aeterna 2x Mark, Provoke, Blessing, Increase AGI)
// - Ragnarök Elemental Affinity Table (Water, Wind, Fire, Earth, Holy, Shadow, Undead, Poison) + Ice Shatter Combos
// - Starting Party of 4 Heroes in Basic Starter Gear + 5-10% Post-Battle Hero Join & Loot Drops
// - Massive 22x22 2.5D Multi-Elevation Isometric Grid + Interactive Camera Pan/Zoom




const BATTLE_MAPS = {
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

const ELEVATION_MAPS = {
  culvert: build22x22Elevation('culvert'),
  shrine: build22x22Elevation('shrine'),
  rampart: build22x22Elevation('rampart')
};

const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const ELEV_STEP_PX = 12;

class MidgardGeoGame {
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


// --- src/main.js ---
// src/main.js
// UI Controller mirroring the user's preferred GRIDHUNT layout (Header + Canvas Stage + Right Sidebar + Floating .ro-modal Windows)
// Powered by Midgard Geo-Tactics' 22x22 2.5D Tactical Combat, Elemental/Status Depth, 8-Skill (4+4) Job Trees (Max Lv. 40), and 3-Tab Inventory!





window.addEventListener('DOMContentLoaded', () => {
  const cv = document.getElementById('c');
  let game = null;
  let selectedHeroIdx = 0;
  let invTab = 'items';     // 'items' | 'equips' | 'misc'
  let invViewMode = 'grid'; // 'grid' | 'list'
  let townTab = 'trader';   // 'trader' | 'craft' | 'forge' | 'tavern'
  let draggedItemId = null;

  const uiCallbacks = {
    onLog: (html, cls) => {
      const L = document.getElementById('log');
      if (!L) return;
      const d = document.createElement('div');
      if (cls) d.className = cls;
      d.innerHTML = html;
      L.appendChild(d);
      while (L.children.length > 80) L.removeChild(L.firstChild);
      L.scrollTop = L.scrollHeight;
    },
    onClearLog: () => {
      const L = document.getElementById('log');
      if (L) L.innerHTML = '';
    },
    onHideReport: () => {
      const r = document.getElementById('report');
      if (r) r.style.display = 'none';
    },
    onShowReport: () => {
      if (game) showReport();
    },
    onSelectHero: (rosterHero) => {
      const recruited = game.getRecruitedHeroes();
      const idx = recruited.findIndex((r) => r.id === rosterHero?.id);
      if (idx >= 0) selectedHeroIdx = idx;
      syncAllUI();
    },
    onOpenTab: (tabName) => {
      if (tabName === 'char') openModal('charModal');
      else if (tabName === 'party' || tabName === 'barracks') {
        townTab = 'tavern';
        openModal('npcModal');
      } else if (tabName === 'town' || tabName === 'forge') {
        townTab = tabName === 'forge' ? 'forge' : 'trader';
        openModal('npcModal');
      } else if (tabName === 'skills') {
        openModal('skillModal');
      }
      syncAllUI();
    },
    onSyncAll: () => {
      if (game) syncAllUI();
    }
  };

  game = new MidgardGeoGame(cv, uiCallbacks);
  game.mode = 'world';
  game.start();

  // Populate Battle Floor Panels, Status Legends & Role Badges
  document.getElementById('legend').innerHTML =
    Object.values(GEO_PANELS)
      .map((p) => `<div class="leg"><i style="background:${p.col}"></i><span><b>${p.name}</b> — ${p.desc}</span></div>`)
      .join('') +
    `<div class="leg"><i style="background:#7fd0ff"></i><span><b>Geo Crystal</b> — Shatter for Geo Chain Cascade!</span></div>`;

  const stLeg = document.getElementById('statusLegend');
  if (stLeg) {
    stLeg.innerHTML = Object.entries(STATUS_DEFS)
      .map(
        ([k, st]) =>
          `<div class="leg"><img src="${getStatusIconDataURL(k)}" width="12" height="12" style="image-rendering:pixelated; vertical-align:middle;" alt=""><span><b style="color:${st.col}">${st.name}</b> — ${st.desc}</span></div>`
      )
      .join('');
  }

  const rolesEl = document.getElementById('roles');
  if (rolesEl) {
    rolesEl.innerHTML = Object.entries(ROLE_BADGES)
      .filter(([k]) => k !== 'Monster')
      .map(([k, r]) => `<div class="leg"><img src="${getRoleIconDataURL(k)}" width="16" height="16" alt=""><span><b>${k}</b> — ${r.t.split('—')[1] || r.t}</span></div>`)
      .join('');
  }

  function getSelectedHero() {
    const rec = game.getRecruitedHeroes();
    if (selectedHeroIdx >= rec.length) selectedHeroIdx = 0;
    return rec[selectedHeroIdx] || game.roster[0];
  }

  function closeAllModals() {
    ['charModal', 'invModal', 'skillModal', 'atlasModal', 'npcModal'].forEach((id) => {
      const m = document.getElementById(id);
      if (m) m.style.display = 'none';
    });
  }

  function openModal(id) {
    const m = document.getElementById(id);
    const wasOpen = m && m.style.display === 'flex';
    closeAllModals();
    if (!wasOpen && m) {
      m.style.display = 'flex';
      renderOpenModals();
    }
  }

  function renderHeroStripHtml() {
    const rec = game.getRecruitedHeroes();
    return `
      <div class="hero-strip">
        ${rec
          .map(
            (r, i) => `
          <button class="btn-pick-hero ${i === selectedHeroIdx ? 'primary' : ''}" data-hidx="${i}">
            ${r.name} <small>(Lv.${r.lv}/J.${r.jobLv}${game.canPromoteJob(r) ? ' ★JOB!' : ''})</small>
          </button>
        `
          )
          .join('')}
      </div>
    `;
  }

  function wireHeroStrip(container) {
    container.querySelectorAll('.btn-pick-hero').forEach((btn) => {
      btn.onclick = () => {
        selectedHeroIdx = +btn.dataset.hidx;
        syncAllUI();
      };
    });
  }

  function syncAllUI() {
    document.body.className = game.mode;
    document.getElementById('bModeWorld').classList.toggle('on', game.mode === 'world');
    document.getElementById('bModeBattle').classList.toggle('on', game.mode === 'battle');

    document.getElementById('uiGold').textContent = game.zeny.toLocaleString();
    const wEl = document.getElementById('uiWeight');
    if (wEl) {
      wEl.textContent = `${game.getTotalWeight()} / ${game.getMaxWeight()}`;
      wEl.style.color = game.isOverweight90() ? '#ff8a7a' : '';
    }

    document.getElementById('bPause').textContent = game.paused ? 'Resume' : 'Pause';
    document.getElementById('bReport').style.display = game.mode === 'battle' && game.result ? '' : 'none';

    const autoBtn = document.getElementById('bAuto');
    autoBtn.textContent = `Auto: ${game.autoBattle ? 'ON' : 'MANUAL'}`;
    autoBtn.classList.toggle('on', game.autoBattle);

    document.getElementById('bonusRankLabel').textContent = `BONUS LV. ${game.bonusRank}`;
    document.getElementById('bonusFill').style.width = `${Math.min(100, game.bonusGauge)}%`;

    renderHuntsSidebar();
    renderCombatantSidebar();
    renderOpenModals();
  }

  function renderHuntsSidebar() {
    const Z = game.getCurrentZone();
    const codeEl = document.getElementById('uiCurBlockCode');
    if (codeEl) codeEl.textContent = `[${Z.code}]`;

    const el = document.getElementById('hunts');
    if (!el) return;
    if (Z.type === 'town') {
      el.innerHTML = `
        <div style="font-size:12px; color:var(--dim); padding:4px 0;">
          <b style="color:#ffe08a">${Z.name}</b> (Safe Town)<br>
          Click NPCs on the map or use <b>Town Shop &amp; Forge</b> to trade, craft, refine, or recruit!
        </div>
      `;
      return;
    }

    el.innerHTML = (game.mobs || [])
      .map((m, idx) => {
        const E = m.E;
        const remMs = E.boss ? (game.mvpRespawnTimers[m.key] || 0) : (m.respawnLeftMs || 0);
        const remSec = Math.ceil(remMs / 1000);
        const timerStr = `${String(Math.floor(remSec / 60)).padStart(2, '0')}:${String(remSec % 60).padStart(2, '0')}`;
        return `
          <div class="hunt">
            <div>
              <b class="${E.boss ? 'boss' : ''}">${E.boss ? '★ ' : ''}${E.name}</b>
              <span>${E.recLv} · ${E.elem} · ${m.alive ? `${m.count} foes` : `<b style="color:#ffd45e; display:inline;">Respawn ${timerStr}</b>`}</span>
            </div>
            <button class="btn-hunt-mob ${m.alive ? 'primary' : ''}" data-midx="${idx}" style="padding:3px 9px; font-size:11px;" ${m.alive ? '' : 'disabled'}>
              ${m.alive ? 'Hunt' : timerStr}
            </button>
          </div>
        `;
      })
      .join('');

    el.querySelectorAll('.btn-hunt-mob').forEach((btn) => {
      btn.onclick = () => {
        const mob = game.mobs[+btn.dataset.midx];
        if (mob && mob.alive) game.startEncounter(mob);
      };
    });
  }

  function renderCombatantSidebar() {
    const el = document.getElementById('cardBody');
    if (!el) return;
    const u = game.selected || game.current || game.units[0];
    if (!u) {
      el.innerHTML = `<span style="color:var(--dim)">Click a hero or monster on the grid.</span>`;
      return;
    }
    const elemDef = ELEMENTS[u.elem || 'Neutral'] || ELEMENTS.Neutral;
    const activeStatuses = Object.entries(u.statuses || {})
      .filter(([, turns]) => turns > 0)
      .map(([stId, turns]) => {
        const st = STATUS_DEFS[stId];
        return st ? `<span style="font-size:10.5px; color:${st.col}; border:1px solid ${st.col}; border-radius:3px; padding:1px 5px; margin-right:3px;">${st.short} (${turns}t)</span>` : '';
      })
      .join('');

    el.innerHTML = `
      <div class="nm">${u.name}</div>
      <div class="jb">${u.job} · ${u.role} · <span style="color:${elemDef.col}">${elemDef.name}</span></div>
      <div>HP <b>${u.hp} / ${u.maxhp}</b></div>
      <div class="bar"><i style="width:${Math.round((100 * u.hp) / u.maxhp)}%"></i></div>
      ${activeStatuses ? `<div style="margin-bottom:6px;">${activeStatuses}</div>` : ''}
      <div class="stats">
        <span>ATK/MATK <b>${u.atk}</b></span>
        <span>DEF <b>${u.def}</b></span>
        <span>SPD <b>${u.spd}</b></span>
        <span>MOVE <b>${u.move}</b></span>
        <span>RANGE <b>${u.range}</b></span>
        <span>DMG <b>${u.dmg || 0}</b></span>
      </div>
    `;
  }

  function renderOpenModals() {
    const cm = document.getElementById('charModal');
    if (cm && cm.style.display === 'flex') renderCharModal(cm);

    const im = document.getElementById('invModal');
    if (im && im.style.display === 'flex') renderInvModal(im);

    const sm = document.getElementById('skillModal');
    if (sm && sm.style.display === 'flex') renderSkillModal(sm);

    const am = document.getElementById('atlasModal');
    if (am && am.style.display === 'flex') renderAtlasModal(am);

    const nm = document.getElementById('npcModal');
    if (nm && nm.style.display === 'flex') renderNpcModal(nm);
  }

  // =========================================================================
  // 1. HERO & 8-SLOT PAPERDOLL MODAL (E)
  // =========================================================================
  function renderCharModal(cm) {
    const h = getSelectedHero();
    const b = h.bonus || {};
    const statsList = [
      ['str', 'STR', 'Physical ATK & Weight', h.str, b.str || 0],
      ['agi', 'AGI', 'SPD, ASPD & FLEE', h.agi, b.agi || 0],
      ['vit', 'VIT', 'Max HP & DEF', h.vit, b.vit || 0],
      ['int', 'INT', 'MATK, MDEF & Max SP', h.int, b.int || 0],
      ['dex', 'DEX', 'HIT & Bow/Cast', h.dex, b.dex || 0],
      ['luk', 'LUK', 'CRIT & Dodge', h.luk, b.luk || 0]
    ];

    cm.innerHTML = `
      <div class="ro-win">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3>HERO STATUS &amp; 8-SLOT PAPERDOLL</h3>
          <div style="display:flex; gap:6px; align-items:center;">
            <button id="btnOpenSkillFromChar" class="primary" style="font-size:11px;">Skills &amp; Job (K)</button>
            <button class="btn-close-modal">Close (Esc)</button>
          </div>
        </div>
        ${renderHeroStripHtml()}
        <div class="ro-body">
          <div class="ro-grid2">
            <div>
              <div style="display:flex; gap:10px; align-items:center; background:#131720; border:1px solid #262d39; border-radius:6px; padding:10px; margin-bottom:10px;">
                <canvas id="charPreviewCanvas" width="82" height="92" style="background:#0d1118; border:1px solid #2b3547; border-radius:4px; image-rendering:pixelated;"></canvas>
                <div style="min-width:0; flex:1;">
                  <div style="font:700 17px Georgia,serif; color:#fff;">${h.name}</div>
                  <div style="color:var(--gold); font-size:12px;">Base Lv.${h.lv} · Job Lv.${h.jobLv}/${h.jobMaxLv || MAX_JOB_LV} ${h.job}</div>
                  <div style="font-size:11px; color:var(--dim);">HP ${h.hp}/${h.maxhp} · SP ${h.sp}/${h.maxsp}</div>
                  <div class="bar"><i style="width:${Math.round((100 * h.hp) / h.maxhp)}%"></i></div>
                </div>
              </div>

              <div class="sec-title"><span>Attributes</span><span style="color:#fff">Pts: ${h.statPts}</span></div>
              <div class="stat-list" style="margin-bottom:10px;">
                ${statsList
                  .map(
                    ([k, tag, desc, val, bon]) => `
                  <div class="stat-row">
                    <div class="stat-info"><span class="stat-tag">${tag}</span><span class="stat-desc">${desc}</span></div>
                    <div class="stat-ctrl">
                      <span class="stat-val">${val} <small style="color:#8fe3a0">${bon ? `+${bon}` : ''}</small></span>
                      <button class="stat-plus btn-add-stat primary" data-stat="${k}" ${h.statPts <= 0 ? 'disabled' : ''}>+</button>
                    </div>
                  </div>
                `
                  )
                  .join('')}
              </div>

              <div class="sec-title"><span>Ragnarök Sub-Stats</span></div>
              <div class="sub-grid">
                <div class="sub-cell"><span>ATK</span><b>${h.physAtk || h.atk}</b></div>
                <div class="sub-cell"><span>MATK</span><b>${h.matk || h.atk}</b></div>
                <div class="sub-cell"><span>DEF</span><b>${h.def}</b></div>
                <div class="sub-cell"><span>MDEF</span><b>${h.mdef || 6}</b></div>
                <div class="sub-cell"><span>HIT</span><b>${h.hit || 180}</b></div>
                <div class="sub-cell"><span>FLEE</span><b>${h.flee || 110}</b></div>
                <div class="sub-cell"><span>CRIT</span><b>${h.crit}%</b></div>
                <div class="sub-cell"><span>SPD / ASPD</span><b>${h.spd} / ${h.aspd || 158}</b></div>
              </div>
            </div>

            <div>
              <div class="sec-title">
                <span>8-Slot Visual Equipment (Refined +${h.refineWep} Wep / +${h.refineArmor} Arm)</span>
                <span style="color:#8fe3a0">Updates Sprite Live</span>
              </div>
              <div class="eq-grid">
                ${EQUIP_SLOT_ORDER.map((s) => {
                  const curId = h.equips[s.key];
                  const curItem = PAPERDOLL_ITEMS[curId];
                  const unlockedForSlot = Object.values(PAPERDOLL_ITEMS).filter(
                    (it) => it.slot === s.key && (game.isItemUnlocked(it.id) || it.id === curId)
                  );
                  const stText = curItem?.stats
                    ? Object.entries(curItem.stats)
                        .map(([k, v]) => `${v >= 0 ? '+' : ''}${v} ${k.toUpperCase()}`)
                        .join(', ')
                    : 'Basic';
                  return `
                    <div class="eq-slot" data-drop-slot="${s.key}">
                      <div class="eq-head">
                        <span>${s.icon} ${s.label}</span>
                        <span class="item-row-left">
                          ${curItem ? `<img class="item-ico" src="${getItemIconDataURL(curItem, 'equip')}" alt="">` : ''}
                          <b>${curItem ? curItem.name : 'Empty'}</b>
                        </span>
                      </div>
                      <select class="sel-char-equip" data-slot="${s.key}">
                        ${unlockedForSlot
                          .map((it) => {
                            const sTxt = Object.entries(it.stats || {})
                              .map(([k, v]) => `+${v} ${k.toUpperCase()}`)
                              .join(', ');
                            const avail = game.getItemAvailability(it.id, h.id);
                            const wornByOther = it.id !== curId && avail.availableCount <= 0;
                            const wearerTag = wornByOther ? ` [Worn by ${avail.wornBy.map((w) => w.name).join(', ')}]` : '';
                            return `<option value="${it.id}" ${it.id === curId ? 'selected' : ''} ${wornByOther ? 'disabled' : ''}>${it.name}${sTxt ? ` (${sTxt})` : ''}${wearerTag}</option>`;
                          })
                          .join('')}
                      </select>
                      <div style="font-size:10.5px; color:var(--gold);">${stText || 'Starter Gear'}</div>
                    </div>
                  `;
                }).join('')}
              </div>

              <div style="margin-top:12px; background:#131720; border:1px solid #262d39; border-radius:6px; padding:10px;">
                <div class="sec-title"><span>Socketed Monster Cards (Max 2)</span><span>Deploy Status</span></div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#c58ae6; font-size:12.5px;">${(h.cards || []).map((c) => `[${c.name}]`).join(' ') || 'No cards compounded yet'}</span>
                  <button id="btnToggleDeployChar" class="${h.deployed ? 'on' : ''}">${h.deployed ? 'Deployed in Battle' : 'Benched (Click to Deploy)'}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const pcv = document.getElementById('charPreviewCanvas');
    if (pcv) {
      const pctx = pcv.getContext('2d');
      pctx.save();
      pctx.translate(42, 76);
      pctx.scale(2.2, 2.2);
      drawUnitSprite(pctx, { ...h, pose: 'idle', poseT: 0, rosterId: h.id }, game.rt);
      pctx.restore();
    }

    wireHeroStrip(cm);
    cm.querySelector('.btn-close-modal').onclick = closeAllModals;
    document.getElementById('btnOpenSkillFromChar').onclick = () => openModal('skillModal');
    cm.querySelectorAll('.btn-add-stat').forEach((b) => {
      b.onclick = () => {
        if (h.statPts > 0) {
          h[b.dataset.stat]++;
          h.statPts--;
          game.recalcHero(h);
          syncAllUI();
        }
      };
    });
    cm.querySelectorAll('.sel-char-equip').forEach((sel) => {
      sel.onchange = () => game.equipItemOnHero(h, sel.value);
    });
    document.getElementById('btnToggleDeployChar').onclick = () => {
      const active = game.getActiveParty();
      if (h.deployed) {
        if (active.length > 1) h.deployed = false;
      } else {
        if (active.length >= 10) active[active.length - 1].deployed = false;
        h.deployed = true;
      }
      syncAllUI();
    };
  }

  // =========================================================================
  // 2. 3-TAB INVENTORY MODAL (I): ITEMS | EQUIPS | MISC + WEIGHT
  // =========================================================================
  function renderInvModal(im) {
    const rec = game.getRecruitedHeroes();
    const heroOptionsHtml = rec
      .map((r, i) => `<option value="${r.id}" ${i === selectedHeroIdx ? 'selected' : ''}>${r.name} (${r.job})</option>`)
      .join('');

    const itemsEntries = Object.entries(game.consumables || {}).filter(([, c]) => c > 0);
    // In Inventory Equips tab: ONLY show unequipped / available items (hide gear worn by other heroes with 0 spare copies!)
    const availableEquips = Object.values(PAPERDOLL_ITEMS)
      .filter((it) => game.isItemUnlocked(it.id) && !it.id.endsWith('_none') && !it.starter)
      .map((it) => ({ it, avail: game.getItemAvailability(it.id, null) }))
      .filter(({ avail }) => avail.availableCount > 0);
    const miscEntries = Object.entries(game.miscBag || {}).filter(([, c]) => c > 0);

    let bodyHtml = '';
    if (invTab === 'items') {
      if (!itemsEntries.length) {
        bodyHtml = `<div style="color:var(--dim); padding:10px;">No Consumable Items. Visit a Town Trader to buy Potions!</div>`;
      } else if (invViewMode === 'grid') {
        bodyHtml = `<div class="inv-grid">${itemsEntries
          .map(([id, cnt]) => {
            const it = CONSUMABLE_ITEMS[id];
            if (!it) return '';
            const ico = getItemIconDataURL(it, 'item');
            return `
              <div class="inv-tile">
                <div>
                  <div class="inv-tile-top">
                    <span class="item-row-left">
                      <img class="item-ico" src="${ico}" alt="">
                      <b style="color:${it.col}">${it.name}</b>
                    </span>
                    <span class="cnt-badge">×${cnt}</span>
                  </div>
                  <div style="font-size:11px; color:var(--dim); margin-top:4px;">${it.desc}</div>
                </div>
                <div class="inv-act" style="justify-content:space-between; width:100%;">
                  <select class="sel-item-hero" data-for="${id}" style="flex:1; min-width:0;">${heroOptionsHtml}</select>
                  <button class="btn-use-cons primary" data-cid="${id}">Use</button>
                </div>
              </div>
            `;
          })
          .join('')}</div>`;
      } else {
        bodyHtml = itemsEntries
          .map(([id, cnt]) => {
            const it = CONSUMABLE_ITEMS[id];
            if (!it) return '';
            const ico = getItemIconDataURL(it, 'item');
            return `
              <div class="inv-item">
                <div class="item-row-left" style="flex:1;">
                  <img class="item-ico" src="${ico}" alt="">
                  <div style="min-width:0;">
                    <b style="color:${it.col}">${it.name}</b> <span class="cnt-badge">×${cnt}</span>
                    <div style="font-size:11px; color:var(--dim);">${it.desc} · Wt ${it.wt * cnt}</div>
                  </div>
                </div>
                <div class="inv-act">
                  <select class="sel-item-hero" data-for="${id}">${heroOptionsHtml}</select>
                  <button class="btn-use-cons primary" data-cid="${id}">Use</button>
                </div>
              </div>
            `;
          })
          .join('');
      }
    } else if (invTab === 'equips') {
      if (!availableEquips.length) {
        bodyHtml = `<div style="color:var(--dim); padding:10px;">No unequipped gear in bag. All looted gear is currently worn by your heroes!</div>`;
      } else if (invViewMode === 'grid') {
        bodyHtml = `<div class="inv-grid">${availableEquips
          .map(({ it, avail }) => {
            const slotMeta = EQUIP_SLOT_ORDER.find((s) => s.key === it.slot);
            const stTxt = Object.entries(it.stats || {})
              .map(([k, v]) => `+${v} ${k.toUpperCase()}`)
              .join(', ');
            const ico = getItemIconDataURL(it, 'equip');
            return `
              <div class="inv-tile">
                <div>
                  <div class="inv-tile-top">
                    <span class="item-row-left">
                      <img class="item-ico" src="${ico}" alt="">
                      <b class="tier-${it.tier || 0}">${it.name}</b>
                    </span>
                    <span class="cnt-badge">${slotMeta?.short} ×${avail.availableCount}</span>
                  </div>
                  <div style="font-size:11px; color:var(--gold); margin-top:4px;">${stTxt || 'Gear'}</div>
                </div>
                <div class="inv-act" style="justify-content:space-between; width:100%;">
                  <select class="sel-eq-hero" data-for="${it.id}" style="flex:1; min-width:0;">${heroOptionsHtml}</select>
                  <button class="btn-eq-inv primary" data-eid="${it.id}">Equip</button>
                </div>
              </div>
            `;
          })
          .join('')}</div>`;
      } else {
        bodyHtml = availableEquips
          .map(({ it, avail }) => {
            const slotMeta = EQUIP_SLOT_ORDER.find((s) => s.key === it.slot);
            const stTxt = Object.entries(it.stats || {})
              .map(([k, v]) => `+${v} ${k.toUpperCase()}`)
              .join(', ');
            const ico = getItemIconDataURL(it, 'equip');
            return `
              <div class="inv-item">
                <div class="item-row-left" style="flex:1;">
                  <img class="item-ico" src="${ico}" alt="">
                  <div style="min-width:0;">
                    <b class="tier-${it.tier || 0}">${it.name}</b> <span class="cnt-badge">${slotMeta?.label} ×${avail.availableCount}</span>
                    <div style="font-size:11px; color:var(--gold);">${stTxt || 'Gear'}</div>
                  </div>
                </div>
                <div class="inv-act">
                  <select class="sel-eq-hero" data-for="${it.id}">${heroOptionsHtml}</select>
                  <button class="btn-eq-inv primary" data-eid="${it.id}">Equip</button>
                </div>
              </div>
            `;
          })
          .join('');
      }
    } else {
      const ownedCards = (game.ownedCards || []).filter((c) => c.count > 0);
      if (!miscEntries.length && !ownedCards.length) {
        bodyHtml = `<div style="color:var(--dim); padding:10px;">No Misc Loot or Cards yet. Hunt monsters across Midgard!</div>`;
      } else if (invViewMode === 'grid') {
        const miscCardsHtml = miscEntries
          .map(([id, cnt]) => {
            const m = MISC_ITEMS[id];
            if (!m) return '';
            const ico = getItemIconDataURL(m, 'misc');
            return `
              <div class="inv-tile">
                <div>
                  <div class="inv-tile-top">
                    <span class="item-row-left">
                      <img class="item-ico" src="${ico}" alt="">
                      <b style="color:#e6c877">${m.name}</b>
                    </span>
                    <span class="cnt-badge">×${cnt}</span>
                  </div>
                  <div style="font-size:11px; color:var(--dim); margin-top:4px;">[${m.category}] ${m.desc}</div>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <small style="color:var(--dim)">Sell: ${m.sellPrice}z</small>
                  <button class="btn-sell-m" data-mid="${id}">Sell 1 (+${m.sellPrice}z)</button>
                </div>
              </div>
            `;
          })
          .join('');
        const roCardsHtml = ownedCards
          .map((c) => {
            const ico = getItemIconDataURL(c, 'card');
            return `
              <div class="inv-tile" style="border-color:#5a3b7a;">
                <div>
                  <div class="inv-tile-top">
                    <span class="item-row-left">
                      <img class="item-ico" src="${ico}" alt="">
                      <b style="color:#c58ae6">${c.name}</b>
                    </span>
                    <span class="cnt-badge">×${c.count}</span>
                  </div>
                  <div style="font-size:11px; color:var(--dim); margin-top:4px;">[Monster Card] ${c.desc}</div>
                </div>
                <div style="font-size:10.5px; color:#c58ae6;">Socket at Town Forge</div>
              </div>
            `;
          })
          .join('');
        bodyHtml = `<div class="inv-grid">${roCardsHtml}${miscCardsHtml}</div>`;
      } else {
        const miscListHtml = miscEntries
          .map(([id, cnt]) => {
            const m = MISC_ITEMS[id];
            if (!m) return '';
            const ico = getItemIconDataURL(m, 'misc');
            return `
              <div class="inv-item">
                <div class="item-row-left" style="flex:1;">
                  <img class="item-ico" src="${ico}" alt="">
                  <div style="min-width:0;">
                    <b style="color:#e6c877">${m.name}</b> <span class="cnt-badge">×${cnt}</span>
                    <div style="font-size:11px; color:var(--dim);">[${m.category}] ${m.desc}</div>
                  </div>
                </div>
                <button class="btn-sell-m" data-mid="${id}">Sell 1 (+${m.sellPrice}z)</button>
              </div>
            `;
          })
          .join('');
        const roCardsListHtml = ownedCards
          .map((c) => {
            const ico = getItemIconDataURL(c, 'card');
            return `
              <div class="inv-item" style="border-color:#5a3b7a;">
                <div class="item-row-left" style="flex:1;">
                  <img class="item-ico" src="${ico}" alt="">
                  <div style="min-width:0;">
                    <b style="color:#c58ae6">${c.name}</b> <span class="cnt-badge">×${c.count}</span>
                    <div style="font-size:11px; color:var(--dim);">[Monster Card] ${c.desc}</div>
                  </div>
                </div>
                <span style="font-size:11px; color:#c58ae6;">Socket at Forge</span>
              </div>
            `;
          })
          .join('');
        bodyHtml = `${roCardsListHtml}${miscListHtml}`;
      }
    }

    im.innerHTML = `
      <div class="ro-win">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3>INVENTORY · WEIGHT ${game.getTotalWeight()} / ${game.getMaxWeight()}</h3>
          <div style="display:flex; gap:6px; align-items:center;">
            <button class="btn-inv-view ${invViewMode === 'grid' ? 'primary' : ''}" data-vmode="grid">⊞ Grid</button>
            <button class="btn-inv-view ${invViewMode === 'list' ? 'primary' : ''}" data-vmode="list">☰ List</button>
            <button class="btn-close-modal">Close (Esc)</button>
          </div>
        </div>

        <div class="tabs" style="margin-top:10px;">
          <button class="${invTab === 'items' ? 'on' : ''}" data-itab="items">🧪 Items (Consumables)</button>
          <button class="${invTab === 'equips' ? 'on' : ''}" data-itab="equips">⚔️ Equips (Available Gear)</button>
          <button class="${invTab === 'misc' ? 'on' : ''}" data-itab="misc">💎 Misc (Loot, Craft &amp; Upgrades)</button>
        </div>

        ${
          invTab === 'misc'
            ? `<div style="display:flex; justify-content:flex-end; margin-top:8px;"><button id="btnInvSellAll" class="primary">💰 Sell All Loot Items</button></div>`
            : ''
        }

        <div class="ro-body">
          ${bodyHtml}
        </div>
      </div>
    `;

    im.querySelector('.btn-close-modal').onclick = closeAllModals;
    im.querySelectorAll('.btn-inv-view').forEach((b) => {
      b.onclick = () => {
        invViewMode = b.dataset.vmode;
        renderInvModal(im);
      };
    });
    im.querySelectorAll('[data-itab]').forEach((b) => {
      b.onclick = () => {
        invTab = b.dataset.itab;
        renderInvModal(im);
      };
    });
    im.querySelectorAll('.btn-use-cons').forEach((b) => {
      b.onclick = () => {
        const cid = b.dataset.cid;
        const sel = im.querySelector(`.sel-item-hero[data-for="${cid}"]`);
        const targetHero = rec.find((r) => r.id === sel?.value) || rec[0];
        if (targetHero) game.useConsumableOnHero(cid, targetHero);
      };
    });
    im.querySelectorAll('.btn-eq-inv').forEach((b) => {
      b.onclick = () => {
        const eid = b.dataset.eid;
        const sel = im.querySelector(`.sel-eq-hero[data-for="${eid}"]`);
        const targetHero = rec.find((r) => r.id === sel?.value) || rec[0];
        if (targetHero) game.equipItemOnHero(targetHero, eid);
      };
    });
    im.querySelectorAll('.btn-sell-m').forEach((b) => {
      b.onclick = () => game.sellMiscItem(b.dataset.mid, 1);
    });
    const sellAll = document.getElementById('btnInvSellAll');
    if (sellAll) sellAll.onclick = () => game.sellAllLootMisc();
  }

  // =========================================================================
  // 3. SKILLS & DUAL-PATH JOB ADVANCEMENT MODAL (K) — MAX JOB LV. 40, 4+4 SPLIT
  // =========================================================================
  function renderSkillModal(sm) {
    const h = getSelectedHero();
    const tree = getHeroJobTree(h);
    const activeBranchInfo = h.promoted && h.jobPath && tree.paths?.[h.jobPath] ? tree.paths[h.jobPath] : tree;
    const allSkills = getHeroAvailableSkills(h);
    const branchA = allSkills.filter((s) => s.branch === 'A');
    const branchB = allSkills.filter((s) => s.branch === 'B');
    const canAdvance = game.canPromoteJob(h);

    const renderSkCard = (sk) => {
      const lv = h.skillLvs?.[sk.id] || 0;
      const unlocked = (h.jobLv || 1) >= sk.reqJobLv || (h.promoted && sk.tier === 1);
      const canUp = unlocked && h.skillPts > 0 && lv < sk.maxLv;
      const elemDef = sk.elem ? ELEMENTS[sk.elem] : null;
      return `
        <div class="skill-card" style="opacity:${unlocked ? 1 : 0.52};">
          <div style="min-width:0;">
            <div style="font-weight:700; color:${lv > 0 ? '#ffe08a' : '#dce1e8'}; font-size:12.5px;">
              ${sk.name} <small style="color:var(--dim)">(Lv.${lv}/${sk.maxLv})</small>
              ${elemDef ? `<span style="font-size:10px; color:${elemDef.col}; border:1px solid ${elemDef.col}; padding:0 4px; border-radius:3px; margin-left:4px;">${elemDef.name}</span>` : ''}
            </div>
            <div style="font-size:11px; color:var(--dim); margin-top:2px;">${sk.desc}</div>
            ${!unlocked ? `<div style="font-size:10px; color:#ff8a7a;">Requires Job Lv. ${sk.reqJobLv}</div>` : ''}
          </div>
          <button class="btn-up-sk primary" data-skid="${sk.id}" style="padding:3px 9px; font-size:11px;" ${canUp ? '' : 'disabled'}>+1</button>
        </div>
      `;
    };

    sm.innerHTML = `
      <div class="ro-win">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3>SKILLS &amp; JOB ADVANCEMENT (MAX JOB LV. ${MAX_JOB_LV})</h3>
          <button class="btn-close-modal">Close (Esc)</button>
        </div>
        ${renderHeroStripHtml()}
        <div class="ro-body">
          <div style="display:flex; justify-content:space-between; align-items:center; background:#131720; border:1px solid #262d39; border-radius:6px; padding:10px 12px; margin-bottom:10px;">
            <div>
              <b style="color:#fff; font-size:15px;">${h.name} — ${h.job}</b>
              <div style="font-size:12px; color:var(--gold);">Job Lv. ${h.jobLv} / ${MAX_JOB_LV} · Job EXP ${h.jobExp || 0}/${h.jobExpNext || 55} · Skill Points: <b>${h.skillPts}</b></div>
            </div>
            <div style="width:220px;">
              <div class="bar"><i style="width:${Math.min(100, Math.round(((h.jobLv || 1) * 100) / MAX_JOB_LV))}%; background:#d4af5a;"></i></div>
            </div>
          </div>

          ${
            !h.promoted && tree.paths
              ? `
            <div class="sec-title">
              <span>2nd Job Change Paths (Unlocks at Job Lv. ${MAX_JOB_LV})</span>
              <span style="color:${canAdvance ? '#8fe3a0' : '#98a0ad'}">${canAdvance ? '★ READY TO ADVANCE!' : `Reach Job Lv. ${MAX_JOB_LV}`}</span>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:12px;">
              ${['A', 'B']
                .map((pk) => {
                  const p = tree.paths[pk];
                  return `
                  <div class="adv-card">
                    <div>
                      <b style="color:var(--gold); font-size:14px;">${p.name}</b>
                      <div style="font-size:11.5px; color:var(--dim); margin-top:3px;">${p.desc}</div>
                    </div>
                    <button class="btn-adv-path ${canAdvance ? 'primary' : ''}" data-path="${pk}" ${canAdvance ? '' : 'disabled'}>
                      Advance to ${p.name}
                    </button>
                  </div>
                `;
                })
                .join('')}
            </div>
          `
              : `<div style="background:#16221c; border:1px solid #3e7d4c; border-radius:5px; padding:7px 10px; margin-bottom:10px; font-size:12px; color:#8fe3a0;">★ Advanced 2nd Job Class: <b>${h.job}</b> (8-Skill 2nd Job Tree Unlocked!)</div>`
          }

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div>
              <div class="sec-title"><span>Branch A: ${activeBranchInfo.branchA}</span><span>${branchA.length} Skills</span></div>
              ${branchA.map(renderSkCard).join('')}
            </div>
            <div>
              <div class="sec-title"><span>Branch B: ${activeBranchInfo.branchB}</span><span>${branchB.length} Skills</span></div>
              ${branchB.map(renderSkCard).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    wireHeroStrip(sm);
    sm.querySelector('.btn-close-modal').onclick = closeAllModals;
    sm.querySelectorAll('.btn-up-sk').forEach((b) => {
      b.onclick = () => game.upgradeSkill(h, b.dataset.skid);
    });
    sm.querySelectorAll('.btn-adv-path').forEach((b) => {
      b.onclick = () => game.promoteHeroJob(h, b.dataset.path);
    });
  }

  // =========================================================================
  // 4. WORLD MAP MODAL (M) — 5x4 MIDGARD BLOCK GRID
  // =========================================================================
  function renderAtlasModal(am) {
    const grid = Array.from({ length: 4 }, () => Array(5).fill(null));
    Object.values(MIDGARD_BLOCKS).forEach((b) => {
      if (b.gy >= 0 && b.gy < 4 && b.gx >= 0 && b.gx < 5) grid[b.gy][b.gx] = b;
    });

    let cellsHtml = '';
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 5; x++) {
        const b = grid[y][x];
        if (!b) {
          cellsHtml += `<div class="atlas-empty"></div>`;
          continue;
        }
        const isHere = game.currentZoneId === b.id;
        cellsHtml += `
          <button class="atlas-block ${b.type} ${isHere ? 'here' : ''}" data-bid="${b.id}">
            <div>
              <div style="font-size:10px; font-weight:700; color:#ffe08a;">${b.type === 'town' ? '🏰' : b.type === 'dungeon' ? '💀' : '🌿'} [${b.code}]</div>
              <div style="font-size:12px; font-weight:700; color:#fff;">${b.name}</div>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:10px; color:#8fe3a0;">
              <span>${b.recLv}</span>
              <span style="color:${ELEMENTS[b.elem]?.col || '#ccc'}">${b.elem}</span>
            </div>
          </button>
        `;
      }
    }

    am.innerHTML = `
      <div class="ro-win">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3>MAP OF MIDGARD · BLOCK GRID (CLICK ANY BLOCK TO TRAVEL)</h3>
          <button class="btn-close-modal">Close (Esc)</button>
        </div>
        <div class="ro-body">
          <div class="atlas-grid">${cellsHtml}</div>
          <div style="margin-top:10px; font-size:12px; color:var(--dim);">
            <b>Tip:</b> You can also walk into the glowing <b>North / South / East / West</b> edge portals on any map! Monsters &amp; MVPs respawn every <b>5–10 minutes</b>.
          </div>
        </div>
      </div>
    `;

    am.querySelector('.btn-close-modal').onclick = closeAllModals;
    am.querySelectorAll('.atlas-block').forEach((btn) => {
      btn.onclick = () => {
        game.changeWorldZone(btn.dataset.bid);
        closeAllModals();
      };
    });
  }

  // =========================================================================
  // 5. TOWN SERVICES MODAL (TRADER / CRAFTING / +10 UPGRADES / TAVERN)
  // =========================================================================
  function renderNpcModal(nm) {
    const h = getSelectedHero();
    const Z = game.getCurrentZone();
    const shopEquips = Object.values(PAPERDOLL_ITEMS).filter((it) => !it.starter && it.buyPrice > 0 && it.tier <= 2);

    let bodyHtml = '';
    if (townTab === 'trader') {
      bodyHtml = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="color:var(--dim);">Buy Consumables &amp; Gear or sell monster Misc loot.</span>
          <button id="btnNpcSellAll" class="primary">💰 Sell All Misc Loot</button>
        </div>
        <div class="inv-grid">
          ${Object.values(CONSUMABLE_ITEMS)
            .map(
              (it) => `
            <div class="inv-tile">
              <div><b style="color:${it.col}">${it.icon} ${it.name}</b><div style="font-size:11px; color:var(--dim)">${it.desc}</div></div>
              <button class="btn-npc-buy-c primary" data-cid="${it.id}" ${game.zeny < it.buyPrice ? 'disabled' : ''}>Buy (${it.buyPrice}z)</button>
            </div>
          `
            )
            .join('')}
          ${shopEquips
            .map(
              (it) => `
            <div class="inv-tile">
              <div><b class="tier-${it.tier}">${it.name}</b><div style="font-size:11px; color:var(--gold)">${Object.entries(it.stats).map(([k, v]) => `+${v} ${k.toUpperCase()}`).join(', ')}</div></div>
              <button class="btn-npc-buy-e" data-eid="${it.id}" ${game.zeny < it.buyPrice ? 'disabled' : ''}>Buy (${it.buyPrice}z)</button>
            </div>
          `
            )
            .join('')}
        </div>
      `;
    } else if (townTab === 'craft') {
      bodyHtml = `
        <div class="inv-grid">
          ${CRAFT_RECIPES.map((rec) => {
            const outName = rec.outType === 'consumable' ? `${rec.outQty}× ${CONSUMABLE_ITEMS[rec.outId]?.name}` : PAPERDOLL_ITEMS[rec.outId]?.name;
            const canCraft =
              game.zeny >= rec.zeny &&
              Object.entries(rec.mats).every(([mId, req]) => (game.miscBag[mId] || 0) >= req);
            return `
              <div class="inv-tile">
                <div>
                  <b style="color:var(--gold)">${outName}</b>
                  <div style="font-size:11px; color:var(--dim); margin-top:3px;">${rec.desc}</div>
                  <div style="font-size:10.5px; margin-top:4px;">
                    ${Object.entries(rec.mats).map(([mId, req]) => `${MISC_ITEMS[mId]?.name}: ${game.miscBag[mId] || 0}/${req}`).join(' · ')}
                  </div>
                </div>
                <button class="btn-npc-craft primary" data-crid="${rec.id}" ${canCraft ? '' : 'disabled'}>Craft (${rec.zeny}z)</button>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else if (townTab === 'forge') {
      const wepName = PAPERDOLL_ITEMS[h.equips.rightHand]?.name || 'Right Hand';
      const armName = PAPERDOLL_ITEMS[h.equips.armor]?.name || 'Armor';
      const availableCards = game.ownedCards.filter((c) => c.count > 0);
      bodyHtml = `
        ${renderHeroStripHtml()}
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:10px;">
          <div style="background:#131720; border:1px solid #262d39; border-radius:6px; padding:12px;">
            <div class="sec-title"><span>Hollgrehenn +10 Refinery</span><span>Ori ${game.oridecon} / Elu ${game.elunium}</span></div>
            <p style="font-size:12.5px;">Right Hand: <b style="color:var(--gold)">+${h.refineWep} ${wepName}</b><br>Armor: <b style="color:var(--gold)">+${h.refineArmor} ${armName}</b></p>
            <div style="display:flex; gap:8px;">
              <button id="btnNpcRefWep" class="primary" ${h.refineWep >= 10 || game.oridecon < 1 || game.zeny < 200 ? 'disabled' : ''}>Refine Wep (+1 Ori, 200z)</button>
              <button id="btnNpcRefArm" ${h.refineArmor >= 10 || game.elunium < 1 || game.zeny < 150 ? 'disabled' : ''}>Refine Arm (+1 Elu, 150z)</button>
            </div>
          </div>
          <div style="background:#131720; border:1px solid #262d39; border-radius:6px; padding:12px;">
            <div class="sec-title"><span>Card Compounding</span></div>
            <div style="color:#c58ae6; font-size:12px; margin-bottom:8px;">${(h.cards || []).map((c) => `[${c.name}]`).join(' ') || 'None socketed'}</div>
            ${
              availableCards.length
                ? availableCards.map((c) => `<div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>${c.name} (×${c.count})</span><button class="btn-npc-card primary" data-cid="${c.id}">Socket</button></div>`).join('')
                : `<span style="color:var(--dim); font-size:12px;">Hunt monsters &amp; MVPs to drop RO Cards!</span>`
            }
          </div>
        </div>
      `;
    } else {
      const unrec = game.getUnrecruitedHeroes();
      bodyHtml = `
        <div class="inv-grid">
          ${
            unrec.length
              ? unrec
                  .map(
                    (r) => `
                <div class="inv-tile">
                  <div>
                    <b style="color:var(--gold)">${r.name}</b> <small>(Lv.${r.lv} ${r.job} · ${r.role})</small>
                    <div style="font-size:11px; color:var(--dim); margin-top:3px;">HP ${r.maxhp} · ATK ${r.physAtk || r.atk} · SPD ${r.spd}</div>
                  </div>
                  <button class="btn-npc-rec primary" data-id="${r.id}" ${game.zeny < r.recruitCost ? 'disabled' : ''}>Recruit (${r.recruitCost}z)</button>
                </div>
              `
                  )
                  .join('')
              : `<div style="color:#8fe3a0;">★ All 12 Heroes recruited!</div>`
          }
        </div>
      `;
    }

    nm.innerHTML = `
      <div class="ro-win">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3>${Z.type === 'town' ? `🏰 ${Z.name}` : '⛺ FIELD SERVICES'} · ${game.zeny.toLocaleString()}z</h3>
          <div style="display:flex; gap:6px;">
            <button id="btnNpcInn" class="primary">🛏️ Inn Rest (50z)</button>
            <button class="btn-close-modal">Close (Esc)</button>
          </div>
        </div>
        <div class="tabs" style="margin-top:10px;">
          <button class="${townTab === 'trader' ? 'on' : ''}" data-ttab="trader">🏪 Trader</button>
          <button class="${townTab === 'craft' ? 'on' : ''}" data-ttab="craft">⚒️ Craft</button>
          <button class="${townTab === 'forge' ? 'on' : ''}" data-ttab="forge">🔥 +10 Upgrades &amp; Cards</button>
          <button class="${townTab === 'tavern' ? 'on' : ''}" data-ttab="tavern">🍺 Guild Tavern</button>
        </div>
        <div class="ro-body">${bodyHtml}</div>
      </div>
    `;

    wireHeroStrip(nm);
    nm.querySelector('.btn-close-modal').onclick = closeAllModals;
    document.getElementById('btnNpcInn').onclick = () => game.restAtInn(50);
    nm.querySelectorAll('[data-ttab]').forEach((b) => {
      b.onclick = () => {
        townTab = b.dataset.ttab;
        renderNpcModal(nm);
      };
    });
    const sellAll = document.getElementById('btnNpcSellAll');
    if (sellAll) sellAll.onclick = () => game.sellAllLootMisc();
    nm.querySelectorAll('.btn-npc-buy-c').forEach((b) => (b.onclick = () => game.buyConsumable(b.dataset.cid, 1)));
    nm.querySelectorAll('.btn-npc-buy-e').forEach((b) => (b.onclick = () => game.buyEquipInTown(b.dataset.eid)));
    nm.querySelectorAll('.btn-npc-craft').forEach((b) => (b.onclick = () => game.craftRecipe(b.dataset.crid)));
    nm.querySelectorAll('.btn-npc-rec').forEach((b) => (b.onclick = () => game.recruitHeroInTown(b.dataset.id)));

    const refW = document.getElementById('btnNpcRefWep');
    if (refW) {
      refW.onclick = () => {
        if (h.refineWep < 10 && game.oridecon >= 1 && game.zeny >= 200) {
          game.oridecon--;
          game.zeny -= 200;
          h.refineWep++;
          game.recalcHero(h);
          game.sfx('buff');
          syncAllUI();
        }
      };
    }
    const refA = document.getElementById('btnNpcRefArm');
    if (refA) {
      refA.onclick = () => {
        if (h.refineArmor < 10 && game.elunium >= 1 && game.zeny >= 150) {
          game.elunium--;
          game.zeny -= 150;
          h.refineArmor++;
          game.recalcHero(h);
          game.sfx('buff');
          syncAllUI();
        }
      };
    }
    nm.querySelectorAll('.btn-npc-card').forEach((b) => {
      b.onclick = () => {
        const cardEntry = game.ownedCards.find((c) => c.id === b.dataset.cid);
        if (cardEntry && cardEntry.count > 0) {
          cardEntry.count--;
          if (!h.cards) h.cards = [];
          if (h.cards.length >= 2) h.cards.shift();
          h.cards.push({ ...cardEntry });
          game.recalcHero(h);
          game.sfx('heal');
          syncAllUI();
        }
      };
    });
  }

  // =========================================================================
  // 6. POST-BATTLE REPORT MODAL
  // =========================================================================
  function showReport() {
    const hs = game.units.filter((u) => u.side === 'hero').sort((a, b) => b.dmg - a.dmg);
    const foes = game.units.filter((u) => u.side === 'foe');
    const mx = (k) => Math.max(1, ...hs.map((h) => h[k]));
    const mD = mx('dmg'), mT = mx('taken'), mH = mx('healed');
    const top = (k) => hs.slice().sort((a, b) => b[k] - a[k])[0];
    const mvp = hs.slice().sort((a, b) => b.dmg + b.healed * 1.2 + b.taken * 0.5 - (a.dmg + a.healed * 1.2 + a.taken * 0.5))[0];
    const bar = (v, m, c) => `<div class="mb"><i style="width:${(100 * v) / m}%;background:${c}"></i><span>${v}</span></div>`;
    const best = (lab, u, val) => `<div><span>${lab}</span><b>${u.name}</b> ${val}</div>`;

    const lootBullets = [];
    lootBullets.push(`<li><b>Zeny &amp; Refining:</b> +${game.curEnc.zeny + game.bonusRank * 65}z, +1 Oridecon, +1 Elunium</li>`);
    if (game.lastExpGain) {
      lootBullets.push(`<li><b>Experience:</b> +${game.lastExpGain.baseExp} Base EXP, +${game.lastExpGain.jobExp} Job EXP</li>`);
    }
    if (game.lastDroppedItems?.length) {
      for (const it of game.lastDroppedItems) {
        lootBullets.push(`<li><b>Equip Dropped:</b> <span class="tier-${it.tier || 1}">[${it.name}]</span></li>`);
      }
    }
    if (game.lastDroppedMisc?.length) {
      const groupedMisc = {};
      for (const m of game.lastDroppedMisc) {
        groupedMisc[m.id] = (groupedMisc[m.id] || 0) + 1;
      }
      for (const [mId, q] of Object.entries(groupedMisc)) {
        const mDef = MISC_ITEMS[mId];
        if (mDef) lootBullets.push(`<li><b>Misc Loot:</b> ${mDef.icon} ${mDef.name} ×${q}</li>`);
      }
    }
    if (game.lastDroppedCard) {
      lootBullets.push(`<li><b>Monster Card (Check Inventory → Misc):</b> <b style="color:#c58ae6">[${game.lastDroppedCard.name}]</b></li>`);
    }

    const el = document.getElementById('report');
    el.innerHTML =
      `<h3 class="${game.result === 'Defeat' ? 'lose' : ''}">${game.result.toUpperCase()}</h3>` +
      `<div class="sum">${game.turnCount} turns · ${hs.filter((x) => x.alive).length} of ${hs.length} heroes standing · ${foes.filter((x) => !x.alive).length} of ${foes.length} foes slain</div>` +
      (game.lastRecruitedHero
        ? `<div style="background:#2d2514; border:1px solid #e8c774; border-radius:6px; padding:8px 12px; margin-bottom:10px; color:#ffe9a8;">★ <b>NEW HERO JOINED!</b> ${game.lastRecruitedHero.name} (${game.lastRecruitedHero.job}) joined your party!</div>`
        : '') +
      (game.result === 'Victory'
        ? `<div style="background:#16221c; border:1px solid #3e7d4c; border-radius:6px; padding:10px 14px; margin-bottom:12px;">
            <b>🎁 VICTORY LOOT (Bonus Gauge Lv.${game.bonusRank}):</b>
            <ul style="margin:6px 0 0 18px; padding:0; font-size:13px; line-height:1.55;">
              ${lootBullets.join('')}
            </ul>
          </div>`
        : '') +
      `<div class="best">${best('MVP', mvp, `(${mvp.job})`)}${best('Damage', top('dmg'), top('dmg').dmg)}${best('Healing', top('healed'), top('healed').healed)}${best('Tanked', top('taken'), top('taken').taken)}</div>` +
      `<table><tr><th>Hero</th><th>Class &amp; Levels</th><th>Damage</th><th>Taken</th><th>Healed</th><th>Kills</th><th>End</th></tr>` +
      hs
        .map((u) => {
          const r = u.roster || u;
          return `<tr class="${u.alive ? '' : 'dead'}"><td><img src="${getRoleIconDataURL(u.role)}" width="16" height="16" alt="">${u.name}</td><td>Lv.${r.lv}/J.${r.jobLv} ${u.job}</td><td>${bar(u.dmg, mD, '#a34033')}</td><td>${bar(u.taken, mT, '#346296')}</td><td>${bar(u.healed, mH, '#3e7d4c')}</td><td>${u.kills}</td><td>${u.alive ? `${u.hp} HP` : 'Fallen'}</td></tr>`;
        })
        .join('') +
      `</table><div class="btns"><button class="primary" id="rWorld">Return to Map</button><button id="rRematch">Rematch</button><button id="rClose">Close</button></div>`;
    el.style.display = 'block';
    document.getElementById('rWorld').onclick = () => game.returnToMap();
    document.getElementById('rRematch').onclick = () => {
      el.style.display = 'none';
      game.setupBattle((Date.now() % 100000) | 0, game.curEnc);
      game.started = true;
      syncAllUI();
      game.runBattleLoop(game.battleId);
    };
    document.getElementById('rClose').onclick = () => (el.style.display = 'none');
  }

  // =========================================================================
  // HEADER & KEYBOARD SHORTCUTS (E, I, K, M, R, ESC)
  // =========================================================================
  document.getElementById('bCharWin').onclick = () => openModal('charModal');
  document.getElementById('bInvWin').onclick = () => openModal('invModal');
  document.getElementById('bSkillWin').onclick = () => openModal('skillModal');
  document.getElementById('bAtlas').onclick = () => openModal('atlasModal');
  document.getElementById('bTownWin').onclick = () => openModal('npcModal');
  document.getElementById('bSideWarpTown').onclick = () => game.changeWorldZone('prontera', 28, 24);
  document.getElementById('bSideTavern').onclick = () => {
    townTab = 'tavern';
    openModal('npcModal');
  };

  document.getElementById('bModeWorld').onclick = () => game.returnToMap();
  document.getElementById('bModeBattle').onclick = () => {
    if (game.mode !== 'battle') {
      closeAllModals();
      game.mode = 'battle';
      document.body.className = 'battle';
      game.setupBattle((Date.now() % 100000) | 0, game.curEnc);
      game.started = true;
      syncAllUI();
      game.runBattleLoop(game.battleId);
    }
  };
  document.getElementById('bRest').onclick = () => game.restAtInn(50);
  document.getElementById('bPause').onclick = () => {
    game.paused = !game.paused;
    syncAllUI();
  };
  document.getElementById('bAuto').onclick = () => {
    game.autoBattle = !game.autoBattle;
    if (game.autoBattle && game.manualResolve && game.current) {
      const resolve = game.manualResolve;
      game.manualResolve = null;
      game.actAI(game.current, game.units.filter((o) => o.alive && o.side !== game.current.side), game.units.filter((o) => o.alive && o.side === game.current.side)).then(resolve);
    }
    syncAllUI();
  };
  document.getElementById('bZoomReset').onclick = () => game.resetBattleCamera();
  document.getElementById('bReport').onclick = () => {
    if (game.result) showReport();
  };
  document.getElementById('bClearLog').onclick = () => (document.getElementById('log').innerHTML = '');
  document.getElementById('bSound').onclick = (e) => {
    game.muted = !game.muted;
    e.target.textContent = `Sound: ${game.muted ? 'off' : 'on'}`;
    e.target.classList.toggle('on', !game.muted);
    if (!game.muted) game.audioInit();
  };
  document.querySelectorAll('.sp').forEach((b) => {
    b.onclick = () => {
      game.speed = +b.dataset.s;
      document.querySelectorAll('.sp').forEach((x) => x.classList.toggle('on', x === b));
    };
  });

  window.addEventListener('keydown', (ev) => {
    const k = ev.key.toLowerCase();
    if (k === 'escape') closeAllModals();
    else if (k === 'e') openModal('charModal');
    else if (k === 'i') openModal('invModal');
    else if (k === 'k') openModal('skillModal');
    else if (k === 'm' && game.mode === 'world') openModal('atlasModal');
  });

  let last = performance.now();
  let hudTimerTick = 0;
  function frame(now) {
    const dt = Math.min(50, now - last);
    last = now;
    game.frameStep(dt);

    hudTimerTick += dt;
    if (hudTimerTick > 1000) {
      hudTimerTick = 0;
      if (game.mode === 'world') renderHuntsSidebar();
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
});


})();

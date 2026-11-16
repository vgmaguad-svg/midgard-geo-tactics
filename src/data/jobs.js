// src/data/jobs.js
// Complete 8-Skill Split 1st Jobs (4 + 4) & Job Lv. 40 Dual-Path 2nd Job Advancements
// Combines the user's GRIDHUNT 4+4 Job Tree structure with Midgard Geo-Tactics' Elemental & Status Combat Depth!

export const MAX_JOB_LV = 40;

export const SWORDSMAN_TREE = {
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

export const ARCHER_TREE = {
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

export const ACOLYTE_TREE = {
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

export const THIEF_TREE = {
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

export const MAGE_TREE = {
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

export const SPEARMAN_TREE = {
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

export const CHANTER_TREE = {
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

export const BLACKSMITH_TREE = {
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

export const JOB_TREES = {
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

export function getHeroJobTree(h) {
  return JOB_TREES[h?.baseJob || h?.job] || SWORDSMAN_TREE;
}

export function getHeroAvailableSkills(h) {
  const tree = getHeroJobTree(h);
  if (!tree) return [];
  const t1 = tree.skills || [];
  const t2 = h.promoted && h.jobPath && tree.paths?.[h.jobPath] ? tree.paths[h.jobPath].skills : [];
  return t1.concat(t2);
}

export function getHeroActiveSkillsForCombat(h) {
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

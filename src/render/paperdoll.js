// src/render/paperdoll.js
// Original Ragnarök Online × Final Fantasy Tactics / Disgaea Matte Anime Pixel-Art Renderer.
// - Renders all 8 Equipment Slots (Headgear, Armor, Right Hand, Left Hand, Legs, Shoes, Amulet, Trinket).
// - Renders Classic Ragnarök Visual Status Overlays (Ice Crystal Block for Freeze, Spinning Stars for Stun,
//   Venom Bubbles for Poison, Golden Cross Halo for Lex Aeterna 2x Mark) & 7x7 Pixel Status Badges.

import { ROLE_BADGES, STATUS_DEFS, PAPERDOLL_ITEMS } from '../data/database.js';

export const customArtRegistry = new Map();

export function registerCustomArt(heroId, layer, imageElement) {
  if (!customArtRegistry.has(heroId)) customArtRegistry.set(heroId, {});
  customArtRegistry.get(heroId)[layer] = imageElement;
}

export function clearCustomArtForHero(heroId) {
  customArtRegistry.delete(heroId);
}

const shCache = {};
export function sh(hex, f) {
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

export function drawRoleBadge(ctx, role, x, y, k = 2) {
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
export function getRoleIconDataURL(role) {
  if (roleIconCache[role]) return roleIconCache[role];
  const c = document.createElement('canvas');
  c.width = c.height = 20;
  drawRoleBadge(c.getContext('2d'), role, 1, 1, 2);
  return (roleIconCache[role] = c.toDataURL());
}

// Draws a 7x7 Matte Pixel Status Effect Badge (Freeze, Stun, Poison, Lex Aeterna, Provoke, Blessing, AGI)
export function drawStatusBadge(ctx, statusId, x, y, k = 1.6) {
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
export function getStatusIconDataURL(statusId) {
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

export function drawMatteAnimeHero(ctx, u, rt) {
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

export function drawUnitSprite(ctx, u, rt, tint = null) {
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

export function drawGeoSymbolPixel(ctx, sym, pxCoord, pyCoord, rt, scale = 3) {
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

export function getItemIconDataURL(item, kind = 'equip') {
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

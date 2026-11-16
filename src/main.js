// src/main.js
// UI Controller mirroring the user's preferred GRIDHUNT layout (Header + Canvas Stage + Right Sidebar + Floating .ro-modal Windows)
// Powered by Midgard Geo-Tactics' 22x22 2.5D Tactical Combat, Elemental/Status Depth, 8-Skill (4+4) Job Trees (Max Lv. 40), and 3-Tab Inventory!

import {
  GEO_PANELS,
  ELEMENTS,
  STATUS_DEFS,
  ROLE_BADGES,
  CONSUMABLE_ITEMS,
  MISC_ITEMS,
  CRAFT_RECIPES,
  EQUIP_SLOT_ORDER,
  PAPERDOLL_ITEMS,
  MIDGARD_BLOCKS,
  MAX_JOB_LV,
  getHeroJobTree,
  getHeroAvailableSkills
} from './data/database.js';
import {
  getRoleIconDataURL,
  getStatusIconDataURL,
  getItemIconDataURL,
  drawUnitSprite
} from './render/paperdoll.js';
import { MidgardGeoGame } from './engine/game.js';

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

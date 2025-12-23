// Couch Chaos v1 - data-driven, framework-free

const DATA = {
  services: [
    'YouTube', 'YouTube TV', 'Netflix', 'Prime Video', 'Disney+', 'Hulu', 'Dropout', 'Tubi'
  ],
  genres: [
    'Action','Adventure','Comedy','Drama','Romance','Thriller','Horror','Mystery','Crime','Fantasy','Science Fiction','Animation','Documentary','Family','Musical','Western','War','Sports','Biography','History','Political','Legal','Medical','Superhero','Heist','Spy/Espionage','Survival','Competition','Reality','Game Show','Talk Show','Variety','Educational'
  ],
  tones: [
    'Light','Dark','Serious','Playful','Whimsical','Somber','Hopeful','Bleak','Emotional','Heartfelt','Intense','Gentle','Heavy','Uplifting','Bittersweet','Earnest','Absurd','Dry','Witty','Satirical','Silly','Deadpan','Ironic','Goofy','Gritty','Suspenseful','Tense','Unsettling','Disturbing','Haunting','Chilling','Fast-Paced','Slow-Burn','Relentless','Chaotic','Calm','Methodical','Stylized','Grounded','Surreal','Experimental','Minimalist','Maximalist','Theatrical','Comforting','Challenging','Thought-Provoking','Easygoing','Escapist','Campy','Cheesy','Over-the-Top','Self-Serious'
  ],
  settings: [
    'Home','Apartment','House','Neighborhood','Suburb','Small Town','City','Downtown','Workplace','Office','Corporate Environment','School','Campus','Hospital','Medical Facility','Police Station','Courthouse','Prison','Government Institution','Military Base','Research Facility','Laboratory','Industrial Site','Store','Restaurant','Hotel','Resort','Vacation Destination','Travel Environment','Rural Environment','Farm or Ranch','Coastal Area','Island','Forest','Wilderness','Mountains','Desert','Remote Location','Isolated Community','Secret Location','Criminal Underworld','War Zone','Disaster Area','Political Environment','Diplomatic Setting','Courtroom World','Law Enforcement World','Healthcare System','Education System','Technology Sector','Scientific Community','Space Environment','Virtual or Digital World','Online Community','Simulation Environment','Fantasy World','Mythic Realm'
  ],
  timePeriods: [
    'Prehistoric','Ancient','Classical Antiquity','Medieval','Renaissance','Early Modern','Colonial Era','Age of Exploration','Industrial Age','Victorian Era','Edwardian Era','World War I Era','Interwar Period','World War II Era','Postwar Era','Cold War Era','Space Race Era','Mid-20th Century','Late 20th Century','1970s','1980s','1990s','Early 2000s','2010s','Contemporary','Present Day','Near Future','Distant Future','Far Future','Post-Apocalyptic','Alternate History','Timeless','Mythic Time','Undefined Past','Undefined Future'
  ],
  jumpMethods: [
    'Start at Beginning','Start at Middle','Jump to 25%','Jump to 50%','Jump to 75%','Blind Fast-Forward (10 seconds)','Blind Fast-Forward (20 seconds)','Partner Yells STOP'
  ],
  searchPrompts: [
    'Random Word','Emoji','Number','Favorite Color','Favorite Animal','Favorite Actor','Middle Name','Place You Grew Up','Current City','Workplace','A Food','A Feeling','A Verb','A Holiday'
  ],
  firstImpressionIdeas: [
    'Constantly checks their phone','Spins dramatically in chairs','Starts sentences with "Actually"','Trips over nothing','Over-apologizes','Has a secret hobby','Always arrives late but with snacks','Uses way too many metaphors'
  ],
  characterDraftActions: ['Lies','Yells','Cries','Reveals a secret','Makes a bad decision','Wins confrontation','Loses confrontation']
};

const MODES = [
  {
    id: 'guess-ending',
    name: 'Guess the Ending',
    shortDescription: 'Watch a chunk, predict the finale, then jump to see who nailed it.',
    howToPlaySteps: [
      'Pick something unfamiliar to both players.',
      'Watch the rolled number of minutes.',
      'Each person predicts the ending and the vibe.',
      'Jump to the finale or read a summary to reveal.'
    ],
    usesGenre: true,
    usesTone: true,
    usesSetting: true,
    usesTimePeriod: false,
    usesService: true,
    usesJump: true,
    usesSearchPrompt: true,
    usesTimer: true,
    timerFormula: '5d6',
    specialRules: 'Include a “Reveal Options” moment: jump to the ending or read a quick synopsis.'
  },
  {
    id: 'pause-predict',
    name: 'Pause & Predict',
    shortDescription: 'Drop into the middle, watch, predict the next beat, then test it.',
    howToPlaySteps: [
      'Jump to the rolled position and watch the timer.',
      'Predict what happens in the next segment.',
      'Hit Next Segment to roll again and watch the future.'
    ],
    usesGenre: true,
    usesTone: true,
    usesSetting: false,
    usesTimePeriod: false,
    usesService: true,
    usesJump: true,
    usesSearchPrompt: true,
    usesTimer: true,
    timerFormula: '3d6',
    specialRules: 'Use the Next Segment button to roll a second timer for the reveal.'
  },
  {
    id: 'total-voiceover',
    name: 'Total Voiceover',
    shortDescription: 'Mute everything. You are the voices, the foley, the soundboard.',
    howToPlaySteps: [
      'Mute audio and turn subtitles off.',
      'Assign characters or switch each line.',
      'Fill the silence with narration and sound effects.'
    ],
    usesGenre: false,
    usesTone: true,
    usesSetting: false,
    usesTimePeriod: false,
    usesService: true,
    usesJump: false,
    usesSearchPrompt: true,
    usesTimer: true,
    timerFormula: '3d6',
    specialRules: 'Mute audio, subtitles off. Lean into accents and dramatic breaths.'
  },
  {
    id: 'subtitles-lens',
    name: 'Subtitles, But Make It Up',
    shortDescription: 'Volume down, captions on, and every line hides a new secret.',
    howToPlaySteps: [
      'Turn volume down but leave captions on.',
      'Roll a lens to reinterpret every line.',
      'Play for the rolled minutes, then swap the lens.'
    ],
    usesGenre: false,
    usesTone: true,
    usesSetting: false,
    usesTimePeriod: false,
    usesService: false,
    usesJump: false,
    usesSearchPrompt: false,
    usesTimer: true,
    timerFormula: '3d6',
    lensOptions: ['Inner Monologue', 'Lies', 'Passive Aggressive', 'Different Story'],
    specialRules: 'Roll a d4 lens to filter the captions: inner thoughts, lies, passive aggressive, or a different story.'
  },
  {
    id: 'foreign-guess',
    name: 'Foreign Language Guess the Plot',
    shortDescription: 'Hide the info, watch blind, guess everything, then reveal.',
    howToPlaySteps: [
      'Hide titles/summaries before you start.',
      'Watch the rolled minutes with subtitles off.',
      'Each player guesses the protagonist, goal, and what just happened.',
      'Turn on subtitles or read the summary to compare.'
    ],
    usesGenre: false,
    usesTone: true,
    usesSetting: true,
    usesTimePeriod: false,
    usesService: true,
    usesJump: false,
    usesSearchPrompt: false,
    usesTimer: true,
    timerFormula: '5d6',
    specialRules: 'Great with Netflix, Disney+, or Tubi — but any service works.'
  },
  {
    id: 'first-impression',
    name: 'First Impression',
    shortDescription: 'Pause on name drops, predict signature behaviors, score on repeats.',
    howToPlaySteps: [
      'When a character name appears, pause.',
      'Each player writes one distinctive behavior.',
      'Add the character to the tracker and hit +1 when it happens.'
    ],
    usesGenre: false,
    usesTone: false,
    usesSetting: false,
    usesTimePeriod: false,
    usesService: true,
    usesJump: false,
    usesSearchPrompt: false,
    usesTimer: false,
    timerFormula: null,
    specialRules: 'Score +1 each time your prediction occurs. End whenever you feel done.'
  },
  {
    id: 'character-draft',
    name: 'Character Draft (Simple)',
    shortDescription: 'Draft characters as they appear and earn points for dramatic moves.',
    howToPlaySteps: [
      'When a new named character appears, draft them to a player.',
      'Tap the action buttons to award points when it happens on-screen.',
      'Keep it light — bragging rights only.'
    ],
    usesGenre: false,
    usesTone: false,
    usesSetting: false,
    usesTimePeriod: false,
    usesService: true,
    usesJump: false,
    usesSearchPrompt: false,
    usesTimer: false,
    timerFormula: null,
    specialRules: 'Draft quickly and cheer for wild behavior. Actions are universal.'
  }
];

const defaultSettings = {
  players: [
    { name: 'Player 1', score: 0 },
    { name: 'Player 2', score: 0 }
  ],
  scoringEnabled: true,
  seeded: false,
  seedWord: 'chaos',
  defaultModeFirst: true,
  defaultContentFirst: false,
  servicesEnabled: DATA.services.reduce((acc, name) => { acc[name] = true; return acc; }, {})
};

const appState = {
  screen: 'start',
  currentModeId: null,
  currentRolls: {},
  diceLog: [],
  summary: null,
  turnNumber: 1,
  currentApproach: 'mode-first',
  trackers: {
    firstImpression: [],
    characterDraft: []
  },
  ...JSON.parse(JSON.stringify(defaultSettings))
};

// Randomness utilities
function mulberry32(seed) {
  let t = seed + 0x6D2B79F5;
  return function() {
    t |= 0;
    t = t + 0x6D2B79F5 | 0;
    let r = Math.imul(t ^ t >>> 15, 1 | t);
    r = r + Math.imul(r ^ r >>> 7, 61 | r) ^ r;
    return ((r ^ r >>> 14) >>> 0) / 4294967296;
  };
}

function hashSeed(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = h << 13 | h >>> 19;
  }
  return (h >>> 0);
}

function setRNG() {
  if (appState.seeded && appState.seedWord.trim()) {
    const seedVal = hashSeed(appState.seedWord.trim());
    appState.random = mulberry32(seedVal);
  } else {
    appState.random = Math.random;
  }
}

setRNG();

function randomItem(arr) {
  return arr[Math.floor(appState.random() * arr.length)];
}

function enabledServices() {
  const list = DATA.services.filter(s => appState.servicesEnabled[s]);
  return list.length ? list : DATA.services;
}

// Dice helpers
function rollDie(sides) {
  const result = Math.floor(appState.random() * sides) + 1;
  appState.diceLog.push({ label: `d${sides}`, values: [result] });
  return result;
}

function rollDice(count, sides) {
  const rolls = [];
  for (let i = 0; i < count; i++) rolls.push(rollDie(sides));
  appState.diceLog.push({ label: `${count}d${sides}`, values: rolls });
  return rolls;
}

function rollSum(notation) {
  const [count, sides] = notation.toLowerCase().split('d').map(Number);
  const rolls = rollDice(count, sides);
  return { total: rolls.reduce((a, b) => a + b, 0), rolls, notation: `${count}d${sides}` };
}

// Persistence
const STORAGE_KEY = 'couch-chaos-v1';
function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      Object.assign(appState, parsed);
      setRNG();
    } catch (e) {
      console.warn('Failed to load saved state', e);
    }
  }
}

function saveState() {
  const toSave = {
    players: appState.players,
    scoringEnabled: appState.scoringEnabled,
    seeded: appState.seeded,
    seedWord: appState.seedWord,
    defaultModeFirst: appState.defaultModeFirst,
    defaultContentFirst: appState.defaultContentFirst,
    servicesEnabled: appState.servicesEnabled
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
}

// Mode helpers
function getMode(id) {
  return MODES.find(m => m.id === id);
}

function resetTrackers() {
  appState.trackers = { firstImpression: [], characterDraft: [] };
}

function rollForCurrentMode() {
  const mode = getMode(appState.currentModeId);
  if (!mode) return;
  const rolls = {};

  const includeService = mode.usesService || appState.currentApproach === 'content-first';
  const includeSearch = mode.usesSearchPrompt || appState.currentApproach === 'content-first';

  if (includeService) {
    rolls.service = randomItem(enabledServices());
  }
  if (includeSearch) {
    rolls.searchPrompt = randomItem(DATA.searchPrompts);
  }
  if (mode.usesGenre) {
    rolls.genre = randomItem(DATA.genres);
  }
  if (mode.usesTone) {
    rolls.tone = randomItem(DATA.tones);
  }
  if (mode.usesSetting) {
    rolls.setting = randomItem(DATA.settings);
  }
  if (mode.usesTimePeriod) {
    rolls.timePeriod = randomItem(DATA.timePeriods);
  }
  if (mode.usesJump || appState.currentApproach === 'content-first') {
    rolls.jumpMethod = randomItem(DATA.jumpMethods);
  }
  if (mode.usesTimer && mode.timerFormula) {
    const res = rollSum(mode.timerFormula);
    rolls.timer = res;
  }
  if (mode.id === 'subtitles-lens') {
    rolls.lens = randomItem(mode.lensOptions);
  }
  appState.currentRolls = rolls;
}

function rerollElement(type) {
  const mode = getMode(appState.currentModeId);
  if (!mode) return;
  switch (type) {
    case 'service':
      appState.currentRolls.service = randomItem(enabledServices());
      break;
    case 'searchPrompt':
      appState.currentRolls.searchPrompt = randomItem(DATA.searchPrompts);
      break;
    case 'genre':
      appState.currentRolls.genre = randomItem(DATA.genres);
      break;
    case 'tone':
      appState.currentRolls.tone = randomItem(DATA.tones);
      break;
    case 'setting':
      appState.currentRolls.setting = randomItem(DATA.settings);
      break;
    case 'timePeriod':
      appState.currentRolls.timePeriod = randomItem(DATA.timePeriods);
      break;
    case 'jumpMethod':
      appState.currentRolls.jumpMethod = randomItem(DATA.jumpMethods);
      break;
    case 'timer':
      if (mode.usesTimer && mode.timerFormula) appState.currentRolls.timer = rollSum(mode.timerFormula);
      break;
    case 'lens':
      if (mode.lensOptions) appState.currentRolls.lens = randomItem(mode.lensOptions);
      break;
    case 'next-segment':
      if (!appState.currentRolls.additionalTimers) appState.currentRolls.additionalTimers = [];
      appState.currentRolls.additionalTimers.push(rollSum(mode.timerFormula || '3d6'));
      break;
  }
  render();
}

// Rendering
const app = document.getElementById('app');

function updateHeader() {
  document.getElementById('player1-display').innerText = `${appState.players[0].name}${appState.scoringEnabled ? ` • ${appState.players[0].score}` : ''}`;
  document.getElementById('player2-display').innerText = `${appState.players[1].name}${appState.scoringEnabled ? ` • ${appState.players[1].score}` : ''}`;
}

function render() {
  updateHeader();
  switch (appState.screen) {
    case 'start':
      renderStart();
      break;
    case 'modeSelect':
      renderModeSelect();
      break;
    case 'modeDetail':
      renderModeDetail();
      break;
    case 'activeTurn':
      renderActiveTurn();
      break;
    case 'endTurn':
      renderEndTurn();
      break;
    default:
      renderStart();
  }
}

function renderStart() {
  app.innerHTML = `
    <section class="panel hero">
      <p class="badge">Turn ${appState.turnNumber}</p>
      <h1>Ready for chaos?</h1>
      <p>Roll a mode, mash genres, and make any stream a party.
        Choose Mode-First for pure surprise or Content-First to find something specific first.</p>
      <div class="cta-row">
        <button class="primary" data-action="start-turn">Start Turn</button>
        <button class="ghost" data-action="open-how">How to Play</button>
      </div>
    </section>
  `;
}

function renderModeSelect() {
  const modeCards = MODES.map(m => `
    <div class="card" data-action="select-mode" data-mode-id="${m.id}">
      <div class="name">${m.name}</div>
      <div class="desc">${m.shortDescription}</div>
      <div class="badge">${m.usesTimer ? `${m.timerFormula} timer` : 'No timer'}</div>
    </div>
  `).join('');
  const approach = appState.currentApproach === 'content-first' ? 'content-first' : 'mode-first';
  app.innerHTML = `
    <section class="panel">
      <h2>Choose your approach</h2>
      <div class="grid">
        <label class="card ${approach === 'mode-first' ? 'selected' : ''}" data-action="approach" data-value="mode-first">
          <div class="name">Mode-First</div>
          <div class="desc">Pick or roll a mode, then we roll only what it needs.</div>
        </label>
        <label class="card ${approach === 'content-first' ? 'selected' : ''}" data-action="approach" data-value="content-first">
          <div class="name">Content-First</div>
          <div class="desc">Roll Service/Search first, then apply the mode.</div>
        </label>
      </div>
      <div class="cta-row">
        <button class="secondary" data-action="roll-mode">Roll a random mode</button>
        <button class="ghost" data-action="back-start">Back</button>
      </div>
    </section>
    <section class="panel">
      <div class="section-title">Pick a mode</div>
      <div class="grid">${modeCards}</div>
    </section>
  `;
}

function renderModeDetail() {
  const mode = getMode(appState.currentModeId);
  if (!mode) return renderModeSelect();
  if (!appState.currentRolls.timer && mode.usesTimer) {
    rollForCurrentMode();
  }
  const badges = [
    mode.usesTimer ? `${mode.timerFormula} timer` : 'No timer',
    mode.usesJump ? 'Jump method' : null,
    mode.usesSearchPrompt ? 'Search prompt' : null,
    mode.usesService ? 'Service' : null,
    mode.specialRules ? 'Special rules' : null
  ].filter(Boolean).map(b => `<span class="badge">${b}</span>`).join(' ');

  const rollsHtml = renderRolls(mode, true);

  app.innerHTML = `
    <section class="panel">
      <div class="section-title">Mode Detail</div>
      <h2>${mode.name}</h2>
      <div class="desc">${mode.shortDescription}</div>
      <div>${badges}</div>
      <ul class="checklist">
        ${mode.howToPlaySteps.map(step => `<li><input type="checkbox"> <span>${step}</span></li>`).join('')}
      </ul>
      ${mode.specialRules ? `<p class="tip">${mode.specialRules}</p>` : ''}
      <div class="actions">
        <button class="secondary" data-action="reroll-all">Re-roll prompts</button>
        <button class="primary" data-action="begin-turn">Begin Turn</button>
        <button class="ghost" data-action="back-select">Back to modes</button>
      </div>
    </section>
    <section class="panel">
      <div class="section-title">Rolled Prompts</div>
      ${rollsHtml}
      ${renderDiceTray()}
    </section>
  `;
}

function renderActiveTurn() {
  const mode = getMode(appState.currentModeId);
  const rollsHtml = renderRolls(mode, false);
  const trackersHtml = renderTrackers(mode);
  const steps = mode.howToPlaySteps.map(step => `<li><input type="checkbox"> <span>${step}</span></li>`).join('');
  app.innerHTML = `
    <section class="panel">
      <div class="section-title">Active Turn</div>
      <h2>${mode.name}</h2>
      <p>${mode.shortDescription}</p>
      <ul class="checklist">${steps}</ul>
      ${mode.specialRules ? `<p class="tip">${mode.specialRules}</p>` : ''}
      <div class="actions">
        <button class="primary" data-action="end-turn">End Turn</button>
        <button class="ghost" data-action="reroll-all">Re-roll prompts</button>
      </div>
    </section>
    <section class="panel">
      <div class="section-title">Your Prompts</div>
      ${rollsHtml}
      ${mode.id === 'guess-ending' ? renderRevealOptions() : ''}
      ${mode.id === 'pause-predict' ? renderNextSegmentButton() : ''}
      ${renderDiceTray()}
    </section>
    ${trackersHtml}
  `;
}

function renderEndTurn() {
  if (!appState.summary) appState.summary = { mode: appState.currentModeId, rolls: appState.currentRolls };
  const mode = getMode(appState.summary.mode);
  const rollLines = Object.entries(appState.summary.rolls || {}).map(([k, v]) => {
    if (k === 'timer') return `<div><strong>Timer:</strong> ${v.total} minutes (${v.notation})</div>`;
    if (k === 'additionalTimers') return `<div><strong>Next Segments:</strong> ${v.map(t => `${t.total}m`).join(', ')}</div>`;
    if (k === 'lens') return `<div><strong>Lens:</strong> ${v}</div>`;
    return `<div><strong>${labelize(k)}:</strong> ${v}</div>`;
  }).join('');

  app.innerHTML = `
    <section class="panel">
      <h2>Turn Summary</h2>
      <p class="badge">Turn ${appState.turnNumber}</p>
      <div class="summary">
        <div class="box"><strong>Mode</strong><p>${mode ? mode.name : ''}</p></div>
        <div class="box"><strong>Rolls</strong>${rollLines}</div>
        <div class="box"><strong>Scores</strong><p>${appState.players[0].name}: ${appState.players[0].score}<br>${appState.players[1].name}: ${appState.players[1].score}</p></div>
      </div>
      <div class="actions">
        <button class="primary" data-action="next-turn">Next Turn</button>
        <button class="ghost" data-action="back-start">Home</button>
      </div>
    </section>
  `;
}

function renderRolls(mode, includeButtons) {
  const r = appState.currentRolls;
  const rows = [];
  const addRow = (title, value, key) => {
    if (value === undefined || value === null) return;
    rows.push(`
      <div class="roll-row">
        <div class="roll-result">
          <div class="roll-title">${title}</div>
          <div class="roll-value">${value}</div>
        </div>
        ${includeButtons ? `<button class="ghost" data-action="reroll" data-type="${key}">Roll Again</button>` : ''}
      </div>
    `);
  };

  if (r.service) addRow('Service', r.service, 'service');
  if (r.searchPrompt) addRow('Search Prompt', r.searchPrompt, 'searchPrompt');
  if (r.genre) addRow('Genre', r.genre, 'genre');
  if (r.tone) addRow('Tone', r.tone, 'tone');
  if (r.setting) addRow('Setting', r.setting, 'setting');
  if (r.timePeriod) addRow('Time Period', r.timePeriod, 'timePeriod');
  if (r.jumpMethod) addRow('Jump Method', r.jumpMethod, 'jumpMethod');
  if (r.lens) addRow('Caption Lens', r.lens, 'lens');
  if (r.timer) {
    rows.push(`
      <div class="roll-row">
        <div class="roll-result">
          <div class="roll-title">Timer</div>
          <div class="roll-value">Set a phone timer for <strong>${r.timer.total}</strong> minutes</div>
          <div class="dice-tray tip">Rolled ${r.timer.notation}: ${r.timer.rolls.join(', ')}</div>
        </div>
        ${includeButtons ? `<button class="ghost" data-action="reroll" data-type="timer">Roll Again</button>` : ''}
      </div>
    `);
  }
  if (r.additionalTimers && r.additionalTimers.length) {
    rows.push(`<div class="timer-callout">Next Segment timers: ${r.additionalTimers.map(t => `${t.total}m`).join(', ')}</div>`);
  }
  return rows.join('') || '<p>No rolls yet. Hit Re-roll prompts.</p>';
}

function renderDiceTray() {
  if (!appState.diceLog.length) return '';
  const items = appState.diceLog.slice(-8).map(d => `<span class="die">${d.label}: ${d.values.join(', ')}</span>`).join('');
  return `<div class="dice-tray">${items}</div>`;
}

function renderRevealOptions() {
  return `
    <div class="panel">
      <h3>Reveal Options</h3>
      <p>Jump to the final scene, skim a summary, or rewind from the ending to see who was closest.</p>
    </div>
  `;
}

function renderNextSegmentButton() {
  return `
    <div class="panel">
      <h3>Need a reveal?</h3>
      <p>Roll another timer for the next watch segment.</p>
      <button class="secondary" data-action="reroll" data-type="next-segment">Next Segment Timer</button>
    </div>
  `;
}

function renderTrackers(mode) {
  const blocks = [];
  if (mode.id === 'first-impression') {
    blocks.push(renderFirstImpression());
  }
  if (mode.id === 'character-draft') {
    blocks.push(renderCharacterDraft());
  }
  return blocks.join('');
}

function renderFirstImpression() {
  const rows = appState.trackers.firstImpression.map((c, idx) => `
    <tr>
      <td>${c.name}</td>
      <td>${c.p1}</td>
      <td>${c.p2}</td>
      <td>
        <button class="secondary" data-action="fp-score" data-target="p1" data-index="${idx}">+1 ${appState.players[0].name}</button>
        <button class="secondary" data-action="fp-score" data-target="p2" data-index="${idx}">+1 ${appState.players[1].name}</button>
      </td>
    </tr>
  `).join('');
  const ideas = DATA.firstImpressionIdeas.map(i => `<span class="badge">${i}</span>`).join('');
  return `
    <section class="panel tracker">
      <h3>First Impression Tracker</h3>
      <form id="fi-form">
        <input type="text" name="character" placeholder="Character name" required>
        <input type="text" name="p1" placeholder="${appState.players[0].name} prediction" required>
        <input type="text" name="p2" placeholder="${appState.players[1].name} prediction" required>
        <button class="primary" type="submit">Add Character</button>
      </form>
      <table>
        <thead><tr><th>Character</th><th>${appState.players[0].name}</th><th>${appState.players[1].name}</th><th>Score</th></tr></thead>
        <tbody>${rows || '<tr><td colspan="4">Add characters as you pause.</td></tr>'}</tbody>
      </table>
      <p class="tip">Ideas: ${ideas}</p>
    </section>
  `;
}

function renderCharacterDraft() {
  const rows = appState.trackers.characterDraft.map((c, idx) => `
    <tr>
      <td>${c.name}</td>
      <td>${appState.players[c.owner].name}</td>
      <td>${DATA.characterDraftActions.map(action => `<button class="ghost" data-action="draft-score" data-index="${idx}" data-action-name="${action}">${action}</button>`).join(' ')}</td>
    </tr>
  `).join('');
  return `
    <section class="panel tracker">
      <h3>Character Draft Tracker</h3>
      <form id="draft-form">
        <input type="text" name="character" placeholder="Character name" required>
        <select name="owner" required>
          <option value="0">${appState.players[0].name}</option>
          <option value="1">${appState.players[1].name}</option>
        </select>
        <button class="primary" type="submit">Draft Character</button>
      </form>
      <table>
        <thead><tr><th>Character</th><th>Drafted By</th><th>Actions</th></tr></thead>
        <tbody>${rows || '<tr><td colspan="3">Draft characters as they appear.</td></tr>'}</tbody>
      </table>
      <p class="tip">Give yourself +1 whenever your drafted character hits one of the action buttons.</p>
    </section>
  `;
}

// Event handlers
app.addEventListener('click', (e) => {
  const action = e.target.dataset.action;
  if (!action) return;
  switch (action) {
    case 'start-turn':
      appState.screen = 'modeSelect';
      appState.currentApproach = appState.defaultContentFirst ? 'content-first' : (appState.defaultModeFirst ? 'mode-first' : 'content-first');
      render();
      break;
    case 'open-how':
      toggleModal('how-modal', true);
      break;
    case 'approach':
      appState.currentApproach = e.target.dataset.value;
      render();
      break;
    case 'roll-mode':
      const randomMode = randomItem(MODES);
      appState.currentModeId = randomMode.id;
      appState.diceLog = [];
      resetTrackers();
      rollForCurrentMode();
      appState.screen = 'modeDetail';
      render();
      break;
    case 'select-mode':
      appState.currentModeId = e.target.closest('[data-mode-id]').dataset.modeId;
      appState.diceLog = [];
      resetTrackers();
      rollForCurrentMode();
      appState.screen = 'modeDetail';
      render();
      break;
    case 'reroll':
      rerollElement(e.target.dataset.type);
      break;
    case 'reroll-all':
      appState.diceLog = [];
      rollForCurrentMode();
      render();
      break;
    case 'begin-turn':
      appState.screen = 'activeTurn';
      render();
      break;
    case 'end-turn':
      appState.summary = { mode: appState.currentModeId, rolls: appState.currentRolls };
      appState.screen = 'endTurn';
      render();
      break;
    case 'next-turn':
      appState.turnNumber += 1;
      appState.screen = 'modeSelect';
      appState.currentModeId = null;
      appState.currentRolls = {};
      appState.summary = null;
      appState.diceLog = [];
      resetTrackers();
      render();
      break;
    case 'back-start':
      appState.screen = 'start';
      render();
      break;
    case 'back-select':
      appState.screen = 'modeSelect';
      render();
      break;
    case 'fp-score':
      applyTrackerScore('firstImpression', e.target.dataset.target, Number(e.target.dataset.index));
      break;
    case 'draft-score':
      applyTrackerScore('characterDraft', 'owner', Number(e.target.dataset.index));
      break;
  }
});

app.addEventListener('submit', (e) => {
  if (e.target.id === 'fi-form') {
    e.preventDefault();
    const data = new FormData(e.target);
    appState.trackers.firstImpression.push({
      name: data.get('character'),
      p1: data.get('p1'),
      p2: data.get('p2')
    });
    e.target.reset();
    render();
  }
  if (e.target.id === 'draft-form') {
    e.preventDefault();
    const data = new FormData(e.target);
    appState.trackers.characterDraft.push({
      name: data.get('character'),
      owner: Number(data.get('owner'))
    });
    e.target.reset();
    render();
  }
});

function applyTrackerScore(type, target, index) {
  if (!appState.scoringEnabled) return;
  const delta = 1;
  if (type === 'firstImpression') {
    if (target === 'p1') appState.players[0].score += delta;
    if (target === 'p2') appState.players[1].score += delta;
  }
  if (type === 'characterDraft') {
    const entry = appState.trackers.characterDraft[index];
    if (entry) appState.players[entry.owner].score += delta;
  }
  render();
  saveState();
}

// Modal helpers
function toggleModal(id, show) {
  const el = document.getElementById(id);
  if (!el) return;
  el.setAttribute('aria-hidden', show ? 'false' : 'true');
}

['how-modal', 'settings-modal'].forEach(id => {
  const modal = document.getElementById(id);
  modal.addEventListener('click', (e) => {
    if (e.target.dataset.closeModal !== undefined || e.target === modal) {
      toggleModal(id, false);
    }
  });
});

document.getElementById('open-settings').addEventListener('click', () => {
  populateSettings();
  toggleModal('settings-modal', true);
});

// Settings form
const serviceContainer = document.getElementById('service-checkboxes');
function renderServiceCheckboxes() {
  serviceContainer.innerHTML = DATA.services.map(service => `
    <label class="chip"><input type="checkbox" name="service" value="${service}" ${appState.servicesEnabled[service] ? 'checked' : ''}> ${service}</label>
  `).join('');
}

function populateSettings() {
  document.getElementById('player1-name').value = appState.players[0].name;
  document.getElementById('player2-name').value = appState.players[1].name;
  document.getElementById('scoring-toggle').checked = appState.scoringEnabled;
  document.getElementById('seeded-toggle').checked = appState.seeded;
  document.getElementById('seed-word').value = appState.seedWord;
  document.getElementById('mode-first-default').checked = appState.defaultModeFirst;
  document.getElementById('content-first-default').checked = appState.defaultContentFirst;
  renderServiceCheckboxes();
}

function labelize(key) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
}

document.getElementById('settings-form').addEventListener('submit', (e) => {
  e.preventDefault();
  appState.players[0].name = document.getElementById('player1-name').value || 'Player 1';
  appState.players[1].name = document.getElementById('player2-name').value || 'Player 2';
  appState.scoringEnabled = document.getElementById('scoring-toggle').checked;
  appState.seeded = document.getElementById('seeded-toggle').checked;
  appState.seedWord = document.getElementById('seed-word').value || 'chaos';
  appState.defaultModeFirst = document.getElementById('mode-first-default').checked;
  appState.defaultContentFirst = document.getElementById('content-first-default').checked;
  const chosen = Array.from(serviceContainer.querySelectorAll('input[name="service"]'));
  chosen.forEach(c => appState.servicesEnabled[c.value] = c.checked);
  setRNG();
  saveState();
  updateHeader();
  toggleModal('settings-modal', false);
  render();
});

document.getElementById('reset-game').addEventListener('click', () => {
  if (!confirm('Reset scores and settings?')) return;
  Object.assign(appState, {
    screen: 'start',
    currentModeId: null,
    currentRolls: {},
    diceLog: [],
    summary: null,
    turnNumber: 1,
    currentApproach: 'mode-first',
    trackers: { firstImpression: [], characterDraft: [] },
    ...JSON.parse(JSON.stringify(defaultSettings))
  });
  setRNG();
  saveState();
  render();
  toggleModal('settings-modal', false);
});

// init
loadState();
renderServiceCheckboxes();
render();

/*
README (quick)
- How to run: open index.html in a modern browser. All logic is client-side and offline-ready after load.
- Edit data lists: app.js DATA constant contains services, genres, tones, settings, time periods, jump methods, and prompts.
- Add a new game mode: append to the MODES array with id, name, descriptions, howToPlaySteps, and flags for what to roll.
- Hook up Google Sheets later: replace DATA accessors (randomItem and enabledServices) with fetch calls that populate DATA, then re-render. Keep mode definitions structured for easy mapping to sheet rows.
*/

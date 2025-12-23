// Couch Chaos - plain JS implementation

const DATA = {
  services: [
    'YouTube','YouTube TV','Netflix','Prime Video','Disney+','Hulu','Dropout','Tubi'
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
  ]
};

const MODES = [
  {
    id: 'guess-ending',
    name: 'Guess the Ending',
    shortDescription: 'Watch a chunk, then predict the finale and vibe before jumping ahead.',
    howToPlaySteps: [
      'Pick something neither of you have seen and hide spoilers.',
      'Watch the rolled minutes, taking notes on vibes.',
      'Pause and each guess the ending and tone.',
      'Jump to the finale or skim a summary to reveal.'
    ],
    usesGenre: false,
    usesTone: true,
    usesSetting: true,
    usesTimePeriod: true,
    usesService: true,
    usesJump: true,
    usesSearchPrompt: true,
    usesTimer: true,
    timerDice: '5d6',
    specialRules: 'Make the final reveal dramatic—count down from three!'
  },
  {
    id: 'pause-predict',
    name: 'Pause & Predict',
    shortDescription: 'Drop into a random moment, predict the next stretch, then check your work.',
    howToPlaySteps: [
      'Use the roll to land somewhere in the movie/show.',
      'Watch the rolled minutes.',
      'Pause and each predict the next moments.',
      'Watch another equal chunk to see how close you were.'
    ],
    usesGenre: true,
    usesTone: true,
    usesSetting: true,
    usesTimePeriod: false,
    usesService: true,
    usesJump: true,
    usesSearchPrompt: true,
    usesTimer: true,
    timerDice: '3d6',
    specialRules: 'Run the second timer with the Next Segment button.'
  },
  {
    id: 'total-voiceover',
    name: 'Total Voiceover',
    shortDescription: 'Mute everything. You are the voices, narration, and sound effects.',
    howToPlaySteps: [
      'Mute audio and turn subtitles off.',
      'Roll a timer and narrate every line and sound.',
      'Swap narrators halfway if you like.'
    ],
    usesGenre: false,
    usesTone: false,
    usesSetting: false,
    usesTimePeriod: false,
    usesService: true,
    usesJump: false,
    usesSearchPrompt: true,
    usesTimer: true,
    timerDice: '3d6',
    specialRules: 'Mute audio, subtitles off.'
  },
  {
    id: 'subtitles-make-it-up',
    name: 'Subtitles, But Make It Up',
    shortDescription: 'Volume down, subtitles on; reinterpret every caption as inner thoughts.',
    howToPlaySteps: [
      'Lower volume so the text leads.',
      'Roll a lens if you want extra spice.',
      'Reframe each subtitle as the rolled lens for the duration.'
    ],
    usesGenre: false,
    usesTone: false,
    usesSetting: false,
    usesTimePeriod: false,
    usesService: false,
    usesJump: false,
    usesSearchPrompt: false,
    usesTimer: true,
    timerDice: '3d6',
    specialRules: 'Optional lens: Inner Monologue / Lies / Passive Aggressive / Different Story.'
  },
  {
    id: 'foreign-guess',
    name: 'Foreign Language Guess the Plot',
    shortDescription: 'Turn off subtitles, watch a stretch, and guess who wants what.',
    howToPlaySteps: [
      'Hide episode title and description if possible.',
      'Watch the rolled minutes with subtitles off.',
      'Each person names the MC, their goal, and what just happened.',
      'Turn subtitles on or skim summary to reveal.'
    ],
    usesGenre: false,
    usesTone: true,
    usesSetting: true,
    usesTimePeriod: false,
    usesService: true,
    usesJump: false,
    usesSearchPrompt: true,
    usesTimer: true,
    timerDice: '5d6',
    specialRules: 'Great on Netflix/Disney+/Tubi, but any service works.'
  },
  {
    id: 'first-impression',
    name: 'First Impression',
    shortDescription: 'When a character is named, predict their signature move and score it.',
    howToPlaySteps: [
      'Add characters the moment their name drops.',
      'Each player writes a behavior they expect to repeat.',
      'Hit +1 when that behavior happens. Brag accordingly.'
    ],
    usesGenre: true,
    usesTone: true,
    usesSetting: false,
    usesTimePeriod: false,
    usesService: false,
    usesJump: false,
    usesSearchPrompt: false,
    usesTimer: false,
    specialRules: 'Keep the tracker open as you watch.'
  },
  {
    id: 'character-draft',
    name: 'Character Draft (Simple)',
    shortDescription: 'Draft characters as they appear; score on universal drama actions.',
    howToPlaySteps: [
      'Draft characters to a player when they first appear.',
      'Tap action buttons whenever your drafted character does it.',
      'Tally at the end or whenever you get bored.'
    ],
    usesGenre: true,
    usesTone: true,
    usesSetting: false,
    usesTimePeriod: false,
    usesService: false,
    usesJump: false,
    usesSearchPrompt: false,
    usesTimer: false,
    specialRules: 'Actions: lie, yell, cry, reveal secret, bad decision, win/lose confrontation.'
  }
];

const defaultState = {
  screen: 'startScreen',
  settings: {
    player1: 'Player 1',
    player2: 'Player 2',
    scoring: true,
    seedEnabled: false,
    seed: 'chaos',
    contentFirstDefault: false,
    servicesEnabled: [...DATA.services]
  },
  scores: { p1: 0, p2: 0 },
  turn: {
    contentFirst: false,
    mode: null,
    rolls: {},
    diceLog: [],
    trackers: { characters: [], draft: [] }
  }
};

let rngFunction = Math.random;
let appState = loadState();

function loadState() {
  const saved = localStorage.getItem('couchChaosState');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return { ...defaultState, ...parsed, settings: { ...defaultState.settings, ...parsed.settings }, scores: { ...defaultState.scores, ...(parsed.scores || {}) }, turn: { ...defaultState.turn, ...(parsed.turn || {}), trackers: { ...defaultState.turn.trackers, ...(parsed.turn?.trackers || {}) } } };
    } catch (e) {
      console.warn('Failed to load saved state', e);
    }
  }
  return JSON.parse(JSON.stringify(defaultState));
}

function saveState() {
  localStorage.setItem('couchChaosState', JSON.stringify(appState));
}

// RNG utilities
function stringToSeed(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

function setRng() {
  rngFunction = appState.settings.seedEnabled ? stringToSeed(appState.settings.seed || 'chaos') : Math.random;
}

function rollDie(sides) {
  return Math.floor(rngFunction() * sides) + 1;
}

function rollDice(count, sides) {
  const rolls = Array.from({ length: count }, () => rollDie(sides));
  return { rolls, total: rolls.reduce((a, b) => a + b, 0) };
}

function rollSum(notation) {
  const [count, sides] = notation.toLowerCase().split('d').map(Number);
  const result = rollDice(count, sides);
  logDice(`Rolled ${notation}: [${result.rolls.join(', ')}] = ${result.total}`);
  return result;
}

function logDice(text) {
  appState.turn.diceLog = appState.turn.diceLog || [];
  appState.turn.diceLog.push(text);
  renderDiceTray();
}

// General helpers
function randomFrom(arr) {
  return arr[Math.floor(rngFunction() * arr.length)];
}

function setScreen(id) {
  document.querySelectorAll('.screen').forEach(sec => sec.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
  appState.screen = id;
  saveState();
}

function init() {
  setRng();
  bindNav();
  renderServiceCheckboxes();
  hydrateSettingsForm();
  renderModeList();
  syncScoreboards();
  setScreen(appState.screen || 'startScreen');
  document.getElementById('turnContentFirst').checked = appState.settings.contentFirstDefault;
}

// Navigation and UI bindings
function bindNav() {
  document.getElementById('startTurnBtn').onclick = () => {
    appState.turn.contentFirst = appState.settings.contentFirstDefault;
    document.getElementById('turnContentFirst').checked = appState.turn.contentFirst;
    setScreen('modeSelectScreen');
  };
  document.getElementById('gotoSettingsBtn').onclick = () => setScreen('settingsScreen');
  document.getElementById('backToStartBtn').onclick = () => setScreen('startScreen');
  document.getElementById('backToStartBtn2').onclick = () => setScreen('startScreen');
  document.getElementById('settingsNavBtn').onclick = () => setScreen('settingsScreen');
  document.getElementById('settingsForm').onsubmit = saveSettings;
  document.getElementById('howToPlayBtn').onclick = toggleModal;
  document.getElementById('closeModalBtn').onclick = toggleModal;
  document.getElementById('modalOverlay').onclick = e => { if (e.target.id === 'modalOverlay') toggleModal(); };
  document.getElementById('rollRandomMode').onclick = rollRandomMode;
  document.getElementById('turnContentFirst').onchange = e => appState.turn.contentFirst = e.target.checked;
  document.getElementById('endTurnBtn').onclick = endTurn;
  document.getElementById('nextTurnBtn').onclick = () => { resetTurn(); setScreen('modeSelectScreen'); };
  document.getElementById('backHomeBtn').onclick = () => { resetTurn(); setScreen('startScreen'); };
  document.getElementById('resetBtn').onclick = resetGame;
  document.getElementById('nextSegmentBtn').onclick = handleNextSegment;
  document.getElementById('addCharacterForm').onsubmit = handleAddCharacter;
  document.getElementById('addDraftForm').onsubmit = handleAddDraft;
}

function toggleModal() {
  document.getElementById('modalOverlay').classList.toggle('hidden');
}

// Settings
function renderServiceCheckboxes() {
  const container = document.getElementById('serviceCheckboxes');
  container.innerHTML = '';
  DATA.services.forEach(svc => {
    const id = `svc-${svc.replace(/\s+/g, '').toLowerCase()}`;
    const label = document.createElement('label');
    label.innerHTML = `<input type="checkbox" id="${id}" value="${svc}"> ${svc}`;
    container.appendChild(label);
  });
}

function hydrateSettingsForm() {
  const s = appState.settings;
  document.getElementById('player1Input').value = s.player1;
  document.getElementById('player2Input').value = s.player2;
  document.getElementById('scoringToggle').checked = s.scoring;
  document.getElementById('seedToggle').checked = s.seedEnabled;
  document.getElementById('seedInput').value = s.seed;
  document.getElementById('contentFirstToggle').checked = s.contentFirstDefault;
  DATA.services.forEach(svc => {
    const id = `svc-${svc.replace(/\s+/g, '').toLowerCase()}`;
    const box = document.getElementById(id);
    if (box) box.checked = s.servicesEnabled.includes(svc);
  });
  syncScoreboards();
}

function saveSettings(e) {
  e.preventDefault();
  const servicesEnabled = DATA.services.filter(svc => {
    const id = `svc-${svc.replace(/\s+/g, '').toLowerCase()}`;
    return document.getElementById(id).checked;
  });
  appState.settings = {
    player1: document.getElementById('player1Input').value || 'Player 1',
    player2: document.getElementById('player2Input').value || 'Player 2',
    scoring: document.getElementById('scoringToggle').checked,
    seedEnabled: document.getElementById('seedToggle').checked,
    seed: document.getElementById('seedInput').value || 'chaos',
    contentFirstDefault: document.getElementById('contentFirstToggle').checked,
    servicesEnabled: servicesEnabled.length ? servicesEnabled : [...DATA.services]
  };
  setRng();
  saveState();
  hydrateSettingsForm();
  alert('Settings saved.');
}

// Modes
function renderModeList() {
  const container = document.getElementById('modeList');
  container.innerHTML = '';
  MODES.forEach(mode => {
    const card = document.createElement('div');
    card.className = 'card mode-card';
    card.innerHTML = `
      <div class="badge-row">${mode.usesTimer ? '<span class="badge">Timer</span>' : ''}${mode.usesService ? '<span class="badge">Service</span>' : ''}${mode.usesSearchPrompt ? '<span class="badge">Search Prompt</span>' : ''}</div>
      <h4>${mode.name}</h4>
      <p>${mode.shortDescription}</p>
      <button class="secondary" data-mode="${mode.id}">Play this mode</button>
    `;
    card.querySelector('button').onclick = () => selectMode(mode.id);
    container.appendChild(card);
  });
}

function rollRandomMode() {
  const mode = randomFrom(MODES);
  selectMode(mode.id);
}

function selectMode(id) {
  const mode = MODES.find(m => m.id === id);
  if (!mode) return;
  appState.turn.mode = mode;
  appState.turn.diceLog = [];
  appState.turn.trackers = { characters: [], draft: [] };
  prepareRolls();
  renderModeDetail();
  setScreen('modeDetailScreen');
}

function prepareRolls() {
  const mode = appState.turn.mode;
  if (!mode) return;
  const contentFirst = appState.turn.contentFirst;
  const rolls = {};

  if (contentFirst || mode.usesService) {
    rolls.service = randomFrom(appState.settings.servicesEnabled);
  }
  if (contentFirst || mode.usesSearchPrompt) {
    rolls.searchPrompt = randomFrom(DATA.searchPrompts);
  }
  if (mode.usesGenre) rolls.genre = randomFrom(DATA.genres);
  if (mode.usesTone) rolls.tone = randomFrom(DATA.tones);
  if (mode.usesSetting) rolls.setting = randomFrom(DATA.settings);
  if (mode.usesTimePeriod) rolls.timePeriod = randomFrom(DATA.timePeriods);
  if (mode.usesJump) rolls.jump = randomFrom(DATA.jumpMethods);
  if (mode.usesTimer && mode.timerDice) {
    const res = rollSum(mode.timerDice);
    rolls.timer = res.total;
    rolls.timerDice = `${mode.timerDice} → ${res.rolls.join(', ')}`;
  }
  if (mode.id === 'subtitles-make-it-up') {
    rolls.lens = randomFrom(['Inner Monologue', 'Lies', 'Passive Aggressive', 'Different Story']);
  }
  appState.turn.rolls = rolls;
  saveState();
}

function reroll(field) {
  const mode = appState.turn.mode;
  if (!mode) return;
  switch (field) {
    case 'service':
      appState.turn.rolls.service = randomFrom(appState.settings.servicesEnabled); break;
    case 'searchPrompt':
      appState.turn.rolls.searchPrompt = randomFrom(DATA.searchPrompts); break;
    case 'genre':
      appState.turn.rolls.genre = randomFrom(DATA.genres); break;
    case 'tone':
      appState.turn.rolls.tone = randomFrom(DATA.tones); break;
    case 'setting':
      appState.turn.rolls.setting = randomFrom(DATA.settings); break;
    case 'timePeriod':
      appState.turn.rolls.timePeriod = randomFrom(DATA.timePeriods); break;
    case 'jump':
      appState.turn.rolls.jump = randomFrom(DATA.jumpMethods); break;
    case 'timer':
      if (mode.timerDice) {
        const res = rollSum(mode.timerDice);
        appState.turn.rolls.timer = res.total;
        appState.turn.rolls.timerDice = `${mode.timerDice} → ${res.rolls.join(', ')}`;
      }
      break;
    case 'lens':
      appState.turn.rolls.lens = randomFrom(['Inner Monologue', 'Lies', 'Passive Aggressive', 'Different Story']);
      break;
  }
  renderRolls();
  saveState();
}

function renderModeDetail() {
  const mode = appState.turn.mode;
  if (!mode) return;
  document.getElementById('modeTitle').textContent = mode.name;
  document.getElementById('modeDescription').textContent = mode.shortDescription;
  document.getElementById('turnMeta').textContent = appState.turn.contentFirst ? 'Content-first turn' : 'Mode-first turn';
  renderBadges(mode);
  renderRolls();
  renderSteps();
  renderDiceTray();
  renderTrackers();
  syncScoreboards();
  document.getElementById('nextSegmentBtn').classList.toggle('hidden', mode.id !== 'pause-predict');
}

function renderBadges(mode) {
  const container = document.getElementById('modeBadges');
  container.innerHTML = '';
  const flags = [
    mode.usesTimer && 'Timer',
    mode.usesService && 'Service',
    mode.usesSearchPrompt && 'Search',
    mode.usesJump && 'Jump',
    mode.usesGenre && 'Genre',
    mode.usesTone && 'Tone'
  ].filter(Boolean);
  flags.forEach(f => {
    const span = document.createElement('span');
    span.className = 'badge';
    span.textContent = f;
    container.appendChild(span);
  });
}

function renderRolls() {
  const container = document.getElementById('rollsContainer');
  container.innerHTML = '';
  const r = appState.turn.rolls;
  const mode = appState.turn.mode;
  const items = [
    r.service !== undefined ? { key: 'service', label: 'Service', value: r.service } : null,
    r.searchPrompt ? { key: 'searchPrompt', label: 'Search Prompt', value: r.searchPrompt } : null,
    r.genre ? { key: 'genre', label: 'Genre', value: r.genre } : null,
    r.tone ? { key: 'tone', label: 'Tone', value: r.tone } : null,
    r.setting ? { key: 'setting', label: 'Setting', value: r.setting } : null,
    r.timePeriod ? { key: 'timePeriod', label: 'Time Period', value: r.timePeriod } : null,
    r.jump ? { key: 'jump', label: 'Jump Method', value: r.jump } : null,
    r.timer ? { key: 'timer', label: 'Timer', value: `Set a phone timer for ${r.timer} minutes`, detail: r.timerDice } : null,
    mode?.id === 'subtitles-make-it-up' ? { key: 'lens', label: 'Lens', value: r.lens } : null
  ].filter(Boolean);

  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'roll';
    div.innerHTML = `
      <h4>${item.label}</h4>
      <div class="value">${item.value}</div>
      ${item.detail ? `<div class="muted small">Rolled: ${item.detail}</div>` : ''}
      <button class="secondary" data-field="${item.key}">Roll again</button>
    `;
    div.querySelector('button').onclick = () => reroll(item.key);
    container.appendChild(div);
  });

  if (!items.length) {
    container.innerHTML = '<p class="muted">No rolls needed for this mode—jump straight to the steps.</p>';
  }
}

function renderSteps() {
  const mode = appState.turn.mode;
  const list = document.getElementById('modeSteps');
  list.innerHTML = '';
  mode.howToPlaySteps.forEach(step => {
    const li = document.createElement('li');
    li.textContent = step;
    list.appendChild(li);
  });
  const specialEl = document.getElementById('specialRule');
  specialEl.textContent = mode.specialRules || '';
  specialEl.classList.toggle('hidden', !mode.specialRules);
  document.getElementById('revealOptions').classList.toggle('hidden', mode.id !== 'guess-ending');
  const lens = document.getElementById('lensRoll');
  lens.classList.toggle('hidden', mode.id !== 'subtitles-make-it-up');
  if (mode.id === 'subtitles-make-it-up') {
    lens.textContent = `Rolled lens: ${appState.turn.rolls.lens}. Reinterpret every subtitle through this lens.`;
  }
}

function renderDiceTray() {
  const tray = document.getElementById('diceTray');
  const log = appState.turn.diceLog || [];
  tray.innerHTML = log.length ? log.map(l => `<div>${l}</div>`).join('') : '<div>No dice rolled yet.</div>';
}

// Scoreboard
function syncScoreboards() {
  renderScoreboard(document.getElementById('scoreboard'));
  renderScoreboard(document.getElementById('scoreboardActive'));
}

function renderScoreboard(container) {
  if (!container) return;
  const { scoring, player1, player2 } = appState.settings;
  container.innerHTML = `<h4>Scoreboard ${scoring ? '' : '(off)'}</h4>`;
  [
    { key: 'p1', label: player1 },
    { key: 'p2', label: player2 }
  ].forEach(p => {
    const row = document.createElement('div');
    row.className = 'score-row';
    row.innerHTML = `
      <span class="name">${p.label}</span>
      <span class="value">${appState.scores[p.key]}</span>
    `;
    if (scoring) {
      const controls = document.createElement('div');
      controls.className = 'controls';
      const plus = document.createElement('button');
      plus.className = 'secondary';
      plus.textContent = '+1';
      plus.onclick = () => updateScore(p.key, 1);
      const minus = document.createElement('button');
      minus.className = 'secondary';
      minus.textContent = '-1';
      minus.onclick = () => updateScore(p.key, -1);
      controls.append(plus, minus);
      row.appendChild(controls);
    }
    container.appendChild(row);
  });
}

function updateScore(playerKey, delta) {
  appState.scores[playerKey] = Math.max(0, (appState.scores[playerKey] || 0) + delta);
  saveState();
  syncScoreboards();
}

// Trackers
function renderTrackers() {
  const first = document.getElementById('firstImpressionTracker');
  const draft = document.getElementById('characterDraftTracker');
  const modeId = appState.turn.mode?.id;
  first.classList.toggle('hidden', modeId !== 'first-impression');
  draft.classList.toggle('hidden', modeId !== 'character-draft');
  renderCharacters();
  renderDraft();
}

function handleAddCharacter(e) {
  e.preventDefault();
  const name = document.getElementById('characterNameInput').value.trim();
  const p1 = document.getElementById('p1PredictionInput').value.trim();
  const p2 = document.getElementById('p2PredictionInput').value.trim();
  if (!name || !p1 || !p2) return;
  appState.turn.trackers.characters.push({ name, p1, p2, p1Score: 0, p2Score: 0 });
  e.target.reset();
  renderCharacters();
}

function renderCharacters() {
  const list = document.getElementById('characterList');
  if (!list) return;
  const chars = appState.turn.trackers.characters || [];
  list.innerHTML = chars.length ? '' : '<p class="muted">Add characters as soon as they are named.</p>';
  chars.forEach((c, idx) => {
    const card = document.createElement('div');
    card.className = 'tracker-card';
    card.innerHTML = `<h5>${c.name}</h5>`;
    const row1 = document.createElement('div');
    row1.className = 'row';
    row1.innerHTML = `<span class="label">${appState.settings.player1}: ${c.p1}</span><div class="controls"></div>`;
    const row2 = document.createElement('div');
    row2.className = 'row';
    row2.innerHTML = `<span class="label">${appState.settings.player2}: ${c.p2}</span><div class="controls"></div>`;
    const btn1 = document.createElement('button');
    btn1.className = 'secondary';
    btn1.textContent = `+1 (${c.p1Score})`;
    btn1.onclick = () => { c.p1Score++; renderCharacters(); };
    const btn2 = document.createElement('button');
    btn2.className = 'secondary';
    btn2.textContent = `+1 (${c.p2Score})`;
    btn2.onclick = () => { c.p2Score++; renderCharacters(); };
    row1.querySelector('.controls').appendChild(btn1);
    row2.querySelector('.controls').appendChild(btn2);
    card.append(row1, row2);
    const remove = document.createElement('button');
    remove.className = 'text-button';
    remove.textContent = 'Remove';
    remove.onclick = () => { appState.turn.trackers.characters.splice(idx,1); renderCharacters(); };
    card.appendChild(remove);
    list.appendChild(card);
  });
}

function handleAddDraft(e) {
  e.preventDefault();
  const name = document.getElementById('draftNameInput').value.trim();
  const owner = document.getElementById('draftOwnerInput').value;
  if (!name) return;
  appState.turn.trackers.draft.push({ name, owner, actions: { lie:0, yell:0, cry:0, secret:0, bad:0, confrontation:0 } });
  e.target.reset();
  renderDraft();
}

function renderDraft() {
  const list = document.getElementById('draftList');
  if (!list) return;
  const items = appState.turn.trackers.draft || [];
  list.innerHTML = items.length ? '' : '<p class="muted">Draft characters as they appear.</p>';
  items.forEach((d, idx) => {
    const card = document.createElement('div');
    card.className = 'tracker-card';
    card.innerHTML = `<h5>${d.name} → ${d.owner === 'p1' ? appState.settings.player1 : appState.settings.player2}</h5>`;
    const actions = [
      ['lie','Lie'],['yell','Yell'],['cry','Cry'],['secret','Reveal secret'],['bad','Bad decision'],['confrontation','Win/Lose confrontation']
    ];
    actions.forEach(([key,label]) => {
      const row = document.createElement('div');
      row.className = 'row';
      row.innerHTML = `<span class="label">${label}</span><div class="controls"></div>`;
      const btn = document.createElement('button');
      btn.className = 'secondary';
      btn.textContent = `+1 (${d.actions[key]})`;
      btn.onclick = () => { d.actions[key]++; renderDraft(); };
      row.querySelector('.controls').appendChild(btn);
      card.appendChild(row);
    });
    const remove = document.createElement('button');
    remove.className = 'text-button';
    remove.textContent = 'Remove';
    remove.onclick = () => { appState.turn.trackers.draft.splice(idx,1); renderDraft(); };
    card.appendChild(remove);
    list.appendChild(card);
  });
}

// Turn flow
function handleNextSegment() {
  const mode = appState.turn.mode;
  if (mode?.id !== 'pause-predict') return;
  const minutes = appState.turn.rolls.timer;
  if (!minutes) {
    reroll('timer');
  }
  alert(`Second segment ready. Start the same ${appState.turn.rolls.timer} minute timer again!`);
}

function endTurn() {
  const r = appState.turn.rolls;
  const mode = appState.turn.mode;
  const summary = document.getElementById('turnSummary');
  summary.innerHTML = '';
  const addRow = (label, value) => {
    if (!value) return;
    const div = document.createElement('div');
    div.className = 'row';
    div.innerHTML = `<strong>${label}:</strong> <span class="muted">${value}</span>`;
    summary.appendChild(div);
  };
  addRow('Mode', mode?.name);
  addRow('Service', r.service);
  addRow('Search Prompt', r.searchPrompt);
  addRow('Genre', r.genre);
  addRow('Tone', r.tone);
  addRow('Setting', r.setting);
  addRow('Time Period', r.timePeriod);
  addRow('Jump', r.jump);
  addRow('Timer', r.timer ? `${r.timer} minutes (${r.timerDice || ''})` : 'No timer');
  addRow('Notes', mode?.specialRules);
  setScreen('endTurnScreen');
  saveState();
}

function resetTurn() {
  appState.turn = { contentFirst: appState.settings.contentFirstDefault, mode: null, rolls: {}, diceLog: [], trackers: { characters: [], draft: [] } };
  saveState();
}

function resetGame() {
  if (!confirm('Reset all scores and settings?')) return;
  appState = JSON.parse(JSON.stringify(defaultState));
  setRng();
  saveState();
  hydrateSettingsForm();
  syncScoreboards();
  setScreen('startScreen');
}

// Start
window.addEventListener('load', init);

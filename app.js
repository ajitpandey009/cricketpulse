const demoMatches = [
  {
    id: "ind-aus",
    status: "live",
    title: "India vs Australia",
    series: "Australia tour of India",
    venue: "Ahmedabad",
    note: "India need 42 runs in 24 balls",
    teams: [
      { code: "AUS", score: "197/7", overs: "20.0 ov" },
      { code: "IND", score: "156/4", overs: "16.0 ov" }
    ],
    batsmen: [
      ["Hardik Pandya", "39", "21", "4", "2"],
      ["Rinku Singh", "18", "10", "2", "1"],
      ["Suryakumar Yadav", "51", "29", "6", "3"]
    ],
    summary: ["Required rate", "10.50", "Current rate", "9.75", "Last wicket", "Tilak Varma 22"]
  },
  {
    id: "eng-sa",
    status: "live",
    title: "England vs South Africa",
    series: "World Test Championship",
    venue: "Leeds",
    note: "England trail by 81 runs",
    teams: [
      { code: "SA", score: "342", overs: "91.4 ov" },
      { code: "ENG", score: "261/6", overs: "74.0 ov" }
    ],
    batsmen: [
      ["Ben Stokes", "64", "108", "7", "1"],
      ["Jamie Smith", "31", "62", "4", "0"],
      ["Joe Root", "88", "141", "9", "0"]
    ],
    summary: ["Session", "Day 2 Tea", "Partnership", "57 runs", "Lead", "SA by 81"]
  },
  {
    id: "csk-mi",
    status: "upcoming",
    title: "Chennai vs Mumbai",
    series: "Indian T20 League",
    venue: "Chennai",
    note: "Starts at 7:30 PM",
    teams: [
      { code: "CHE", score: "-", overs: "Yet to bat" },
      { code: "MUM", score: "-", overs: "Yet to bat" }
    ],
    batsmen: [
      ["Playing XI", "-", "-", "-", "-"],
      ["Toss", "7:00 PM", "-", "-", "-"],
      ["Pitch", "Dry surface", "-", "-", "-"]
    ],
    summary: ["Start", "7:30 PM", "Venue", "Chennai", "Format", "T20"]
  },
  {
    id: "nz-pak",
    status: "result",
    title: "New Zealand vs Pakistan",
    series: "Tri-Series Final",
    venue: "Auckland",
    note: "New Zealand won by 5 wickets",
    teams: [
      { code: "PAK", score: "238/9", overs: "50.0 ov" },
      { code: "NZ", score: "241/5", overs: "47.3 ov" }
    ],
    batsmen: [
      ["Daryl Mitchell", "76", "84", "8", "1"],
      ["Kane Williamson", "59", "71", "6", "0"],
      ["Shaheen Afridi", "3/45", "10 ov", "-", "-"]
    ],
    summary: ["Result", "NZ won", "Player", "D Mitchell", "Margin", "5 wickets"]
  }
];

let matches = [...demoMatches];

const news = [
  {
    tag: "T20",
    title: "Spin choke in middle overs changes the chase script",
    copy: "Australia found control with defensive fields after India raced through the powerplay."
  },
  {
    tag: "TEST",
    title: "Stokes digs in as South Africa search for the second new ball",
    copy: "England still trail, but their lower order has dragged the match into a long session."
  },
  {
    tag: "IPL",
    title: "Chennai prepare a slow surface for Mumbai clash",
    copy: "Both sides are likely to add an extra spinner as evening dew remains uncertain."
  }
];

const schedule = [
  ["7:30 PM", "Chennai vs Mumbai", "Indian T20 League"],
  ["9:00 PM", "Sri Lanka vs Bangladesh", "3rd ODI"],
  ["11:00 PM", "West Indies vs Ireland", "Only T20I"]
];

const rankings = {
  batting: [
    ["Babar Azam", "PAK", "824"],
    ["Shubman Gill", "IND", "801"],
    ["Harry Brook", "ENG", "773"],
    ["Travis Head", "AUS", "756"]
  ],
  bowling: [
    ["Jasprit Bumrah", "IND", "812"],
    ["Kagiso Rabada", "SA", "798"],
    ["Rashid Khan", "AFG", "779"],
    ["Shaheen Afridi", "PAK", "748"]
  ]
};

const matchList = document.querySelector("#matchList");
const scorecardTitle = document.querySelector("#scorecardTitle");
const scorecardStatus = document.querySelector("#scorecardStatus");
const scorecardBody = document.querySelector("#scorecardBody");
const searchInput = document.querySelector("#searchInput");
const apiForm = document.querySelector("#apiForm");
const apiKeyInput = document.querySelector("#apiKeyInput");
const apiStatus = document.querySelector("#apiStatus");
let activeFilter = "all";
let activeMatchId = "ind-aus";

function statusLabel(status) {
  return status === "result" ? "Result" : status === "upcoming" ? "Upcoming" : "Live";
}

function renderMatches() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = matches.filter((match) => {
    const inFilter = activeFilter === "all" || match.status === activeFilter;
    const haystack = `${match.title} ${match.series} ${match.venue}`.toLowerCase();
    return inFilter && haystack.includes(query);
  });

  matchList.innerHTML = visible.length
    ? visible
        .map(
          (match) => `
          <article class="match-card ${match.id === activeMatchId ? "active" : ""}">
            <div>
              <div class="match-meta">
                <span class="tag ${match.status}">${statusLabel(match.status)}</span>
                <span>${match.series}</span>
                <span>${match.venue}</span>
              </div>
              <h3>${match.title}</h3>
              ${match.teams
                .map(
                  (team) => `
                  <div class="innings">
                    <span>${team.code}</span>
                    <span>${team.score}</span>
                    <small>${team.overs}</small>
                  </div>
                `
                )
                .join("")}
              <p class="match-note">${match.note}</p>
            </div>
            <div class="card-actions">
              <button type="button" aria-label="Open ${match.title} scorecard" data-match-link="${match.id}">›</button>
            </div>
          </article>
        `
        )
        .join("")
    : `<div class="empty">No matches found.</div>`;
}

function renderScorecard(matchId) {
  const match = matches.find((item) => item.id === matchId) || matches[0];
  if (!match) return;
  activeMatchId = match.id;
  scorecardTitle.textContent = match.title;
  scorecardStatus.textContent = statusLabel(match.status);
  scorecardStatus.style.background = match.status === "live" ? "var(--red)" : match.status === "upcoming" ? "var(--green)" : "#5a6470";

  scorecardBody.innerHTML = `
    <div class="score-summary">
      <div class="score-box"><span>${match.summary[0]}</span><strong>${match.summary[1]}</strong></div>
      <div class="score-box"><span>${match.summary[2]}</span><strong>${match.summary[3]}</strong></div>
      <div class="score-box"><span>${match.summary[4]}</span><strong>${match.summary[5]}</strong></div>
    </div>
    <div class="player-table">
      <div class="player-row header">
        <span>Player</span><span>R</span><span>B</span><span>4s</span><span>6s</span>
      </div>
      ${match.batsmen
        .map(
          (row) => `
        <div class="player-row">
          <span>${row[0]}</span><span>${row[1]}</span><span>${row[2]}</span><span>${row[3]}</span><span>${row[4]}</span>
        </div>
      `
        )
        .join("")}
    </div>
  `;
  renderMatches();
}

function normalizeStatus(match) {
  const status = `${match.matchStarted ? "started" : ""} ${match.matchEnded ? "ended" : ""} ${match.status || ""}`.toLowerCase();
  if (match.matchEnded || status.includes("won") || status.includes("draw")) return "result";
  if (match.matchStarted || match.score?.length) return "live";
  return "upcoming";
}

function formatScore(score) {
  if (!score) return { score: "-", overs: "Yet to bat" };
  const runs = Number.isFinite(score.r) ? score.r : "-";
  const wickets = Number.isFinite(score.w) ? score.w : 0;
  const overs = score.o || "0";
  return { score: `${runs}/${wickets}`, overs: `${overs} ov` };
}

function mapApiMatch(match, index) {
  const score = Array.isArray(match.score) ? match.score : [];
  const first = formatScore(score[0]);
  const second = formatScore(score[1]);
  const teams = Array.isArray(match.teams) && match.teams.length ? match.teams : [match.teamInfo?.[0]?.name, match.teamInfo?.[1]?.name].filter(Boolean);
  const teamA = teams[0] || "Team A";
  const teamB = teams[1] || "Team B";
  const status = normalizeStatus(match);

  return {
    id: match.id || `api-${index}`,
    status,
    title: match.name || `${teamA} vs ${teamB}`,
    series: match.series || match.matchType?.toUpperCase() || "Cricket",
    venue: match.venue || match.date || "Venue TBA",
    note: match.status || (status === "upcoming" ? "Match yet to start" : "Live score available"),
    teams: [
      { code: teamA, score: first.score, overs: first.overs },
      { code: teamB, score: second.score, overs: second.overs }
    ],
    batsmen: [
      [score[0]?.inning || teamA, first.score, first.overs, "-", "-"],
      [score[1]?.inning || teamB, second.score, second.overs, "-", "-"],
      ["Source", "CricketData", "-", "-", "-"]
    ],
    summary: ["Status", statusLabel(status), "Format", match.matchType?.toUpperCase() || "Match", "Updated", match.dateTimeGMT ? new Date(match.dateTimeGMT).toLocaleString() : "Now"]
  };
}

async function loadRealMatches(apiKey) {
  apiStatus.textContent = "Loading live matches...";
  const endpoint = `https://api.cricapi.com/v1/currentMatches?apikey=${encodeURIComponent(apiKey)}&offset=0`;
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error(`API returned ${response.status}`);

  const payload = await response.json();
  if (payload.status !== "success" || !Array.isArray(payload.data)) {
    throw new Error(payload.reason || "No match data returned");
  }

  matches = payload.data.map(mapApiMatch).filter(Boolean);
  if (!matches.length) throw new Error("No current matches found");

  activeFilter = "all";
  activeMatchId = matches[0].id;
  document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("active", item.dataset.filter === "all"));
  renderMatches();
  renderScorecard(activeMatchId);
  localStorage.setItem("cricketpulse_api_key", apiKey);
  apiStatus.textContent = `Loaded ${matches.length} live matches from CricketData.`;
}

function useDemoData() {
  matches = [...demoMatches];
  activeFilter = "all";
  activeMatchId = "ind-aus";
  document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("active", item.dataset.filter === "all"));
  renderMatches();
  renderScorecard(activeMatchId);
  localStorage.removeItem("cricketpulse_api_key");
  apiKeyInput.value = "";
  apiStatus.textContent = "Using built-in demo data.";
}

function renderNews() {
  document.querySelector("#newsGrid").innerHTML = news
    .map(
      (item) => `
      <article class="news-card">
        <div class="news-thumb">${item.tag}</div>
        <div>
          <h3>${item.title}</h3>
          <p>${item.copy}</p>
        </div>
      </article>
    `
    )
    .join("");
}

function renderSchedule() {
  document.querySelector("#scheduleList").innerHTML = schedule
    .map(
      (item) => `
      <div class="schedule-item">
        <div><strong>${item[1]}</strong><span>${item[2]}</span></div>
        <div class="time-chip">${item[0]}</div>
      </div>
    `
    )
    .join("");
}

function renderRankings(type = "batting") {
  document.querySelector("#rankList").innerHTML = rankings[type]
    .map(
      (player) => `
      <li>
        <div><strong>${player[0]}</strong><span>${player[1]}</span></div>
        <div class="rank-points">${player[2]}</div>
      </li>
    `
    )
    .join("");
}

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    renderMatches();
  });
});

document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-match-link]");
  if (!link) return;
  renderScorecard(link.dataset.matchLink);
  document.querySelector("#scorecard").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelectorAll("[data-rank]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-rank]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderRankings(button.dataset.rank);
  });
});

document.querySelectorAll("[data-poll]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-poll]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const choice = button.dataset.poll;
    document.querySelector("#pollResult").textContent = `${choice} leads this poll with strong late-match confidence.`;
  });
});

document.querySelector("#menuButton").addEventListener("click", (event) => {
  const nav = document.querySelector("#mobileNav");
  nav.classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", nav.classList.contains("open"));
});

searchInput.addEventListener("input", renderMatches);

apiForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const apiKey = apiKeyInput.value.trim();
  if (!apiKey) {
    apiStatus.textContent = "Paste your CricketData API key first.";
    return;
  }

  try {
    await loadRealMatches(apiKey);
  } catch (error) {
    matches = [...demoMatches];
    renderMatches();
    renderScorecard("ind-aus");
    apiStatus.textContent = `Could not load live data: ${error.message}. Showing demo data.`;
  }
});

document.querySelector("#demoDataButton").addEventListener("click", useDemoData);

const tickerItems = [
  "England announce unchanged XI for the third Test at Leeds.",
  "Chennai likely to play three spinners against Mumbai tonight.",
  "India's required rate crosses ten after a quiet over.",
  "New Zealand lift the tri-series trophy in Auckland."
];
let tickerIndex = 0;
setInterval(() => {
  tickerIndex = (tickerIndex + 1) % tickerItems.length;
  document.querySelector("#tickerText").textContent = tickerItems[tickerIndex];
}, 3200);

renderMatches();
renderScorecard(activeMatchId);
renderNews();
renderSchedule();
renderRankings();

const savedApiKey = localStorage.getItem("cricketpulse_api_key");
if (savedApiKey) {
  apiKeyInput.value = savedApiKey;
  loadRealMatches(savedApiKey).catch((error) => {
    apiStatus.textContent = `Saved key failed: ${error.message}. Showing demo data.`;
    useDemoData();
  });
}

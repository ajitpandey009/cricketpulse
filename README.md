# CricketPulse - Live Cricket Scores App

CricketPulse is a responsive Cricbuzz-style cricket live score web app built with plain HTML, CSS, and JavaScript. It includes live-score style match cards, cricket scorecards, schedules, rankings, cricket news, fan voting and optional CricketData/CricAPI integration.

![CricketPulse app preview](assets/cricket-stadium.png)

## Keywords

`cricket live score` `cricket scorecard` `cricket app` `live cricket scores` `cricket schedule` `cricket rankings` `cricket news` `CricketData API` `CricAPI` `HTML CSS JavaScript`

## Features

- Live-score style match cards
- Match filters for all, live, upcoming, and results
- Search by team, series, or venue
- Interactive scorecard panel
- News, schedule, rankings, and fan poll sections
- Mobile-friendly layout
- Optional CricketData/CricAPI live data loading

## Tech Stack

- HTML
- CSS
- JavaScript
- Static assets

No framework, build step, or database is required.

## Run Locally

Start a simple local server from the project folder:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

## Live Cricket Data

The app includes a **Real Data** panel where you can paste a CricketData/CricAPI key and load current matches.

API endpoint used:

```text
https://api.cricapi.com/v1/currentMatches?apikey=YOUR_API_KEY&offset=0
```

For production, do not expose an API key directly in frontend code. Use a small backend or proxy to protect the key.

## Project Structure

```text
.
├── app.js
├── assets/
│   └── cricket-stadium.png
├── index.html
├── README.md
└── styles.css
```

## Repository

GitHub: https://github.com/ajitpandey009/cricketpulse

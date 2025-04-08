const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors()); // Permettre les requêtes depuis le frontend
const API_KEY = "6f3a52d5b84740feb197aedbabf0af4f";

app.get("/", async (req, res) => {
  try {
    res.json("DATA");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/proxy/standings/:league", async (req, res) => {
  try {
    const league = req.params.league;
    const response = await fetch(
      "https://api.football-data.org/v4/competitions/" +
        league +
        "/standings?season=2024",
      {
        headers: { "X-Auth-Token": API_KEY },
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/proxy/results/:league", async (req, res) => {
  try {
    const league = req.params.league;
    const response = await fetch(
      "http://api.football-data.org/v4/competitions/" +
        league +
        "/matches?matchday=30",
      {
        headers: { "X-Auth-Token": API_KEY },
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/proxy/upcoming/:league", async (req, res) => {
  try {
    const league = req.params.league;
    const response = await fetch(
      "http://api.football-data.org/v4/competitions/" +
        league +
        "/matches?matchday=31",
      {
        headers: { "X-Auth-Token": API_KEY },
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/proxy/teams/:team", async (req, res) => {
  try {
    const team = req.params.team;
    const response = await fetch(
      "http://api.football-data.org/v4/teams/" + team,
      {
        headers: { "X-Auth-Token": API_KEY },
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/proxy/matches/:match", async (req, res) => {
  try {
    const match = req.params.match;
    const response = await fetch(
      "http://api.football-data.org/v4/matches/" + match,
      {
        headers: { "X-Auth-Token": API_KEY },
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/proxy/matches/date/:date", async (req, res) => {
  try {
    const date = req.params.date;
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    const nextDay = d.toISOString().split("T")[0];

    const response = await fetch(
      `http://api.football-data.org/v4/matches?dateFrom=${date}&dateTo=${nextDay}&competitions=PL,PD,ELC,BL1,SA,FL1,BSA,PPL,DED`,
      {
        headers: { "X-Auth-Token": API_KEY },
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/proxy/head2head/:match", async (req, res) => {
  try {
    const match = req.params.match;

    const response = await fetch(
      `http://api.football-data.org/v4/matches/${match}/head2head?limit=999`,
      {
        headers: { "X-Auth-Token": API_KEY },
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/proxy/tennis/standings", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.sportradar.com/tennis/trial/v3/en/rankings.json?api_key=U9u8Dy5xOYARrdXCNo7lBIheXkQi315V7r97OVls`
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () =>
  console.log(`Serveur proxy sur http://localhost:${PORT}`)
);

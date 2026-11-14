# Nine Sols Jade Reference & Computing Power Planner

Static site (`index.html` + `data.js`) for a Nine Sols player at a Root Node mid-run who wants, fast: a Jade's Computing Power cost, effect, and location, or whether a build of several Jades fits the Computing Power they currently have.

## Sections

1. **Jades** — 28 Jades (confirmed by `node test.js`'s row-count assertion against the parsed source table), searchable by name/location/effect, filterable by cost (1/2/3). Name, location, and effect text sourced from game-checklists.com; cost sourced from a Steam Community forum post (see below).
2. **Loadout Picker** — set Computing Power (2-10), tick Jades, see total cost vs. capacity and whether the build overflows.
3. **Computing Units** — the one documented price/location for a slot-expanding Computing Unit (Chiyou, 1,000 Jin), plus a note that further units exist but are not individually priced or located in any source Gate 2 could read.

No wiki.gg, Fandom, Fextralife page, or Jade/loadout calculator exists for Nine Sols at time of writing (per Gate 2: 3 WebSearches + 2 curls) — this reference is assembled directly from the three sources below.

## Data provenance

- **Jade names, effects, locations**: curled directly from https://game-checklists.com/nine-sols/jades/ (live fetch succeeded; an archived copy also exists at https://web.archive.org/web/20261006030434/https://game-checklists.com/nine-sols/jades/). This page's FAQ states 28 Jades total, each costing 1-3 Computing Power, base Computing Power 2 expandable to 10. Its table was parsed in full (every `<tr>` in the page), not sampled.
- **Jade Computing Power costs**: curled directly from a Steam Community forum post, "Jades Tier List - Edited" (https://steamcommunity.com/app/1809540/discussions/0/4757578612641817914, author "Anderson", 2024-09-09). This is a single player's opinion/analysis post, not an official or wiki source — it is the only place Gate 2 found a per-Jade cost figure after the gameskinny.com and ginx.tv pages named in the charter either 403'd with no Wayback snapshot (gameskinny) or had no per-Jade cost data (ginx.tv, see below). The post's own caveat ("some of them are estimates") is about damage/percentage figures in its commentary, not the Computing Power costs, which read off the in-game slot UI — but it remains a forum post, and the UI makes that clear. No tier-list ranking (Good/Useful/Niche/Bad) from that post is reproduced in this reference, per charter.
- **Computing Unit price/location**: the live fetch of https://www.ginx.tv/en/nine-sols/jade-slots redirected to a generic site hub with no article content. The article text used here is from an archived snapshot (https://web.archive.org/web/20260416084744if_/https://www.ginx.tv/en/nine-sols/jade-slots, "How To Get More Jade Slots In Nine Sols" by Shane Moosa, last updated August 15, 2024). Only one Computing Unit (from the merchant Chiyou, 1,000 Jin) is given a specific price in that article; it says further units exist "throughout the world" and from "other merchants" without naming them, so those rows are "not published," never invented.
- **gameskinny.com** — both Jade guide URLs named in the charter returned a Cloudflare "Attention Required" challenge page on direct curl and have no Wayback Machine snapshot (`archive.org/wayback/available` returned an empty `archived_snapshots` object for both). Not used as a source.

Every row in `data.js` traces to text actually read from one of the fetches above in this session. No cost, location, or effect was carried over unverified from the charter's own paraphrase of Gate 2 — each source was re-curled before any row was written.

## Running / testing

```
node test.js                     # 12/12 known-answer + row-count + overflow-math tests
python3 -m http.server 8000      # serve the folder, then open http://localhost:8000/
```

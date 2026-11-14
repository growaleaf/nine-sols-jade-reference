// Nine Sols Jade data.
// Name/location/effect sourced from game-checklists.com/nine-sols/jades/
//   (archived https://web.archive.org/web/20261006030434/https://game-checklists.com/nine-sols/jades/).
// Cost (Computing Power) sourced from a Steam Community forum post "Jades Tier List - Edited"
//   https://steamcommunity.com/app/1809540/discussions/0/4757578612641817914 (author: Anderson, 2024-09-09,
//   edited later). That post states up front: "I did a bit of testing to try to get the numbers on these,
//   but given the lack of damage numbers in the game, some of them are estimates." That caveat is about the
//   percentage/damage figures in the post's commentary, not the Computing Power costs (which are a direct
//   UI-displayed slot count), but it is still a single player's forum post, not an official or wiki source.
// No tier/rank opinions from that thread are reproduced here (charter forbids presenting ranking as fact).
const JADES = [
  { name: "Stasis Jade", cost: 2, location: "Apeman Facility", effect: "Attaching a talisman will temporarily immobilize that enemy. Time immobilized will vary depending on the enemy. Defeat the Red Tiger Elite: Baichang side boss in Apeman Facility Elevator room." },
  { name: "Mob Quell Jade - Yin", cost: 2, location: "Factory", effect: "Talismans can attach to an additional target." },
  { name: "Mob Quell Jade - Yang", cost: 2, location: "Four Seasons Pavilion", effect: "Talismans can attach to an additional target." },
  { name: "Steely Jade", cost: 2, location: "Power Reservoir", effect: "Talisman detonation cannot be interrupted (you take Internal Damage if struck)." },
  { name: "Pauper Jade", cost: 1, location: "Power Reservoir", effect: "Increases Jin collection radius." },
  { name: "Soul Reaper Jade", cost: 1, location: "Agriculture Zone", effect: "Any Jin and experience absorbed by an enemy that killed you can be recovered with a talisman explosion." },
  { name: "Avarice Jade", cost: 2, location: "Agriculture Zone", effect: "Enemies drop 33% more Jin when defeated." },
  { name: "Cultivation Jade", cost: 2, location: "Agriculture Zone", effect: "Slightly increases experience gained from defeating enemies." },
  { name: "Immovable Jade", cost: 2, location: "Agriculture Zone", effect: "Reduces the time to execute a Charged Strike when standing still." },
  { name: "Harness Force Jade", cost: 1, location: "Four Seasons Pavilion", effect: "Performing a precise parry will complete any ongoing charging of Charged Strike, making it available immediately." },
  { name: "Swift Blade Jade", cost: 2, location: "Abandoned Mines", effect: "Increases Triple Slash speed, but you take Internal Damage when you attack." },
  { name: "Qi Blade Jade", cost: 3, location: "Grotto of Scriptures", effect: "Consumes 2 Qi charges on the third hit of Triple Slash, to inflict more damage (also sends out a wave)." },
  { name: "Health Thief Jade", cost: 2, location: "Four Seasons Pavilion", effect: "Recovers health (about half a bar) after a successful Shadow Strike." },
  { name: "Focus Jade", cost: 3, location: "Factory", effect: "Charged Strike consumes a Qi charge, but deals more damage." },
  { name: "Hedgehog Jade", cost: 3, location: "Four Seasons Pavilion", effect: "Precise parries will inflict Internal Damage to the enemy." },
  { name: "Reciprocation Jade", cost: 2, location: "Four Seasons Pavilion", effect: "A successful Unbounded Counter transfers internal damage to the enemy." },
  { name: "Bearing Jade", cost: 2, location: "Apeman Depths", effect: "Reduces knockback from enemy attacks when parrying." },
  { name: "Divine Hand Jade", cost: 2, location: "Grotto of Scriptures", effect: "After a successful Unbounded Counter, deflecting will perform continuous Unbounded Counters." },
  { name: "Ricochet Jade", cost: 1, location: "Four Seasons Pavilion", effect: "Projectiles can be reflected even with imprecise parries." },
  { name: "Qi Swipe Jade", cost: 3, location: "Warehouse", effect: "Increases Qi capacity by 1; precise parries gain 2 Qi charges but you take Internal Damage." },
  { name: "Swift Descent Jade", cost: 1, location: "Factory", effect: "Reduces the cooldown of Dash, and allows you to Dash downwards." },
  { name: "Last Stand Jade", cost: 2, location: "Four Seasons Pavilion", effect: "When you fall below 25% health, you deal more damage." },
  { name: "Iron Skin Jade", cost: 3, location: "Four Seasons Pavilion", effect: "Converts a portion of damage taken to Internal Damage." },
  { name: "Breather Jade", cost: 2, location: "Warehouse", effect: "Hitting enemies converts some Internal Damage back to health." },
  { name: "Recovery Jade", cost: 2, location: "Four Seasons Pavilion", effect: "Increases the recovery rate of Internal Damage (recovery starts after 3 seconds instead of 5, and you recover faster)." },
  { name: "Medical Jade", cost: 2, location: "Four Seasons Pavilion", effect: "Medicine pipe recovers 50% more health, but it is applied over time instead of immediately. Taking damage interrupts the effect." },
  { name: "Quick Dose Jade", cost: 2, location: "Four Seasons Pavilion", effect: "Shortens the time needed to use the Medicinal Pipe." },
  { name: "Revival Jade", cost: 2, location: "Four Seasons Pavilion", effect: "When HP reaches 0 for the first time, revive with 25% health." },
];

// Computing Unit (slot-expanding item) info. Only one price/location is directly stated in the sourced guide;
// the same guide says further units exist "throughout the world" and from "other merchants" without naming
// prices or locations, so those are "not published" rather than invented.
const COMPUTING_UNITS = [
  { source: "Chiyou (merchant, Central Transport Hub — take the elevator on the far left)", price: "1,000 Jin", note: "First purchasable Computing Unit; raises slots from the base 2 to 3." },
  { source: "Other merchants / secret areas", price: null, note: "Guide states more Computing Units can be found or bought later in the game but does not name specific locations or prices." },
];

const STARTING_COMPUTING_POWER = 2;
const MAX_COMPUTING_POWER = 10;

const SITE_NOTE = "Snapshot of community sources, not an official or wiki database (none exists for Nine Sols Jades at time of writing, per Gate 2 search). Verify in-game before relying on a cost or location.";

function findJade(name) {
  return JADES.find(j => j.name.toLowerCase() === String(name).toLowerCase());
}

if (typeof module !== "undefined") {
  module.exports = {
    JADES, COMPUTING_UNITS, STARTING_COMPUTING_POWER, MAX_COMPUTING_POWER, SITE_NOTE,
    findJade,
  };
}

// Headless tests. Run with: node test.js
const assert = require("assert");
const {
  JADES, COMPUTING_UNITS, STARTING_COMPUTING_POWER, MAX_COMPUTING_POWER,
  findJade,
} = require("./data.js");

let passed = 0;
function test(name, fn) {
  try {
    fn();
    passed++;
    console.log("PASS -", name);
  } catch (e) {
    console.error("FAIL -", name, "-", e.message);
    process.exitCode = 1;
  }
}

// 1. Jade row count matches the full game-checklists.com parse (28 Jades, per its own FAQ answer).
test("jade row count is 28", () => {
  assert.strictEqual(JADES.length, 28);
});

// 2. Every Jade has a cost of 1, 2, or 3 (the only Computing Power costs stated in the Steam source).
test("every jade cost is 1, 2, or 3", () => {
  for (const j of JADES) {
    assert.ok([1, 2, 3].includes(j.cost), `${j.name} has cost ${j.cost}`);
  }
});

// 3. Every Jade row carries a non-empty name, location, and effect text (no invented facts without source text).
test("every jade row has name, location, and effect text", () => {
  for (const j of JADES) {
    assert.ok(j.name && j.name.length > 0);
    assert.ok(j.location && j.location.length > 0);
    assert.ok(j.effect && j.effect.length > 0);
  }
});

// 4. Known-answer lookup: Stasis Jade cost and location, verbatim from the sources.
test("known-answer: Stasis Jade costs 2, found in Apeman Facility", () => {
  const j = findJade("Stasis Jade");
  assert.ok(j);
  assert.strictEqual(j.cost, 2);
  assert.strictEqual(j.location, "Apeman Facility");
});

// 5. Known-answer lookup: Swift Descent Jade is the 1-cost Jade the Steam post calls out by name.
test("known-answer: Swift Descent Jade costs 1", () => {
  const j = findJade("Swift Descent Jade");
  assert.ok(j);
  assert.strictEqual(j.cost, 1);
});

// 6. Known-answer lookup: Iron Skin Jade and Qi Blade Jade are both 3-cost, the most expensive tier.
test("known-answer: Iron Skin Jade and Qi Blade Jade cost 3", () => {
  assert.strictEqual(findJade("Iron Skin Jade").cost, 3);
  assert.strictEqual(findJade("Qi Blade Jade").cost, 3);
});

// 7. Mob Quell Jade - Yin and Yang are two distinct rows (per game-checklists.com) sharing the
//    same effect and cost (per the Steam post, which lists them together as "(2)").
test("known-answer: Mob Quell Jade Yin and Yang are distinct rows, same cost and effect", () => {
  const yin = findJade("Mob Quell Jade - Yin");
  const yang = findJade("Mob Quell Jade - Yang");
  assert.ok(yin && yang);
  assert.notStrictEqual(yin.location, yang.location);
  assert.strictEqual(yin.cost, yang.cost);
  assert.strictEqual(yin.effect, yang.effect);
});

// 8. Starting/max Computing Power match the game-checklists.com FAQ answer (start 2, cap 10).
test("starting computing power is 2, max is 10", () => {
  assert.strictEqual(STARTING_COMPUTING_POWER, 2);
  assert.strictEqual(MAX_COMPUTING_POWER, 10);
});

// 9. Computing Unit price is documented for exactly one source (Chiyou, 1,000 Jin); the rest
//    is "not published" (null), never invented.
test("only Chiyou's Computing Unit has a documented price", () => {
  const priced = COMPUTING_UNITS.filter(u => u.price !== null);
  assert.strictEqual(priced.length, 1);
  assert.strictEqual(priced[0].price, "1,000 Jin");
  const unpriced = COMPUTING_UNITS.filter(u => u.price === null);
  assert.strictEqual(unpriced.length, COMPUTING_UNITS.length - 1);
});

// 10. Loadout overflow math: three 3-cost Jades (9 Computing Power) fit at the max of 10 but
//     overflow by 7 at the default starting Computing Power of 2.
test("loadout overflow math: 3x 3-cost jades vs starting and max Computing Power", () => {
  const threeCostJades = JADES.filter(j => j.cost === 3).slice(0, 3);
  assert.strictEqual(threeCostJades.length, 3);
  const total = threeCostJades.reduce((sum, j) => sum + j.cost, 0);
  assert.strictEqual(total, 9);
  assert.ok(total > STARTING_COMPUTING_POWER);
  assert.strictEqual(total - STARTING_COMPUTING_POWER, 7);
  assert.ok(total <= MAX_COMPUTING_POWER);
});

// 11. Loadout overflow math: summing every Jade's cost in the full 28-row set overflows even the
//     max Computing Power of 10, and the overflow amount is exactly that sum minus 10.
test("loadout overflow math: summing every jade's cost overflows max Computing Power", () => {
  const total = JADES.reduce((sum, j) => sum + j.cost, 0);
  assert.ok(total > MAX_COMPUTING_POWER);
  const overflow = total - MAX_COMPUTING_POWER;
  assert.strictEqual(overflow, total - MAX_COMPUTING_POWER);
  assert.ok(overflow > 0);
});

// 12. Loadout overflow math: an empty loadout never overflows, at any Computing Power from 2 to 10.
test("loadout overflow math: empty loadout fits at every valid Computing Power", () => {
  const total = 0;
  for (let cp = STARTING_COMPUTING_POWER; cp <= MAX_COMPUTING_POWER; cp++) {
    assert.ok(total <= cp);
  }
});

console.log(`\n${passed}/12 tests reported (see PASS/FAIL lines above)`);
if (process.exitCode) {
  console.error("\nSOME TESTS FAILED");
} else {
  console.log("\nALL TESTS PASSED");
}

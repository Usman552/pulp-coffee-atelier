/**
 * Curated photography. Every image is used once across the site.
 * Sources: Unsplash (unsplash.com/license) and Pexels (pexels.com/license).
 */
const u = (id: string, w = 2000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const p = (id: number, w = 2000) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const img = {
  // Hero
  heroPour: p(324028, 2400),
  heroInset: u("1514066558159-fc8c737ef259", 1400),
  cremaTexture: u("1514432324607-a09d9b4aefdd", 1600),

  // Manifesto
  manifestoCherry: p(1556665, 900),
  manifestoCortado: u("1559496417-e7f25cb247f3", 900),
  manifestoStir: p(6802983, 900),
  manifestoWindow: u("1518057111178-44a106bad636", 1400),

  // Ritual
  ritualDose: u("1509785307050-d4066910ec1e", 1600),
  ritualExtract: p(2067628, 1600),
  ritualTexture: u("1516743619420-154b70a65fea", 1600),
  ritualPour: p(302899, 1600),

  // Menu
  espresso: p(685527, 1200),
  cortado: u("1610889556528-9a770e32642f", 1200),
  flatWhite: u("1534687941688-651ccaafbff8", 1200),
  cappuccino: u("1517256064527-09c73fc73e38", 1200),
  geshaPourOver: u("1504627298434-2119d6928e93", 1200),
  batchBrew: u("1521302080334-4bebac2763a6", 1200),
  v60: u("1442512595331-e89e73853f31", 1200),
  cascaraTonic: u("1497534446932-c925b458314e", 1200),
  honeyOat: u("1570968915860-54d5c301fa9f", 1200),
  matcha: u("1515823064-d6e0c04616a7", 1200),
  coldBrew: u("1461023058943-07fcbe16d735", 1200),
  icedOat: u("1562447457-579fc34967fb", 1200),
  icedMatcha: p(5946965, 1200),
  shakerato: u("1578314675249-a6910f80cc4e", 1200),
  croissant: u("1555507036-ab1f4038808a", 1200),
  almondCroissant: u("1530610476181-d83430b64dcd", 1200),
  ryeLoaf: u("1509440159596-0249088772ff", 1200),
  pastryBoard: u("1528699633788-424224dc89b5", 1200),

  // Philosophy
  source: p(4820813, 1600),
  sort: u("1525088553748-01d6e210e00b", 1600),
  roast: u("1511537190424-bbbab87ac5eb", 1600),
  brew: u("1513267048331-5611cad62e41", 1600),

  // Space
  room: u("1525193612562-0ec53b0e5d7c", 2400),
  roomWindow: p(1813466, 1200),
  roomTable: u("1534040385115-33dcb3acba5b", 1200),
  roomCommunal: p(2253643, 1200),
  roomPlants: u("1554118811-1e0d58224f24", 1200),

  // Gallery
  g1: u("1495474472287-4d71bcdd2085", 1400),
  g2: p(3879495, 1400),
  g3: u("1595434091143-b375ced5fe5c", 1400),
  g4: u("1506619216599-9d16d0903dfd", 1400),
  g5: u("1517701604599-bb29b565090c", 1400),
  g6: u("1610632380989-680fe40816c6", 1400),
  g7: u("1495774856032-8b90bbb32b32", 1400),
  g8: u("1500353391678-d7b57979d6d2", 1400),

  // Community
  barista: u("1507914372368-b2b085b925a1", 1200),
  friends: u("1522202176988-66273c2fd55f", 1200),
  server: p(6205509, 1200),
  insta1: u("1445077100181-a33e9ac94db0", 700),
  insta2: p(4349775, 700),
  insta3: u("1525610553991-2bede1a236e2", 700),
  insta4: u("1442411210769-b95c4632195e", 700),

  // Visit
  visit: u("1445116572660-236099ec97a0", 1400),
} as const;

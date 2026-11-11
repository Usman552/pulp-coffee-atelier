import { img } from "./images";

export const ritualSteps = [
  {
    num: "01",
    title: "Dose",
    serif: "& grind",
    image: img.ritualDose,
    alt: "Freshly ground coffee in a glass jar beside an espresso and scattered beans",
    body: "18.5 grams, weighed to the tenth. Ground seconds before brewing on a flat-burr grinder dialled in three times a day.",
    spec: ["18.5 g in", "Grind 2.4", "Flat burr 64mm"],
  },
  {
    num: "02",
    title: "Extract",
    serif: "under pressure",
    image: img.ritualExtract,
    alt: "Espresso streaming from a portafilter into a yellow ceramic cup on a scale",
    body: "Nine bars, 93.5°C, twenty-eight seconds. Forty grams of syrupy espresso land in a pre-warmed cup.",
    spec: ["40 g out", "9 bar", "93.5 °C"],
  },
  {
    num: "03",
    title: "Texture",
    serif: "the milk",
    image: img.ritualTexture,
    alt: "Barista pouring silky steamed milk from a steel pitcher into a cup",
    body: "Steamed to 60°C and polished until it shines like wet paint — microfoam you can pour a drawing with.",
    spec: ["60 °C", "Microfoam", "Whole / oat"],
  },
  {
    num: "04",
    title: "Pour",
    serif: "& serve",
    image: img.ritualPour,
    alt: "A hand holding a cup while latte art is poured into it",
    body: "A rosetta, a tulip, a heart — drawn in one movement and handed over the bar while it's still perfect.",
    spec: ["One motion", "Handed, not called", "Drink now"],
  },
];

export const philosophy = [
  {
    num: "01",
    title: "Source",
    lede: "We buy from four farms, not forty.",
    body: "Direct relationships, revisited every harvest. We pay on average 2.6× the commodity price and publish every invoice in the shop.",
    image: img.source,
    alt: "Hands holding a steel scoop full of green unroasted coffee beans",
    facts: [
      ["Farm", "Finca La Esperanza"],
      ["Region", "Huila, Colombia"],
      ["Altitude", "1,850 masl"],
    ],
  },
  {
    num: "02",
    title: "Sort",
    lede: "Only ripe cherries make the cut.",
    body: "Every lot is cupped on arrival and scored. Anything under 86 points goes back — no matter how good the story is.",
    image: img.sort,
    alt: "A hand lifting roasted coffee beans from a steel bowl",
    facts: [
      ["Minimum score", "86 SCA"],
      ["Cupped", "On arrival"],
      ["Lots per year", "12"],
    ],
  },
  {
    num: "03",
    title: "Roast",
    lede: "Light, on purpose.",
    body: "Roasted twice a week on a 12-kilo Loring in the back room, profiled to taste of where the coffee grew — not of the roaster.",
    image: img.roast,
    alt: "Roasted coffee tumbling out of a drum roaster into the cooling tray",
    facts: [
      ["Roaster", "Loring S15"],
      ["Batches", "Tue & Fri"],
      ["Rest", "7–14 days"],
    ],
  },
  {
    num: "04",
    title: "Brew",
    lede: "Measured, then felt.",
    body: "Every recipe is weighed and timed. Then the bar tastes it, adjusts it and tastes it again. Precision is where craft begins, not ends.",
    image: img.brew,
    alt: "A barista preparing a row of pour-over coffees at a brew bar",
    facts: [
      ["Water", "Remineralised"],
      ["Calibrated", "3× daily"],
      ["Baristas", "SCA certified"],
    ],
  },
];

export const spaceDetails = [
  {
    code: "A",
    title: "North window bar",
    meta: "9 seats · morning light",
    image: img.roomWindow,
    alt: "A wooden window seat with coffee and pastry, street outside",
  },
  {
    code: "B",
    title: "The communal oak",
    meta: "14 seats · power at every chair",
    image: img.roomCommunal,
    alt: "Overhead view of a long communal table under white pendant lamps",
  },
  {
    code: "C",
    title: "Reading corner",
    meta: "6 seats · no laptops after 4pm",
    image: img.roomTable,
    alt: "A small table by the window with an open notebook and a coffee",
  },
  {
    code: "D",
    title: "The greenhouse",
    meta: "Indoor garden · dog friendly",
    image: img.roomPlants,
    alt: "Cafe seating surrounded by hanging plants",
  },
];

export const gallery = [
  { src: img.g1, alt: "Two people raising lattes in a toast", caption: "Saturday, 10:14", span: "md:col-span-5", ratio: "aspect-[4/5]", speed: 0.06 },
  { src: img.g2, alt: "A latte in a single beam of light on dark stone", caption: "Thursday, 16:02", span: "md:col-span-4 md:col-start-7 md:mt-40", ratio: "aspect-[3/4]", speed: -0.08 },
  { src: img.g3, alt: "A white cup of coffee in raking afternoon light", caption: "Golden hour", span: "md:col-span-3 md:mt-[22rem]", ratio: "aspect-square", speed: 0.12 },
  { src: img.g4, alt: "A tiny espresso cup on a pale surface casting a long shadow", caption: "Minimal, 08:31", span: "md:col-span-7 md:mt-16", ratio: "aspect-[16/10]", speed: -0.04 },
  { src: img.g5, alt: "An iced latte on a wooden table with layers of milk and coffee", caption: "First iced of the year", span: "md:col-span-4 md:col-start-9 md:mt-24", ratio: "aspect-[3/4]", speed: 0.1 },
  { src: img.g6, alt: "Coffee beans falling around a steaming cup on black", caption: "Roast day", span: "md:col-span-4 md:col-start-2", ratio: "aspect-[3/4]", speed: -0.06 },
  { src: img.g7, alt: "Hands wrapped around a latte with a rosetta", caption: "Warm hands", span: "md:col-span-6 md:col-start-7 md:mt-48", ratio: "aspect-[4/3]", speed: 0.05 },
  { src: img.g8, alt: "Overhead view of lattes among succulents on a wooden table", caption: "Table for four", span: "md:col-span-5 md:col-start-3 md:mt-16", ratio: "aspect-[16/11]", speed: -0.1 },
];

export const programme = [
  { day: "Mon–Fri", time: "07:00–11:00", title: "Laptop Hours", body: "Quiet tables, power everywhere, $2 filter refills.", occasion: "Laptop Hours" },
  { day: "Thu", time: "18:30", title: "Public Cupping", body: "Taste the new harvest with our roaster. Free, 12 seats.", occasion: "Public Cupping (Thu 18:30)" },
  { day: "Sat", time: "15:00", title: "Latte Art Throwdown", body: "$10 entry, open to all. Winner drinks free for a month.", occasion: "Latte Art Throwdown (Sat 15:00)" },
  { day: "Sun", time: "09:00", title: "Run Club → Coffee", body: "An easy 5k from our door, then the first round's on us.", occasion: "Sunday Run Club" },
  { day: "1st Fri", time: "19:00", title: "Wall Night", body: "A new local artist takes over our walls each month.", occasion: "Wall Night opening" },
];

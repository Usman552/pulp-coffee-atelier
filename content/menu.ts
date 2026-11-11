import { img } from "./images";

export type MenuCategory = "espresso" | "filter" | "signatures" | "cold" | "bakery";

export type MenuItem = {
  id: string;
  name: string;
  subtitle: string;
  category: MenuCategory;
  price: number;
  image: string;
  description: string;
  notes: string[];
  details: { label: string; value: string }[];
  tag?: string;
};

export const categories: { id: MenuCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "espresso", label: "Espresso" },
  { id: "filter", label: "Filter" },
  { id: "signatures", label: "Signatures" },
  { id: "cold", label: "Cold" },
  { id: "bakery", label: "Bakery" },
];

export const menu: MenuItem[] = [
  {
    id: "espresso",
    name: "Espresso",
    subtitle: "House blend, Nº 07",
    category: "espresso",
    price: 4.0,
    image: img.espresso,
    description:
      "Our seasonal espresso: a washed Colombian and a natural Ethiopian, roasted light so the fruit leads. Short, syrupy, bright.",
    notes: ["Red plum", "Cacao nib", "Blood orange"],
    details: [
      { label: "Origin", value: "Huila, CO / Guji, ET" },
      { label: "Recipe", value: "18.5g → 40g, 28s" },
      { label: "Roast", value: "Light-medium" },
    ],
  },
  {
    id: "cortado",
    name: "Cortado",
    subtitle: "Equal parts, served in glass",
    category: "espresso",
    price: 4.75,
    image: img.cortado,
    description:
      "A double ristretto cut with an equal measure of silky milk. The purist's milk drink — sweet without hiding the coffee.",
    notes: ["Toffee", "Cherry", "Brown butter"],
    details: [
      { label: "Size", value: "4.5 oz" },
      { label: "Milk", value: "Whole or oat, no charge" },
      { label: "Best", value: "Before 11am" },
    ],
  },
  {
    id: "flat-white",
    name: "Flat White",
    subtitle: "Velvet microfoam",
    category: "espresso",
    price: 5.25,
    image: img.flatWhite,
    description:
      "Double ristretto under a thin, glossy layer of microfoam. Poured slow, served at drinking temperature.",
    notes: ["Milk chocolate", "Red apple", "Honey"],
    details: [
      { label: "Size", value: "6 oz" },
      { label: "Milk", value: "Ronnybrook whole / Oatly" },
      { label: "Temp", value: "60°C" },
    ],
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    subtitle: "Classic, generous foam",
    category: "espresso",
    price: 5.0,
    image: img.cappuccino,
    description:
      "The morning standard, done properly: equal thirds, a cloud of foam and a rosetta on top.",
    notes: ["Cocoa", "Caramel", "Stone fruit"],
    details: [
      { label: "Size", value: "8 oz" },
      { label: "Milk", value: "Any, no charge" },
      { label: "Extra shot", value: "+ $1.25" },
    ],
  },
  {
    id: "gesha",
    name: "Gesha Pour-Over",
    subtitle: "Finca Deborah, Panama",
    category: "filter",
    price: 12.5,
    image: img.geshaPourOver,
    tag: "Limited",
    description:
      "A competition-grade washed Gesha from Boquete, brewed to order on Chemex. Floral, tea-like and astonishingly clear.",
    notes: ["Jasmine", "Bergamot", "White peach"],
    details: [
      { label: "Altitude", value: "1,900 masl" },
      { label: "Process", value: "Washed" },
      { label: "Brew", value: "Chemex, 4 min" },
    ],
  },
  {
    id: "v60",
    name: "Single-Origin V60",
    subtitle: "Rotating, ask the bar",
    category: "filter",
    price: 7.5,
    image: img.v60,
    description:
      "One farm, one lot, one cup. The bar rotates between three single origins each week — ask what's tasting best today.",
    notes: ["Seasonal", "Bright", "Clean"],
    details: [
      { label: "Ratio", value: "1 : 16" },
      { label: "Water", value: "94°C, remineralised" },
      { label: "Time", value: "3:15" },
    ],
  },
  {
    id: "batch",
    name: "Batch Filter",
    subtitle: "Bottomless before 11",
    category: "filter",
    price: 4.25,
    image: img.batchBrew,
    description:
      "Our everyday filter, brewed in small batches every 30 minutes. Laptop-hours refills are $2 until 11am.",
    notes: ["Black cherry", "Hazelnut", "Molasses"],
    details: [
      { label: "Origin", value: "Cerrado, BR" },
      { label: "Refill", value: "$2 before 11am" },
      { label: "Size", value: "12 oz" },
    ],
  },
  {
    id: "cascara",
    name: "Cascara Cherry Tonic",
    subtitle: "Our namesake",
    category: "signatures",
    price: 7.5,
    image: img.cascaraTonic,
    tag: "Signature",
    description:
      "Cold-steeped cascara — the dried coffee cherry fruit — with sour cherry, lime and Fever-Tree tonic. The drink that named the shop.",
    notes: ["Hibiscus", "Sour cherry", "Lime zest"],
    details: [
      { label: "Caffeine", value: "Low" },
      { label: "Contains", value: "Citrus" },
      { label: "Served", value: "Over clear ice" },
    ],
  },
  {
    id: "honey-oat",
    name: "Smoked Honey Oat Latte",
    subtitle: "Buckwheat honey, sea salt",
    category: "signatures",
    price: 6.25,
    image: img.honeyOat,
    description:
      "Double espresso, oat milk and a buckwheat honey we smoke in-house over cherry wood. Finished with a pinch of flaky salt.",
    notes: ["Campfire", "Malt", "Salted caramel"],
    details: [
      { label: "Milk", value: "Oat (vegan without honey)" },
      { label: "Size", value: "10 oz" },
      { label: "Hot or iced", value: "Either" },
    ],
  },
  {
    id: "matcha",
    name: "Ceremonial Matcha",
    subtitle: "Uji, first flush",
    category: "signatures",
    price: 6.5,
    image: img.matcha,
    description:
      "Stone-ground first-flush matcha from Uji, whisked by hand and poured with steamed milk. Grassy, sweet, umami.",
    notes: ["Umami", "Sweet grass", "Cream"],
    details: [
      { label: "Grade", value: "Ceremonial" },
      { label: "Milk", value: "Any, no charge" },
      { label: "Caffeine", value: "Medium" },
    ],
  },
  {
    id: "cold-brew",
    name: "18-Hour Cold Brew",
    subtitle: "With or without cream",
    category: "cold",
    price: 5.75,
    image: img.coldBrew,
    description:
      "Steeped for eighteen hours in small batches, served over a single large cube. Add sweet cream for a dessert-ish finish.",
    notes: ["Dark chocolate", "Prune", "Vanilla"],
    details: [
      { label: "Steep", value: "18 hours, 4°C" },
      { label: "Sweet cream", value: "+ $0.75" },
      { label: "Size", value: "14 oz" },
    ],
  },
  {
    id: "iced-oat",
    name: "Iced Oat Latte",
    subtitle: "Double shot, over ice",
    category: "cold",
    price: 6.0,
    image: img.icedOat,
    description:
      "House espresso over oat milk and clear ice — the most ordered drink between May and September.",
    notes: ["Oat cookie", "Caramel", "Cherry"],
    details: [
      { label: "Size", value: "14 oz" },
      { label: "Syrups", value: "House vanilla + $0.75" },
      { label: "Milk", value: "Any, no charge" },
    ],
  },
  {
    id: "shakerato",
    name: "Espresso Shakerato",
    subtitle: "Shaken hard, served cold",
    category: "cold",
    price: 5.5,
    image: img.shakerato,
    description:
      "A double espresso shaken with ice and a touch of demerara until it foams. Italian summer in a glass.",
    notes: ["Crema", "Demerara", "Orange peel"],
    details: [
      { label: "Size", value: "6 oz" },
      { label: "Sweet", value: "Lightly" },
      { label: "Add tonic", value: "+ $1.00" },
    ],
  },
  {
    id: "iced-matcha",
    name: "Iced Matcha Latte",
    subtitle: "Poured to order",
    category: "cold",
    price: 6.5,
    image: img.icedMatcha,
    description:
      "Ceremonial matcha whisked cold and poured over milk and ice. Ask for a shot of espresso on top for a dirty matcha.",
    notes: ["Grass", "Cream", "Sweet pea"],
    details: [
      { label: "Dirty", value: "+ $1.25" },
      { label: "Milk", value: "Any, no charge" },
      { label: "Size", value: "14 oz" },
    ],
  },
  {
    id: "croissant",
    name: "Butter Croissant",
    subtitle: "Laminated over three days",
    category: "bakery",
    price: 4.5,
    image: img.croissant,
    description:
      "Normandy butter, three days of lamination, baked every 40 minutes until they sell out — usually by noon.",
    notes: ["Shatter", "Cultured butter", "Honeycomb"],
    details: [
      { label: "Baked", value: "From 6:30am" },
      { label: "Allergens", value: "Gluten, dairy, egg" },
      { label: "Pairs with", value: "Cortado" },
    ],
  },
  {
    id: "almond",
    name: "Twice-Baked Almond",
    subtitle: "Frangipane, flaked almond",
    category: "bakery",
    price: 5.25,
    image: img.almondCroissant,
    description:
      "Yesterday's croissants, soaked in orange-blossom syrup, filled with frangipane and baked again. Zero waste, maximum joy.",
    notes: ["Marzipan", "Orange blossom", "Toasted"],
    details: [
      { label: "Allergens", value: "Gluten, dairy, egg, nuts" },
      { label: "Pairs with", value: "Batch filter" },
      { label: "Baked", value: "Daily" },
    ],
  },
  {
    id: "rye",
    name: "Seeded Rye Loaf",
    subtitle: "48-hour ferment, whole loaf",
    category: "bakery",
    price: 11.0,
    image: img.ryeLoaf,
    description:
      "Dark rye sourdough with sunflower, flax and caraway. Take one home — it keeps for a week and toasts beautifully.",
    notes: ["Sour", "Caraway", "Malt"],
    details: [
      { label: "Weight", value: "900g" },
      { label: "Slice + butter", value: "$4.50 in-house" },
      { label: "Vegan", value: "Yes" },
    ],
  },
  {
    id: "board",
    name: "Weekend Pastry Board",
    subtitle: "For two, Sat & Sun",
    category: "bakery",
    price: 18.0,
    image: img.pastryBoard,
    tag: "Weekends",
    description:
      "A rotating spread of the morning bake, cultured butter, house jam and two drinks of your choice. Built for lingering.",
    notes: ["Shareable", "Seasonal jam", "Two drinks"],
    details: [
      { label: "Serves", value: "Two" },
      { label: "Available", value: "Sat–Sun until 1pm" },
      { label: "Book", value: "Recommended" },
    ],
  },
];

export const formatPrice = (n: number) => `$${n.toFixed(2)}`;

const Editor = document.getElementById("Editor");
const Mod = document.getElementById("Mod");
var UnsavedChanges = false;
var ModItemsElement;
const tempCanvas = new Canvas();
const tempCTX = tempCanvas.getContext("2d");
const enabledMods = ["Block", "Pickaxe", "Axe", "Sword", "Recipe", "Other", "Object 1x1", "Object 2x2", "JavaScript", "NPC Drop", "Mask", "NPC", "Object 1x2", "Object 2x1", "Door", "Beam", "Fence", "Platform", "Torch", "Chain", "Staff", "Chest Gen", "Table", "Chair", "World Gen"];
const ModItems = [];
for (var i = 0; i < 300; i++) ModItems[i] = ["Grass", "Dirt", "Tree", "Tree", "Tree", "Tree", "Tree", "Tree", "Tree", "Tree", "Tree", "Tree", "Tree", "Tree", "Tree", "Tree", "Tree", "Tree", "Tree", "Stone", "Stone", "Iron Pickaxe", "Iron Axe", "Wood", "Wood", "Sand", "Sand", "Iron Ore", "Iron Ore", "Bed", "Acorn", "Sapling", "Door Top", "Door Bottom", "Wooden Door", "Platform", "Work Bench", "Furnace", "Iron Bar", "Iron Bar", "Stone Brick", "Stone Brick", "Bed", "Bed", "Chair", "Chair", "Torch", "Torch (left)", "Torch (right)", "Sand Brick", "Sand Brick", "Chandelier", "Bench", "Dresser", "Table", "Barrel", "Chest", "Sign", "Anvil", "Sawmill", "Chain", "Grandfather Clock", "Grandfather Clock", "Grandfather Clock", "Cloud", "Cloud", "Glass", "Glass", "Ice Block", "Ice Block", "Clay", "Clay", "Brick", "Brick", "Gold Ore", "Gold Ore", "Gold Bar", "Gold Brick", "Gold Brick", "Silver Ore", "Silver Ore", "Silver Bar", "Silver Brick", "Silver Brick", "Seed", "Plant", "Plant", "Plant", "Plant", "Plant", "Plant", "Plant", "Plant", "Mushroom", "Plant", "Fence", "Iron Fence", "Gold Chandelier", "Candelabra", "Gold Chest", "Bath Tub", "Trash Can", "Toilet", "Cooking Pot", "Bath Tub", "Bath Tub", "Builder Potion", "Mining Potion", "Swiftness Potion", "Diamond Ore", "Diamond", "Diamond Slab", "Diamond Slab", "Stone Slab", "Sand Slab", "Pot Plant", "Bookcase", "Bookcase", "Bookcase", "Bookcase", "Bookcase", "Sky Chest", "Heavy Work Bench", "Bug Net", "Bunny", "Beam", "Beam", "Sofa", "Sofa", "Sofa", "Piano", "Piano", "Piano", "Chain", "Frog", "Slime", "Wooden Sword", "Iron Sword", "Gel", "Platinum Ore", "Platinum Ore", "Platinum Bar", "Gold Pickaxe", "Gold Axe", "Gold Sword", "Platinum Pickaxe", "Platinum Axe", "Platinum Sword", "Demon Eye", "Lens", "Zombie", "Easter Egg", "Chocolate", "Chocolate", "Land Claim Sign", "Crab", "Molten Pickaxe", "Blue Phaseblade", "Diamond Staff", "Water", "Water 15/16", "Water 14/16", "Water 13/16", "Water 12/16", "Water 11/16", "Water 10/16", "Water 9/16", "Water 8/16", "Water 7/16", "Water 6/16", "Water 5/16", "Water 4/16", "Water 3/16", "Water 2/16", "Water 1/16", "Goldfish", "Jellyfish", "Lava", "Lava 15/16", "Lava 14/16", "Lava 13/16", "Lava 12/16", "Lava 11/16", "Lava 10/16", "Lava 9/16", "Lava 8/16", "Lava 7/16", "Lava 6/16", "Lava 5/16", "Lava 4/16", "Lava 3/16", "Lava 2/16", "Lava 1/16", "Obsidian", "Lesser Healing Potion", "Healing Potion", "Greater Healing Potion", "Featherfall Potion", "Spelunker Potion", "Obsidian Skin Potion", "Gills Potion", "Purple Slime", "Bunny Slime", "Dungeon Slime", "Lava Slime", "Pyranha", "Shark", "Shark Fin", "Hook", "Zombie Arm", "Copper Pickaxe", "Copper Sword", "Copper Axe", "Bucket", "Water Bucket", "Lava Bucket", "Hellstone", "Hellstone", "Hellstone Bar", "Vine", "Hellforge", "Bat", "Lava Bat", "Water Chest", "Obsidian Chest", "Copper Coin", "Silver Coin", "Gold Coin", "Topaz Stone", "Topaz", "Ruby Stone", "Ruby", "Emerald Stone", "Emerald", "Sapphire Stone", "Sapphire", "Amethyst Stone", "Amethyst", "Iron Door", "Glass Door", "Obsidian Door", "Iron Door Top", "Iron Door Bottom", "Glass Door Top", "Glass Door Bottom", "Obsidian Door Top", "Obsidian Door Bottom", "Glass Kiln", "Butterfly", "Glass Table", "Glass Lantern", "Glass Chandelier", "Pot", "Wooden Sink", "Glass Platform", "Squirrel", "Mouse", "Firefly", "Fiery Greatsword", "Glass Bed", "Glass Bed L", "Glass Bed R", "Obsidian Bed", "Obsidian Bed L", "Obsidian Bed R", "Gold Bed", "Gold Bed L", "Gold Bed R", "Mushroom Bed", "Mushroom Bed L", "Mushroom Bed R", "Wooden Crate", "Iron Crate", "Mushroom Block", "Mushroom Block", "Table L", "Table R", "Iron Table", "Iron Table L", "Iron Table R", "Obsidian Table", "Obsidian Table L", "Obsidian Table R", "Mushroom Table", "Mushroom Table L", "Mushroom Table R", "Glass Table L", "Glass Table R", "Blue Dungeon Vase", "Green Dungeon Vase", "Pink Dungeon Vase", "Obsidian Vase", "Suspicious Looking Eye", "Demon Altar", "Demonite Ore", "Demonite Ore", "Demonite Bar", "Light's Bane", "Eye of Cthulhu Mask", "Santa Mask"][i];
const NPCs = [
    "Bunny",
    "Frog",
    "Slime",
    "Slime (Angry)",
    "Demon Eye",
    "Zombie",
    "Crab",
    "Goldfish",
    "Jellyfish",
    "Purple Slime",
    "Purple Slime (Angry)",
    "Bunny Slime",
    "Bunny Slime (Angry)",
    "Dungeon Slime",
    "Lava Slime",
    "Pyranha",
    "Shark",
    "Bat",
    "Lava Bat",
    "Butterfly",
    "Squirrel",
    "Mouse",
    "Firefly",
    "Eye of Cthulhu"
];
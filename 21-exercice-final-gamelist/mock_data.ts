
// Mock data for games
const MOCK_GAMES: Game[] = [
  {
    id: 3498,
    name: "Grand Theft Auto V",
    background_image: "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
    rating: 4.47,
    rating_top: 5,
    ratings_count: 7000,
    released: "2013-09-17",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 3, name: "Adventure", slug: "adventure" }
    ]
  },
  {
    id: 3328,
    name: "The Witcher 3: Wild Hunt",
    background_image: "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
    rating: 4.66,
    rating_top: 5,
    ratings_count: 9000,
    released: "2015-05-18",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 5, name: "RPG", slug: "role-playing-games-rpg" }
    ]
  },
  {
    id: 4200,
    name: "Portal 2",
    background_image: "https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg",
    rating: 4.61,
    rating_top: 5,
    ratings_count: 5500,
    released: "2011-04-18",
    genres: [
      { id: 2, name: "Shooter", slug: "shooter" },
      { id: 7, name: "Puzzle", slug: "puzzle" }
    ]
  },
  {
    id: 5286,
    name: "Tomb Raider (2013)",
    background_image: "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg",
    rating: 4.05,
    rating_top: 4,
    ratings_count: 6800,
    released: "2013-03-05",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 3, name: "Adventure", slug: "adventure" }
    ]
  },
  {
    id: 13536,
    name: "Portal",
    background_image: "https://media.rawg.io/media/games/7fa/7fa0b586293c5861ee32490e953a4996.jpg",
    rating: 4.51,
    rating_top: 5,
    ratings_count: 4200,
    released: "2007-10-09",
    genres: [
      { id: 2, name: "Shooter", slug: "shooter" },
      { id: 7, name: "Puzzle", slug: "puzzle" }
    ]
  },
  {
    id: 12020,
    name: "Left 4 Dead 2",
    background_image: "https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg",
    rating: 4.09,
    rating_top: 4,
    ratings_count: 3500,
    released: "2009-11-17",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 2, name: "Shooter", slug: "shooter" }
    ]
  },
  {
    id: 5679,
    name: "The Elder Scrolls V: Skyrim",
    background_image: "https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg",
    rating: 4.42,
    rating_top: 5,
    ratings_count: 8200,
    released: "2011-11-11",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 5, name: "RPG", slug: "role-playing-games-rpg" }
    ]
  },
  {
    id: 28,
    name: "Red Dead Redemption 2",
    background_image: "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg",
    rating: 4.59,
    rating_top: 5,
    ratings_count: 7800,
    released: "2018-10-26",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 3, name: "Adventure", slug: "adventure" }
    ]
  },
  {
    id: 58175,
    name: "God of War (2018)",
    background_image: "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg",
    rating: 4.56,
    rating_top: 5,
    ratings_count: 6500,
    released: "2018-04-20",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 3, name: "Adventure", slug: "adventure" }
    ]
  },
  {
    id: 3439,
    name: "Life is Strange",
    background_image: "https://media.rawg.io/media/games/562/562553814dd54e001a541e4ee83a591c.jpg",
    rating: 4.11,
    rating_top: 5,
    ratings_count: 5200,
    released: "2015-01-29",
    genres: [
      { id: 3, name: "Adventure", slug: "adventure" },
      { id: 51, name: "Indie", slug: "indie" }
    ]
  },
  {
    id: 802,
    name: "Borderlands 2",
    background_image: "https://media.rawg.io/media/games/49c/49c3dfa4ce2f6f140cc4825868e858cb.jpg",
    rating: 4.01,
    rating_top: 4,
    ratings_count: 4800,
    released: "2012-09-18",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 2, name: "Shooter", slug: "shooter" },
      { id: 5, name: "RPG", slug: "role-playing-games-rpg" }
    ]
  },
  {
    id: 326292,
    name: "Fall Guys",
    background_image: "https://media.rawg.io/media/games/5eb/5eb49eb2fa0738fdb5bacea557b1bc57.jpg",
    rating: 3.68,
    rating_top: 4,
    ratings_count: 2100,
    released: "2020-08-04",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 51, name: "Indie", slug: "indie" }
    ]
  },
  {
    id: 22509,
    name: "Minecraft",
    background_image: "https://media.rawg.io/media/games/b4e/b4e4c73d5aa4ec66bbf75375c4847a2b.jpg",
    rating: 4.42,
    rating_top: 5,
    ratings_count: 8900,
    released: "2011-11-18",
    genres: [
      { id: 3, name: "Adventure", slug: "adventure" },
      { id: 51, name: "Indie", slug: "indie" }
    ]
  },
  {
    id: 3070,
    name: "Fallout 4",
    background_image: "https://media.rawg.io/media/games/d82/d82990b9c67ba0d2d09d4e6fa88885a7.jpg",
    rating: 3.79,
    rating_top: 4,
    ratings_count: 6200,
    released: "2015-11-09",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 5, name: "RPG", slug: "role-playing-games-rpg" }
    ]
  },
  {
    id: 58134,
    name: "Marvel's Spider-Man",
    background_image: "https://media.rawg.io/media/games/9aa/9aa42d16d425fa6f179fc9dc2f763647.jpg",
    rating: 4.48,
    rating_top: 5,
    ratings_count: 5700,
    released: "2018-09-07",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 3, name: "Adventure", slug: "adventure" }
    ]
  },
  {
    id: 422,
    name: "Terraria",
    background_image: "https://media.rawg.io/media/games/f46/f466571d536f2e3ea9e815ad17177501.jpg",
    rating: 4.41,
    rating_top: 5,
    ratings_count: 4500,
    released: "2011-05-16",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 51, name: "Indie", slug: "indie" }
    ]
  },
  {
    id: 23027,
    name: "The Walking Dead: Season 1",
    background_image: "https://media.rawg.io/media/games/8d6/8d69eb6c32ed6acfd75f82d532144993.jpg",
    rating: 4.12,
    rating_top: 5,
    ratings_count: 3800,
    released: "2012-04-24",
    genres: [
      { id: 3, name: "Adventure", slug: "adventure" },
      { id: 7, name: "Puzzle", slug: "puzzle" }
    ]
  },
  {
    id: 4062,
    name: "BioShock Infinite",
    background_image: "https://media.rawg.io/media/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg",
    rating: 4.38,
    rating_top: 5,
    ratings_count: 6100,
    released: "2013-03-26",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 2, name: "Shooter", slug: "shooter" }
    ]
  },
  {
    id: 1030,
    name: "Limbo",
    background_image: "https://media.rawg.io/media/games/942/9424d6bb763dc38d9378b488603c87fa.jpg",
    rating: 4.14,
    rating_top: 5,
    ratings_count: 3400,
    released: "2010-07-21",
    genres: [
      { id: 51, name: "Indie", slug: "indie" },
      { id: 7, name: "Puzzle", slug: "puzzle" }
    ]
  },
  {
    id: 13537,
    name: "Half-Life 2",
    background_image: "https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg",
    rating: 4.49,
    rating_top: 5,
    ratings_count: 5900,
    released: "2004-11-16",
    genres: [
      { id: 4, name: "Action", slug: "action" },
      { id: 2, name: "Shooter", slug: "shooter" }
    ]
  }
];

// Mock data for genres
const MOCK_GENRES: Genre[] = [
  { id: 4, name: "Action", slug: "action", games_count: 180000 },
  { id: 51, name: "Indie", slug: "indie", games_count: 68000 },
  { id: 3, name: "Adventure", slug: "adventure", games_count: 140000 },
  { id: 5, name: "RPG", slug: "role-playing-games-rpg", games_count: 56000 },
  { id: 2, name: "Shooter", slug: "shooter", games_count: 62000 },
  { id: 7, name: "Puzzle", slug: "puzzle", games_count: 101000 }
];
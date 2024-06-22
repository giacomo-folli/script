const maleProfilePicSeeds = [
  "Mimi",
  "Felix",
  "Boots",
  "Baby",
  "Harley",
  "Boo",
  "Bubba",
  "Maggie",
  "Abby",
  "Angel",
  "Cuddles",
  "Buster",
  "Lily",
  "Annie",
  "Luna",
  "Kitty",
  "Jasper",
  "Ginger",
  "Bella",
  "Sassy",
];

const femaleProfilePicSeeds =[]

/**
 *
 * @returns {string} returns a seed to use in with https://api.dicebear.com/9.x/croodles/svg?seed=[HERE] API
 */
export const getRandomSeed = () => {
  const idx = Math.floor(Math.random() * profilePicSeeds.length);
  return profilePicSeeds[idx < profilePicSeeds.length ? idx : idx - 1];
};

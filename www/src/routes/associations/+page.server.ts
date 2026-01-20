import type { PageServerLoad } from "./$types";

// Mock data - not in database yet
const allAssociations = [
  {
    id: "1",
    name: "La Ferme des Animaux Heureux",
    logo: "🐄",
    description:
      "Association dedicated to farm animal welfare and rehabilitation",
    city: "Paris",
    type: "Sanctuary",
    animalsCount: "45",
    foundedYear: "2010",
    email: "contact@fermeheureuse.fr",
    phone: "01 23 45 67 89",
  },
  {
    id: "2",
    name: "SOS Animaux de la Ferme",
    logo: "🐷",
    description: "Rescue and placement of farm animals in distress",
    city: "Lyon",
    type: "Rescue",
    animalsCount: "32",
    foundedYear: "2015",
    email: "info@sosferme.org",
    phone: "04 12 34 56 78",
  },
  {
    id: "3",
    name: "Les Amis des Poules",
    logo: "🐔",
    description: "Protection and adoption of retired laying hens",
    city: "Montpellier",
    type: "Adoption",
    animalsCount: "120",
    foundedYear: "2018",
    email: "contact@amispoules.fr",
    phone: "04 98 76 54 32",
  },
  {
    id: "4",
    name: "Refuge des Herbivores",
    logo: "🐐",
    description: "Shelter and care for goats, sheep and other herbivores",
    city: "Paris",
    type: "Sanctuary",
    animalsCount: "28",
    foundedYear: "2012",
    email: "herbivores@refuge.fr",
    phone: "01 98 76 54 32",
  },
  {
    id: "5",
    name: "Chevaux Libres",
    logo: "🐴",
    description: "Rehabilitation and placement of abused or abandoned horses",
    city: "Lyon",
    type: "Sanctuary",
    animalsCount: "18",
    foundedYear: "2008",
    email: "contact@chevauxlibres.org",
    phone: "04 11 22 33 44",
  },
  {
    id: "6",
    name: "Sanctuaire des Oiseaux",
    logo: "🦆",
    description: "Care center for backyard birds and poultry",
    city: "Montpellier",
    type: "Care",
    animalsCount: "95",
    foundedYear: "2016",
    email: "info@sanctuaireoiseaux.fr",
    phone: "04 55 66 77 88",
  },
  {
    id: "7",
    name: "Les Ânes de l'Espoir",
    logo: "🫏",
    description: "Rescue and therapy with donkeys for disadvantaged children",
    city: "Toulouse",
    type: "Care",
    animalsCount: "12",
    foundedYear: "2014",
    email: "contact@anesespoir.fr",
    phone: "05 61 22 33 44",
  },
  {
    id: "8",
    name: "Refuge du Petit Peuple",
    logo: "🐇",
    description: "Specialized in rescue of rabbits and small farm animals",
    city: "Nantes",
    type: "Rescue",
    animalsCount: "67",
    foundedYear: "2017",
    email: "info@petitpeuple.org",
    phone: "02 40 11 22 33",
  },
  {
    id: "9",
    name: "Lamas & Alpagas Solidaires",
    logo: "🦙",
    description: "Protection of camelids and educational farm visits",
    city: "Nice",
    type: "Sanctuary",
    animalsCount: "22",
    foundedYear: "2019",
    email: "contact@lamassolidaires.fr",
    phone: "04 93 44 55 66",
  },
  {
    id: "10",
    name: "Moutons Sans Frontières",
    logo: "🐑",
    description:
      "International network for sheep welfare and sustainable farming",
    city: "Strasbourg",
    type: "Adoption",
    animalsCount: "88",
    foundedYear: "2011",
    email: "info@moutonssf.org",
    phone: "03 88 77 66 55",
  },
  {
    id: "11",
    name: "Canards & Cie",
    logo: "🦆",
    description: "Rescue center for ducks and waterfowl",
    city: "Marseille",
    type: "Care",
    animalsCount: "156",
    foundedYear: "2013",
    email: "contact@canardsetcie.fr",
    phone: "04 91 88 99 00",
  },
  {
    id: "12",
    name: "Ferme Pédagogique Arc-en-Ciel",
    logo: "🌈",
    description:
      "Educational farm promoting animal welfare and sustainable agriculture",
    city: "Bordeaux",
    type: "Sanctuary",
    animalsCount: "54",
    foundedYear: "2009",
    email: "info@fermearcenciel.fr",
    phone: "05 56 33 44 55",
  },
];

export const load: PageServerLoad = async ({ url }) => {
  const searchQuery = url.searchParams.get("search")?.toLowerCase() || "";
  const selectedType = url.searchParams.get("type") || "all";
  const selectedCity = url.searchParams.get("city") || "all";
  const sortBy = url.searchParams.get("sort") || "name";

  // Filter associations
  const filteredAssociations = allAssociations.filter((association) => {
    const matchSearch =
      association.name.toLowerCase().includes(searchQuery) ||
      association.description.toLowerCase().includes(searchQuery);
    const matchType =
      selectedType === "all" || association.type === selectedType;
    const matchCity =
      selectedCity === "all" || association.city === selectedCity;

    return matchSearch && matchType && matchCity;
  });

  // Sort associations
  filteredAssociations.sort((a, b) => {
    switch (sortBy) {
      case "city":
        return a.city.localeCompare(b.city);
      case "type":
        return a.type.localeCompare(b.type);
      case "animalsCount":
        return parseInt(b.animalsCount, 10) - parseInt(a.animalsCount, 10);
      default: // name
        return a.name.localeCompare(b.name);
    }
  });

  return {
    associations: filteredAssociations,
    filters: {
      search: searchQuery,
      type: selectedType,
      city: selectedCity,
      sort: sortBy,
    },
  };
};

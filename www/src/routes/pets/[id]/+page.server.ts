import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
  return {
    animal: {
      nom: "Marguerite",
      espece: "Vache",
      age: 4,
      description: "Marguerite est une vache tres facile, elle adore le foin, les longues siestes, et ses amis les canards.",
      adopte: false
    }
  };
};

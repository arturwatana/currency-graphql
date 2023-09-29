import { searchesRepository } from "../../../../index.js";

export const searchesQuery = {
  searches: () => {
    return searchesRepository.showAll();
  },
};

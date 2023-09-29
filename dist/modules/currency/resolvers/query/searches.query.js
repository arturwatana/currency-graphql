import { searchesRepository } from "../../../../index.js";
export const searches = () => {
    return searchesRepository.showAll();
};

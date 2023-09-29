import { usesrRepository } from "../../../../index.js";

export const users = () => {
  return usesrRepository.showAll();
};

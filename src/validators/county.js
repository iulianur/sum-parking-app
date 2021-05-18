import { counties } from '../constants/counties';

export const isValidCounty = (county) => {
  if (!county) {
    return false;
  }

  return counties.includes(county.toUpperCase());
};

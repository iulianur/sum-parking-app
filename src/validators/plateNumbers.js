import { NUMBERS_REGEX, RO_PLATE_REGEX } from '../constants/validation';
import { isValidCounty } from './county';

const RO_COUNTY_INDEX = 0;

export const isValidRoPlateNumber = (plateNo) => {
  if (!plateNo) {
    return false;
  }

  const plateNoGroups = plateNo.split(NUMBERS_REGEX);

  return (
    isValidCounty(plateNoGroups[RO_COUNTY_INDEX]) &&
    RO_PLATE_REGEX.test(plateNo.toUpperCase())
  );
};

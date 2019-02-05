/**
 * Just for an example for a business logic model
 * {@link https://restcountries.eu/#api-endpoints-response-example}
 */
import {Selectable} from '../dynamic-forms/config/components/async/async-select-control.config';

export class Country {
  name: string;
  capital: string;
  subregion: string;
  flag: string;

  constructor(args: Partial<Country>) {
    this.name = args.name;
    this.capital = args.capital;
    this.subregion = args.subregion;
    this.flag = args.flag;
  }
}

export function countrySelectableMapper(json: Partial<Country>): Selectable<Country> {
  const value = new Country(json);
  return {label: value.name, value};
}

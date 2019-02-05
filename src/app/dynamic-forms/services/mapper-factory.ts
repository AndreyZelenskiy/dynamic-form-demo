import {countrySelectableMapper} from '../../country/country';

export class MapperFactory {
  static getMapper<T, V>(type: Mapper): (json: T) => V {
    switch (type) {
      case Mapper.Country:
        // Small hack for a types ))
        return <(json: T) => V><any>countrySelectableMapper;
      default:
        throw new Error('No mapper for type ' + type);
    }
  }
}

export enum Mapper {
  Country = 'CountryMapper'
}

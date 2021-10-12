import {Country as CountryIn} from './country';

export interface Summary {
  ID: string;
  Message: string;
  Global: {
    NewConfirmed: number;
    TotalConfirmed: number;
    NewDeaths: number;
    TotalDeaths: number;
    NewRecovered: number;
    TotalRecovered: number;
    Date: string;
  };
  Countries: Array<CountryIn>;
  Date: string;
}

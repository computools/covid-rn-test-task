import {Summary} from './summary';
import {Country as CountryOut} from '../../models/country';
import {Country as CountryIn} from './country';

interface CovStat {
  confirmed: number;
  deaths: number;
  recovered: number;
}

export interface SummaryOut {
  topFiveCountries: Array<CountryOut>;
  global: {
    total: CovStat;
    today: CovStat;
  };
}

const startIndex = 0;
const endIndex = 5;

const buildCountry = (json: CountryIn) =>
  new CountryOut(
    json.ID,
    json.Country,
    json.CountryCode,
    json.Slug,
    json.NewConfirmed,
    json.TotalConfirmed,
    json.NewDeaths,
    json.TotalDeaths,
    json.NewRecovered,
    json.TotalRecovered,
    new Date(json.Date),
  );

export class CovidApi {
  private static baseUrl: string = 'https://api.covid19api.com';

  public static getSummary = async (): Promise<SummaryOut> => {
    const res = await fetch(`${CovidApi.baseUrl}/summary`);
    const data: Summary = await res.json();
    const topFiveCountries = data!.Countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
      .slice(startIndex, endIndex)
      .map(buildCountry);

    return {
      topFiveCountries,
      global: {
        total: {
          confirmed: data.Global.TotalConfirmed,
          deaths: data.Global.TotalDeaths,
          recovered: data.Global.TotalRecovered,
        },
        today: {
          confirmed: data.Global.NewConfirmed,
          deaths: data.Global.NewDeaths,
          recovered: data.Global.NewRecovered,
        },
      },
    };
  };
}

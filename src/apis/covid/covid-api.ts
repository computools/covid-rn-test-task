import AsyncStorage from '@react-native-async-storage/async-storage';

import {CountryOption as CountyOptionIn} from './dto/country-option';
import {Country as CountryOut} from '../../models/country';
import {CountryOption} from '../../models/country-option';
import {CountryEntry} from '../../models/country-entry';
import {CaseRecord, Records} from './dto/case-record';
import {DayOneCountry} from './dto/day-one-country';
import {Country as CountryIn} from './dto/country';
import {Summary} from './dto/summary';
import {Case} from './dto/case';

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

const buildCountryEntry = (json: DayOneCountry) =>
  new CountryEntry(
    json.Country,
    json.CountryCode,
    json.Province,
    json.City,
    json.CityCode,
    json.Lat,
    json.Lon,
    json.Confirmed,
    json.Deaths,
    json.Recovered,
    json.Active,
    new Date(json.Date),
  );

const buildCountyOption = (json: CountyOptionIn) => new CountryOption(json.Country, json.Slug, json.ISO2);

export class CovidApi {
  private static reportedCasesKey: string = 'REPORTED_CASES';
  private static baseUrl: string = 'https://api.covid19api.com';

  public static getSummary = async (): Promise<SummaryOut> => {
    const res = await fetch(`${CovidApi.baseUrl}/summary`);
    const data: Summary = await res.json();
    const records = await this.getReportedCasesStat();

    const topFiveCountries = data!.Countries.map(country => this.updateCountryWithCachedData(country, records))
      .sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
      .slice(startIndex, endIndex)
      .map(buildCountry);

    const globalStat = this.getTodayGlobalStat(records);

    return {
      topFiveCountries,
      global: {
        total: {
          confirmed: data.Global.TotalConfirmed,
          deaths: data.Global.TotalDeaths,
          recovered: data.Global.TotalRecovered,
        },
        today: {
          confirmed: data.Global.NewConfirmed + globalStat.confirmed,
          deaths: data.Global.NewDeaths + globalStat.deaths,
          recovered: data.Global.NewRecovered + globalStat.recovered,
        },
      },
    };
  };

  public static getAllCountriesSummary = async (query: string): Promise<Array<CountryOut>> => {
    const res = await fetch(`${CovidApi.baseUrl}/summary`);
    const data: Summary = await res.json();

    const records = await this.getReportedCasesStat();

    return data!.Countries.map(country => this.updateCountryWithCachedData(country, records))
      .sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
      .filter(c => c.Country.toLowerCase().includes(query.toLowerCase()))
      .map(buildCountry);
  };

  public static getDayOneStatByCountry = async (slug: string): Promise<Array<CountryEntry>> => {
    const res = await fetch(`${CovidApi.baseUrl}/total/dayone/country/${slug}`);
    const data: Array<DayOneCountry> = await res.json();

    return data.map(buildCountryEntry);
  };

  public static getCountriesOptions = async (): Promise<Array<CountryOption>> => {
    const res = await fetch(`${CovidApi.baseUrl}/countries`);
    const data: Array<CountyOptionIn> = await res.json();

    return data.map(buildCountyOption);
  };

  public static addCase = async (countrySlug: string, caseType: Case) => {
    const reportedCases = await this.getReportedCases();

    const userRecord: CaseRecord = {
      countrySlug,
      caseType,
      date: new Date().toLocaleDateString(),
    };

    await AsyncStorage.setItem(CovidApi.reportedCasesKey, JSON.stringify([...reportedCases, userRecord]));
  };

  private static getReportedCases = async () => {
    const storedJson = await AsyncStorage.getItem(CovidApi.reportedCasesKey);
    return (storedJson != null ? JSON.parse(storedJson) : []) as Array<CaseRecord>;
  };

  private static getReportedCasesStat = async () => {
    const cases = await this.getReportedCases();

    const byDate: Records = cases.reduce((acc, c) => ({...acc, [c.date]: acc[c.date] ? [...acc[c.date], c.caseType] : [c.caseType]}), {} as Records);

    const byCountry: Records = cases.reduce(
      (acc, c) => ({...acc, [c.countrySlug]: acc[c.countrySlug] ? [...acc[c.countrySlug], c.caseType] : [c.caseType]}),
      {} as Records,
    );

    return {byDate, byCountry};
  };

  private static updateCountryWithCachedData = (country: CountryIn, cached: {byDate: Records; byCountry: Records}) => {
    const today = new Date().toLocaleDateString();

    const byCountryCases = cached.byCountry[country.Slug] || [];
    const TotalConfirmed = byCountryCases.filter(c => c === Case.Active).length + country.TotalConfirmed;
    const TotalDeaths = byCountryCases.filter(c => c === Case.Death).length + country.TotalDeaths;
    const TotalRecovered = byCountryCases.filter(c => c === Case.Recovery).length + country.TotalRecovered;

    const byDateToday = cached.byDate[today] || [];
    const NewConfirmed = byDateToday.filter(c => c === Case.Active).length + country.NewConfirmed;
    const NewDeaths = byDateToday.filter(c => c === Case.Death).length + country.NewDeaths;
    const NewRecovered = byDateToday.filter(c => c === Case.Recovery).length + country.NewRecovered;
    return {
      ...country,
      TotalConfirmed,
      TotalDeaths,
      TotalRecovered,
      NewConfirmed,
      NewDeaths,
      NewRecovered,
    } as CountryIn;
  };

  private static getTodayGlobalStat = (cached: {byDate: Records; byCountry: Records}) => {
    const today = new Date().toLocaleDateString();
    const byDateToday = cached.byDate[today] || [];

    return {
      confirmed: byDateToday.filter(c => c === Case.Active).length,
      deaths: byDateToday.filter(c => c === Case.Death).length,
      recovered: byDateToday.filter(c => c === Case.Recovery).length,
    };
  };
}

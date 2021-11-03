import AsyncStorage from '@react-native-async-storage/async-storage';

import {CaseRecord, Records} from './dto/case-record';
import {DayOneCountry} from './dto/day-one-country';
import {CountryOption} from './dto/country-option';
import {Summary} from './dto/summary';
import {Case} from './dto/case';

export class CovidApi {
  private static reportedCasesKey: string = 'REPORTED_CASES';
  private static baseUrl: string = 'https://api.covid19api.com';

  public static getSummary = async (): Promise<Summary> => {
    const res = await fetch(`${CovidApi.baseUrl}/summary`);
    const data: Summary = await res.json();

    return {
      ...data,
      Countries: data.Countries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed),
    };
  };

  public static getDayOneStatByCountry = async (slug: string): Promise<Array<DayOneCountry>> => {
    const res = await fetch(`${CovidApi.baseUrl}/total/dayone/country/${slug}`);
    const data: Array<DayOneCountry> = await res.json();

    return data;
  };

  public static getCountriesOptions = async (): Promise<Array<CountryOption>> => {
    const res = await fetch(`${CovidApi.baseUrl}/countries`);
    const data: Array<CountryOption> = await res.json();

    return data;
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

  public static getReportedCasesStat = async () => {
    const cases = await this.getReportedCases();

    const todayDate = new Date().toLocaleDateString();
    const byCountry: Records = cases
      .filter(c => c.date === todayDate)
      .reduce((acc, c) => ({...acc, [c.countrySlug]: acc[c.countrySlug] ? [...acc[c.countrySlug], c.caseType] : [c.caseType]}), {} as Records);

    return {byCountry};
  };

  private static getReportedCases = async () => {
    const storedJson = await AsyncStorage.getItem(CovidApi.reportedCasesKey);
    return (storedJson != null ? JSON.parse(storedJson) : []) as Array<CaseRecord>;
  };
}

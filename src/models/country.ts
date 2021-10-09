import {Country as CountryDTO} from './dtos/country';

export class Country {
  public id: string;
  public name: string;
  public countryCode: string;
  public slug: string;
  public newConfirmed: number;
  public totalConfirmed: number;
  public newDeaths: number;
  public totalDeaths: number;
  public newRecovered: number;
  public totalRecovered: number;
  public date: Date;

  public constructor(
    id: string,
    name: string,
    countryCode: string,
    slug: string,
    newConfirmed: number,
    totalConfirmed: number,
    newDeaths: number,
    totalDeaths: number,
    newRecovered: number,
    totalRecovered: number,
    date: Date,
  ) {
    this.id = id;
    this.name = name;
    this.countryCode = countryCode;
    this.slug = slug;
    this.newConfirmed = newConfirmed;
    this.totalConfirmed = totalConfirmed;
    this.newDeaths = newDeaths;
    this.totalDeaths = totalDeaths;
    this.newRecovered = newRecovered;
    this.totalRecovered = totalRecovered;
    this.date = date;
  }

  public static parse = (json: CountryDTO) =>
    new Country(
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
}

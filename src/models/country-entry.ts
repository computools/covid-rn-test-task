export class CountryEntry {
  public name: string;
  public countryCode: string;
  public province: string;
  public city: string;
  public cityCode: string;
  public lat: string;
  public lon: string;
  public confirmed: number;
  public deaths: number;
  public recovered: number;
  public active: number;
  public date: Date;

  public constructor(
    name: string,
    countryCode: string,
    province: string,
    city: string,
    cityCode: string,
    lat: string,
    lon: string,
    confirmed: number,
    deaths: number,
    recovered: number,
    active: number,
    date: Date,
  ) {
    this.name = name;
    this.countryCode = countryCode;
    this.province = province;
    this.city = city;
    this.cityCode = cityCode;
    this.lat = lat;
    this.lon = lon;
    this.confirmed = confirmed;
    this.deaths = deaths;
    this.recovered = recovered;
    this.active = active;
    this.date = date;
  }
}

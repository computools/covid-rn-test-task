export class Country {
  public id: number;
  public name: string;
  public flagURL: string;
  public activeCases: number;
  public recovered: number;
  public deaths: number;

  public constructor(id: number, name: string, flagURL: string, activeCases: number, recovered: number, deaths: number) {
    this.id = id;
    this.name = name;
    this.flagURL = flagURL;
    this.activeCases = activeCases;
    this.recovered = recovered;
    this.deaths = deaths;
  }
}

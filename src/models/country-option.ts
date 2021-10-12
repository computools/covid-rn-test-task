export class CountryOption {
  public name: string;
  public slug: string;
  public code: string;

  public constructor(name: string, slug: string, code: string) {
    this.name = name;
    this.slug = slug;
    this.code = code;
  }
}

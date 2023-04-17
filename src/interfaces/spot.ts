export interface ISpot {
  title: string;
  address: string;
  postal_code: string;
  city: string;
  country_code: string;
  category: string;
  isShared: boolean;
}

export interface ISpotProps {
  spotData: Spot;
}

export interface ISpotsListProps {
  spotListData: SpotList;
}

export interface ISpotsState {
  availableSpots: SpotList;
  loading: boolean;
}

export class SpotList {
  private spotsList: Spot[];

  constructor() {
    this.spotsList = [];
  }

  public getList(): Spot[] {
    return this.spotsList;
  }

  public countSpots(): number {
    return this.spotsList.length;
  }

  public addSpot(spot: Spot) {
    this.spotsList.push(spot);
  }
}

export class Spot {
  private title: string;
  private address: string;
  private postal_code: string;
  private city: string;
  private country_code: string;
  private category: string;
  private isShared: boolean;

  constructor(data: ISpot) {
    this.title = data.title;
    this.address = data.address;
    this.postal_code = data.postal_code;
    this.city = data.city;
    this.country_code = data.country_code;
    this.category = data.category;
    this.isShared = data.isShared;
  }

  public getTitle() {
    return this.title;
  }

  public getAddress() {
    return this.address;
  }

  public getPostalCode() {
    return this.postal_code;
  }

  public getCity() {
    return this.city;
  }

  public getCountryCode() {
    return this.country_code;
  }

  public getCategory() {
    return this.category;
  }

  public getIsShared() {
    return this.isShared;
  }

  public setIsShared(value: boolean) {
    this.isShared = value
  }
}
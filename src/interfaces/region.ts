export interface IRegion {
  region_name: string;
  region_key: string;
}

export interface IRegionCheckboxOption {
  region: Region;
  isChecked: boolean;
}

export interface RegionCheckboxConfig {
  region_key: string;
  isChecked: boolean;
}

export class Region {
  private region_name: string;
  private region_key: string;

  constructor(data: IRegion) {
    this.region_name = data.region_name;
    this.region_key = data.region_key;
  }

  public getRegionName(): string {
    return this.region_name;
  }

  public getRegionKey(): string {
    return this.region_key;
  }
}

export class RegionList {
  private regionList: Region[];

  constructor() {
    this.regionList = [];
  }

  public getList(): Region[] {
    return this.regionList;
  }

  public countRegions(): number {
    return this.regionList.length;
  }

  public addRegion(region: Region) {
    this.regionList.push(region);
  }
}

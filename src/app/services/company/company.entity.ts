import { Company as CompanyType } from './company.types';

function createClassFromType<T>() {
  return class {
    constructor(args: T) {
      Object.assign(this, args);
    }
  } as {
    new (args: T): T;
  };
}

export type CoordinateType = {
  latitude: number;
  longitude: number;
};

const CompanyClass = createClassFromType<CompanyType>();

export class Company extends CompanyClass {
  constructor(company: CompanyType) {
    super(company);
  }

  get title() {
    return `${this.suffix} "${this.business_name}"`;
  }

  set title(title: string) {}

  get coords(): CoordinateType {
    return {
      latitude: this.latitude,
      longitude: this.longitude,
    };
  }

  set coords(data: CoordinateType) {}

  toJSON() {
    const jsonObj = Object.assign(
      {
        title: this.title,
        coords: this.coords,
      },
      this
    );

    return jsonObj;
  }
}

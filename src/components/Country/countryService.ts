import { Country, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface ICountryService {
  getAllCountries(): Promise<Country[]>;
  getCountryIdByName(countryCode: string): Promise<number>;
  getCountryNameById(country_id: number): Promise<string>;
}

const countryService: ICountryService = {
  getCountryIdByName: async (countryCode: string) => {
    try {
      const country = await prisma.country.findFirstOrThrow({
        where: { iso_code: countryCode },
      });
      return country.id;
    } catch (error) {
      throw new Error(`Error fetching country ID for ${countryCode}`);
    }
  },
  getCountryNameById: async (country_id: number) => {
    try {
      const country = await prisma.country.findFirstOrThrow({
        where: { id: country_id },
      });
      return country.name;
    } catch (error) {
      throw new Error(`Error fetching country name`);
    }
  },
  getAllCountries: async () => {
    try {
      const countries: Country[] = await prisma.country.findMany();
      return countries;
    } catch (error) {
      throw new Error(`Error fetching countries`);
    }
  },
};

export default countryService;

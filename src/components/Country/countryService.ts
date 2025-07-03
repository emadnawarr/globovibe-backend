import { PrismaClient } from "@prisma/client";
import { Country } from "./country.interface";

const prisma = new PrismaClient();

export interface ICountryService {
  getAllCountries(): Promise<Country[]>;
  getCountryIdByName(countryCode: string): Promise<number>;
  getCountryById(country_id: number): Promise<Country>;
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
  getCountryById: async (country_id: number) => {
    try {
      const country = await prisma.country.findFirstOrThrow({
        where: { id: country_id },
      });
      return country;
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

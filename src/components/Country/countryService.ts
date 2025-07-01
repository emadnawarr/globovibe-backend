import { Country, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface ICountryService {
  getAllCountries(): Promise<Country[]>;
  getCountryIdByName(countryCode: string): Promise<number>;
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

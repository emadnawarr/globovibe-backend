import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getCountryIdByName = async (countryCode: string): Promise<number> => {
  try {
    const country = await prisma.country.findFirstOrThrow({
      where: { iso_code: countryCode },
    });
    return country.id;
  } catch (error) {
    throw new Error(`Error fetching country ID for ${countryCode}`);
  }
};

export default { getCountryIdByName };

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getCountryIdByName = async (
  countryName: string
): Promise<number | null> => {
  try {
    const country = await prisma.country.findFirst({
      where: { name: countryName }, // Use findFirst to match non-unique fields
    });
    return country ? country.id : null;
  } catch (error) {
    console.error(`Error fetching country ID for ${countryName}:`, error);
    return null;
  }
};

export default { getCountryIdByName };

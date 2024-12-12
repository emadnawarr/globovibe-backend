import { Category } from "@prisma/client";

export interface Event {
  id: number;
  title: string;
  description: string;
  content: string;
  category: Category;
  publish_date: Date;
  source: string;
  country_id: number;
}

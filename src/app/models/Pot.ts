import {Contributor} from "./Contributor";
import {Category} from "./Category";
import {User} from "./User";

export interface Pot {
  id: number;
  title: string;
  description: string;
  category: string; //Category
  target_amount: number;
  current_amount: number;
  owner: number; //User
  contributors: number[]; // Contributor
  img_source: string;
  deadline: Date;
  start_date: Date;
}

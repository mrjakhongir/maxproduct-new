import { NewArea } from "./area";

export interface HistoryI {
  id: string;
  userId: string;
  market: string;
  forms: NewArea[];
}

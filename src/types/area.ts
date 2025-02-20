import { Control } from "react-hook-form";

export interface Area {
  id: string;
  type: string;
  panelThickness: string;
  topThickness: string;
  bottomThickness: string;
  filler: string;
  area: number;
  discount: number;
  price: string;
  coverThickness: string;
}

export interface NewArea extends Area {
  formId: string;
}

export type FormItemProps = {
  control: Control<Area>;
};

export type Managers = {
  id: string;
  name: string;
  phone: string;
};

export interface User {
  uid: string;
  fName: string;
  email: string;
  phone: string;
  role: string;
}

export interface NewPriceForm {
  id: string;
  type: string;
  panelThickness: string;
  coverThickness: string;
  filler: string;
}

export interface PriceResponse {
  id: string;
  type: string;
  panelThickness: string;
  coverThickness: string;
  filler: string;
  price: string;
}

export interface Feature {
  id: string;
  name: string;
  data: string[];
}

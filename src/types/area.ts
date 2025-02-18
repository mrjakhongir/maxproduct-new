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
  createdAt: Date;
}

export interface FormResponse extends Area {
  id: string;
  createdAt: Date;
}

export type FormItemProps = {
  control: Control<Area>;
};

export type Managers = {
  id: string;
  name: string;
  phone: string;
};

export type Types = {
  id: string;
  name: string;
  value: string;
};

export type Thickness = {
  id: string;
  value: string;
  name: string;
};

export type CoverThickness = {
  id: string;
  value: string;
};

export type ProductFiller = {
  id: string;
  value: string;
  name: string;
};

export enum CollectionTypes {
  Images = "images",
  Hair = "hair",
  Paintings = "paintings",
  Services = "services",
}

export interface IPaintingData {
  name: string;
  price: number;
  isSold: boolean;
  dimentions?: string;
}

export interface IPhoto {
  url: string;
  createAt: { seconds: number; nanoseconds: number };
  id: string;
  thumbnail?: string;
}

export interface IPaintings {
  gallery: IPhoto[];
  url: string;
  createAt: { seconds: number; nanoseconds: number };
  id: string;
  name: string;
  price: number;
  isSold: boolean;
  dimentions?: string;
}

export interface IModalImage {
  index: number;
  url: string;
  id: string;
  thumbnail?: string;
}

export type MessageType = "success" | "error" | "warning" | "info";

export interface IService {
  url: string;
  createAt: { seconds: number; nanoseconds: number };
  id: string;
  name: string;
  thumbnail?: string;
}

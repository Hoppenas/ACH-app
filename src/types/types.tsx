export enum CollectionTypes {
  Images = "images",
  Hair = "hair",
  Paintings = "paintings",
}

export interface IPaintingData {
  name: string;
  price: number;
  isSold: boolean;
}

export interface IPhoto {
  url: string;
  createAt: { seconds: number; nanoseconds: number };
  id: string;
}

export interface IPaintings {
  gallery: IPhoto[];
  url: string;
  createAt: { seconds: number; nanoseconds: number };
  id: string;
  name: string;
  price: number;
  isSold: boolean;
}

export interface IModalImage {
  index: number;
  url: string;
}

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

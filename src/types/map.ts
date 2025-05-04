import { getRequest } from "../";

/**
 * Represents a metro map entry from the API.
 */
export class MetroMap {
  /** Unique identifier of the map. */
  id: number;
  /** Title of the map in Turkish. */
  title: string;
  /** English title of the map. */
  enTitle: string;
  /** Arabic title of the map. */
  arTitle: string;
  /** URL pointing to the map image. */
  imageURL: string;
  /** URL pointing to the map icon. */
  iconURL: string;
  /** URL pointing to the map document (e.g., PDF). */
  documentURL: string;
  /** Indicates whether the map is currently active. */
  isActive: boolean;
  /** Sort order for the map. */
  order: number;
  /** Date when the map was published or updated. */
  date: string;

  constructor(raw: MetroMapRaw) {
    this.id = raw.Id;
    this.title = raw.Title;
    this.enTitle = raw.ENTtitle;
    this.arTitle = raw.ARTitle;
    this.imageURL = raw.ImageURL;
    this.iconURL = raw.IconURL;
    this.documentURL = raw.DocumentURL;
    this.isActive = raw.IsActive;
    this.order = raw.Order;
    this.date = raw.Date;
  }

  /**
   * Fetches all maps.
   */
  static async fetchAll(): Promise<MetroMap[]> {
    const rawData = (await getRequest<MetroMapRaw[]>("/GetMaps")).data;
    return rawData.map((map) => new MetroMap(map));
  }
}

/**
 * Raw structure of a metro map entry returned from the API.
 */
export interface MetroMapRaw {
  Id: number;
  Title: string;
  ENTtitle: string;
  ARTitle: string;
  ImageURL: string;
  IconURL: string;
  DocumentURL: string;
  IsActive: boolean;
  Order: number;
  Date: string;
}

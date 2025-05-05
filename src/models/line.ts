import { getRequest } from "../";
import { MetroStation, MetroStationRaw } from "./station";

export enum MetroLineId {
  M2 = 1,
  M3 = 2,
  M4 = 3,
  F1 = 4,
  M5 = 5,
  M6 = 6,
  M7 = 7,
  M8 = 8,
  M1A = 9,
  M1B = 10,
  T1 = 11,
  T3 = 12,
  T4 = 13,
  T5 = 14,
  TF1 = 15,
  TF2 = 16,
  M9 = 17,
  F4 = 20,
}

/**
 * Represents a metro line.
 */
export class MetroLine {
  /** Unique identifier of the metro line. */
  id: MetroLineId;
  /** Name of the metro line. */
  name: string;
  /** Description content in the default language. */
  content: string;
  /** English content. */
  enContent: string;
  /** Arabic content. */
  arContent: string;
  /** Short description in the default language. */
  shortDescription: string;
  /** Long description in the default language. */
  longDescription: string;
  /** English description. */
  enDescription: string;
  /** Arabic description. */
  arDescription: string;
  /** Indicates if the line is active. */
  isActive: boolean;
  /** Unique functional code for the line. */
  functionalCode: string;
  /** Line color as RGB. */
  color: MetroLineColor;
  /** Order of the line for sorting purposes. */
  order: number;
  /** First departure time. */
  firstTime: string;
  /** Last departure time. */
  lastTime: string;

  constructor(raw: MetroLineRaw) {
    this.id = raw.Id;
    this.name = raw.Name;
    this.content = raw.Content;
    this.enContent = raw.ENContent;
    this.arContent = raw.ARContent;
    this.shortDescription = raw.ShortDescription;
    this.longDescription = raw.LongDescription;
    this.enDescription = raw.ENDescription;
    this.arDescription = raw.ARDescription;
    this.isActive = raw.IsActive;
    this.functionalCode = raw.FunctionalCode;
    this.color = convertColor(raw.Color);
    this.order = raw.Order;
    this.firstTime = raw.FirstTime;
    this.lastTime = raw.LastTime;
  }

  /**
   * Fetches all stations of the line.
   */
  async fetchStations(): Promise<MetroStation[]> {
    return await MetroLine.fetchStationsById(this.id);
  }

  /**
   * Fetches the direction info of the line.
   */
  async fetchDirectionInfo(): Promise<MetroLineDirectionInfo[]> {
    return await MetroLine.fetchDirectionInfoById(this.id);
  }

  /**
   * Fetches the direction info of the given line.
   */
  static async fetchDirectionInfoById(
    lineId: MetroLineId
  ): Promise<MetroLineDirectionInfo[]> {
    const rawData = (
      await getRequest<MetroLineDirectionInfoRaw[]>(
        `/GetDirectionById/${lineId}`
      )
    ).data;

    return rawData.map(convertLineDirectionInfo);
  }

  /**
   * Fetches the direction info of the given line.
   */
  static async fetchStationsById(lineId: MetroLineId): Promise<MetroStation[]> {
    const rawData = (
      await getRequest<MetroStationRaw[]>(`/GetStationById/${lineId}`)
    ).data;

    return rawData.map((station) => new MetroStation(station));
  }

  /**
   * Fetches all metro lines.
   *
   * @example
   * ```ts
   * const lines = await MetroLine.fetchAll();
   * console.log(lines[0].Name); // Note that "Name" does not follow TypeScript naming conventions because it is Raw, as it comes directly from the API
   * ```
   */
  static async fetchAll(): Promise<MetroLine[]> {
    const rawData = (await getRequest<MetroLineRaw[]>("/GetLines")).data;

    return rawData.map((line) => new MetroLine(line));
  }
}

/**
 * Converts raw color data into structured {@link MetroLineColor}.
 *
 * @param raw
 * @returns
 */
export function convertColor(raw: MetroLineColorRaw): MetroLineColor {
  return {
    red: parseInt(raw.Color_R),
    green: parseInt(raw.Color_G),
    blue: parseInt(raw.Color_B),
  };
}

function convertLineDirectionInfo(
  raw: MetroLineDirectionInfoRaw
): MetroLineDirectionInfo {
  return {
    lineId: raw.LineId,
    lineName: raw.LineName,
    directionId: raw.DirectionId,
    directionName: raw.DirectionName,
    directionValue: raw.DirectionValue,
  };
}

/**
 * RGB color representation for a metro line.
 */
export interface MetroLineColor {
  red: number;
  green: number;
  blue: number;
}

/**
 * Raw RGB color structure as returned from the API.
 */
export interface MetroLineColorRaw {
  Color_R: string;
  Color_G: string;
  Color_B: string;
}

/**
 * Raw structure of a metro line object returned from the API.
 */
export interface MetroLineRaw {
  Id: number;
  Name: string;
  Content: string;
  ENContent: string;
  ARContent: string;
  ShortDescription: string;
  LongDescription: string;
  ENDescription: string;
  ARDescription: string;
  IsActive: boolean;
  FunctionalCode: string;
  Color: MetroLineColorRaw;
  Order: number;
  FirstTime: string;
  LastTime: string;
}

/**
 * Raw structure of a metro line direction info returned from the API.
 */
export interface MetroLineDirectionInfoRaw {
  LineId: number;
  LineName: string;
  DirectionId: number;
  DirectionName: string;
  DirectionValue: number;
}

/** Metro line direction info. */
export interface MetroLineDirectionInfo {
  lineId: MetroLineId;
  lineName: string;
  directionId: number;
  directionName: string;
  directionValue: number;
}

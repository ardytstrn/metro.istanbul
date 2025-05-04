import { MetroStationId } from "./stations";

/**
 * Represents a metro station in the API.
 */
export class MetroStation {
  /** Unique identifier of the metro station. */
  id: MetroStationId;
  /** Name of the metro station. */
  name: string;
  /** Identifier of the metro line the station belongs to. */
  lineId: number;
  /** Name of the metro line the station belongs to. */
  lineName: string;
  /** Description of the station. */
  description: string;
  /** Order of the station for sorting purposes. */
  order: number;
  /** Indicates if the station is active. */
  isActive: boolean | null;
  /** Functional code for the station. */
  functionalCode: string;
  /** Detailed information about the station's facilities. */
  detailInfo: MetroStationDetail;

  constructor(raw: MetroStationRaw) {
    this.id = raw.Id;
    this.name = raw.Name;
    this.lineId = raw.LineId;
    this.lineName = raw.LineName;
    this.description = raw.Description;
    this.order = raw.Order;
    this.isActive = raw.IsActive;
    this.functionalCode = raw.FunctionalCode;
    this.detailInfo = convertStationDetail(raw.DetailInfo);
  }
}

/**
 * Converts raw station data into a structured `{@link MetroStationDetail}`.
 *
 * @param raw - The raw detail data for a station.
 * @returns A structured `{@link MetroStationDetail}` object.
 */
export function convertStationDetail(
  raw: MetroStationDetailRaw
): MetroStationDetail {
  return {
    escalator: raw.Escolator,
    lift: raw.Lift,
    babyRoom: raw.BabyRoom,
    wc: raw.WC,
    masjid: raw.Masjid,
    latitude: raw.Latitude,
    longitude: raw.Longitude,
  };
}

/**
 * Raw structure of a metro station entry returned from the API.
 */
export interface MetroStationRaw {
  Id: number;
  Name: string;
  LineId: number;
  LineName: string;
  Description: string;
  Order: number;
  IsActive: boolean | null;
  FunctionalCode: string;
  DetailInfo: MetroStationDetailRaw;
}

/**
 * Represents detailed information about the station's facilities.
 */
export interface MetroStationDetail {
  escalator: number;
  lift: number;
  babyRoom: boolean;
  wc: boolean;
  masjid: boolean;
  latitude: string;
  longitude: string;
}

/**
 * Raw structure of station details as returned from the API.
 */
export interface MetroStationDetailRaw {
  Escolator: number;
  Lift: number;
  BabyRoom: boolean;
  WC: boolean;
  Masjid: boolean;
  Latitude: string;
  Longitude: string;
}

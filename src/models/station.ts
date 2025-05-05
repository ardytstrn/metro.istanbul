import { getRequest, postRequest } from "../api/client";
import { toExtendedLocalISOString } from "../lib/util";
import { DirectionId } from "./directions";
import { MetroLineId } from "./line";
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

  /**
   * Fetches all the stations from the API.
   */
  static async fetchAll(): Promise<MetroStation[]> {
    const rawResponse = (await getRequest<MetroStationRaw[]>("/GetStations"))
      .data;

    return rawResponse.map((rawStation) => new MetroStation(rawStation));
  }

  /**
   * Fetches the timetable of the station.
   *
   * @param stationId
   * @param directionId
   * @param dateTime - Will access the timetable after this time
   */
  static async fetchTimetableById(
    stationId: MetroStationId,
    directionId: DirectionId,
    dateTime: Date = new Date()
  ): Promise<MetroTimetable[]> {
    const rawResponse = (
      await postRequest<MetroTimetableRaw[]>("/GetTimeTable", {
        BoardingStationId: stationId,
        DirectionId: directionId,
        DateTime: toExtendedLocalISOString(dateTime),
      })
    ).data;

    return rawResponse.map(convertTimetable);
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
 * Converts raw timetable data into a structured `{@link MetroTimetable}`.
 *
 * @param raw - The raw detail data for timetables.
 * @returns A structured `{@link MetroTimetable}` object.
 */
export function convertTimetable(raw: MetroTimetableRaw): MetroTimetable {
  return {
    boardingStationId: raw.BoardingStationId,
    boardingStationName: raw.BoardingStationName,
    lineId: raw.LineId,
    lineName: raw.LineName,
    firstStationId: raw.FirstStationId,
    firstStation: raw.FirstStation,
    lastStationId: raw.LastStationId,
    lastStation: raw.LastStation,
    languageText: {
      tr: raw.LanguageText.TR,
      en: raw.LanguageText.EN,
      ar: raw.LanguageText.AR,
    },
    timeInfos: {
      day: raw.TimeInfos.Day,
      dayName: raw.TimeInfos.DayName,
      times: raw.TimeInfos.Times,
    },
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

/**
 * Raw structure of timetable.
 */
export interface MetroTimetableRaw {
  BoardingStationId: number;
  BoardingStationName: string;
  LineId: number;
  LineName: string;
  FirstStationId: number;
  FirstStation: string;
  LastStationId: number;
  LastStation: string;
  LanguageText: {
    TR: string;
    EN: string;
    AR: string;
  };
  TimeInfos: {
    Day: number;
    DayName: string | null;
    Times: string[];
  };
}

export interface MetroTimetable {
  boardingStationId: MetroStationId;
  boardingStationName: string;
  lineId: MetroLineId;
  lineName: string;
  firstStationId: MetroStationId;
  firstStation: string;
  lastStationId: MetroStationId;
  lastStation: string;
  languageText: {
    tr: string;
    en: string;
    ar: string;
  };
  timeInfos: {
    day: number;
    dayName: string | null;
    times: string[];
  };
}

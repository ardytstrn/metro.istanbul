import axios from "axios";
import {
  convertResponse,
  MetroIstanbulResponse,
  MetroIstanbulResponseRaw,
} from "../types";

/**
 * Axios instance configured for Metro Istanbul API.
 *
 * Base URL: https://api.ibb.gov.tr/MetroIstanbul/api/MetroMobile/V2/
 *
 * Timeout: 5000ms
 */
export const apiClient = axios.create({
  baseURL: "https://api.ibb.gov.tr/MetroIstanbul/api/MetroMobile/V2/",
  timeout: 5000,
});

/**
 * Sends a GET request to the specified path and returns a
 * normalized response. (I recommend using classes (i.e. {@link MetroLine})
 * or high-level methods instead.)
 *
 * @template T - The expected type of the data in the response
 * @param path - The relative path of the API endpoint (e.g. "/GetStations")
 * @throws Will throw an error if the response indicates failure
 */
export async function getRequest<T>(
  path: string
): Promise<MetroIstanbulResponse<T>> {
  const rawResponse: MetroIstanbulResponseRaw<T> = (await apiClient.get(path))
    .data;
  const response: MetroIstanbulResponse<T> = convertResponse(rawResponse);

  if (!response.success) {
    throw new Error(response.error?.message);
  } else {
    return response;
  }
}

/**
 * Converts a raw Metro Istanbul API response to a normalized object.
 *
 * @template T - The type of the data payload
 * @param raw - The raw response object returned from the API
 */
export function convertResponse<T>(
  raw: MetroIstanbulResponseRaw<T>
): MetroIstanbulResponse<T> {
  return {
    success: raw.Success,
    error: !raw.Error ? null : convertError(raw.Error),
    data: raw.Data,
  };
}

/**
 * Converts a raw error object from the Metro Istanbul API into a normalized object.
 *
 * @param raw - The raw error object returned from the API.
 */
export function convertError(raw: MetroIstanbulErrorRaw): MetroIstanbulError {
  return {
    id: raw.Id,
    title: raw.Title,
    message: raw.Message,
    trace: raw.Trace,
    helpLink: raw.HelpLink,
    source: raw.Source,
  };
}

/**
 * Normalized API response format returned by the client code.
 *
 * @template T - The type of the data contained in the response.
 */
export interface MetroIstanbulResponse<T> {
  /** Indicates whether the request was succesful. */
  success: boolean;
  /** Error details, if any. */
  error: MetroIstanbulError | null;
  /** The actual response data. */
  data: T;
}

/**
 * Raw API response format directly returned by the Metro Istanbul API.
 *
 * @template T - The type of the data contained in the raw response.
 */
export interface MetroIstanbulResponseRaw<T> {
  /** Indicates whether the request was successful. */
  Success: boolean;
  /** Raw error object if the request failed. */
  Error: MetroIstanbulErrorRaw | null;
  /** Raw data payload. */
  Data: T;
}

/**
 * Normalized structure representing an error from the Metro Istanbul API.
 */
export interface MetroIstanbulError {
  id: number;
  title: string;
  message: string;
  trace: string;
  helpLink: string;
  source: string;
}

/**
 * Raw error object structure as returned by the Metro Istanbul API.
 */
export interface MetroIstanbulErrorRaw {
  Id: number;
  Title: string;
  Message: string;
  Trace: string;
  HelpLink: string;
  Source: string;
}

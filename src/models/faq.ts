import { getRequest } from "../";

/**
 * Represents a frequently asked question (FAQ) in a normalized form.
 */
export class MetroFAQ {
  /** Unique identifier of the question. */
  id: number;
  /** Full question text. */
  question: string;
  /** Answer text for the question. */
  answer: string;
  /** Whether the FAQ is marked as high priority. */
  priority: boolean;
  /** Optional short title version of the question. */
  shortQuestionTitle: string | null;
  /** Language code of the FAQ. */
  language: string;

  constructor(props: MetroFAQRaw) {
    this.id = props.Id;
    this.question = props.Question;
    this.answer = props.Answer;
    this.priority = props.Priority;
    this.shortQuestionTitle = props.ShortQuestionTitle;
    this.language = props.Language;
  }

  /**
   * Fetches all frequently asked questions.
   */
  static async fetchAll(): Promise<MetroFAQ[]> {
    const rawData = (
      await getRequest<MetroFAQRaw[]>("/FrequentlyAskedQuestions")
    ).data;

    return rawData.map((faq) => new MetroFAQ(faq));
  }
}

/**
 * The raw structure of a frequently asked question (FAQ) as returned by the Metro Istanbul API.
 */
export interface MetroFAQRaw {
  Id: number;
  Question: string;
  Answer: string;
  Priority: boolean;
  ShortQuestionTitle: string | null;
  Language: string;
}

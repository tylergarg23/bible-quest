export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  position: number;
};

type QuestionsResponse = {
  questions: QuizQuestion[];
};

export async function getChapterQuestions(
  chapterNumber: number,
): Promise<QuizQuestion[]> {
  const response = await fetch(`/api/chapters/${chapterNumber}/questions`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    const result = await response.json().catch(() => null);

    throw new Error(result?.error ?? "No se pudieron cargar las preguntas");
  }

  const data: QuestionsResponse = await response.json();

  return data.questions;
}

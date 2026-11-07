import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: Request,
  context: {
    params: Promise<{ chapterId: string }>;
  },
) {
  try {
    const { chapterId } = await context.params;
    const chapterNumber = Number(chapterId);

    if (
      !Number.isInteger(chapterNumber) ||
      chapterNumber < 1 ||
      chapterNumber > 28
    ) {
      return NextResponse.json(
        { error: "Número de capítulo inválido" },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Usuario no autenticado" },
        { status: 401 },
      );
    }

    const { data: book, error: bookError } = await supabase
      .from("books")
      .select("id")
      .eq("name", "Hechos")
      .single();

    if (bookError || !book) {
      return NextResponse.json(
        { error: "No se encontró el libro de Hechos" },
        { status: 404 },
      );
    }

    const { data: chapter, error: chapterError } = await supabase
      .from("chapters")
      .select("id")
      .eq("book_id", book.id)
      .eq("number", chapterNumber)
      .single();

    if (chapterError || !chapter) {
      return NextResponse.json(
        { error: "No se encontró el capítulo" },
        { status: 404 },
      );
    }

    const { data, error } = await supabase.rpc("get_chapter_questions", {
      p_chapter_id: chapter.id,
    });

    if (error) {
      console.error("Error al consultar preguntas:", error);

      return NextResponse.json(
        { error: "No se pudieron obtener las preguntas" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { questions: data ?? [] },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("Error al consultar capítulo:", error);

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

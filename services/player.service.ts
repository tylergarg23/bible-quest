import { createClient } from "@/lib/supabase/client";

export async function registerPlayer(name: string, avatar: string) {
  const supabase = createClient();

  const {
    data: { user: existingUser },
    error: sessionError,
  } = await supabase.auth.getUser();

  if (sessionError && sessionError.name !== "AuthSessionMissingError") {
    throw sessionError;
  }

  let user = existingUser;

  if (!user) {
    const { data, error } = await supabase.auth.signInAnonymously();

    if (error || !data.user) {
      throw error ?? new Error("No se pudo crear el jugador");
    }

    user = data.user;
  }

  const { data: player, error: profileError } = await supabase
    .from("players")
    .upsert(
      {
        id: user.id,
        name: name.trim(),
        avatar,
      },
      { onConflict: "id" },
    )
    .select()
    .single();

  if (profileError) {
    throw profileError;
  }

  return player;
}

export async function getCurrentPlayer() {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  const { data: player, error: profileError } = await supabase
    .from("players")
    .select("id, name, avatar")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    throw profileError;
  }

  return player;
}

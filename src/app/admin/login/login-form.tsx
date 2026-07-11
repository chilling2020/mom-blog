"use client";

import { useActionState } from "react";
import { login } from "../actions";

const initialState: { error?: string } = {};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <form
      action={formAction}
      className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-sm"
    >
      <h1 className="font-display text-2xl font-medium text-neutral-950">
        Вход в админку
      </h1>
      <p className="mt-2 text-sm text-neutral-500">
        Мама в Америке — панель управления
      </p>

      {state?.error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <input
        type="password"
        name="password"
        placeholder="Пароль"
        required
        autoFocus
        className="mt-6 w-full rounded-xl border border-neutral-300 px-4 py-3 focus:border-neutral-950 focus:outline-none"
      />

      <button
        type="submit"
        disabled={isPending}
        className="mt-4 w-full rounded-full bg-neutral-950 px-6 py-3 font-medium text-white transition hover:bg-neutral-800 disabled:opacity-50"
      >
        {isPending ? "Проверка…" : "Войти"}
      </button>
    </form>
  );
}

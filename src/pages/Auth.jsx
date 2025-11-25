import { useState } from "react";
import supabase from "../supabaseClient";
import React from "react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (!error) setSent(true);
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white/5 p-8 rounded-xl backdrop-blur border border-white/10">
      <h1 className="text-3xl mb-4">Login</h1>

      {sent ? (
        <p className="text-green-400">Magic link sent to your email.</p>
      ) : (
        <>
          <input
            className="w-full p-3 rounded bg-white/10 mb-4"
            placeholder="Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleLogin} className="w-full p-3 bg-purple-600 rounded">
            Send Magic Link
          </button>
        </>
      )}
    </div>
  );
}

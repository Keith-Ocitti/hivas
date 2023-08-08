"use client";

import Login from "./(authComponents)/Login";
import Signup from "./(authComponents)/Signup";
import { useState } from "react";

export default function Home() {
  const [displayLogin, setDisplayLogin] = useState(true);
  const handleLogin = () => {
    setDisplayLogin((prevState) => !prevState);
  };
  if (displayLogin) {
    return <Login handleLogin={handleLogin} />;
  }
  return <Signup handleLogin={handleLogin} />;
}

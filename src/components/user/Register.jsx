import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";

const Register = () => {
  const auth = getAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      console.log("cofirm !== password");
      return;
    } else {
      return createUserWithEmailAndPassword(auth, email, password);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          className="px-2 py-1 text-white bg-gray-700 border-2 border-gray-900 rounded-lg"
          required
          type="email"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="px-2 py-1 text-white bg-gray-700 border-2 border-gray-900 rounded-lg"
          required
          type="password"
          placeholder="Enter password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="px-2 py-1 text-white bg-gray-700 border-2 border-gray-900 rounded-lg"
          required
          type="password"
          placeholder="Enter confirm password..."
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-gray-600 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

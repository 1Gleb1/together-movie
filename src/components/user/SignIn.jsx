import React, { useRef } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const auth = getAuth();
  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((result) => {
        const user = result.user;
        console.log(user.email, user.displayName);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSignIn} className="flex flex-col gap-4 ">
        <input
          className="px-2 py-1 text-white bg-gray-700 border-2 border-gray-900 rounded-lg"
          required
          type="email"
          placeholder="Enter your email..."
          ref={emailRef}
        />
        <input
          className="px-2 py-1 text-white bg-gray-700 border-2 border-gray-900 rounded-lg"
          required
          type="password"
          placeholder="Enter password..."
          ref={passwordRef}
        />
        <button className="w-full bg-gray-600 py-2 rounded-lg hover:bg-gray-700 transition">
          Login
        </button>
      </form>
    </div>
  );
};

export default SignIn;

import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../util/auth";

function LoginPage(props) {
  const router = useRouter();
  const [pending, setPending] = useState<boolean>(false);
  const auth = useAuth();

  const login = async () => {
    setPending(true);
    try {
      const user = await auth.signIn();
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen bg-background h-page">
      <div className="p-8 shadow rounded text-center bg-white ">
        <h3 className="text-xl mb-4">
          Join a community of developers like you
        </h3>
        {!pending ? (
          <button
            className="bg-primary hover:bg-primary-alt text-white font-bold py-2 px-4 rounded"
            onClick={login}
          >
            Login using Github
          </button>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </div>
  );
}

export default LoginPage;

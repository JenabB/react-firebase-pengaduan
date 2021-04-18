import React, { useState } from "react";
import { auth, provider } from "../firebase";
const Auth = () => {
  const [autho, setAutho] = useState({
    isAuth: false,
    isError: false,
    account: [],
  });

  const { isAuth, account } = autho;
  console.log(account);

  const loginGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        setAutho({
          isAuth: true,
          account: res.additionalUserInfo.profile,
          isError: false,
        });
      })
      .catch((err) => {
        setAutho({
          isError: err,
        });
      });
  };

  const logoutGoogle = () => {
    auth
      .signOut()
      .then(() => {
        setAutho({
          isAuth: false,
          account: [],
        });
      })
      .catch((err) => {
        setAutho({
          isError: err,
        });
      });
  };

  return (
    <div>
      {isAuth ? (
        <div className="shadow p-3 text-center">
          <img
            src={account.picture}
            alt={account.name}
            width="100"
            className="mx-auto"
          />
          <p>{account.name}</p>

          <h1>Pengaduanku</h1>
          <button
            className="bg-red-400 text-white px-2 rounded"
            onClick={logoutGoogle}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <p>Firebase Authentication</p>
          <button onClick={loginGoogle}>Login With Google</button>
        </div>
      )}
    </div>
  );
};

export default Auth;

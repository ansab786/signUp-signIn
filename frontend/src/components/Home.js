import React from "react";

function Home() {
  const userInfo = localStorage.getItem("token");
  const data = JSON.parse(userInfo);
  console.log(data.email);
  return (
    <>
      <h3>Home</h3>
      <h1>{data.name}</h1>
    </>
  );
}

export default Home;

import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";

const Chats = () => {
  return (
    <div className="w-full flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
      </main>
    </div>
  );
};

export default Chats;

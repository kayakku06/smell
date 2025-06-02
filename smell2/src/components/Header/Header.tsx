import React from "react";

export default function Header() {
  return (
    <header className="w-full max-w-screen-xl mx-auto px-4 sm:px-8 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">My App</h1>
        <nav className="flex flex-col items-end">
          <nav className="flex space-x-4">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Contact</a>
          </nav>
          <a href="/post" className="text-blue-600 hover:underline text-sm mt-1">
            投稿はこちら →
          </a>
        </nav>
      </div>
    </header>
  );
}
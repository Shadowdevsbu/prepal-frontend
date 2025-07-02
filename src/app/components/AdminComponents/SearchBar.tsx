"use client";
import { MdSearch } from "react-icons/md";
import React from "react";

interface SearchBarProps {
  placeHolderText: string;
}

export default function SearchBar({ placeHolderText }: SearchBarProps) {
  return (
    <form className="bg-white rounded-full w-5/12 flex items-center h-14 text-black">
      <input
        type="search"
        name="userSearch"
        id="userSearch"
        placeholder={placeHolderText}
        className="w-full h-full outline-none border-none p-4"
      />
      <button
        type="submit"
        className="text-2xl p-2 border-none outline-none shrink-0"
      >
        <MdSearch />
      </button>
    </form>
  );
}

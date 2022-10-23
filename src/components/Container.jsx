import React, { useState } from "react";
import Header from "./Header";
import PokemonsList from "./PokemonsList";

export default function Container() {
  const [searchKey, setSearchKey] = useState('')

  const handleSearch = (newKey) => setSearchKey(newKey)


  return (
    <>
      <Header handleSearch={handleSearch} searchKey={searchKey} />
      <PokemonsList searchKey={searchKey} />
    </>
  );
}

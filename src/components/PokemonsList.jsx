import React, { useState, useEffect } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  ListSubheader,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Avatar
} from "@mui/material";

export default function PokemonsList(props) {
  const [pokemonsList, setPokemonsList] = useState([])
  const [filterPokemonsList, setFilterPokemonsList] = useState([])
  const [openCollapse, setOpenCollapse] = useState(false);
  const { searchKey } = props

  useEffect(() => {

    fetch("https://pokeapi.co/api/v2/pokemon", {
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => {
        data.results.map(pokemon => {
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`, {
            method: "GET"
          })
            .then((response) => response.json()).then(pokemonObj => {
              setFilterPokemonsList(prev => [...prev, pokemonObj]);
              setPokemonsList(prev => [...prev, pokemonObj])
            })
            .catch((error) => { console.error("Error:", error); })
          return 'sucsses'
        })
      })
      .catch((error) => {
        console.error("Error:", error);
      })
  }, []);

  useEffect(() => {
    setFilterPokemonsList(pokemonsList.filter(pokemon => pokemon.name.includes(searchKey)))
  }, [searchKey, pokemonsList])


  const handleCollapse = (id) => {
    openCollapse ? setOpenCollapse(false) : setOpenCollapse(id);

  };

  return (
    <div style={{ paddingTop: "100px" }} >
      {filterPokemonsList.length ? (
        <List component="nav" >
          {filterPokemonsList.map((pokemon) => (
            <div key={pokemon.order}>
              <ListItemButton
                style={{ padding: "10px 10%" }}
                onClick={() => handleCollapse(pokemon.order)}
              >
                <ListItemIcon>
                  <Avatar alt={pokemon.name} src={pokemon.sprites.back_default} />
                </ListItemIcon>
                <ListItemText primary={pokemon.name} />
                {openCollapse === pokemon.url ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={openCollapse === pokemon.order}
                timeout="auto"
                unmountOnExit
              >
                <List
                  sx={{
                    width: "80vw",
                    margin: "auto"
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={
                    <>
                      <ListSubheader
                        component="div"
                        id="nested-list-subheader"
                      >
                        {`Hight: ${pokemon.height} cm`} &emsp;&emsp; {`Weight: ${pokemon.weight} kg`}
                      </ListSubheader>
                      <ListSubheader
                        component="div"
                        id="nested-list-subheader"
                      >
                        Abilities:{pokemon.abilities.map(ability => <span key={ability.ability.name}>&emsp;{ability.ability.name}&emsp;</span>)}
                      </ListSubheader>
                    </>

                  }
                >
                </List>
              </Collapse>
              <Divider />
            </div>
          ))}
        </List>
      ) : (
        <h1 style={{ padding: "40px", textAlign: "center" }}>
          {pokemonsList.length ? '👆 Please insert real Pokémon !!!' : ''}
        </h1>
      )}
    </div>
  );
}

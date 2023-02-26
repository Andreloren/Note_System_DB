import React, { useState } from "react";

import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { searchStyled } from "./SearchStyled";
import { useAppDispatch, useAppSelector } from "../../../store/modules/hooks";
import { buscarRecadosUsuarioAPI } from "../../../store/modules/recados/recadosSlice";
import { Button } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "15ch",
    },
  },
}));

export function SearchBar() {
  const [busca, setBusca] = useState("");

  const dispatch = useAppDispatch();
  const usuarioLogado = useAppSelector((estado) => estado.usuarioLogado);

  const filterHome = () => {
    dispatch(
      buscarRecadosUsuarioAPI({
        usuarioId: Number(usuarioLogado),
        filter: busca,
      })
    );
  };

  return (
    <Box sx={searchStyled}>
      <Toolbar>
        <Search>
          <Button onClick={filterHome}>
            <SearchIcon />
          </Button>
          <StyledInputBase
            placeholder="Pesquisar"
            inputProps={{ "aria-label": "search" }}
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </Search>
      </Toolbar>
    </Box>
  );
}

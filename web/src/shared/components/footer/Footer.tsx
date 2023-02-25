import * as React from "react";
import Box from "@mui/material/Box";
import { SxProps, Link as TextLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { linkStyle } from "../tipos/Tipos";

interface LinkLogProps {
  sx?: SxProps;
  texto: string;
  link: string;
  estilo?: linkStyle;
}

export const Link: React.FC<LinkLogProps> = ({ texto, sx, link, estilo }) => {
  return (
    <Box sx={sx}>
      <TextLink underline={estilo} component={RouterLink} to={link}>
        {texto}
      </TextLink>
    </Box>
  );
};

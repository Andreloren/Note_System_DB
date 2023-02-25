import React from "react";
import { Box, SxProps, Typography } from "@mui/material";
import { textVariant } from "../tipos/Tipos";

interface HeadingProps {
  texto: string;
  tamanho: textVariant;
  sx?: SxProps;
}

export const Heading: React.FC<HeadingProps> = ({ texto, tamanho, sx }) => {
  return (
    <Box sx={sx}>
      <Typography variant={tamanho}>{texto}</Typography>
    </Box>
  );
};

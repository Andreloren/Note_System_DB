import * as React from "react";
import { Button as ButtonLog, Stack, SxProps } from "@mui/material";

import {
  buttonColor,
  buttonSize,
  buttonType,
  buttonVariant,
} from "../tipos/Tipos";

interface ButtonProps {
  variacao: buttonVariant;
  tipoBotao: buttonType;
  texto: string;
  cor: buttonColor;
  tamanho: buttonSize;
  sx?: SxProps;
  iconButton?: React.ReactNode;
  myOnClick: React.MouseEventHandler<HTMLButtonElement>;
  desabilitado?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variacao,
  tipoBotao,
  texto,
  cor,
  tamanho,
  sx,
  iconButton,
  myOnClick,
  desabilitado,
}) => {
  return (
    <Stack direction="row" spacing={2}>
      <ButtonLog
        sx={sx}
        type={tipoBotao}
        variant={variacao}
        startIcon={iconButton}
        color={cor}
        size={tamanho}
        onClick={myOnClick}
        disabled={desabilitado}
      >
        {texto}
      </ButtonLog>
    </Stack>
  );
};

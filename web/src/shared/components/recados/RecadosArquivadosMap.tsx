import React, { useState } from "react";

import { Box, IconButton, Modal } from "@mui/material";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../store/modules/hooks";

import { Heading } from "../heading/Heading";
import { Recado } from "../../../interfaces";
import { Button } from "../button/Button";
import { gridNotes, paperNotes } from "./RecadosStyled";
import { atualizarRecadoAPI } from "../../../store/modules/recados/recadosSlice";
import { buttonStyledModalExclude, ModalStyled } from "../modal/ModalStyled";

export const RecadosArquivados: React.FC<Recado> = ({
  recadoId,
  detalhamento,
  descricao,
  status,
}) => {
  const [openArchive, setOpenArchive] = useState(false);
  const handleOpenArchive = () => setOpenArchive(true);
  const handleCloseArchive = () => setOpenArchive(false);

  const dispatch = useAppDispatch();
  const usuarioLogado = useAppSelector((estado) => estado.usuarioLogado);

  const handleArchiveRecado = () => {
    dispatch(
      atualizarRecadoAPI({
        usuarioId: Number(usuarioLogado),
        recado: {
          recadoId,
          status: "ativo",
          detalhamento,
          descricao,
        },
      })
    );
    handleCloseArchive();
  };

  return (
    <>
      <Grid sx={gridNotes} lg={3} md={5} sm={6} xs={14}>
        <Paper elevation={3} sx={paperNotes}>
          <Card>
            <CardContent>
              <Typography variant="h5" align="center">
                Recado
                <IconButton
                  color="info"
                  aria-label="archive"
                  onClick={handleOpenArchive}
                >
                  <UnarchiveIcon />
                </IconButton>
              </Typography>

              <Typography sx={{ my: 2 }} variant="body1" align="center">
                {detalhamento}
              </Typography>
              <Typography sx={{ my: 2 }} variant="body2" align="center">
                {descricao}
              </Typography>
              <Typography variant="body2" align="center">
                {status}
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Grid>

      <Modal
        open={openArchive}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyled}>
          <Heading
            texto="Deseja desarquivar o Recado?"
            tamanho="h5"
            sx={{ color: "#069dad", display: "flex", justifyContent: "center" }}
          />

          <Grid container sx={{ justifyContent: "center" }}>
            <Button
              texto="Confirmar"
              tipoBotao="button"
              cor="success"
              tamanho="small"
              variacao="contained"
              myOnClick={handleArchiveRecado}
              sx={buttonStyledModalExclude}
            ></Button>
            <Button
              texto="Cancelar"
              tipoBotao="button"
              cor="error"
              tamanho="small"
              variacao="contained"
              myOnClick={handleCloseArchive}
              sx={buttonStyledModalExclude}
            ></Button>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

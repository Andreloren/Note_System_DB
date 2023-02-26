import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Grid, IconButton, Modal, Paper, Typography } from "@mui/material";
import UnarchiveIcon from "@mui/icons-material/Unarchive";

import { Button } from "../../shared/components/button/Button";
import { Heading } from "../../shared/components/heading/Heading";
import { InputNote } from "../../shared/components/recados/RecadosInput";
import {
  boxHeadingStyledNote,
  boxStyledNote,
  buttonStyledArchive,
  buttonStyledNote,
  gridNote,
  paperStyledNote,
} from "../../shared/components/recados/RecadosStyled";
import { Recados } from "../../shared/components/recados/RecadosMap";
import { status } from "../../shared/components/tipos/Tipos";
import {
  ModalAlert,
  ModalArchive,
} from "../../shared/components/modal/ModalStyled";
import { RecadosArquivados } from "../../shared/components/recados/RecadosArquivadosMap";
import { SearchBar } from "../../shared/components/search/SearchBar";

import { useAppDispatch, useAppSelector } from "../../store/modules/hooks";
import { limparUsuarioLogado } from "../../store/modules/usuarioLogado/usuarioLogadoSlice";
import {
  adicionarRecadoAPI,
  buscarRecados,
  buscarRecadosUsuarioAPI,
  deletarTodos,
} from "../../store/modules/recados/recadosSlice";
import { selecionarUsuariosPorCpf } from "../../store/modules/usuarios/usuariosSlice";

export const Home: React.FC = () => {
  const [descricao, setDescricao] = useState("");
  const [descricaoValido, setDescricaoValido] = useState(false);

  const [detalhamento, setDetalhamento] = useState("");
  const [detalhamentoValido, setDetalhamentoValido] = useState(false);

  const [openArchiveModal, setOpenArchiveModal] = useState(false);
  const handleOpenModal = () => setOpenArchiveModal(true);
  const handleCloseModal = () => setOpenArchiveModal(false);

  const [alert, setAlert] = useState(false);
  const handleOpenAlert = () => setAlert(true);
  const handleCloseAlert = () => setAlert(false);

  const navigate = useNavigate();

  const usuarioLogado = useAppSelector((estado) => estado.usuarioLogado);
  const usuarioPorCpf = useAppSelector((estado) =>
    selecionarUsuariosPorCpf(estado, usuarioLogado)
  );

  const dispatch = useAppDispatch();

  const recados = useAppSelector(buscarRecados);

  useEffect(() => {
    const navigateLogin = () => {
      navigate("/");
    };
    if (!usuarioLogado) {
      navigateLogin();
    }
  }, [usuarioLogado, navigate]);

  useEffect(() => {
    dispatch(
      buscarRecadosUsuarioAPI({
        usuarioId: Number(usuarioLogado),
      })
    );
  }, [dispatch, usuarioLogado]);

  useEffect(() => {
    if (!descricao) {
      setDescricaoValido(false);
    } else {
      setDescricaoValido(true);
    }
    if (!detalhamento) {
      setDetalhamentoValido(false);
    } else {
      setDetalhamentoValido(true);
    }
  }, [descricao, detalhamento]);

  const handleChangeRecados = (value: string, key: React.ReactNode) => {
    switch (key) {
      case "Detalhamento":
        setDetalhamento(value);
        break;

      case "Descrição":
        setDescricao(value);
        break;

      default:
        break;
    }
  };

  const limparCamposRecado = () => {
    setDescricao("");
    setDetalhamento("");
  };

  const handleCadastrarRecados = () => {
    if (!descricao || !detalhamento) {
      handleOpenAlert();
      return;
    }

    dispatch(
      adicionarRecadoAPI({
        usuarioId: Number(usuarioLogado),
        recado: {
          detalhamento,
          descricao,
        },
      })
    );

    limparCamposRecado();
  };

  const handleLogout = () => {
    dispatch(limparUsuarioLogado());
    dispatch(deletarTodos());
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <Box sx={boxStyledNote}>
        <Heading
          texto="PÁGINA DE RECADOS"
          tamanho="h4"
          sx={{ mb: 2, color: "#069dad" }}
        />
        <SearchBar />
      </Box>

      <Box>
        <Grid container md={12} xs={8}>
          <Heading
            texto={`Painel de recados de ${usuarioPorCpf?.nome}`}
            tamanho="h5"
            sx={boxHeadingStyledNote}
          />
        </Grid>
      </Box>
      <Grid container columns={16} sx={gridNote}>
        <Grid md={5} sm={7} xs={12} sx={{ mr: 1 }}>
          <Paper elevation={1} sx={paperStyledNote}>
            <InputNote
              identificacao="standard-helperText"
              placeholder="Detalhamento"
              variante="standard"
              erro={!detalhamentoValido}
              comprimentoTotal={true}
              meuOnChange={handleChangeRecados}
              sizeInput="small"
              valor={detalhamento}
            />
          </Paper>
        </Grid>
        <Grid md={5} sm={7} xs={12} sx={{ mr: 1 }}>
          <Paper elevation={1} sx={paperStyledNote}>
            <InputNote
              identificacao="standard-helperText"
              placeholder="Descrição"
              variante="standard"
              erro={!descricaoValido}
              comprimentoTotal={true}
              meuOnChange={handleChangeRecados}
              sizeInput="small"
              valor={descricao}
            />
          </Paper>
        </Grid>
        <Grid md={2} sm={3} xs={4}>
          <Button
            texto="Salvar"
            tipoBotao="button"
            cor="success"
            tamanho="small"
            variacao="contained"
            myOnClick={handleCadastrarRecados}
            sx={buttonStyledNote}
          ></Button>
        </Grid>

        <Grid md={2} sm={3} xs={4}>
          <Button
            texto="Sair"
            tipoBotao="button"
            cor="error"
            tamanho="small"
            variacao="contained"
            myOnClick={handleLogout}
            sx={buttonStyledNote}
          ></Button>
        </Grid>
      </Grid>
      <IconButton
        color="success"
        aria-label="archive"
        sx={buttonStyledArchive}
        onClick={handleOpenModal}
      >
        <UnarchiveIcon fontSize="large" />
      </IconButton>

      <div>
        <Modal
          open={openArchiveModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Grid container columns={16} sx={ModalArchive}>
            {recados
              .filter((f) => f.status === "arquivado")
              .map(
                (card: {
                  recadoId: string;
                  status: status;
                  descricao: string;
                  detalhamento: string;
                }) => (
                  <RecadosArquivados
                    key={card.recadoId}
                    recadoId={card.recadoId}
                    status={card.status}
                    descricao={card.descricao}
                    detalhamento={card.detalhamento}
                  />
                )
              )}
          </Grid>
        </Modal>
      </div>

      <div>
        <Modal
          open={alert}
          onClose={handleCloseAlert}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalAlert}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Necessário preencher DETALHAMENTO e DESCRIÇÃO.
            </Typography>
          </Box>
        </Modal>
      </div>

      <Grid container columns={16}>
        {recados
          .filter((f) => f.status === "ativo")
          .map(
            (card: {
              recadoId: string;
              status: status;
              descricao: string;
              detalhamento: string;
            }) => (
              <Recados
                key={card.recadoId}
                recadoId={card.recadoId}
                status={card.status}
                descricao={card.descricao}
                detalhamento={card.detalhamento}
              />
            )
          )}
      </Grid>
    </>
  );
};

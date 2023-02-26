import React, { useEffect, useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import MaskedInput from "react-text-mask";
import { Box, Paper, Snackbar } from "@mui/material";
import DoorBackOutlinedIcon from "@mui/icons-material/DoorBackOutlined";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { Logo } from "../../shared/components/logo/Logo";
import { Heading } from "../../shared/components/heading/Heading";
import {
  boxStyledLog,
  paperStyledLog,
  formBoxStyledLog,
} from "../../shared/components/login/LoginStyled";
import {
  InputSenha,
  InputCadastro,
} from "../../shared/components/inputs/Input";
import { Button } from "../../shared/components/button/Button";
import { buttonStyled } from "../../shared/components/button/ButtonStyled";
import { Link } from "../../shared/components/footer/Footer";
import { FooterStyled } from "../../shared/components/footer/FooterStyled";
import { label } from "../../shared/components/tipos/Tipos";
import { MaskCpf, regexCpf } from "../../shared/components/mascara/Mask";
import { useAppDispatch, useAppSelector } from "../../store/modules/hooks";
import { incluirUsuarioLogado } from "../../store/modules/usuarioLogado/usuarioLogadoSlice";
import {
  buscarUsuariosAPI,
  selecionarUsuarios,
} from "../../store/modules/usuarios/usuariosSlice";

interface UserLog {
  cpf: string;
  senha: string;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Login: React.FC = () => {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  const [mensagemCpf, setMensagemCpf] = useState("");
  const [mensagemSenha, setMensagemSenha] = useState("");
  const [senhaValido, setSenhaValido] = useState(false);
  const [cpfValido, setcpfValido] = useState(false);

  const [openSnackBarSucess, setOpenSnackBarSucess] = useState(false);
  const [openSnackBarError, setOpenSnackBarError] = useState(false);

  const navigate = useNavigate();

  const usuarios = useAppSelector(selecionarUsuarios);
  const dispatch = useAppDispatch();

  const handleChange = (value: string, key: label) => {
    switch (key) {
      case "Digite seu CPF":
        setCpf(value);
        break;

      case "Digite sua senha":
        setSenha(value);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (!cpf || !cpf.match(regexCpf)) {
      setcpfValido(false);
      setMensagemCpf("Favor digitar 11 números.");
    } else {
      setcpfValido(true);
      setMensagemCpf("");
    }
    if (!senha || senha.length < 7) {
      setSenhaValido(false);
      setMensagemSenha("Mínimo de 7 caracteres.");
    } else {
      setSenhaValido(true);
      setMensagemSenha("");
    }
  }, [cpf, senha]);

  useEffect(() => {
    dispatch(buscarUsuariosAPI());
  }, [dispatch]);

  useEffect(() => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");

    if (usuarioLogado) {
      dispatch(incluirUsuarioLogado(usuarioLogado));

      navigate("/home");
    }
  }, [dispatch, navigate]);

  const handleClickSnackBarSucess = () => {
    setOpenSnackBarSucess(true);
  };

  const handleClickSnackBarError = () => {
    setOpenSnackBarError(true);
  };

  const handleCloseSnackBarSucess = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBarSucess(false);
  };

  const handleCloseSnackBarError = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBarError(false);
  };

  const handleClickLogin = () => {
    const buscaUsuario = usuarios.find(
      (usuarioLog) => usuarioLog.cpf === cpf && usuarioLog.senha === senha
    );

    if (!buscaUsuario) {
      handleClickSnackBarError();
      return;
    }

    dispatch(incluirUsuarioLogado(buscaUsuario.usuarioId));
    handleClickSnackBarSucess();
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  return (
    <Box sx={boxStyledLog}>
      <Paper elevation={3} sx={paperStyledLog}>
        <Logo />
        <Heading texto="Note System" tamanho="h4" sx={{ mx: 3, mt: 1 }} />
        <Heading
          texto="Faça login e comece a usar!"
          tamanho="h6"
          sx={{ mx: 3, mt: 1 }}
        />
        <Box sx={formBoxStyledLog}>
          <InputCadastro
            obrigatorio={true}
            error={!cpfValido}
            valor={cpf}
            tipo="text"
            meuOnChange={handleChange}
            alturaInput="medium"
            placeholder="Digite seu CPF"
            textoAjuda={mensagemCpf}
            cor="primary"
            comprimentoInput="40ch"
            identificador="outlined-size-normal"
            propsInput={{
              inputComponent: MaskCpf,
              inputProps: { component: MaskedInput },
            }}
          />
          <InputSenha
            obrigatorio={true}
            error={!senhaValido}
            valor={senha}
            meuOnChange={handleChange}
            cor="primary"
            placeholder="Digite sua senha"
            comprimentoInput="40ch"
            identificador="outlined-adornment-password"
            propsInput={{ maxLength: 10 }}
            texto={mensagemSenha}
          />
          <Button
            iconButton={<DoorBackOutlinedIcon />}
            sx={buttonStyled}
            texto="Entrar na Plataforma"
            tipoBotao="button"
            cor="primary"
            tamanho="medium"
            variacao="contained"
            myOnClick={handleClickLogin}
          ></Button>
          <Link
            sx={FooterStyled}
            link="/cadastro"
            texto="Não possui conta? Crie uma agora!"
            estilo="hover"
          />
        </Box>
      </Paper>

      <Snackbar
        open={openSnackBarError}
        autoHideDuration={1500}
        onClose={handleCloseSnackBarError}
      >
        <Alert
          onClose={handleCloseSnackBarError}
          severity="error"
          sx={{ width: "100%" }}
        >
          CPF ou Senha Inválidos!!!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSnackBarSucess}
        autoHideDuration={1500}
        onClose={handleCloseSnackBarSucess}
      >
        <Alert
          onClose={handleCloseSnackBarSucess}
          severity="success"
          sx={{ width: "100%" }}
        >
          Login Efetuado com Sucesso!!!
        </Alert>
      </Snackbar>
    </Box>
  );
};

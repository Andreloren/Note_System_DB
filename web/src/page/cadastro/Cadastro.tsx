import React, { forwardRef, useEffect, useState } from "react";
import { Box, Paper, Snackbar } from "@mui/material";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { useNavigate } from "react-router-dom";

import MaskedInput from "react-text-mask";
import {
  MaskCpf,
  MaskEmail,
  regexNome,
  regexCpf,
  regexEmail,
} from "../../shared/components/mascara/Mask";

import { Heading } from "../../shared/components/heading/Heading";
import { boxStyledLog as boxStyledCad } from "../../shared/components/login/LoginStyled";
import {
  formBoxStyledCad,
  paperStyledCad,
} from "../../shared/components/cadastro/CadastroStyled";
import {
  InputSenha,
  InputCadastro,
} from "../../shared/components/inputs/Input";
import { Button } from "../../shared/components/button/Button";
import { buttonStyled } from "../../shared/components/button/ButtonStyled";
import { Link } from "../../shared/components/footer/Footer";
import { FooterStyled } from "../../shared/components/footer/FooterStyled";
import { label } from "../../shared/components/tipos/Tipos";

import type { NovoUsuario } from "../../interfaces";

import { useAppDispatch, useAppSelector } from "../../store/modules/hooks";
import {
  adicionarUsuarioAPI,
  buscarUsuariosAPI,
  selecionarUsuarios,
} from "../../store/modules/usuarios/usuariosSlice";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Cadastro: React.FC = () => {
  const [nome, setNome] = useState("");
  const [nomeValido, setNomeValido] = useState(false);

  const [cpf, setCpf] = useState("");
  const [cpfValido, setcpfValido] = useState(false);

  const [email, setEmail] = useState("");
  const [emailValido, setEmailValido] = useState(false);

  const [senha, setSenha] = useState("");
  const [repSenha, setRepSenha] = useState("");
  const [senhaValido, setSenhaValido] = useState(false);
  const [senhaRepValido, setSenhaRepValido] = useState(false);

  const [openSnackBarSucess, setOpenSnackBarSucess] = useState(false);
  const [openSnackBarError, setOpenSnackBarError] = useState(false);

  const [mensagemNome, setMensagemNome] = useState("");
  const [mensagemCpf, setMensagemCpf] = useState("");
  const [mensagemEmail, setMensagemEmail] = useState("");
  const [mensagemSenha, setMensagemSenha] = useState("");
  const [mensagemRepSenha, setMensagemRepSenha] = useState("");

  const navigate = useNavigate();

  const usuarios = useAppSelector(selecionarUsuarios);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!nome || !nome.match(regexNome)) {
      setNomeValido(false);
      setMensagemNome("Digite no m??nimo nome e sobrenome.");
    } else {
      setNomeValido(true);
      setMensagemNome("");
    }
    if (!cpf || !cpf.match(regexCpf)) {
      setcpfValido(false);
      setMensagemCpf("Favor digitar 11 n??meros.");
    } else {
      setcpfValido(true);
      setMensagemCpf("");
    }
    if (!email || !email.match(regexEmail)) {
      setEmailValido(false);
      setMensagemEmail("Favor digitar um e-mail v??lido.");
    } else {
      setEmailValido(true);
      setMensagemEmail("");
    }
    if (!senha || senha.length < 7) {
      setSenhaValido(false);
      setMensagemSenha("M??nimo de 7 caracteres.");
    } else {
      setSenhaValido(true);
      setMensagemSenha("");
    }
    if (senha !== repSenha || !repSenha) {
      setSenhaRepValido(false);
      setMensagemRepSenha("Senhas n??o conferem");
    } else {
      setSenhaRepValido(true);
      setMensagemRepSenha("");
    }
  }, [senha, repSenha, email, cpf, nome]);

  useEffect(() => {
    dispatch(buscarUsuariosAPI());
  }, [dispatch]);

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

  const handleChange = (value: string, key: label) => {
    switch (key) {
      case "Nome Completo":
        setNome(value.toUpperCase());
        break;

      case "Digite seu CPF":
        setCpf(value);
        break;

      case "Digite seu E-mail":
        setEmail(value.toLowerCase());
        break;

      case "Digite sua senha":
        setSenha(value.toLowerCase());
        break;

      case "Confirma????o de Senha":
        setRepSenha(value.toLowerCase());
        break;

      default:
        break;
    }
  };

  const limparCampos = () => {
    setNome("");
    setCpf("");
    setEmail("");
    setSenha("");
    setRepSenha("");
  };

  const handleClickCadastrar = () => {
    const novoUsuario: NovoUsuario = {
      nome,
      cpf,
      email,
      senha,
      recados: [],
    };

    const usuarioExistente = usuarios.find(
      (usuario) =>
        usuario.cpf === novoUsuario.cpf || usuario.email === novoUsuario.email
    );

    if (usuarioExistente) {
      handleClickSnackBarError();
      return;
    }

    dispatch(adicionarUsuarioAPI(novoUsuario));
    handleClickSnackBarSucess();
    limparCampos();
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <Box sx={boxStyledCad}>
      <Paper elevation={3} sx={paperStyledCad}>
        <Heading
          texto="Cadastro de Usu??rio"
          tamanho="h4"
          sx={{ mx: 3, mt: 1 }}
        />
        <Box sx={formBoxStyledCad}>
          <InputCadastro
            obrigatorio={true}
            error={!nomeValido}
            alturaInput="small"
            placeholder="Nome Completo"
            valor={nome}
            textoAjuda={mensagemNome}
            cor="primary"
            tipo="text"
            comprimentoInput="40ch"
            identificador="outlined-size-small"
            propsInput={{ maxLength: 33 }}
            meuOnChange={handleChange}
          />

          <InputCadastro
            obrigatorio={true}
            error={!cpfValido}
            alturaInput="small"
            placeholder="Digite seu CPF"
            valor={cpf}
            textoAjuda={mensagemCpf}
            cor="primary"
            tipo="text"
            comprimentoInput="40ch"
            identificador="outlined-size-normal"
            meuOnChange={handleChange}
            propsInput={{
              inputComponent: MaskCpf,
              inputProps: { component: MaskedInput },
            }}
          />

          <InputCadastro
            obrigatorio={true}
            error={!emailValido}
            alturaInput="small"
            placeholder="Digite seu E-mail"
            valor={email}
            textoAjuda={mensagemEmail}
            cor="primary"
            tipo="text"
            comprimentoInput="40ch"
            identificador="outlined-size-normal"
            meuOnChange={handleChange}
            propsInput={{
              inputComponent: MaskEmail,
              inputProps: { component: MaskedInput },
              maxLength: 30,
            }}
          />

          <InputSenha
            obrigatorio={true}
            sizeInput="small"
            valor={senha}
            sizeLabel="small"
            cor="primary"
            placeholder="Digite sua senha"
            comprimentoInput="40ch"
            identificador="outlined-adornment-password"
            meuOnChange={handleChange}
            propsInput={{ maxLength: 10 }}
            error={!senhaValido}
            texto={mensagemSenha}
          />

          <InputSenha
            obrigatorio={true}
            sizeInput="small"
            sizeLabel="small"
            cor="primary"
            valor={repSenha}
            placeholder="Confirma????o de Senha"
            comprimentoInput="40ch"
            identificador="outlined-adornment-password"
            meuOnChange={handleChange}
            propsInput={{ maxLength: 10 }}
            error={!senhaRepValido}
            texto={mensagemRepSenha}
          />
          <Button
            iconButton={<HowToRegOutlinedIcon />}
            sx={buttonStyled}
            texto="Cadastrar Usu??rio"
            tipoBotao="button"
            cor="primary"
            tamanho="medium"
            variacao="contained"
            myOnClick={handleClickCadastrar}
            desabilitado={
              !nomeValido ||
              !cpfValido ||
              !emailValido ||
              !senhaValido ||
              !senhaRepValido
            }
          ></Button>
          <Link
            sx={FooterStyled}
            link="/"
            texto="J?? possui cadastro? Voltar a p??gina de Login!"
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
          Usu??rio j?? cadastrado!!
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
          Cadastro Efetuado com Sucesso!!!
        </Alert>
      </Snackbar>
    </Box>
  );
};

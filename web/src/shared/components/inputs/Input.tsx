import React, { useState, InputHTMLAttributes } from "react";
import {
  Box,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
  InputAdornment,
  TextField,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { inputLabel, inputSize, label, textFieldColor } from "../tipos/Tipos";

//INPUT EMAIL
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: label;
  valor?: string;
  textoAjuda?: React.ReactNode;
  cor: textFieldColor;
  comprimentoInput: string;
  identificador: string;
  meuOnChange: (value: string, key: label) => void;
  error?: boolean;
  obrigatorio?: boolean;
  tipo?: string;
  alturaInput?: inputSize;
  sizeLabel?: inputLabel;
  sizeInput?: inputSize;
  propsInput: object;
  texto?: string;
}

export const InputCadastro: React.FC<InputProps> = ({
  placeholder,
  valor,
  textoAjuda,
  cor,
  comprimentoInput,
  identificador,
  alturaInput,
  meuOnChange,
  error,
  tipo,
  obrigatorio,
  sizeInput,
  sizeLabel,
  propsInput,
  texto,
  ...props
}) => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: comprimentoInput },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          {...props}
          error={error}
          onChange={(ev) => meuOnChange(ev.target.value, placeholder)}
          size={alturaInput}
          helperText={textoAjuda}
          label={placeholder}
          id={identificador}
          value={valor}
          color={cor}
          type={tipo}
          required={obrigatorio}
          InputProps={propsInput}
        />
      </div>
    </Box>
  );
};

//INPUT SENHA
interface State {
  password?: string;
  mostrarSenha?: boolean;
}

export const InputSenha: React.FC<InputProps> = ({
  placeholder,
  cor,
  comprimentoInput,
  identificador,
  sizeInput,
  sizeLabel,
  error,
  meuOnChange,
  valor,
  obrigatorio,
  propsInput,
  texto,
}) => {
  const [values, setValues] = useState<State>({ mostrarSenha: false });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      mostrarSenha: !values.mostrarSenha,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <div>
        <FormControl sx={{ m: 1, width: comprimentoInput }} variant="outlined">
          <InputLabel
            required={obrigatorio}
            error={error}
            htmlFor="outlined-adornment-password"
            size={sizeLabel}
          >
            {placeholder}
          </InputLabel>
          <OutlinedInput
            required={obrigatorio}
            error={error}
            size={sizeInput}
            color={cor}
            id={identificador}
            inputProps={propsInput}
            type={values.mostrarSenha ? "text" : "password"}
            value={valor}
            onChange={(ev) => meuOnChange(ev.target.value, placeholder)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.mostrarSenha ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={placeholder}
          />
          <FormHelperText error={error}>{texto}</FormHelperText>
        </FormControl>
      </div>
    </Box>
  );
};

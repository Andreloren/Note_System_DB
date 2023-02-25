import React from "react";
import MaskedInput from "react-text-mask";
import emailMask from "text-mask-addons/dist/emailMask";

const regexNome = /[A-Z][a-z]* [A-Z][a-z]*/;

const regexCpf = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/;

const regexEmail =
  /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})$/;

const MaskCpf = (props: any) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[
        /[0-9]/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
      ]}
      placeholderChar={"\u2000"}
    />
  );
};

const MaskEmail = (props: any) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={emailMask}
      placeholderChar={"\u2000"}
      maxLength={30}
    />
  );
};

export { MaskCpf, MaskEmail, regexNome, regexCpf, regexEmail };

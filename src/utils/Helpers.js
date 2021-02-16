import { useState, useEffect, useLayoutEffect, useRef } from 'react';

export const validateText = (val = "", minLength = 1, sym) => {
  if (sym) {
    return val.length && val.length <= minLength;
  }

  let re = /^[a-zA-Z]+(([a-zA-Z ])?[' -.][a-zA-Z]*)*$/;
  return (re.test(val) && val.length >= minLength);
}

export const validateEmail = (val) => {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (val?.length) ? re.test(val) : false;
}

export const validatePassword = (pass = "", confirmVal = '', minLength = 6) => {
  let res = (pass.indexOf(" ") === -1 && pass.length >= minLength)

  return (confirmVal.length) ? (res && confirmVal === pass) : res;
}

export const validateDate = (val) => {
  return val.endsWith('M');
}

const useStateWithCallback = (initialState, callback) => {
  const [state, setState] = useState(initialState);

  useEffect(() => callback(state), [state, callback]);

  return [state, setState];
};

const useStateWithCallbackInstant = (initialState, callback) => {
  const [state, setState] = useState(initialState);

  useLayoutEffect(() => callback(state), [state, callback]);

  return [state, setState];
};

const useStateWithCallbackLazy = initialValue => {
  const callbackRef = useRef(null);

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(value);

      callbackRef.current = null;
    }
  }, [value]);

  const setValueWithCallback = (newValue, callback) => {
    callbackRef.current = callback;

    return setValue(newValue);
  };

  return [value, setValueWithCallback];
};

export { useStateWithCallbackInstant, useStateWithCallbackLazy };

export default useStateWithCallback;
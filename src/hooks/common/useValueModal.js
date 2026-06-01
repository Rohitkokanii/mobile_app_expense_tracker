import {useState, useCallback} from 'react';

const useValueModal = InitialValue => {
  const [Visible, setVisible] = useState(InitialValue || false);
  const [Value, setValue] = useState('');
  const onOpen = useCallback(async val => {
    setVisible(true);
    setValue(val);
  }, []);
  const onOpenTimeout = useCallback(async (val, callback, timeout) => {
    setVisible(true);
    setValue(val);
    setTimeout(() => {
      setVisible(false);
      setValue('');
      callback();
    }, timeout || 2000);
  }, []);
  const onClose = useCallback(async () => {
    setVisible(false);
    setValue('');
  }, []);
  const onCloseTimeout = useCallback(async (callback, timeout) => {
    setTimeout(() => {
      setVisible(false);
      setValue('');
      callback();
    }, timeout || 2000);
  }, []);
  const Toggle = useCallback(async () => {
    setVisible(!Visible);
  }, [Visible]);
  return {
    Visible,
    Value,
    setVisible,
    onOpen,
    onClose,
    Toggle,
    onOpenTimeout,
    onCloseTimeout,
  };
};

export default useValueModal;

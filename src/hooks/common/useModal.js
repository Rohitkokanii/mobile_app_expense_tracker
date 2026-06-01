import {useState, useCallback} from 'react';

const useModal = InitialValue => {
  const [Visible, setVisible] = useState(InitialValue || false);
  const onOpen = useCallback(async () => {
    setVisible(true);
  }, []);
  const onOpenTimeout = useCallback(async (callback, timeout) => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      if (callback) callback();
    }, timeout || 2000);
  }, []);
  const onClose = useCallback(async () => {
    setVisible(false);
  }, []);
  const Toggle = useCallback(async () => {
    setVisible(!Visible);
  }, [Visible]);
  return {Visible, setVisible, onOpen, onClose, Toggle, onOpenTimeout};
};

export default useModal;

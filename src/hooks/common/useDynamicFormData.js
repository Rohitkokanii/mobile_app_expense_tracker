import {useState, useCallback, useRef} from 'react';

const useDynamicFormData = (initialFormData, noOfInputs) => {
  const inputRefs = Array.from({length: noOfInputs || 0}, () => useRef());
  const [formData, setFormData] = useState(initialFormData);
  const [formDataError, setFormDataError] = useState({});

  const setNestedValue = (obj, path, value) => {
    const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
    let temp = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      if (temp[keys[i]] === undefined) {
        temp[keys[i]] = isNaN(keys[i + 1]) ? {} : [];
      }
      temp = temp[keys[i]];
    }

    temp[keys[keys.length - 1]] = value;
  };

  const handleInputChange = useCallback((path, value) => {
    setFormData(prevFormData => {
      const newFormData = {...prevFormData};
      setNestedValue(newFormData, path, value);
      return newFormData;
    });
  }, []);

  const handleErrorChange = useCallback((path, value) => {
    setFormDataError(prevFormDataError => {
      const newFormDataError = {...prevFormDataError};
      setNestedValue(newFormDataError, path, value);
      return newFormDataError;
    });
  }, []);

  const addToArray = useCallback((path, value) => {
    setFormData(prevFormData => {
      const newFormData = {...prevFormData};
      const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
      let temp = newFormData;

      for (let i = 0; i < keys.length - 1; i++) {
        temp = temp[keys[i]];
      }

      const lastKey = keys[keys.length - 1];
      if (Array.isArray(temp[lastKey])) {
        temp[lastKey].push(value);
      }
      return newFormData;
    });
  }, []);

  const deleteFromArray = useCallback((path, index) => {
    setFormData(prevFormData => {
      const newFormData = {...prevFormData};
      const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
      let temp = newFormData;

      for (let i = 0; i < keys.length - 1; i++) {
        temp = temp[keys[i]];
      }

      const lastKey = keys[keys.length - 1];
      if (Array.isArray(temp[lastKey])) {
        temp[lastKey].splice(index, 1);
      }

      return newFormData;
    });
  }, []);

  const deleteObject = useCallback(path => {
    setFormData(prevFormData => {
      const newFormData = {...prevFormData};
      const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
      let temp = newFormData;

      for (let i = 0; i < keys.length - 1; i++) {
        temp = temp[keys[i]];
      }

      delete temp[keys[keys.length - 1]];
      return newFormData;
    });
  }, []);

  const emptyArray = useCallback(path => {
    setFormData(prevFormData => {
      const newFormData = {...prevFormData};
      const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
      let temp = newFormData;

      for (let i = 0; i < keys.length - 1; i++) {
        temp = temp[keys[i]];
      }

      const lastKey = keys[keys.length - 1];
      if (Array.isArray(temp[lastKey])) {
        temp[lastKey] = [];
      }

      return newFormData;
    });
  }, []);

  const handleNextFocus = index => {
    if (index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setFormDataError({});
  };

  return {
    formData,
    formDataError,
    handleInputChange,
    handleErrorChange,
    addToArray,
    deleteFromArray,
    deleteObject,
    emptyArray,
    resetForm,
    setFormDataError,
    setFormData,
    inputRefs,
    handleNextFocus,
  };
};

export default useDynamicFormData;

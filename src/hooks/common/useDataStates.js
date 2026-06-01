import {useIsFocused} from '@react-navigation/native';
import {useState, useEffect} from 'react';

const useDataStates = getData => {
  const isFocused = useIsFocused();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (getData && isFocused) {
      getData();
    }
  }, [isFocused]);

  return {
    data,
    setData,
    isLoading,
    setIsLoading,
    isRefreshing,
    setIsRefreshing,
  };
};

export default useDataStates;

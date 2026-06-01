import {useIsFocused} from '@react-navigation/native';
import {useState, useEffect} from 'react';

const useNoPagination = getData => {
  const isFoucued = useIsFocused();
  const [List, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (getData) {
      getData(1);
    }
  }, [isFoucued]);

  return {
    List,
    setList,
    isLoading,
    isRefreshing,
    setIsLoading,
    setIsRefreshing,
  };
};

export default useNoPagination;

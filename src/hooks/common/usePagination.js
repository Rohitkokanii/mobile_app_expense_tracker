import {useIsFocused} from '@react-navigation/native';
import {useState, useEffect} from 'react';

const usePagination = getData => {
  const isFoucued = useIsFocused();
  const [List, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (getData) {
      getData(1);
    }
  }, [isFoucued]);

  return {
    List,
    setList,
    isLoading,
    setIsLoading,
    currentPage,
    setCurrentPage,
    isRefreshing,
    setIsRefreshing,
  };
};

export default usePagination;

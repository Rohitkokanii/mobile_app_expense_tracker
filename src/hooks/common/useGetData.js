import {getApi} from '../../network/getApi';
import useDataStates from './useDataStates';

const useGetData = ({apiName, params}) => {
  const getData = async () => {
    try {
      if (data) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      const Res = await getApi(apiName, params);
      console.log('data', Res);
      if (Res?.data?.code == 200) {
        setData(Res?.data?.data);
      } else {
        setData();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const AllProps = useDataStates(getData);
  const {data, setData, setIsLoading, setIsRefreshing} = AllProps;
  return {
    ...AllProps,
    getData,
  };
};

export default useGetData;

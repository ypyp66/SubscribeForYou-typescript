import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../modules/subscribeSaga';
import * as api from './Api';

const SubscribeService = () => {
  const subscribeState = useSelector((state) => state.subscribes.post);
  const dispatch = useDispatch();
  const totalPrice = useMemo(
    () =>
      subscribeState.reduce((acc, cur) => {
        return acc + cur.price;
      }, 0),
    [subscribeState],
  );

  useEffect(() => {
    console.log('subscribeState', subscribeState);
  }, [subscribeState]);

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  const deleteSubscribe = (id) => {
    api.removeSubscribeData(id).then((status) => {
      if (status === 204) {
        console.log('delete');
        dispatch(getPost());
      }
    });
  };

  return {
    subscribeState,
    totalPrice,
    deleteSubscribe,
  };
};

export default SubscribeService;

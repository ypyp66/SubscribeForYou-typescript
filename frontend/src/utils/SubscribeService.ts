import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../modules/subscribeSaga";
import * as api from "./Api";

export type subscribeStates = {
  id: number;
  i_name: string;
  purchase_day: number;
  price: number;
};

type SubscribeService = {
  subscribeStates: subscribeStates[];
  totalPrice: number;
  deleteSubscribe: (id: number) => void;
};

const SubscribeService = (): SubscribeService => {
  const subscribeStates: subscribeStates[] = useSelector(
    (state: any) => state.subscribes.post,
  );
  const dispatch = useDispatch();
  const totalPrice = useMemo(
    () =>
      subscribeStates.reduce((acc, cur) => {
        return acc + cur.price;
      }, 0),
    [subscribeStates],
  );

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  const deleteSubscribe = (id: number) => {
    api.removeSubscribeData(id).then((status) => {
      if (status === 204) {
        console.log("delete");
        dispatch(getPost());
      }
    });
  };

  return {
    subscribeStates,
    totalPrice,
    deleteSubscribe,
  };
};

export default SubscribeService;

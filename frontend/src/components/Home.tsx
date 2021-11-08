import { subscribeStates } from "utils/SubscribeService";
import SubscribeItem from "./SubscribeItem";

type HomeProps = {
  subscribeStates: subscribeStates[];
  deleteSubscribe: (id: number) => void;
};

const Home = ({ subscribeStates, deleteSubscribe }: HomeProps) => {
  return (
    <div className="h-screen">
      {subscribeStates.length === 0 && (
        <div className="rounded-xl shadow-md bg-white py-5 px-6 mb-3 w-full hover:shadow-lg">
          구독이 없어요😂
        </div>
      )}
      {subscribeStates.length > 0 &&
        subscribeStates.map((data: subscribeStates) => (
          <SubscribeItem
            key={data.id}
            data={data}
            deleteSubscribe={deleteSubscribe}
          />
        ))}
    </div>
  );
};

export default Home;

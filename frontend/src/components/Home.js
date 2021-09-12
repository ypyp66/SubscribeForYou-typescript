import SubscribeItem from './SubscribeItem';

function Home({ subscribeState, deleteSubscribe }) {
  return (
    <div className="h-screen">
      {subscribeState.length === 0 && (
        <div className="rounded-xl shadow-md bg-white py-5 px-6 mb-3 w-full hover:shadow-lg">
          구독이 없어요😂
        </div>
      )}
      {subscribeState.length > 0 &&
        subscribeState.map((data) => (
          <SubscribeItem
            key={data.id}
            data={data}
            deleteSubscribe={deleteSubscribe}
          />
        ))}
    </div>
  );
}

export default Home;

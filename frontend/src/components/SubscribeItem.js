import SubscribeDetail from './SubscribeDeail';

function SubscribeItem({ name, price, purchaseDay }) {
  return (
    <div
      onClick={() => {
        <SubscribeDetail />;
      }}
      className="border rounded-xl bg-gray-100 p-3 mb-3 hover:border-blue-300 w-full focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      <div className="w-3/6 m-0">
        <div>{name}</div>
        <div className="text-xs">
          매달 {purchaseDay}일, {price}원
        </div>
      </div>
    </div>
  );
}

export default SubscribeItem;

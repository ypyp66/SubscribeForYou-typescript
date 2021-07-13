import { useState } from 'react';
import AddSubscribe from './AddSubscribe';
import SubscribeItem from './SubscribeItem';

function Home({ post }) {
  const [filter, setFilter] = useState('pk');

  return (
    <div className="h-screen">
      {post && post.length > 0 ? (
        post.map((d) => (
          <SubscribeItem
            key={d.id}
            id={d.id}
            name={d.i_name}
            price={d.price}
            purchaseDay={d.purchase_day}
          />
        ))
      ) : (
        <div className="rounded-xl shadow-md bg-white py-5 px-6 mb-3 w-full hover:shadow-lg">
          구독이 없어요😂
        </div>
      )}
    </div>
  );
}

export default Home;

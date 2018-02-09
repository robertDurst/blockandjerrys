import React from 'react';
import Browse from './browseCart';
import Checkout from './checkoutCart';
import Paid from './paidCart';

export default ({
  cartTotal,
  generateInvoice,
  payreq,
  paid,
  menu,
  quantities,
  restart,
}) => {
  let curView;
  if (payreq && paid) {
    curView = <Paid restart={restart} />;
  } else if (payreq) {
    curView = <Checkout payreq={payreq} cartTotal={cartTotal} />;
  } else {
    curView = (<Browse
      generateInvoice={generateInvoice}
      cartTotal={cartTotal}
      menu={menu}
      quantities={quantities}
    />);
  }
  return (
    <div className="cart">
      {curView}
    </div>);
};

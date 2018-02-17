import ioClient from 'socket.io-client';

const socket = ioClient('localhost:5000');

const initialState = {
  socket,
  quantities: [0, 0, 0, 0],
  cartTotal: 0,
  name: '',
  address: '',
  phone: '',
  invoice: '',
  paid: false,
  coneCounter: 'loading cones...',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const temp = state.quantities.slice();
      temp[action.i] += 1;
      return {
        ...state,
        quantities: temp,
        cartTotal: (parseFloat(state.cartTotal) + parseFloat(action.price)).toFixed(6),
      };
    }
    case 'INPUT_CHANGE': {
      const { target } = action.event;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const { name } = target;
      return {
        ...state,
        [name]: value,
      };
    }
    case 'CONE_UPDATE':
      return {
        ...state,
        coneCounter: action.coneCount,
      };
    case 'GENERATE_INVOICE':
      state.socket.emit(
        'GENERATE_INVOICE',
        state.cartTotal,
        state.quantities.reduce((x, y) => x + y),
        state.name,
        state.address,
        state.phone,
        action.cones,
      );
      return state;
    case 'RECEIVED_INVOICE':
      return {
        ...state,
        invoice: action.invoice,
      };
    case 'PAID':
      return {
        ...state,
        paid: true,
      };
    case 'RESTART':
      return {
        ...state,
        invoice: '',
        paid: false,
        cartTotal: 0,
        name: '',
        address: '',
        phone: '',
        quantities: [0, 0, 0, 0],
      };
    default:
      return state;
  }
}

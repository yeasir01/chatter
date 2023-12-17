import { propSlice } from './props';
import { socketSlice } from './socket.js';
import { handlerSlice } from './handlers';

const boundStore = (...args) => ({
  ...propSlice(...args),
  ...socketSlice(...args),
  ...handlerSlice(...args)
})

export default boundStore;
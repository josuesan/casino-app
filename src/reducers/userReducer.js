import { types } from '../types/types';

// eslint-disable-next-line import/prefer-default-export
export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        ...action.payload,
        logged: true,
      };

    case types.logout:
      return {
        ...state,
        name: null,
        logged: false,
      };
    case types.spend:
      return {
        ...state,
        balance: action.payload,
      };
    case types.recive:
      return {
        ...state,
        balance: action.payload,
      };
    case types.saveRecord:
      return {
        ...state,
        record: [...state.record, action.payload],
      };

    default:
      return state;
  }
};

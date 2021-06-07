import { useCallback } from "react";
import { decrement, increment } from "../store/counter";
import {
  incrementAsync,
  incrementByAmount,
  incrementIfOdd,
  selectCount,
} from "./../store/counter/counter";
import { useAppDispatch, useAppSelector } from "./redux-hooks";

type CounterOperators = {
  count: number;
  increment: () => void;
  decrement: () => void;
  // calculate: (inputNumber: number) => void;
  incrementAsync: (incr: number) => void;
  incrementIfOdd: (incr: number) => void;
  incrementByAmount: (incr: number) => void;
};

/**
 * Counter custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useCounter = (): Readonly<CounterOperators> => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);

  return {
    count: count,

    increment: useCallback(() => dispatch(increment()), [dispatch]),
    decrement: useCallback(() => dispatch(decrement()), [dispatch]),
    // calculate: useCallback(
    //   (inputNumber: number) => {
    //     dispatch(
    //       calculate({
    //         inputNumber: inputNumber,
    //       })
    //     );
    //   },
    //   [dispatch]
    // ),
    incrementIfOdd: useCallback(
      (incr) => dispatch(incrementIfOdd(incr)),
      [dispatch]
    ),
    incrementAsync: useCallback(
      (incr) => dispatch(incrementAsync(incr)),
      [dispatch]
    ),

    incrementByAmount: useCallback(
      (incr) => dispatch(incrementByAmount(incr)),
      [dispatch]
    ),
  };
};

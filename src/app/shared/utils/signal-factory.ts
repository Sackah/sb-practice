import { signal, WritableSignal } from '@angular/core';
import { ApiSignal } from '../types';

/**
 * @function newSignal - creates a new signal with initial state <T> where T is the response to be expected
 * @returns a new signal with the initial state
 */
export const newSignal = <T>() => {
  return signal<ApiSignal<T>>({
    pending: false,
    error: null,
    data: null,
  });
};

/**
 * @function pendSignal - updates a signal to pending state
 * @param signal - the signal to be updated
 */
export const pendSignal = <T extends object>(
  signal: WritableSignal<ApiSignal<T>>
) => {
  signal.set({
    data: null,
    pending: true,
    error: null,
  });
};

/**
 * @function completeSignal - updates a signal to complete state
 * @param signal - the signal to be updated
 * @param data - the data recieved after api call/ process completes
 */
export const completeSignal = <T extends object>(
  signal: WritableSignal<ApiSignal<T>>,
  data: T
) => {
  signal.set({
    data,
    pending: false,
    error: null,
  });
};

/**
 * @function errorSignal - updates a signal to error state
 * @param signal - the signal to be updated
 * @param error - the error recieved after api call/ process completes
 */
export const errorSignal = <T extends object>(
  signal: WritableSignal<ApiSignal<T>>,
  error: any
) => {
  signal.set({
    data: null,
    pending: false,
    error,
  });
};

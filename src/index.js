import Cycle from '@cycle/core';
import {makeDOMDriver} from '@cycle/dom';
import localStorageDriver from 'cycle-local-storage';
import intent from './intent';
import model from './model';
import view from './view';

Cycle.run(
  ((responses) => view(model(intent(responses)))),
  {
    DOM: makeDOMDriver('#app'),
    Storage: localStorageDriver
  }
);

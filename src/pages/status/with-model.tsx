import { init } from './model';
import { StatusPage } from './component';
import { Core } from '../../core/core';

const run = (core: Core) => {
  init(core);
  return { default: StatusPage };
};

export default run;

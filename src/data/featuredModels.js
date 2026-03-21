import { simulationsData } from './simulationsData';

export const featuredModels = simulationsData.filter(model => 
  ['fourier-series', 'pi-collisions', 'falling-sand'].includes(model.id)
);

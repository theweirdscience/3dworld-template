import { WorldOptions } from './modules/components/world/world.model';

export const worldOptions: WorldOptions = {
    cloudsSpinSpeed: 0.0002,
    startRotation: 6,
    globalLighting: 0x222222,
    circumference: 15,
    pollingInterval: 30000,
    radius: (window.innerHeight/1.5),
    name: 'earth',
    width: window.innerWidth,
    height: window.innerHeight,
    benchmark: true,
    mode: {
        flight: true
    }
};

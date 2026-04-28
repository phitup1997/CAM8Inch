import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  readonly getDeviceName: () => string;
  readonly multiply: (a: number, b: number) => Promise<number>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('MyModule');
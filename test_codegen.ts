
import { codegenNativeComponent } from 'react-native';
import type { CodegenTypes as CT, ViewProps } from 'react-native';
export interface NativeProps extends ViewProps {
  sheetElevation?: CT.WithDefault<CT.Int32, 24>;
}
export default codegenNativeComponent<NativeProps>('RNSFullWindowOverlay', {
  interfaceOnly: true,
});

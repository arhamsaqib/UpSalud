import React from 'react';
import {COLORS} from '../colors';
import {ButtonStandard} from '../core/button';
import {MyText} from '../core/text';
import {SubMenuModal} from './SubMenuModal';

interface Props {
  name?: string;
  visible: boolean;
  onMakeCall?(): void;
  onReceiveCall?(): void;
  onCancelPress?(): void;
}

export const CallModal = (props: Props) => {
  return (
    <SubMenuModal
      onCancelPress={props.onCancelPress}
      enableOutsidePress
      innerContainerStyles={{height: '20%'}}
      mainContainerStyles={{justifyContent: 'flex-end'}}
      modalVisibility={props.visible}>
      <MyText style={{fontWeight: 'bold', fontSize: 15}}>
        Call {props.name}
      </MyText>
      <ButtonStandard
        onPress={props.onMakeCall}
        title="Make a call"
        style={{backgroundColor: COLORS.new_blue}}
      />
      <ButtonStandard
        onPress={props.onReceiveCall}
        title="Receive a call"
        style={{backgroundColor: COLORS.mustard}}
      />
    </SubMenuModal>
  );
};

import React from 'react';
import {COLORS} from '../colors';
import {ButtonStandard} from '../core/button';
import {SubMenuModal} from './SubMenuModal';
import {SubmenuOption} from './SubmenuOption';

interface FRProps {
  onCancelPress?(): void;
  modalVisibility: boolean;
}

export const FamilyRelation = (props: FRProps) => {
  return (
    <SubMenuModal
      modalVisibility={props.modalVisibility}
      onCancelPress={props.onCancelPress}>
      <SubmenuOption title="Father" />
      <SubmenuOption title="Mother" />
      <SubmenuOption title="Sister" />
      <SubmenuOption title="Friend" />
      <SubmenuOption title="Wife" />
      <SubmenuOption title="Husband" />
      <SubmenuOption title="Son" />
      <SubmenuOption title="Daughter" />
      <ButtonStandard
        title="Close"
        onPress={props.onCancelPress}
        style={{backgroundColor: COLORS.danger}}
      />
    </SubMenuModal>
  );
};

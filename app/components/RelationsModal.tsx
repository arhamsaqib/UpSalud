import React from 'react';
import {useState} from 'react';
import {FlatList} from 'react-native';
import {COLORS} from '../colors';
import {ButtonStandard} from '../core/button';
import {SubMenuModal} from './SubMenuModal';
import {SubmenuOption} from './SubmenuOption';

interface FRProps {
  onCancelPress?(): void;
  modalVisibility: boolean;
  onSelect?(relation: string): void;
}

export const FamilyRelation = (props: FRProps) => {
  const [selected, setSelected] = useState('');
  const relations = [
    {
      name: 'father',
    },
    {
      name: 'mother',
    },
    {
      name: 'brother',
    },
    {
      name: 'sister',
    },
    {
      name: 'son',
    },
    {
      name: 'daughter',
    },
    {
      name: 'uncle',
    },
    {
      name: 'aunt',
    },
    {
      name: 'friend',
    },
    {
      name: 'husband',
    },
    {
      name: 'wife',
    },
  ];
  function onRelationSelect(name: string) {
    setSelected(name);
    props.onSelect && props.onSelect(name);
  }
  return (
    <SubMenuModal
      modalVisibility={props.modalVisibility}
      onCancelPress={props.onCancelPress}>
      <FlatList
        data={relations}
        renderItem={({item, index}: any) => (
          <SubmenuOption
            secondary={selected === item.name && true}
            title={item.name}
            onPress={() => onRelationSelect(item.name)}
          />
        )}
      />
      {/* <SubmenuOption title="Father" />
      <SubmenuOption title="Mother" />
      <SubmenuOption title="Sister" />
      <SubmenuOption title="Friend" />
      <SubmenuOption title="Wife" />
      <SubmenuOption title="Husband" />
      <SubmenuOption title="Son" />
      <SubmenuOption title="Daughter" /> */}
      <ButtonStandard
        title="Close"
        onPress={props.onCancelPress}
        style={{backgroundColor: COLORS.danger}}
      />
    </SubMenuModal>
  );
};

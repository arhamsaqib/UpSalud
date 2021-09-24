import React, {FunctionComponent} from 'react';
import {Modal, StyleSheet, View} from 'react-native';

interface ModalView {
  modalVisibility: boolean;
  onCancelPress?(): void;
}

export const SubMenuModal: FunctionComponent<ModalView> = ({
  children,
  modalVisibility,
  onCancelPress,
}) => {
  return (
    <Modal visible={modalVisibility} transparent={true}>
      <View style={styles.modalView1}>
        <View style={styles.modalView2}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView1: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //marginBottom: 20,
  },

  modalView2: {
    backgroundColor: 'white',
    width: '90%',
    // height: 300,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    padding: 10,
  },
});

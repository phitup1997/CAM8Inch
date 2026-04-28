import React from 'react';
import {ModalProps, TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';

type ModalComponent = React.FC<ModalProps> & {
  Text: typeof Text;
  CloseButton: typeof CloseButton;
};

const Modal: ModalComponent = ({children, visible, onRequestClose}) => {
  return (
    <ModalWrapper
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <Container>{children}</Container>
    </ModalWrapper>
  );
};

const Text: React.FC = () => {
  return <ModalText>Modal Text</ModalText>;
};

const CloseButton: React.FC<TouchableOpacityProps> = props => {
  return (
    <ModalCloseButton {...props}>
      <ModalText>Close Button</ModalText>
    </ModalCloseButton>
  );
};

const ModalWrapper = styled.Modal(() => ({
  padding: 20,
  borderRadius: 12,
  overflow: 'hidden',
  justifyContent: 'center',
  alignItems: 'center',
}));

const Container = styled.View(() => ({
  backgroundColor: '#FFFF00',
  padding: 20,
  borderRadius: 12,
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
}));

const ModalText = styled.Text(() => ({
  fontSize: 20,
  fontWeight: 'bold',
  color: '#333',
}));

const ModalCloseButton = styled.TouchableOpacity(() => ({
  fontSize: 20,
  fontWeight: 'bold',
  color: '#333',
}));

Modal.Text = Text;
Modal.CloseButton = CloseButton;

export default Modal;

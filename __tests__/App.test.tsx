import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Modal from '../src/components/compound/Modal';

describe('Modal Component', () => {
  it('renders correctly when visible is true', () => {
    const {getByText} = render(
      <Modal visible={true}>
        <Modal.Text />
      </Modal>,
    );

    expect(getByText('Modal Text')).toBeTruthy();
  });

  it('does not show content when visible is false', () => {
    const {queryByText} = render(
      <Modal visible={false}>
        <Modal.Text />
      </Modal>,
    );

    expect(queryByText('Modal Text')).toBeNull();
  });

  it('calls onRequestClose when the hardware back button (Android) is pressed', () => {
    const onRequestCloseMock = jest.fn();
    const {UNSAFE_getByType} = render(
      <Modal visible={true} onRequestClose={onRequestCloseMock}>
        <Modal.Text />
      </Modal>,
    );

    const modal = UNSAFE_getByType(require('react-native').Modal);
    modal.props.onRequestClose();

    expect(onRequestCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls onPress when the CloseButton is clicked', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <Modal visible={true}>
        <Modal.CloseButton onPress={onPressMock} />
      </Modal>,
    );

    const closeButton = getByText('Close Button');
    fireEvent.press(closeButton);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    const tree = render(
      <Modal visible={true}>
        <Modal.Text />
        <Modal.CloseButton onPress={() => {}} />
      </Modal>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

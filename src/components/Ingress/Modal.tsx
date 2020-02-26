import { observer } from 'mobx-react';
import React from 'react';
import { Button, Form, FormControlProps, Modal } from 'react-bootstrap';
import { Store } from 'store';

export const IngressModal = observer(({ store }: { store: Store }) => {
  const onNameChange: React.ChangeEventHandler<FormControlProps> = e => {
    store.setItemForm(e.target.value || null, null);
  };
  const onTargetChange: React.ChangeEventHandler<FormControlProps> = e => {
    store.setItemForm(null, e.target.value || null);
  };
  return (
    <Modal
      show={store.itemForm.ingress !== null}
      onHide={(): void => store.selectIngress(null, null)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Update ingress</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="text-center">
          <Form.Group>
            <Form.Control
              value={store.itemForm.name}
              type="text"
              placeholder="Name"
              onChange={onNameChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              value={store.itemForm.href}
              type="text"
              placeholder="Link"
              onChange={onTargetChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-danger"
          className="mr-auto"
          onClick={(): void => store.deleteIngress()}
        >
          Delete
        </Button>
        <Button
          variant="link"
          onClick={(): void => store.selectIngress(null, null)}
        >
          Cancel
        </Button>
        <Button
          variant="outline-primary"
          onClick={(): void => store.updateIngress()}
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

import { observer } from 'mobx-react';
import React from 'react';
import { Button, Form, FormControlProps, Modal } from 'react-bootstrap';
import { Store } from 'store';

export const GroupModal = observer(({ store }: { store: Store }) => {
  const onNameChange: React.ChangeEventHandler<FormControlProps> = e => {
    store.updatedGroupName = e.target.value || '';
  };
  return (
    <Modal
      show={store.selectedGroupIndex !== null}
      onHide={(): void => store.selectGroup(null)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Group</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="text-center">
          <Form.Group>
            <Form.Control
              value={store.updatedGroupName}
              type="text"
              placeholder="Name"
              onChange={onNameChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-danger"
          className="mr-auto"
          onClick={(): void => store.deleteGroup()}
        >
          Delete
        </Button>
        <Button variant="link" onClick={(): void => store.selectGroup(null)}>
          Cancel
        </Button>
        <Button
          variant="outline-primary"
          onClick={(): void => store.updateGroup()}
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

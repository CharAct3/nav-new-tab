import { observer } from 'mobx-react';
import React from 'react';
import { Button, Form, FormControlProps, Modal } from 'react-bootstrap';
import { Store } from '../../store';

export const NewGroup = observer(({ store }: { store: Store }) => {
  const [show, setShow] = React.useState(false);
  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

  const onGroupNameChange: React.ChangeEventHandler<FormControlProps> = e => {
    store.newGroupName = e.target.value || '';
  };

  return (
    <>
      <Button variant="link" className="ingress-button" onClick={handleShow}>
        <svg
          height="20"
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="plus"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
          ></path>
        </svg>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              required
              value={store.newGroupName}
              type="text"
              placeholder="Group Name"
              onChange={onGroupNameChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="link" onClick={handleClose}>
            Close
          </Button>
          <Button
            onClick={(): void => {
              store.createNewGroup();
              handleClose();
            }}
            variant="outline-primary"
          >
            Create Group
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

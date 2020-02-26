import { SortableContainer } from 'react-sortable-hoc';
import { Col, Row, Container, Button } from 'react-bootstrap';
import React from 'react';
import { Store, Ingress } from 'store';
import { IngressComponent } from '../Ingress';

type GroupProps = {
  ingresses: Ingress[];
  groupIndex: number;
  store: Store;
  editable: boolean;
};

export const GroupComponent = SortableContainer(
  ({ ingresses, groupIndex, store, editable }: GroupProps) => {
    const group = store.groups[groupIndex];
    return (
      <Row
        key={`nav-${group.name}`}
        className={editable ? 'app-section-edit app-section' : 'app-section'}
      >
        <Col sm={12} md={2} lg={1} className="overflow-hidden">
          <Button
            variant="link"
            className="ingress-button p-0"
            onClick={(): void => store.selectGroup(groupIndex)}
          >
            <p className="mt-2">{group.name}</p>
          </Button>
        </Col>
        <Container className="col">
          <Row className="col ml-0 mr-0">
            {Array.isArray(ingresses)
              ? ingresses.map((ingress, index) => {
                  return (
                    <Col
                      xs={4}
                      md={3}
                      lg={2}
                      className="pl-0 pr-0"
                      key={`ingress-${ingress.name}-${index}`}
                    >
                      <IngressComponent
                        index={index}
                        groupIndex={groupIndex}
                        ingressIndex={index}
                        ingress={ingress}
                        disabled={!editable}
                        editable={editable}
                        store={store}
                      />
                    </Col>
                  );
                })
              : ''}
          </Row>
        </Container>
      </Row>
    );
  }
);

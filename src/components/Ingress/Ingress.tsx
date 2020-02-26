import { SortableElement } from 'react-sortable-hoc';
import React from 'react';
import { Store, Ingress } from 'store';

type IngressProps = {
  ingress: Ingress;
  groupIndex: number;
  ingressIndex: number;
  store: Store;
  editable: boolean;
};

export const IngressComponent = SortableElement(
  ({ ingress, editable, groupIndex, ingressIndex, store }: IngressProps) => {
    const style = editable
      ? 'app-ingress-edit app-ingress text-truncate'
      : 'app-ingress text-truncate';
    return (
      <a
        className={style}
        onClick={(e: React.MouseEvent): void => {
          if (editable) {
            e.preventDefault();
            store.selectIngress(groupIndex, ingressIndex);
          }
        }}
        href={ingress.href}
        rel="noopener noreferrer"
      >
        <img
          className="app-nav-icon"
          height="16"
          width="16"
          src={ingress.img === null ? '/images/icon-72x72.png' : ingress.img}
          alt=""
        />
        <span className="ml-2">{ingress.name}</span>
      </a>
    );
  }
);

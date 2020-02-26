import { observable, action, toJS } from 'mobx';
import { arrayMove, SortEnd } from 'react-sortable-hoc';

export interface Group {
  name: string;
  ingresses: Ingress[];
}

export interface Ingress {
  name: string;
  href: string;
  img: string;
}

export class Store {
  @observable groups: Group[] = [];
  @observable groupIndex: number | null = null;
  @observable ingressIndex: number | null = null;
  @observable itemForm: {
    name: string;
    href: string;
    ingress: Ingress | null;
  } = {
    name: '',
    href: '',
    ingress: null
  };
  @observable newGroupName = '';
  @observable updatedGroupName = '';
  @observable selectedGroupIndex: number | null = null;

  @action.bound
  setGroups(groups: Group[]): void {
    this.groups = groups;
    chrome.storage.local.set({ groups: groups });
  }

  @action.bound
  fetch(): void {
    chrome.storage.local.get('groups', data => {
      this.groups = data.groups;
    });
    chrome.storage.onChanged.addListener(() => {
      chrome.storage.local.get('groups', data => {
        this.groups = data.groups;
      });
    });
  }

  @action.bound
  deleteIngress(): void {
    this.setGroups(
      toJS(this.groups).map((group, index) => {
        if (index === this.groupIndex) {
          group.ingresses = group.ingresses.filter(
            (ingress, index) => this.ingressIndex !== index
          );
        }
        return group;
      })
    );
    this.selectIngress(null, null);
  }

  @action.bound
  selectIngress(groupIndex: number | null, ingressIndex: number | null): void {
    this.groupIndex = groupIndex;
    this.ingressIndex = ingressIndex;
    if (this.groupIndex !== null && this.ingressIndex !== null) {
      const ingress = this.groups[this.groupIndex].ingresses[this.ingressIndex];
      this.itemForm = {
        name: ingress.name,
        href: ingress.href,
        ingress: ingress
      };
    }
    if (this.groupIndex === null && this.ingressIndex === null) {
      this.itemForm = {
        name: '',
        href: '',
        ingress: null
      };
    }
  }

  @action.bound
  updateIngress(): void {
    this.setGroups(
      toJS(this.groups).map((group, index) => {
        if (index === this.groupIndex) {
          group.ingresses = group.ingresses.map((ingress, index) => {
            if (this.ingressIndex === index) {
              ingress.name = this.itemForm.name;
              ingress.href = this.itemForm.href;
            }
            return ingress;
          });
        }
        return group;
      })
    );
    this.selectIngress(null, null);
  }

  @action.bound
  setItemForm(name: string | null, href: string | null): void {
    if (name !== null) {
      this.itemForm.name = name;
    }
    if (href !== null) {
      this.itemForm.href = href;
    }
  }

  @action.bound
  arrange(groupIndex: number) {
    return (sortEnd: SortEnd): void => {
      const newGroups = toJS(this.groups).map((group, index) => {
        if (groupIndex === index) {
          group.ingresses = arrayMove(
            group.ingresses,
            sortEnd.oldIndex,
            sortEnd.newIndex
          );
        }
        return group;
      });
      this.setGroups(newGroups);
    };
  }

  // Group
  @action.bound
  createNewGroup(): void {
    const groupName = this.newGroupName.trim();
    if (groupName !== '') {
      const newGroups = toJS(this.groups);
      newGroups.push({ name: groupName, ingresses: [] });
      this.setGroups(newGroups);
      this.newGroupName = '';
    }
  }

  @action.bound
  deleteGroup(): void {
    if (this.selectedGroupIndex !== null) {
      const newGroups = toJS(this.groups).filter((_, index) => {
        return index !== this.selectedGroupIndex;
      });
      this.setGroups(newGroups);
    }
    this.selectGroup(null);
  }

  @action.bound
  selectGroup(index: number | null): void {
    this.selectedGroupIndex = index;
    if (this.selectedGroupIndex !== null) {
      this.updatedGroupName = this.groups[this.selectedGroupIndex].name;
    }
  }

  @action.bound
  updateGroup(): void {
    if (this.selectedGroupIndex !== null) {
      const newGroups = toJS(this.groups);
      const newName = this.updatedGroupName.trim();
      if (newName !== '') {
        newGroups[this.selectedGroupIndex].name = newName;
        this.setGroups(newGroups);
      }
    }
    this.selectGroup(null);
  }
}

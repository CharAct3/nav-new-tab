import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { observer } from 'mobx-react';
import './styles/App.scss';
import Upload from './components/Upload';
import { GroupComponent, GroupModal, NewGroup } from './components/Group';
import { IngressModal } from './components/Ingress';
import { Group } from 'store';

export const App = observer(({ store }) => {
  const [editable, setEditable] = React.useState<boolean>(false);
  React.useEffect(() => {
    store.fetch();
  }, []);

  const onSave = (): void => {
    const blob = new Blob([JSON.stringify(store.groups)], {
      type: 'text/json'
    });
    const e = document.createEvent('MouseEvents');
    const a = document.createElement('a');
    a.download = 'config.json';
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
    e.initMouseEvent(
      'click',
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    a.dispatchEvent(e);
  };

  return (
    <>
      <Navbar className="nav-bar">
        <Container>
          <Navbar.Text className="nav-title">New Tab</Navbar.Text>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <NewGroup store={store} />
              <Button
                onClick={(): void => setEditable(!editable)}
                variant="link"
                className={
                  editable ? 'ingress-button active-button' : 'ingress-button'
                }
              >
                <span>
                  <svg
                    height="20"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="cog"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"
                    ></path>
                  </svg>
                </span>
              </Button>
              <Button
                onClick={onSave}
                variant="link"
                className="ingress-button"
              >
                <svg
                  height="20"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="file-download"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm76.45 211.36l-96.42 95.7c-6.65 6.61-17.39 6.61-24.04 0l-96.42-95.7C73.42 337.29 80.54 320 94.82 320H160v-80c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v80h65.18c14.28 0 21.4 17.29 11.27 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"
                  ></path>
                </svg>
              </Button>
              <Upload />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <div className="app-main mt-3 mb-3">
          {store.groups.map((group: Group, index: number) => (
            <GroupComponent
              key={`group-${index}`}
              groupIndex={index}
              store={store}
              editable={editable}
              ingresses={group.ingresses}
              onSortEnd={store.arrange(index)}
              distance={1}
              axis="xy"
            />
          ))}
        </div>
        <a />
        <IngressModal store={store} />
        <GroupModal store={store} />
      </Container>
    </>
  );
});

import React, {useState} from 'react';
import clsx from 'clsx';
import {Button} from '../Button';
import {HeaderLogo} from './HeaderLogo';
import {DocsMenu} from './MenuItems/DocsMenu';
import {FileMenu} from './MenuItems/FileMenu';
import {useExport} from 'hooks/useExport';
import {editorModeType, ExamplesType} from 'types';
import {ShareButton} from 'components/ShareButton';
import './Header.styles.scss';
import {Example} from '../Modals/Example';
import Modal from 'react-modal';

interface HeaderProps {
  setInitialContent(content: ExamplesType): void;
  setViewMode: React.Dispatch<React.SetStateAction<editorModeType>>;
  setContactModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  openSharingModal(): void;
  disableSharing: boolean;
}

export const Header = ({
  setInitialContent,
  setViewMode,
  setContactModalVisible,
  openSharingModal,
  disableSharing,
}: HeaderProps) => {
  const [docsMenuVisible, setDocsMenuVisible] = useState<boolean>(false);
  const [fileMenuVisible, setFileMenuVisible] = useState<boolean>(false);
  const [examplePopup, setExampleMenuPopup] = useState<ExamplesType>(null);
  const switchDocsMenu = () => setDocsMenuVisible(!docsMenuVisible);
  const switchFileMenu = () => setFileMenuVisible(!fileMenuVisible);
  const [saveHtml] = useExport();

  if (examplePopup) {
    Modal.setAppElement('#root');
  }

  return (
    <div className="app-header">
      {examplePopup && (
        <Example
          initialContent={examplePopup}
          setInitialContent={setInitialContent}
          closePopup={() => setExampleMenuPopup(null)}
        />
      )}
      <div className={clsx('body', 'd-flex')}>
        <HeaderLogo />
        <ul className="menu">
          <li className="item" onClick={switchFileMenu}>
            <FileMenu
              isMenuOpened={fileMenuVisible}
              setIsMenuOpened={setFileMenuVisible}
              setExampleMenuPopup={setExampleMenuPopup}
            />
          </li>
          <li className="item" onClick={switchDocsMenu}>
            <DocsMenu isMenuOpened={docsMenuVisible} setIsMenuOpened={setDocsMenuVisible} />
          </li>
          <li className="item">
            <button>
              <a
                href="https://jsight.io/products/jsight-validator/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Message validator
              </a>
            </button>
          </li>
          <li className="item">
            <button onClick={() => setContactModalVisible(true)}>Ask a question</button>
          </li>
        </ul>
        <div className="control-buttons">
          <Button title="Report a bug" icon="bug" onClick={() => setContactModalVisible(true)} />
          <div className="group-btn">
            <Button title="Export" icon="download" onClick={saveHtml} />
            <Button title="Preview" icon="preview" onClick={() => setViewMode('doc')} />
          </div>
          <ShareButton disableSharing={disableSharing} openSharingModal={openSharingModal} />
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import Navbar from 'react-bootstrap/Navbar';
import AddIcon from '@material-ui/icons/Add';

import useStores from '../../stores/stores';

export const Header = observer(() => {
  const { windowStore } = useStores();
  const [isHeaderAtTop, setIsHeaderAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY >= 60) {
        setIsHeaderAtTop(false);
      } else {
        setIsHeaderAtTop(true);
      }
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHeaderAtTop]);

  return (
    <>
      <div className="container">
        <Navbar expand="lg" fixed="top" className={classnames('__header', isHeaderAtTop ? '' : 'active')}>
          <div className="__todo__navbar__logo container-fluid">
            <Link to="/">
              <p>{windowStore.width === 'sm' ? 'A' : 'Achieve!'}</p>
            </Link>
            <div className="__todo__navbar__functions d-flex">
              <AddIcon className="functions__add" />
              <form className="form-inline">
                <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-success ml-3" type="submit">
                  {windowStore.width === 'md' || windowStore.width === 'sm' ? 'S' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </Navbar>
      </div>
    </>
  );
});

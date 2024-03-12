import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faEraser,
  faRotateLeft,
  faRotateRight,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import cx from 'classnames';

import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { MENU_ITEMS } from "@/constants";

import { menuItemClick, actionItemClick } from "@/slice/menuSlice";

const Menu = () => {
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem); 
  const dispatch = useDispatch();
  const handleMenuClick = (menuItem) => {
    dispatch(menuItemClick(menuItem))
  }
  const handleActionItemClick = (actionItem) => {
    dispatch(actionItemClick(actionItem))
  }
  return (
    <div className={styles.menuContainer}>
      <div className={cx(styles.iconWrapper , {[styles.active] : MENU_ITEMS.PENCIL === activeMenuItem})}>
        <FontAwesomeIcon icon={faPencil} className={styles.icon} onClick={() => handleMenuClick(MENU_ITEMS.PENCIL)}/>
      </div>
      <div className={cx(styles.iconWrapper , {[styles.active] : MENU_ITEMS.ERAISER === activeMenuItem})}>
        <FontAwesomeIcon icon={faEraser} className={styles.icon} onClick={() => handleMenuClick(MENU_ITEMS.ERAISER)}/>
      </div>
      <div className={styles.iconWrapper}>
        <FontAwesomeIcon icon={faRotateLeft} className={styles.icon} onClick={() => handleActionItemClick(MENU_ITEMS.UNDO)}/>
      </div>
      <div className={styles.iconWrapper}>
        <FontAwesomeIcon icon={faRotateRight} className={styles.icon} onClick={() => handleActionItemClick(MENU_ITEMS.REDO)}/>
      </div>
      <div className={styles.iconWrapper}>
        <FontAwesomeIcon icon={faFileArrowDown} className={styles.icon} onClick={() => handleActionItemClick(MENU_ITEMS.DOWNLOAD)}/>
      </div>
    </div>
  );
};

export default Menu;

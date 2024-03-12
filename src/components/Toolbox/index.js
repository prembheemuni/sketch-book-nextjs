import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";
import { COLORS, MENU_ITEMS } from "@/constants";
import { changeBrushSize, changeColor } from "@/slice/toolboxSlice";
import cx from 'classnames';
const Toolbox = () => {

  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);

  const dispatch = useDispatch();
  const updateBrushSize = (event) => {
    dispatch(changeBrushSize({item : activeMenuItem, size : event.target.value}))
  };
  const handleColorChange = (clr) => {
    dispatch(changeColor({item : activeMenuItem, color : clr }))
  }

  const toolboxValues = useSelector((state) => state.toolbox[activeMenuItem])
  return (
    <div className={styles.toolboxContainer}>
      {activeMenuItem != MENU_ITEMS.ERAISER && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Stroke color</h4>
          <div className={styles.itemContainer}>
            <div
              className={cx(styles.colorBox, {[styles.active] : toolboxValues.color === COLORS.BLACK})}
              style={{ backgroundColor: COLORS.BLACK }}
              onClick={()=>handleColorChange(COLORS.BLACK)}
            />
            <div
              className={cx(styles.colorBox, {[styles.active] : toolboxValues.color === COLORS.RED})}
              style={{ backgroundColor: COLORS.RED }}
              onClick={()=>handleColorChange(COLORS.RED)}

            />
            <div
              className={cx(styles.colorBox, {[styles.active] : toolboxValues.color === COLORS.GREEN})}
              style={{ backgroundColor: COLORS.GREEN }}
              onClick={()=>handleColorChange(COLORS.GREEN)}
            />
            <div
              className={cx(styles.colorBox, {[styles.active] : toolboxValues.color === COLORS.BLUE})}
              style={{ backgroundColor: COLORS.BLUE }}
              onClick={()=>handleColorChange(COLORS.BLUE)}

            />
            <div
              className={cx(styles.colorBox, {[styles.active] : toolboxValues.color === COLORS.ORANGE})}
              style={{ backgroundColor: COLORS.ORANGE }}
              onClick={()=>handleColorChange(COLORS.ORANGE)}

            />
            <div
              className={cx(styles.colorBox, {[styles.active] : toolboxValues.color === COLORS.YELLOW})}
              style={{ backgroundColor: COLORS.YELLOW }}
              onClick={()=>handleColorChange(COLORS.YELLOW)}

            />
          </div>
        </div>
      )}
      <div className={styles.toolItem}>
        <h4 className={styles.toolText}>Brush size</h4>
        <div className={styles.itemContainer}>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            onChange={(e) => updateBrushSize(e)}
            value={toolboxValues.size}
          />
        </div>
      </div>
    </div>
  );
};
export default Toolbox;

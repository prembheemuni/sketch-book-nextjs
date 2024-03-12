import { createSlice } from "@reduxjs/toolkit";
import { MENU_ITEMS, COLORS } from "@/constants";

export const initialState = {
    [MENU_ITEMS.PENCIL] : {
        color : COLORS.BLACK,
        size : 5
    },
    [MENU_ITEMS.ERAISER] : {
        color : COLORS.WHITE,
        size : 8    
    },
    [MENU_ITEMS.UNDO] : {},
    [MENU_ITEMS.REDO] : {},
    [MENU_ITEMS.DOWNLOAD] : {}
}

export const toolboxSlice = createSlice({
    name : 'toolbox',
    initialState,
    reducers : {
        changeColor : (state, action) => {
            state[action.payload.item].color = action.payload.color;
        },
        changeBrushSize : (state, action) => {
            state[action.payload.item].size = action.payload.size;
        },

    }
});


export const {changeColor,changeBrushSize} = toolboxSlice.actions;
export default toolboxSlice.reducer;

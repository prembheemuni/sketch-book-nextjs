import { MENU_ITEMS } from "@/constants";
import { actionItemClick } from "@/slice/menuSlice";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const Board = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const showDraw = useRef(null);
  const {activeMenuItem, actionMenuItem} = useSelector((state) => state.menu);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);
  console.log(color, size);

  useEffect(()=>{
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if(actionMenuItem === MENU_ITEMS.DOWNLOAD){
      const dataUrl = canvas.toDataURL();
      const anchor = document.createElement('a')
      anchor.href = dataUrl;
      anchor.download = 'sketech.png'
      anchor.click();
      console.log(dataUrl,"url")
      dispatch(actionItemClick(null))
    }

  },[actionMenuItem])

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const changeConfig = () => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };
   
    changeConfig();
  }, [color, size]);

  // before browser paint
  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // when mounts
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const beginPath = (x,y) => {
      context.beginPath();
      context.moveTo(x, y)
    }

    const drawLine = (x,y) => {
      context.lineTo(x, y)
      context.stroke();

    }

    const handleMouseDown = (e) => {
      showDraw.current = true;
      beginPath(e.clientX, e.clientY);
     
     
    };
    const handleMouseMove = (e) => {
      if(!showDraw.current) return;
      drawLine(e.clientX, e.clientY);
      
    };

    const handleMouseUp = (e) => {
      showDraw.current = false
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);

    }
  }, []);
  return <canvas ref={canvasRef}></canvas>;
};

export default Board;

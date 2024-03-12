import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import Board from './index';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('Board component', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({
      activeMenuItem: 'pencil',
      actionMenuItem: 'download',
    });
  });

  test('renders canvas element', () => {
    render(<Board />);
    const canvasElement = screen.getByRole('canvas');
    expect(canvasElement).toBeInTheDocument();
  });

  test('dispatches actionItemClick when canvas is clicked', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    render(<Board />);
    const canvasElement = screen.getByRole('canvas');
    fireEvent.mouseDown(canvasElement);
    fireEvent.mouseUp(canvasElement);
    expect(dispatch).toHaveBeenCalledWith(null);
  });

test('updates canvas context when color and size change', () => {
    const contextMock = {
        strokeStyle: '',
        lineWidth: 0,
    };
    const getContextMock = jest.fn().mockReturnValue(contextMock);
    const canvasMock = {
        getContext: getContextMock,
    };
    const canvasRefMock = {
        current: canvasMock,
    };
    useSelector.mockReturnValue({
        color: 'red',
        size: 2,
    });
    render(<Board />);
    expect(getContextMock).toHaveBeenCalled();
    expect(contextMock.strokeStyle).toBe('red');
    expect(contextMock.lineWidth).toBe(2);
});

test('downloads canvas as image when actionMenuItem is "download"', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    const canvasToDataURLMock = jest.fn().mockReturnValue('data:image/png;base64,abc123');
    const anchorMock = {
        href: '',
        download: '',
        click: jest.fn(),
    };
    const createElementMock = jest.fn().mockReturnValue(anchorMock);
    document.createElement = createElementMock;
    HTMLCanvasElement.prototype.toDataURL = canvasToDataURLMock;
    render(<Board />);
    expect(canvasToDataURLMock).toHaveBeenCalled();
    expect(createElementMock).toHaveBeenCalledWith('a');
    expect(anchorMock.href).toBe('data:image/png;base64,abc123');
    expect(anchorMock.download).toBe('sketch.png');
    expect(anchorMock.click).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(null);
});
});
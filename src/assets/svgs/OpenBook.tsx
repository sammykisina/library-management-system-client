import React from "react";

const OpenBook = ({ styles }: { styles: string }) => {
  return (
    <svg
      className={styles}
      viewBox="0 0 60 60"
      // fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="60" height="60" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use href="#image0_605_218" transform="scale(0.03125)" />
        </pattern>
        <image
          id="image0_605_218"
          width="32"
          height="32"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABfgAAAX4BzURP7gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHkSURBVFiF7de/ThRRFAbw39kgBaHABBUxEVHEBBoK7IiS+BK+g42JjYUlHaWNjb2vQGHhxkprEkz8E0hUVBJskEUSr8Xe0dl1WXcgZi32JF9m595zzvfNuXf2nomUkn5ara/s/4OAofaBiDiDCezic0rp+0kIImIYZ3Ea2ymlLy0OKaVfyMQNpIwG6ljBTNm3GzCTY+od8k20+LYFLpec23GIR5jsQjyZfQ675Fk+roACu1joQL6Q5/4W3yKgFhGjEbFUYVnHsBYRs6V1nsVanuvJImIpIkZhHY0KFSiwiVMZmxXiljNXA+tDmMNBhQoUdlFzzYvfx7G5P17DihYnjO//H9FAwEDAQMBAwEBAIWA4Iq5iQ7WDqWpLfYCNzDXM754wcCeldDciprGEK5qtVYELHRJ2O4ze43UJb/A8pbQdEffLscU5vY+HmD+i3VrEY+yVYi5lFPd72WfxiBzzmWO/iAmdy7iTFb/N1zqeppR+RMQEnuAmprP/OzzD7fyENdzCjVzJy/k63qlUvXYyW7inuW+GsIqpjNU8Vss+W73mDbzA9TzwsW3NvpWEjuEaPmElpbRTfoqIGMcDnMMrfC1Nj2jdU+c198DL0OzppvAhpVQm/GcWESOa7dxmDD5O+y3gJwI2VEuPG5bOAAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
};

export default OpenBook;

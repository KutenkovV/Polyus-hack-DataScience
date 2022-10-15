import '../components/video.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { ShapeEditor, ImageLayer, DrawLayer, wrapShape } from 'react-shape-editor';

const RectShape = wrapShape(({ width, height }) => (
  <rect width={width} height={height} fill="rgba(0,0,255,0.3)" />
));

const Video = () => {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/get-image')
      .then((response) => {
        setData(response.data.image);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [shape, setShape] = useState(null);

  const [{ vectorHeight, vectorWidth }, setVectorDimensions] = useState({
    vectorHeight: 0,
    vectorWidth: 0,
  });

  return (
    // <video controls width="100%" height="50%">
    //   <source src="/" type="video/mp4" />
    // </video>

    <ShapeEditor
      style={{ width: '100%', height: 'auto' }}
      vectorWidth={vectorWidth}
      vectorHeight={vectorHeight}>
      <ImageLayer
        // Photo by Sarah Gualtieri on Unsplash
        src={`data:image/png;base64, ${data}`}
        onLoad={({ naturalWidth, naturalHeight }) => {
          setVectorDimensions({
            vectorWidth: naturalWidth,
            vectorHeight: naturalHeight,
          });
        }}
      />
      <DrawLayer
        onDrawStart={() => {
          setShape(null);
        }}
        onAddShape={(newRect) => {
          setShape({ ...newRect });
        }}
      />
      {shape && (
        <RectShape
          shapeId={'id'}
          height={shape.height}
          width={shape.width}
          x={shape.x}
          y={shape.y}
          onChange={(newRect) => {
            setShape({ ...newRect });
          }}
          onDelete={() => {
            setShape(null);
          }}
        />
      )}
    </ShapeEditor>
  );
};

export default Video;

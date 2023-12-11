import React, { useRef, useState } from 'react';
import { fabric } from 'fabric';
import {
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';

const FONTS = [
  'Arial',
  'Helvetica',
  'Verdana',
  'Tahoma',
  'Trebuchet MS',
  'Georgia',
  'Garamond',
  'Times New Roman',
  'Courier New',
  'Lucida Console',
  'Impact',
  'Charter',
  'Futura',
  'Palatino',
  'Book Antiqua',
  'Copperplate',
  'Optima',
  'Geneva',
  'Century Gothic',
  'Gill Sans',
  'Arial Narrow',
  'Arial Black',
  'Avant Garde',
  'Franklin Gothic Medium',
  'Baskerville',
  'Cambria',
  'Didot',
  'Rockwell',
  'Consolas',
  'Monaco',
  'Lucida Sans Unicode',
  'Segoe UI',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Raleway',
  'Source Sans Pro',
  'Roboto Condensed',
  'Ubuntu',
  'Droid Sans',
  'Noto Sans',
  'PT Sans',
  'Oswald',
  'Titillium Web',
  'Poppins',
  'Playfair Display',
  'Merriweather',
  'Alegreya',
  'Crimson Text',
  'Arvo',
  'Exo',
  'Varela Round',
  'Muli',
  'Quicksand',
];

const ImageEditor = ({ setIsLoggedIn }) => {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [text, setText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('none');
  const imageInputRef = useRef(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedFont, setSelectedFont] = useState('Arial');
  const userData = JSON.parse(localStorage.getItem('userData'));

  const onLogout = () => {
    localStorage.setItem('isLoggedIn', false);
    setIsLoggedIn(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImg(file);
    const reader = new FileReader();
    // reader.onload = (e) => {
    //   const img = new Image();
    //   img.onload = () => {
    //     const canvas = new fabric.Canvas(canvasRef.current);

    //     canvas.setDimensions({ width: img.width, height: img.height });
    //     canvas.setBackgroundImage(
    //       img.src,
    //       canvas.renderAll.bind(canvas),
    //       {
    //         scaleX: 1,
    //         scaleY: 1,
    //         originX: 'left',
    //         originY: 'top',
    //       },
    //       () => {
    //         canvas.setWidth(img.width);
    //         canvas.setHeight(img.height);
    //       }
    //     );
    //     setFabricCanvas(canvas);
    //   };
    //   img.src = e.target.result;
    //   img.style.objectFit = 'cover';
    // };

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const fabricImage = new fabric.Image(img);
        const canvas = new fabric.Canvas(canvasRef.current);
        canvas.setDimensions({ width: img.width, height: img.height });

        canvas.setWidth(img.width);
        canvas.setHeight(img.height);
        canvas.add(fabricImage);
        setFabricCanvas(canvas);
      };
      img.src = e.target.result;
      img.style.objectFit = 'cover';
    };

    reader.readAsDataURL(file);
  };
  const addTextOverlay = (text) => {
    if (fabricCanvas) {
      const textObj = new fabric.Text(text, {
        left: 50,
        top: 50,
        fill: '#FFFFFF',
        fontFamily: selectedFont, // Use the selected font here
        fontSize: 40,
      });
      fabricCanvas.add(textObj);
      fabricCanvas.setActiveObject(textObj);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Delete' && fabricCanvas) {
      const activeObject = fabricCanvas.getActiveObject();
      if (activeObject && activeObject.type === 'text') {
        fabricCanvas.remove(activeObject);
      }
    }
  };

  const applyFilter = (filter) => {
    if (fabricCanvas) {
      fabricCanvas.getObjects('image').forEach((img) => {
        img.filters = [];
        if (filter !== 'none') {
          const newFilter = new fabric.Image.filters[filter]();
          img.filters.push(newFilter);
        }
        img.applyFilters();
        fabricCanvas.renderAll();
      });
      setSelectedFilter(filter);
    }
  };

  const applyBorder = () => {
    const border = new fabric.Rect({
      left: img.left,
      top: img.top,
      width: img.width,
      height: img.height,
      stroke: 'red', // Border color
      strokeWidth: 5, // Border width
      selectable: false, // This ensures the border is not selectable
      evented: false, // This ensures the border doesn't trigger events
    });
    fabricCanvas.add(border);
  };

  const downloadImage = () => {
    if (fabricCanvas) {
      const dataURL = fabricCanvas.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 1,
      });
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'edited_image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const onImageSelectClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value); // Update selectedFont state with the chosen font
  };

  return (
    <Container maxW="90vw" onKeyDown={handleKeyPress}>
      <Stack spacing={4}>
        <Heading>Welcome {userData?.username},</Heading>
        <FormControl>
          <Stack direction="row">
            <Button onClick={onImageSelectClick}>Select Image</Button>
            <Button onClick={onLogout}>Logout</Button>
          </Stack>
          <Input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            display={'none'}
            onChange={handleImageUpload}
          />
        </FormControl>
        {selectedImg && (
          <>
            <div
              style={{
                maxWidth: '700px',
                maxHeight: '700px',
                overflow: 'hidden',
              }}
            >
              <canvas ref={canvasRef} />
            </div>

            <Heading>Edit Image</Heading>

            <FormControl>
              <FormLabel>Select Font</FormLabel>
              <Select onChange={handleFontChange}>
                {FONTS.map((font) => (
                  <option value={font}>{font}</option>
                ))}
                {/* Add other font options here */}
              </Select>
            </FormControl>

            <Stack direction="row" justifyContent="center">
              <FormControl>
                <Input
                  type="text"
                  value={text}
                  placeholder="Enter overlay text..."
                  onChange={(e) => setText(e.target.value)}
                />
              </FormControl>
              <Button onClick={() => addTextOverlay(text)}>Add Overlay</Button>
            </Stack>

            <Text>Apply Filter</Text>
            <Stack direction="row" justifyContent="start">
              <Button
                variant={selectedFilter === 'none' ? 'solid' : 'outline'}
                onClick={() => applyFilter('none')}
              >
                No Filter
              </Button>
              <Button
                variant={selectedFilter === 'Grayscale' ? 'solid' : 'outline'}
                onClick={() => applyFilter('Grayscale')}
              >
                Grayscale
              </Button>
              <Button
                variant={selectedFilter === 'Sepia' ? 'solid' : 'outline'}
                onClick={() => applyFilter('Sepia')}
              >
                Sepia
              </Button>
              <Button
                variant={selectedFilter === 'Invert' ? 'solid' : 'outline'}
                onClick={() => applyFilter('Invert')}
              >
                Invert
              </Button>
            </Stack>

            <Button width={'100%'} onClick={downloadImage}>
              Download
            </Button>
          </>
        )}
      </Stack>
    </Container>
  );
};

export default ImageEditor;

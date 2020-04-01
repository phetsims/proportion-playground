/* eslint-disable */
const mipmaps = [
  {
    "width": 146,
    "height": 166,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 73,
    "height": 83,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 37,
    "height": 42,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 19,
    "height": 21,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAVCAYAAACkCdXRAAAAAklEQVR4AewaftIAAALVSURBVKXBS2hcVQCA4f+c+5hHZspkHnaa5E5rIoGmbSxZpBux7UKjXYmiG2vIppQiQpWCKELBoojgompD0Y0Rs1GoVbCKsakVEXWjlOKD6bQhIdPEKM0kcydz5849x6tECYXE1vk+wTpOvpAb2dW7csy29BbfF+7xNzeNfPV9eZINmKwj294czKWrOwhpLdIdubZuYJINCG5y7p3MiZ29jX2Wpe+Ynta98YhLtRYjlY6c/7lkXXz48MIJ1iFYde9g5+6x15bHnI5av2HcBSJKpfILxaJGI9jRp7Etxex89NLp8cTRV0avX+AmBqE7uxz77FtLn25zqv0ycggSj4DIEzW+JBI1KDg+piUwzYDUJn/z3dvVfcl45vKFb6sl1pCExl93TxY6a7uwhiE2CBjQLPKXTNrHtsE0Av6RS690jDzmjnZ3OVtZQ3Z3FWTP1sZDUmYhugeEgMav0HyfjThb3J4P315+gzXki8fqT2dS9TxyOwgTdADeJ9yKnm31odMvb36cVeae3fX9hqFAXYSlMhh9oH/iVrTFGvYDe1eeAsYJyWRC9/CvIgQfcTuy7Y2BJ4c7DhCSlqmytKAt3rCOPFEbJiSlVHFalG1vDhCSIAQtsi1d6HaclFSKFVqUTHgRp1M/KOueMUMLlALfV9x/j5eRl4v2uWZg8H8EAUxNaRZ+g6lZw5NDB/94fqYc+4Hb5Ptw9aqmVtMsVaONL762JyWhQ88mD89eb7sSBKA1/8l1oVTSeJ5GSoEwzB+vzUyXDELXZpbLZz/PTwzt1Tujti5orQQhIUAI/qYUuC7MzWnm5zVKgWkK7Fh8/sxniWfOf1MtGqy6sVT5/dS73thAf3oxnZJ5yxI5pQNZqcDCgqZc1iwuajwPbFsQi0eCQMS/G30veeSlU3MThATrOLCva//xo+6j+VzQF4kEGSlkotnUQTMQN5ZdeeXjidiZ516d+4A1/gQSAhS+cfGIawAAAABJRU5ErkJggg=="
  },
  {
    "width": 10,
    "height": 11,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAYAAABGbhwYAAAAAklEQVR4AewaftIAAAFDSURBVH3BvS8DYQAH4N/73lfbOx161LehqDQGTCKSMpkMTUQkBqvoxsQ/0EFiocQkOuhQsQg2DE3FLhEikWgTl0ZbTenVXe/DDYYSPA+DBumkeBGdp/HCa3Pm7rH6hAYEjodL73KbX1qsqqQnlyu4AwHmtlhm94KTlQ18YTJHvkgo2B93y9F2yaVxsu8eksdo8TaZEwszkrW1r6XhoKG+jyVeDIuwyoB5DIE3QYgFjjWEzlZtZTfmH4aDCrw1CC0B1FL4ye3S5chUdRUOllJbBooAiviNJJrjcFAABP/gWasjPNo1ROsGzeEPtg1U3up0bETvpkqe29Z1rmbb+MY0gWwWUBShkjoRrph4Qruem5YKHEP6GMaWVdUmpRKgKDYMU6hYhN+M7bycETQ4P/DNDvTqYZaB910lz4ennuTaev4Gjk/bMnX/Nee0UAAAAABJRU5ErkJggg=="
  }
];
mipmaps.forEach( mipmap => {
  mipmap.img = new Image();
  window.phetImages.push( mipmap.img ); // make sure it's loaded before the sim launches
  mipmap.img.src = mipmap.url; // trigger the loading of the image for its level
  mipmap.canvas = document.createElement( 'canvas' );
  mipmap.canvas.width = mipmap.width;
  mipmap.canvas.height = mipmap.height;
  const context = mipmap.canvas.getContext( '2d' );
  mipmap.updateCanvas = function() {
    if ( mipmap.img.complete && ( typeof mipmap.img.naturalWidth === 'undefined' || mipmap.img.naturalWidth > 0 ) ) {
      context.drawImage( mipmap.img, 0, 0 );
      delete mipmap.updateCanvas;
    }
  };
} );
export default mipmaps;
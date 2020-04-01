/* eslint-disable */
const mipmaps = [
  {
    "width": 232,
    "height": 227,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 116,
    "height": 114,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 58,
    "height": 57,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 29,
    "height": 29,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 15,
    "height": 15,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAklEQVR4AewaftIAAAJoSURBVH3BW0hTYQAH8P+57JydzV1y081LgoKEl7CnHCpoXgotC9KIwB6KkHwxqgcfC/Ohoih7SSyJqEQMLCtFwoIMS8TABEm6LKSVc2obzk13dr7vdAIXIrPfj8N/OIubaknR2TcJ2VV5azMD/diEx7qBTlOjzao0Lq/wT/eeDLZB4x29/dx4tGRZ8H9+jzgYaJ50JhXnZa9eDAflSkHPz9ptzNidHse1K4G3rQpvKFVZnrJU8ehW54cSh6vOuT0/VGi44e7EyjKX87EzrX6nQZyAbZtitZjl/G/BRw2hlIJclkq6uagoRHm9PSraXNHMhup0b8+gP7gcZHflrp03WA8lgTXDbIpCkgh8/no8DJQbbHbAH8Y/lGGwYkjevVg91gkNrxdpDlQZUGYQMzp9BPvYWZgnV5DlM2AgYTsmdEbERCR7ZWrFrVKeZVQLItfxFyEcwiM8ajpOQFwII6aFz8PL3EtoztiPnNA8Ktx94n1HYR0PgEJDKYvwAzNM3hog1QssvEKMXpnGwanDyPeeQZ8+A25HIZaMTgdLCOuDJjSpg8ldBlgswKePiCfL145A5gF0pBQhDCbALvzm+wjhKDuiAo5k4MMEIC9iKyIlEEhElnzjz7j2e/LrU8eMNqmfFghjX3ks/QSgIB4CPa6m1apzUbl3qXfPZQ6aG13yUIuiqxNJMAVQEI8K4Ivomm21u24GukuaoeGw7rjVyJlAy3mG6rDJKgUmI6JnMOQ//WK86y7WMdigO9XSaCdyk5GhO3RQJAqOrIGd81Hu3ZSQcKHNMz+DDRjEkZWWLgDIVxl4v3s8v7CFPxN58A5TU9FsAAAAAElFTkSuQmCC"
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
/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';

const mipmaps = [
  {
    "width": 193,
    "height": 136,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 97,
    "height": 68,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 49,
    "height": 34,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 25,
    "height": 17,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAARCAYAAAAougcOAAAAAklEQVR4AewaftIAAAKwSURBVK3BT0iTYRwH8O/ved7X550ubYlOIQ0isSxr3Yos8hDooUzNyKA/ly5R1KGswyohPaVm0akogv6BJIjVOzFCAz0ohOE6Gbw6NwqFNjdZbu989zZhBxn+Ke3zISyjuanpxPHj1XW2TbZiWZazGWNWIoJhGGFd16enp6bdd5y3Hner7wexCkKKB+3tdceqqhrsdvtei8XCsYJQKPR7XBtXa44evab5vB4ktba23svNza3xeDwvnE5nI8ciAwMD9ysqKu7a7fYtsiwzrEIIIefl5ZWcrD9Vu7u0dKarq+vrjYaGiztKSm5brdYca4Z138jQ8EsJSUNDQ08dDsd5ImKRSASMMciyDCLCavLz8wuqa2oeSZJUK8nyISKSZgKBCb/f36/5vB5Cwsfe3saygwedPCESiWCBJElQFAVEhL9lGAba2toGP/f1N39wqS4ksa2bC4r3OByXhBA8Go1iAecciqKAiPAvOOcoO1D25YNLdWER9qbzbUNOTk62ruswTRNEBIvFAiLCWthstmykYIWFhfuRMD8/jwVCCBAR1ooYMaRgIi0tHwmccyyQJAnrEQoGZ5BCIsZkJCiKAiEEiAhrFYvF0N39bhgpWNyIzyGJiLAegUDgZ1Nz03OkYHORuQn8B7FYDN/HxlQsgbndbpdhGFiPYDCInp6esbP1p69gCayysvK21+t1Yw1M04SmaVBV9cfbjo7Lms8bxhI4EoxY7Nu2oqJy0zQ3yrIMzjlWYhgG/H4/RkdHMTIy8q1HdV14+frVJyyDkLRr+86S6zevt27IzCzPysoSGRkZEEJAkiQQEUzThK7rCIfDCIVCmJ2d/TE1NdX5sKXtquabjGMFhBTnzpw9crj88DlLenop59xOIIsJkwDo8Xj8VzQS1SY9nr5nj5+0aL7JOP7CH0SbA7JF77x0AAAAAElFTkSuQmCC"
  },
  {
    "width": 13,
    "height": 9,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAJCAYAAADpeqZqAAAAAklEQVR4AewaftIAAAEwSURBVHXBP0sCYRgA8Od53juRW44ThMQW/QSBtejakM0tgU3eJ+jPVLQ4FJRDRNiUi0PQR3AXoclFMLo0znAREnzvOD15nxxuEMnfDyHS7XbP0un0sa7rGUQ0lFJ+GIYfzqfzlNvNNarV6qFpmnnbtq8Qlkaj0atlWUe6rgsiglVhGM4cx3nrdDoFZqbL84sd7Pf796lU6nQ+n6NhGCCEgHXMDPWXeqVsl69hiZLJ5NFiscB4PA5CCPgPIkK+kPchogkhtogINE2DTZRS8D0YDCFCrNiPxWKAiLCJ53k/B8ViAyIkPdmCDZgZXNedNZvNR1ghfClbmWx2bzqdbgdBgEEQgJQSxuMx9Ho9t91u35RKpTtYgRB5rtVOrERin4hMZvYmv5P320rl4WvoMqz5A3LRgV0JV0o2AAAAAElFTkSuQmCC"
  }
];
mipmaps.forEach( mipmap => {
  mipmap.img = new Image();
  const unlock = simLauncher.createLock( mipmap.img );
  mipmap.img.onload = unlock;
  mipmap.img.src = mipmap.url; // trigger the loading of the image for its level
  mipmap.canvas = document.createElement( 'canvas' );
  mipmap.canvas.width = mipmap.width;
  mipmap.canvas.height = mipmap.height;
  const context = mipmap.canvas.getContext( '2d' );
  mipmap.updateCanvas = () => {
    if ( mipmap.img.complete && ( typeof mipmap.img.naturalWidth === 'undefined' || mipmap.img.naturalWidth > 0 ) ) {
      context.drawImage( mipmap.img, 0, 0 );
      delete mipmap.updateCanvas;
    }
  };
} );
export default mipmaps;
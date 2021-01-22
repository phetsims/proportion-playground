/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

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
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAklEQVR4AewaftIAAAJpSURBVH3BW0hTYQAH8P+57Jxd3CW33KYlKEioC3vKoYLmpdCyII0I7KEIyRejevCxMB8qirKXypKISsTA7KJIWFBimRhYJIwuC2nlNrUNp3Oene87ncCFyOz34/AfjuKmWlJ08lVKTlV+zNP/GGvwWNHfYWy0WuTG+QW+b+fRSBtU/pHrTw0HS+aF0Oe3SIKB6lGHrTg/J3Y2GpEqBS0/ZbMyo7e67ZcuhIdbZV5fqrA8Zans0ywFBlOHqk55fT8UqLihrtTKMrfjoSOjfqteHId1g2wxmyTXt8iDhkVnQR5LdZrpuCjEea0tLlrd8ayG6gx/90A4Mh9ht+XFTust+zaCNcFkjEOnIwiG6nE/XK632oBQFP9QhsGCPm37XPVoB1S8VqS5UCRA9iBhZPIAdrFTME0sIDuoR3/KZoxrDEhY1tkq0yuulfIso5ixfBl/EcIh+ppHzc0jEGejSGjh8vE89xyaM3cjdzGACm+veNdeWMcDoFBRyiJ6zwSjvwZw+oHZF0jQkkns/bQfrsAJ9IqZ8NoLMWdw2FlC2CBUixMaGL1lgNkMeD4gmeyZdoSz9uCGswhRMGF25jffSwhH2WEFsKcB78eB+CzWI1ICgSxLuuDYE679jvTy2CGDVddHC4R3X3mEfgKQkQyBFhfTa5XpuNQz17PjPAfVlU5psIVo6kQacQIyklEU4Ivgnmq1ua+Gu0qaoeKw4rDFwBkZWs4zVIM1ligwERN9A9Hw8WdjnbexgsEqXenmRhuRmgws3aKBrKPgSExhp4OUe/NRSDnT5gt4sAqDJLIzNgkAXAoD/3ef7xfW8QdFyvIZmpXCmgAAAABJRU5ErkJggg=="
  }
];
mipmaps.forEach( mipmap => {
  mipmap.img = new Image();
  const unlock = asyncLoader.createLock( mipmap.img );
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
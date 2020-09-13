/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';
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
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAVCAYAAACkCdXRAAAAAklEQVR4AewaftIAAALNSURBVKXBW4hUZQDA8f/3nXNmztwd3d1Z25nVPdimaFtJF3EpS1AhU/DNB7ECe/KhsqeE6KV6KCjCp2J7qYcKDIQkImEo3C6QEUXrtWVx18s2uuvsXD1zzvk+z8oGg7CbNr+fYBG5ra8faGTvf00ZVk4ov5EdG9k/debHIkswWYQfzTxctZetRQiE1tm0lXGAIksQtHHy/bK6aeRtd9naLchIj6r86tRMX8S9BtHYY0WrfHa0dGz3myxCsKDw4J4nKo+/P1JPFjb0RCSWhGuVOfSNE4BGr9hJYNjE65f/Spz76NCV0XdOcAeDkJMvxMpbvjheTa3e8JQDjw5p0rbm9Gwcw+yilXoIZJRAGrSimR6VHdrWlcicqV4sXqCNJFR58ssP68n+9cMFheNohICrJcG8lp0DwyaQBv9qxLp7aw+8cMTJFwZoI518wXTTa3alDMHAgGbe1SuC30qSpdQSfU556zdHaCPrQ2+92rSX9+YSICUoBX+MC+5GM+1sX7nj4/0sMN3c5qeVMDhfhZmTkr4MTHuCu+GacauR33YQ+JSQDKy0w4KZQPDnrOBetOzujflNr+wiJLU0u+iAayXM+uCBfYSkEjJOh3y76xFCEhB0SBnR/oF8YbkUWjXpkGulokFqcIc0gpuTdEIHqKCGu/KZFTJ6Y+y4oXz+F9VCz/0MzQuYlQlXXju6/Y1EbfIU9ypooudG0f51Yq2qG5n+rigJpUaffylZmzyP8kAr/lPrOrr8AzqoIISJKZK/T1yaGjcIVWYmp/tKX32r73t2vTbMVYH2JbcJEJLblAfeLLp+Gt0YA3yEjJE0+6dTE1+/XL34/bjgDr3PfX6w2Tv8ohfNDt0UWHgz6NY/aK8E+MwTMo1tZP2IivySHvvg8NSpT04SEixi1eDm4drGd/f6ifw6ZdjdQsikVp4ntF823bm/Y+OfHb3803vHaHMLXZEQZjznwzsAAAAASUVORK5CYII="
  },
  {
    "width": 10,
    "height": 11,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAYAAABGbhwYAAAAAklEQVR4AewaftIAAAFASURBVH3BPUsCcRwH8O//d56nedhlFiI9DfZgRUS01NIDQVuDRbhFk7tLb8KGsoYaooZ6C9HSkhnSYg0mQkgEhwiFZz6d5911Q4NF9flwaCNunF3TVPiwF+XER/H5BW0YLNJ2LkqiL8I0pb9aSjo5aeWJb7ydlE5HYvjCecO3IckfjC/NCT5VdfMFBNDixR5dcC+K41ummt6/gYXqUjAyPMR3VCvAwztB5xwwGINGvF11+aO+1eMZWMjghMlEjiGVIfyk2pyeyuDaDiw2g5GnAYZaC7/SeXEeFgLA8A+d7P6BseVpIqP1ir+YBrSmTE3vbB8JNTnO62odpolvDA0o30OoZhVn/iLJNdIHKffoZpERC4BRt9FSGOp5mNVHCCYUBzr3CondS4Y23vWrkNo1sQDi3KRVZFf26Fy+i2Vg+QSkHXKzQfoA5wAAAABJRU5ErkJggg=="
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
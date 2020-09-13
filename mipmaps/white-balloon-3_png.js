/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';
const mipmaps = [
  {
    "width": 144,
    "height": 178,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 72,
    "height": 89,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 36,
    "height": 45,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 18,
    "height": 23,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAXCAYAAAAGAx/kAAAAAklEQVR4AewaftIAAAKySURBVKXBW0hTYQAH8P/3fWdnZ811bKAM87JFUA+DYuaDD9IF11sXEsEXnywKeulClAlFYL0F+RB0AS1sgqUWQlh2sciUNJlY0YOwWo55tozBlm4753w7beCDD5Zr/n4EK2wprxCuXLt6qra2dneRzbZFEAQ7pdSCLM55QlVVJaIoXzpu3PDd7+5+gRUIlg0ODp6qqak5W1JSUs4Yw78sLi5qiqJ8OH702JlXb0YmkcWQNTw83FpXV9cuy7LdMAwQQkAIwd+Iosjsdntl/X6vd8Y//T7w/VuYenbsrK72eM5JkmReWlpCMplEKpVCPsrKypy37t7pQBYbev7sutPprEkmk8ihlMJisYAQgnxYrdbNVZVVYepwOHbpug7DMJAjSRIIIciX2Wyme/ftbaCiKDp0XUcOYwyMMfwvm822lRJCrJxz5DDGUAiBsU0CgLTVarVwzkEIQUEIYZRzHieEQBAEMMZQiEwmk6DpVDqEdUqn0/M0FJqbxjoFvwc/0rbWi/cSiYSKAsVisd/NTU236cuR16OxWMyPAv0IBocCobkZiqzRd+864/E4j8fjWIthGJifn4eqqgiHw9+OHDh4BlkMWQMDA1PNzc17ZmdnXZFIBDmMMRBCkMlkwDmHqqpQFAV+vx+JRAJFRUU/fQ8enOzt65tEFsEy97bt7vs9vsFoNOrSdR1/I8sySktLZwf6+09fbGt7imUMy6K/FqLgfKre6/XY7XaHpmnQNA05giBAlmVIkhQhQG/jocMNfU8ef8YKBKvoe/jofEVVZYvJZHIVy/KkqmnhsbGx8fZLlzsCoTkd/6Ors3O8x+ebQ54YVtF64cIJp8vVQhnb4HA4AhMTE5+wBopVVFRUNoqiaJIkyex2u1uQB4ZVfP0083ZjcfHCr4WFse6uezeVaDSMNfwBzxMSOntrQuoAAAAASUVORK5CYII="
  },
  {
    "width": 9,
    "height": 12,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAMCAYAAACwXJejAAAAAklEQVR4AewaftIAAAEiSURBVH3BPUvDUBQA0Pu+ki5WC/0QqljXTi0oCA7+BCeJo1BwLAj+A1dn9w5FNKV00kwiZnKvQSQpBE1TmqEgRIIvvqtDhiLWcwj8GI1GZ6VicZ9xvk4IySFiLKX0giDo1Ov1C+L7/nm5XD4hhFBd12GelDLxPO+UFgoFQ0pJGWPwmxAiV61WjykirlJKgXMOf+Gc17gQItV1ncNijKovFVJKYRGl1ITGH/Ej/GM2m92xZqPxupTPH6RpmtM0DRARkiQB3/cBEYe7W9uHrN/vB4ZhsCiKdhzH0VzXhTAMP1Gpe9M0j3qDwZhApndt7uVXljubtdrlg23ftFotGzIcMm9B0NwQfO3WssbtdtuGOQwyL0/D51Kl4lx1u9ZkOn2HOd/HJnn/SqJVhgAAAABJRU5ErkJggg=="
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
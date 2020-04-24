/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
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
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAiCAYAAAD23jEpAAAAAklEQVR4AewaftIAAAU4SURBVM3BW4hc9R0H8O/v9z9zOXvmkjEazG7O7HoQRDFPi7iV4BZ8KE0hRGIRCkIfCqLSCgqteEOE+FBs2lJDIaGhPhQpySKVUsUXJXZthBhJiNcux+6ZxN3ZXWd2zszZmTPn8usERxhC4kzc3cx+PoR1sMziLSD6GSm+DURjAOUA2Q6A8Q0BqApIVWIpSRx9SIK/2iWnjg1EuEZWsXg7WD1BTPcAdCsxJTEoEYhIHcDHEkZ/t535P2ADEAZkmcUfkqZ+DeJ7icnAeolARD6TMDpsO/OvYAATu8wH6p73cELTVkfS6ZfskvMROgh9WGZRJ039GcwPEJGBjSYSSyz/ljB82i45s7iKW3aZD1bc2pGa6+bQsb1Q+CqfzT5qO84/FL6DZRb3UUKbIaXuI6IkNgN1MI2D+f5CPq9XV1ffxWUsszhe97zXqrXVHehqtlpZxWrq5ptuOqJwFdb4xG8ooR0i5jFcB0SkE9F0Ydu2uwvZ3BtVt9ZGh2UWNa/V/OdKpXInLkNM2zIjI/8iXIE1PnGQNPUkEaXQMTIyAtM0MT8/j1arhc0mUfyphOEvAESN5trva677A7/dRq9cJuvr6fSb5ZXl+wmXscYnniFNPU9ESXTs2bMHe/fuha7ruMT3fVQqFZw8eRKnTp3CZpE4rnmNRmpxaSmNDk0pZAxjTVPaF6lU8qNUMvkX23Fm0aGhh1Ucf4g09RQRJdExNTWF/fv3QymFb6VSKQRBgDNnzmAzEXM+k83hxjCEiHyqp/U3kpr2J7vkXMRlNHRZZnEHaeogEWXQMTo6in379kEphV6O4+Dw4cNot9vYdATksrn/2PP/uweo4moYXaTUEWI20XXgwAHouo5ei4uLOHr0KNrtNq4XUtxCH4wOyyz+BIp/hK7JyUlYloVetVoNx44dQ6PRwHW2HX0wOkhTvyKiNLqmp6fRKwxDnDhxAsvLyxiCPPpgyyyOgWgKXZZlYWxsDL1Onz6N8+fPYzhIQx8M5keIOYeuyclJMDO+5bouZmZmMESMPpgU34UeO3fuRK+zZ88iDEMMjwTogwFMoIdhGOg1OzuLIfPRBwNkoMfx48cxOzsL13VRr9dRLpcxZAvoQwMhjR5zc3OYm5vDzMwMdu/ejWGTWL5EHwxBgCsQEZw7dw5DJQJE8TvogwFpY4sSwYJdmn8VfTCABWxVEr+HAbDE8gW2IBHxJIwOYQCMKHodIoItJAgChH77TbvkfIABsF1yXheRz7EFiAg8z0PDdS8ooscwIEaHxPFxiGCYoihCpVKBV280jRHjBbvkLGFACh3V1dV3CoXCT4loB4bA930sLS1B4jjIZTIvX1j46ne4BowuCcJnRcTFdSQicF0XpVIJijnIZbJ/vFhefBbXSKGr6tY+K+TyIZimRUQjImymIAiwsrKCarWKQn5bPZfJHry4uPAcvgeFHtXa6vs35PLNZqt5t+d5aRHBJcwMIsJ6hWEI3/dRq9VQLpehKYUbCoVPckbml/MXLxzF90S4Asss7m8FwUG37t7R8DwwMwzDQCqVgqZpYGYwM5gZRIQriaIIcRwjjmMEQYC1tTU0m01ckkwkkM/lqul0+rUEq8ftkhNiHQjfYXxs16Gm7z/orXmj3toa1itjGNDTellPpd7WlHrRLjlz2ACEPiyzqMeEp1ut1o/DMLrdb/sj9UYDg1BKIWsYSCQSX2ua9omeTr+FWH5rl5wQG4hwDSyzuANEP4/ieDIIw9Eoim4WiVMg0nCJIAYkJOaqYl5OJZL/JeB9u+T8DZvo/1sGMni5ey4ZAAAAAElFTkSuQmCC"
  },
  {
    "width": 25,
    "height": 17,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAARCAYAAAAougcOAAAAAklEQVR4AewaftIAAAJjSURBVK3BO2gTARgH8P/33SW5tkmbEEotNDS9pVBwcNNFaCGB4qZ2rg4OgqKDdCwFcVJxbkAq6OraTpIsWQRBaKcMadOE1Eeu5hLzuNzjM2KEEvoy9fcjnECfjt8G8xIxzQKIAgjijwZEvonINhw3lS/uZ3EGQh89Hl8i5hUQXSEiBacQkSY82RTbfpIvFQvoiUYiz61O5+aQpr39bhhrCo7Qdf0VMT8l5mkiYpyBiHzENAdWbkXGxqo/qtXPE+Pj9382GqvNVmucgKuxS5PvCD36jP6amO4kEgmOx+MwTRPpdBqVSgXnISJN27LSFcO47nnesE/1FX2qmjk0q3dVdOkzM2vEtJxMJnlxcRFEhFwuB8MwcF5ENOwPaDdGg6GsqqrPSgflLfSwPhWbJeYH0WhUWVhYABGhUCgglUpBRPBPCBgOBT+VDspbOILhU1eIKJpMJqFpGur1OjY2NuC6LgZBQBR9mJivoUvXdfyWzWZhmiYGJQJGHwYwiS7DMGBZFjKZDC6EUEUfFYAPXevr6wiHw7AsCwMTAVzvI/owgBZ6qtUqLkKAg3xh7w36MET28B94ngfP9TZxDBaRLYjgImzbRs00c+Q4j3AMzu/uropgGwMQETSbTRwaRtmvqg/zpWIDx1DQFQmN7rieN++4bpiIQEQ4jYjAtm3UajV02tZOaCR4r/z1ywecgNCjT8Xm6q3my1arPQ+mgN/vh6IoICL85bouHMdBu92G5g+UNS3wfiQw9Dhf2vdwCkKfeCyWaDRby47rXPY8mQBkCACJSIeJDUXhvKZp6YDie5Ev7Xs4h1+69wndUyLRmgAAAABJRU5ErkJggg=="
  },
  {
    "width": 13,
    "height": 9,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAJCAYAAADpeqZqAAAAAklEQVR4AewaftIAAAEXSURBVHXBvU7CUBgG4Pc7h3CUxAj4O8q5AheGMjt16kBMTPQO3Fy9BBY13gEmJg7cAGF0ce0kSTEBhi4oEKCFnvPp0KEh9nkIKV2r3RGJKxBqAEoAlgA+2djn4GvQrpbLbmJMYzaf3xP+aK1fHcdpTiYT2e/3kcXMsTXmLQzDBgHypHpwLrTWLdd1Lz3Pk0opbCMiJWXhulKpvCxWq7NgPPoRRNSs1+vU6/Xg+z7+RYBSO0ukBIBT3/fR7XaRixkAj5ASAJadTgfMjDyWeRwMBm2kBJjfkYOZEUVRPJtOn5BR4E1yu2ZbNtY6UkqBlDEGSZIMN1H8+D2btpBBSB0fHt3E6/UFs90HsFDF4sfebukhGA0ZW34BuOp8aA0RhegAAAAASUVORK5CYII="
  }
];
mipmaps.forEach( mipmap => {
  mipmap.img = new Image();
  const unlock = SimLauncher.createLock( mipmap.img );
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
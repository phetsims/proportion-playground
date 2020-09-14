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
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAABECAYAAACRZ1smAAAAAklEQVR4AewaftIAAAxgSURBVO3BC3Ac5WHA8f+3u/eWTj49Tg+bXftkbIOMjWuTElxC3XSgFBNoGkpbhoRm0gcU0mknaTspbQiZNu0EpklJytDSlilOUyZuGibYPG1wANs8BH4h8EMn78m2rOfdSvfc292vopiM40iy7JONLOn3E0wzrbqRAJZJWALMF4JLpMQv/TFRji5RGaWUMp42st/jfUJ0IuURYK+AfZ0pM8kFRvARSujGNcBvulWtl9q1q+tl7eoFMtBQV/aFKfujOP55uIE6PDXAeHyFXtTyCP7SED47iygcGxSZXcng0U39wi1sFvDDzpTZwzQmOI8SuhEE7nKjy28sLVi/zJm3vKlQdRGlKoOpprglQtZ+QsNdjtL/k12h7v/ZJeEfkymzg2lGcB4kDONGL9hyd+niP76iUNsWy81bjlQ0zid/7gjR/nbH3/Wfr2vp9u8kU+b3mSYE51DCMP6i1Hzj79j6b6wcjl+Jq4X5qAnPoaZvO6FDj+329W19OJkyH+EcatWNZuATUtCRNM29jEFwDrQaxp+WWm6+M996+8XD9auZjoTnUNO3nfC7//SKln7za8mU+QJTKKEbQc8ffbhgrP/tfCQeDBUt/L07d/vT7z6YTJmPcxLBFEroxnqnYd3Xc0v/8HIrfiUXAtXJMy/1VDG8774nhZO/M5ky00wBve2aV4aW3rY2G27gQ0K6NBzbUaxKbvxm0jT/hhNUpkBCN2I18cWP5VZ8/WsDy/+spVi9kAuFVHwUYm2aveCm5Zrr/m6DPCzTlrWTCixatGRD+tIv3DASaeRnCIVcVNfUYPyaJteMpy1rM6NUKpTQjdvLxu3/PbTmgV8aiV+pSEXjQuT4o+Sa19Uo1Zf8WoPbtaY+oryUtqwsZ6hVN+4fXnbH3elYK+PJVzWjBhtWNTlmOW1Zr6hUYFFr23fyK+7/av8ld9U7gXnMBMXoYuwF65f4PPGZeq8zl7ast5ikhG6sLei//q2++VeFOI18VYsSctzLG5TBR1XOQkI3YtH5qzdZV/7rrZmWT2oIhZnE9UXIxT8+Tw1ddH3c6WjJpPs3cRoJ3YiVa1dsPt56Y4tUNCZDqL5wpPe1t1XOUEI3VjvN658b+ti3V+ejrcxYQqEQa1O8hqvXxGXPDfWBwlNpy8oyhoRuBJ1wyzNDy25bWfJXMVmRwgChvjf+Q+UMJHRjrb3oCxv7V/7lQjtYz2xghxoptlw7P1Au31ovu7rTltXBSRK6EXPCLc9klt2+NhtuYLJqRo5S3fXjZw8f3PVVlUlK6MZn7IWf29C/4stNrq+asTRFJEvjUB0AJNiuQHLh87QQuca1UZ8Sua7R3ptPW9ZrjEroxp2lprWPDS35rZXZcAOnI6TLPKuLWM/O7pr9j//b4YO7PssowSQkdGO1vfDzT/Wv+FKTq4U5VUSTXH2ppLFBcqqyA8USZLOCwQwc6hNYtuBCVXfoe05k332v5i66bqEdXWikY4uZiK+cJzrSjW/kSDrY85O9Stn6IZJHkimzyAmC02jVjYS98PPb+lZ8aYGrhTmVXiX52GUekTCTksvDk6+plD0uWDX9b6IObMdz+xhoWsOpgsUhaqwUwjrYEep/46Bw7Y3AxmTKLDIGwQQSuhF04uu291/x4KpyoJZT1Qcln7zCI+hnUnJ52NKukLYFM0GVdQDtyPcYaFyFkC616U78/W/vC/XuaAceSqbMdiZBYwJu+KLvZy6/b1U5UMupgqrkE5d7BP1MSi4PW9oV0rZgpsjWLCFmKtSMHKX68KZdgXTH33WmzB9whjTG0aob92dW3n9zvspgLNe0SaojTEouD1vaFdK2YKbxaXVU7X3ooa7k/i9ylhTGkNCNSwvLvny31byOsaxqkTQ1SCYjX4At7QppWzDTKG4JX9+rdCX3f5EKKIzBrb7k0aHFt8UYQ9QnWbbYYzKKNry2RyFtC2YiTw2QX/pHtOrGCiqgcIqEbnwlu+Lejzv+eYzlyqUSv4/TKjvw+m6FVFYwk7lqAAkLqYDCSRK6ESwtvOMPrMa1jMWoljQ3Sk7Hk7C7Q6FrWDDT2cF6Rl1GBRR+1t/mFt1iMI62VslkHEwK3ukXzAblUCOjVlABhRMSuhEsLfq9W7KxNsZiVEsa6iSnc7xfsPOwwmzh+qqR/lgtFVD4KfHnef1TFzGOSxZJTidfhG3vCGabcnSJSgUUTig1X7d+pG4VY4n6JPV1ktPZ+55C0RXMNlKr0qiAwqiEbqx2Fty0inG0tUhUhQkd7RG8NyiYjZyqRIgKKHzgnpHayzTGUVsnmYhdhtcPCuacHYVRxfnrl9mRBYwlqEpq5zGhI8cEw2XBnLOjJHQjKBt/dTnjaIqCIhiX68FuUzCbacPv5aiAAlxbirREGEdLVDKR/gHBcFkwmwnP9qiAghDXFyILGE84wISO9glmO//Aaw4VUKRv3uJyuIWzdWiAWU0rDjDqCBXQ7NpfCDCBvd2CfAlqYpK6GKgKPzWSg6IrmM38hR5G7aECmlOVCDGB3oKg1xRgQswvWWFIWpolfh8US4LZLlgYZNRLVEBDKD4mKW0Lth0U+DphZYsHCrOemktZyZS5iwpohPUYZ6jswZtHFOaA0v9yBxVSyKfSzDkrWmmQwPHnu6mQgvTKzDkrVel3GfXvVEjRht/LMees+IZ2mcmU+SwVUvyZfWXmnDHNzhA8+N1dTAFF2Ol3A9nDzDkz0d4dKG7hAaaAIuCZQP44cyZPeA7+7v99vTNlvsIUUCRsDWSP5JgzadGBN/Eff+4xpoiSTJlF9dimvcyZFOE5hA/8y+5kynyYKaIwyt/3Yrs/d4Q5pyE9ao5uxte39WGmkMIH/rl64C2HOeNz8yhDWwl3/MO2ZMp8hCmkMCqZMjv85g/eEp7DnJ8nS8dxMi9Se/hJS8sdvYsppnCCb/Dl/6oe2s2ck0gHL7sbd2QntUPvETF//N1kyuxgiimckDTNbwdTTx5kzgecYdzMNrxiF+FShqpDTzzXmTL/inNA4STBw49viA60M9vJQhdO5iWkO4Lqlqg99KNOX6HvDs4RlZOkrcy2er99S37+9XGpaMw6no038gZesROQCOnSlHx6INC34+ZkyjzAOaJyinotnVKDLZ8u1F6mMZvYA7jDryKdDO8T0qXx8AsDoaPP35lMmVs4h1ROkbasA3F3/wKv4eo1dqiRGU96yPy7uLm3QTq8T0iXxsMvDIS7n/5KMmVu4BxTGUMm3b8pTv86u+mXF7q+CDOWm8O1duDZR/mQ6pZoNLcMhLufuTOZMjdwHqiMoz6Qe9af772h1PCL9Z4WYqaRRRN3ZCd4BT4UtLM0JjcfDh7b+rlkynyK80RlHGnLytYrvS+GRlI3FeNXRT1ZBDXEBc/N4mV34RUOApIP1Yz0UHfgie3+obevS6bMPZxHKhNIW1Z/vdr/ZCDXc105qtfbhX0It4hglBIEoXBBkC7S7kXm3sHN7UG6I3xIoBA/vqtYc+CxR839Oz+dtqws55lgElp1o9mpWb7BarvnVzI+G6QLKAgthuKLg1aD8NWAEmLacPPI8iDS7sUr94B0OVW0MEz0yI79/p6n702mzI18RARnYFFr28P5i3//jv54W9Dzsvwc4UdoNSjqPFAjCDUESgjUMAiNc0I64OaRbg7cLNLJIMsDSFliPAHXJda72wofevwJkH+STJlFPkKCM5TQjfXl+LoHhhddv9QKBAGPSREqQgQRahhEAISGUEOACghQAozLK/L/pI30bPDySK+E9AogbSbL5wlqBw84we7nnlezB/86mTLbmQYEZ6lVNx7MJ27/rNW0uj6vCUAyXQU9QXToUDGU2rxdzXZ+I5kyX2AaEVQgoRsxqUW+WTRuuSlbt7R+JFQF0mU6EEqQaPY44Uz3QKD7Ry8ppcG/T6bMdqYhwRRI6EZMwL2FBZ+61qldtjxTo2MLD/A4n4QSIpLvI5Kziv5jW9/2Zd56Hsk3kimzyDQmmGIJ3bhaauF7CgtubpPV8y/NRurJh+JIdxiQTCWhhAjYOaqyPWilkbS/d/teLbNnp4BvdabMHi4QgnMooRttIG51qxJXleJXzxeR5oW2qgZtf4hSIIbjr0G6eSQeeAV+jhIAVIQSwlcexl8cJFAu4C/bjucUk4Hel49pmT1dAjZ2pszNXKAE51FCN4IC1kpYA+Iy1EDcjq3UPH9dwA3P93MKLZssCCfr+Adfd5DyCLBfwJsSXk2mzCIzxP8BlKNCs1G73LgAAAAASUVORK5CYII="
  },
  {
    "width": 49,
    "height": 34,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 25,
    "height": 17,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAARCAYAAAAougcOAAAAAklEQVR4AewaftIAAAKjSURBVK3BS0hUURwH4N//HO/cmTuDOVxfla8kMjQrWtUiSyKoTfRQekBUixZBUWC2KhOqRVTkugiCgjYJhdWQIBboRrKi0bDXWDOT+Wh01HnPvec0wSxiUDPt+wizWL7lcl24dE+9UJ0Vgis6gTkkCIAIMzM+qkRH3drbC7d8fU+68ReEDEu3tdRHynY3xm35GxJZNo45WBNTEeu051lO566zHr/vG9L0nVevxe35e21T3ntj7RebOf6Qu7/rZqh4x6WIll9mMoXhLwyuKjGtsNIoPbDPWVAdDH1+9LZga+OJUO7qpojFkUeKfWPx5Kv7hLTcQz13pvW1R9cvU5juBKIxYMBPGDEI82FNTkfs3sedYY3VCOKaYkR9Smz8xfiThmOElLy69ubpws3n1xVZeFWlBBEwMgy09zMYIMwXFyZyPlzvVodeXvG7XS6ksfKi4oqovv7kEqvKK1ZJEAGBn0BHP4MBwr8wGYdw1vT63S4X/sAmax6ei9jy9DUlEooCxKJAdx9DHISFEFanjgws4SjZhBQ9V+I3zyAhYBIWSoAYMjDJLUuREg4BySTQP0xYDCUxGUSGLAGmIMX1nkPnEiFJWKgskYTqbetBBsakGUVawCQshhqf+PG96/JdZGDciH3Ff0AiCcvkp2eYAbNMuF1cmFiUZBD24acfl3QdPI0ZsLHWnU1a2OfGQkgJRL5AG20bcngenvL4fWHMgCMlT0n2yeyVtQkmc0AWgDjmJE0gGQALvYF94nVf9uDz40O9DzowC0LaivKqyuC6hhsx1VEbs+So4HYQswKkACBACkgZB8wImBGElggNqeHR1ux3LWc8fq/AHAgZijYc3h4urjliWLRqyViBANkkQBwyQVIEmJHwWKf8nfaB29c9fq/APPwCzX4QRrb8yoMAAAAASUVORK5CYII="
  },
  {
    "width": 13,
    "height": 9,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAJCAYAAADpeqZqAAAAAklEQVR4AewaftIAAAEySURBVHXBPUgCYRwH4N//vU7OJEtJihJKwpaWhlpsbbFWpyCEKGh2C6IlKKKWqNYmhyDCKWiPHIpyFEUr8gOsEOw+0jvvfXO4QSSfh+AYiWcTpmdijTM5BNAgIAxmm3lFLVzUkwtJf/Ropa0MR35S27uEjqGt6tXM5GhMaw1IxV9CN9m2Wm61eG0ZzxGCkMYedubJu/F2MjcbTITDRI8ZQk5j6MWEgK9wuf99u7mHDma5A7GpaaJ8npDTGP7DidAOLBlwME7SeLVCyNQI/TDB4VLfy3AwBm7clxhMEPpxWXrl8yaahINJlp5GP0JANj5artrdGbpIAUlLc29okduNoBBNAm8CbRVkfkHRsyWlnj5spOLH6EJw+FfP102Pf9kmNiwJrsvNxpPv5eD0tVwS6PEHbi18iSJHGo8AAAAASUVORK5CYII="
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
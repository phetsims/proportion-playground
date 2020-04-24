/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const mipmaps = [
  {
    "width": 144,
    "height": 178,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACyCAYAAACtIkaFAAAAAklEQVR4AewaftIAABXFSURBVO3BsW9cZb7w8e/vOTMeT5yYw+y+IuBIc1YnBYXRdWO0ogimMlvhdKQiNKvtgPJWgT9gtaRYpNuQpIJbraleuWKW5tWVm0GbYlfKkc6R1lp8gZkz9jjH9px5fu8xIYsJcTy2x47HeT4fwfm3sB7MMZg4SuIYB+GMC+vBDOADM4AP1IGAB+bYTQQR9qVWeUSDB2IgAWIgBppREqecYcIZEdaDGSAAZoDXgQAIEEGEgoAIO8QIPxBhKFTZoVb5gSqgqFUKKdAEmsDXQDNK4iZnhDCCwnrgA3PA68AMMIcIIoAYEBAREOGpU2WHWgVVVBVUKTSAJvBXoBElccoIEkZAWA98YA54C5gDAjECYkBAjGHUqLWgiloFVQpN4AtgMUriJiNCOKXCejADLABvATNiBMQgRkCEs0atBauoKqimwCLwRZTEi5xiwikS1oMZ4B1gAZFARMAIYgzPFFXUKmotqKbAIvBFlMSLnDLCUxbWgwB4D1hAJBAjiDEgglNQRa2i1oJqCtwGbkZJHHMKCE9JWA+uA+8Ac2IM4hkQwXkCVbRvUWspNIA7URLf5ikSTlhYD64DNxAJxDOIMTgHp9aifQuqMXAH+DhK4pQTJpyQsB7MAX9CZMaUPBDBGQJVtN9HrabATeDjKIlTTohwzMJ64AM3gPfF8xDP4BwDVbTfR62mwM0oiT/kBAjHKKwHc8AtMRKI54EIzjFTxeZ9UG0CV6MkjjlGHsckrAcfArfE83wpeSCCcwJEEM9QuIjq9Zrv/6PdSf/OMRGGLKwHPnALkQVT8kAE5+lQa9G8T+HjKIk/4BgIQxTWgxnglhgzIyUP5xRQxeZ9UG0AV6MkThkijyEJ68EM8KV4JpCSh3NKiCCeASVA9c2a7/93u5NuMiQeQxDWgxngSyl5vngezukjxoByEdU/1Hx/qd1Jv2EIPI4orAczwJdS8nwxBuf0EmMojKP6ds33l9qd9BuOyOMIwnowA3wpJc8XY3BOPzEGRMax+nbN95fanfQbjsDjkMJ6MAN8KSXPF2M4jPn5eV599VWq1Srtdps8z3GOn4iAMo7qmzXfv9PupJscknAIYT3wgS/FMzPieRzU1NQUb7/9NlNTU+y2srLC8vIyd+/epdVq4RwvzfuotU3gjSiJUw7B4xBqvv9/xZjfSsnjoGZnZ/n973/P5OQkj5qcnOTll1/mypUrTE9Pk+c57XabPM9xhk+MAeUiqi+3O+l/cwgeBxTWgw8RuW7KJQ7q2rVrzM/PM4jJyUleeeUVXnvtNV544QXa7Tbr6+s4wyXGoFZfrj3nS7uTNjggjwMI68EccMuUSyDCQVy7do3Z2VkOqlwuMzU1xWuvvcbly5dpt9u0Wi2c4REjqLVzNd//ut1J/84BeAworAc+8P+k5I2LMRzEtWvXmJ2d5ahqtRqzs7NcvnyZKIrIsgxnCERABKy+WfP9/2p30k0G5DGgmu9/JsbMiOdxEPPz81y5coVhqtVqXLlyhSzLSJIE5+hEBJRxVH/b7qR3GJBhAGE9mAMWpORxELOzs8zPz3Nc5ufnqdVqOMMhJQ9E5sJ68D4DMgzmlngeBzE1NcXCwgLHZWVlhT/+8Y+0Wi2c4TElj8KNsB74DMCwj7AefIhIIJ5hUNVqlXfffZdqtcpxWFlZ4ZNPPqHVauEMmQhijA/cYgCGJwjrgQ+8Z0oeB3Ht2jVqtRrH4e7du3zyySdkWYZzPKTkUVgI68Ec+zA82ftixEeEQU1PTzM9Pc1xWF5e5tNPPyXLMpzjJZ5H4Qb7MOwhrAc+8J54HoOqVqtcu3aN47C8vMxnn32GczLEMyAyF9aD6zyBYW/vixEfEQa1sLBAtVpl2KIo4rPPPsM5WeIZCjd4AsPe3hHPY1CXL19mdnaWYVtZWeHTTz/FOXliDIgEYT24zh4MjxHWg+uIBIgwqLfeeotha7VafPLJJ2RZhvN0iGcovMceDI/3jniGQc3OzjI1NcUwZVnGrVu3yLIM5+kRY0BkJqwHczyG4RFhPQiAOTGGQVSrVebn5xm2xcVFVlZWcJ4+MYbCezyG4ZcWxBgGdeXKFWq1GsP01Vdfsby8jHM6iGcoLIT1IOARhl96ByMMolqtcuXKFYZpZWWFpaUlnNNFjKGwwCMMu4T1IABmxBgGMT09TbVaZZg+//xzsizDOWWMUHiPRxh+bkGMYVDz8/MM09LSEisrKzinjxhDIQjrwQy7GH7udYwwiNnZWWq1GsPSarX46quvcE4vMYbCO+xi+LkFEWEQr776KsO0uLhIlmU4p5gRCgvsYvhRWA/mEAER9lOr1QjDkGGJooi7d+/inG5iDIUgrAcBPzL8ZE5EGMSVK1cYpqWlJZzRIMZQWOBHhp/8B0YYxPT0NMMSRRH37t3DGREiFF7nR4afzIgI+5mamqJWqzEsS0tLOKNDjFCY40eGnwSIsJ/Z2VmGpdVqce/ePZwRIkLBD+vBDAVDIawHc4gwiOnpaYZlaWkJZ/SIMRRmKBgeCESE/UxNTVGr1RiWu3fv4owgEQr/QcHwQIAI+wnDkGG5e/cuWZbhjB4xQmGGguGBOgO4fPkyw/K3v/0NZ6TNUTA8EIgR9hOGIcNy9+5dnBElwo6wHviGAdVqNarVKsMQRRFZluGMLjFCYcbwwBz7eOmllxiWe/fu4Yw6oRAYHhLhSaamphiWKIpwRpwIhcAwoKmpKYZlZWUF50x4zjCgarXKMLRaLbIswxltYoTCjGFAL730EsPQbrdxzg7DgKrVKsOwsrKCc3YYTliWZThnxozhhLVaLZwzQISCX2JAURSxY3x8nKmpKQ6r3W7jnB0lBvTnP/+Z3arVKlNTU4RhyOXLlwnDEOfZU+KQsizj3r173Lt3j6WlJarVKtPT07zyyitMT0/jPBtKDEmWZSwvL7O8vEy1WmV6eppXXnmFMAypVqs4Z1OJB1JUfUQYhizLWF5eZnl5mR1TU1O89NJLTE1NkWUZztkhFMJ68KUpl+YQwXEGZbd7GBznMFQpNA0PxGoVxzmg1PBAguMcguGBFFUcZ1CqSiE1PNAExXEGpuz42vBArFZxnMEpOwyFKIljHOcgVCk0DT9poorjDEKVHanhJ7FaxXEGokqUxA3DT74GxXH2pUohpWD4SQNVHGc/qkqhScHwk6ZaxXH2pexoUjD8KEriFIhRxXGeSC2FrykYfq6hVnGcJ1GrFJoUDD/3Nao4zp5UKaRREjcpGH6uoao4zl5UlUKTHxl2iZK4iWqKKo7zWFYp/JUfGX6poVZxnMdRVQqL/MjwS1+giuP8giqoplESN/mR4Zcaai2O8yi1SqHBLoZHREkcA7Fai+P8jCqFL9jF8HiLqOI4u6m1FBbZxfB4d9QqjvOQWkuhGSVxyi6Gx4iSuIlqiiqO8wOrFO7wCMPeFtVaHGeHWkthkUcY9vaFWsVx1FoKi1ESxzzCsIcoiRdRTVHFebZp31L4gscwPNmiWovzDFMF1TRK4ts8huHJbqpVnGeX9i2F2+zB8ARREjdRjVHFeTaptRRusgfD/ha1b3GePdq3FBpREsfswbC/m2otzrNHraXwEU9g2EeUxDHQVGtxnh1qLag2oyRu8ASGwdzEWpxnh/YthZvswzCYRbWaoopz9qm1oBpHSXybfRgGECVxCiyqtThnn/YthY8YgGFwN7Vvcc427VtQbURJfJsBGAYUJXETaKi1OGeX9vsUPmJAhoO5o32LczZp31JoREncYECGA4iS+DaqMao4Z4wq2u9TeJcDMBzcHe33cc4W7fcpfBQlccwBGA7uY7WaoopzNqi1qNUY+JgD8jigdifdrPl+FZgTY3BGn/ZyClejJP47B2Q4nNtqLajijDbN+xQWoyRucAiGQ4iSOAZua9/ijC61FrU2Bd7lkAyH95FaC6o4T1ev18Nay4GoonmfwtUoiVMOyXBIURLHwG3tW5ynY2tri9XVVeI4pt/vcxA271P4OEriBkdQ4mg+UGsXRI2PCI+K45jJyUl838cYgzMcWZbx/fffk2UZD5XLZQal/T6oNqMk/oAj8jiCdifdrPl+FXROjOFR3W6XtbU12u02eZ5TqVTwPA/ncLIsY3V1lVarRZ7nPFQul/F9n0GotWjfpsAb7U6ackQeR1Tz/SbKH8SYcUTYzVrL/fv32bG1tUWapmxvb1MqlSiXyziDybKM1dVVWq0WeZ7zqHPnznHhwgX2pYrmfQq/i5K4yRB4HFG7k27WfH9VVRfEM+zmeR5pmrLb9vY2a2trZFnGjkqlgvN4WZaxurpKq9Uiz3P28vzzz1OpVNiP7eUUPoiS+HOGxGMI2p20WXvOXwC5KEZ4yPM8NjY26Pf7PCrPczY2NlhfX8daS6VSQURwIMsyVldXabVa5HnOfi5evIiI8CS2l1O4HSXxfzJEHkNS8/1/oHpdjAERHlJV7t+/z16stWRZRrvdJs9zyuUypVKJZ1GWZayurtJqtcjznEFMTk5y4cIFnkTzPqg2oiS+ypB5DEm7k8Y13/eB34oxPDQ2Nkan00FV2c/W1hadToeNjQ1EhHK5jIhw1mVZxurqKq1WizzPOYgXX3wRz/PYi+Z91Nom8Lt2J91kyDyGqOb7/4PqHxAZFxF2iAg7sixjUP1+n42NDdrtNnmes2NsbIyzZm1tjX/961+kaUqe5xzU5OQkk5OT7EXzPmptE3gjSuKUY+AxRO1Oulnz/X9g9W3xPB6qVCp0Oh1UlYPa2tqi2+2Spim9Xo8dY2NjjKper0er1eKbb76h2+1ireUwjDFcvHgRz/N4HM37qLVN4I0oiVOOiceQtTvp32u+P4PyshjDDhFhR5ZlHJaqsrW1RbfbJU1Ttra2UFWMMXiex2lmrWV9fZ3V1VW+//57Njc3UVWO4te//jUTExM8juZ91Nom8EaUxCnHqMTxeFetnaEvgXiGHbVajbW1NXq9HkdlraXb7dLtdtlRLpepVCpUKhWq1SqVSgVjDE9Tr9djY2ODLMvodrsM0+TkJL7v8zia91Frm8AbURKnHDPhmIT1YA740pRLIMKOLMv45z//yUmpVqvsKJfLlMtlhqXX69Hr9dhLnuf0ej2OQ6VS4dKlSxhjeJTmfdTaJvBGlMQpJ0A4RmE9+BCRG6Zc4qFvv/2WNE1xDs4Yw29+8xuMMTzK9nJQbQBXoyROOSEex6jdSRu15/wZlJfFGHZMTEywsbFBv9/HGZwxhkuXLlEul/kZVWzeB9XbURJfbXfSTU6QxzGr+f4Sqm8CF8UYdly4cIFOp4Oq4uzPGMOlS5eoVCrsptaieZ/CB1ES/ydPgccxa3fSzZrv/w+qbyMyLiKICBMTE6yvr6OqOHurVCpcunSJsbExdtN+H+3bFPhdlMSf85R4nIB2J/2m5vtLWH0bkXERoVQqMTExwfr6OqqK80vVapWpqSlKpRL/porN+2C1CbwRJXGTp8jjhLQ76Tc131/F6oIYAyKUSiUmJiZYX19HVXF+4vs+L774IiLCQ2otmvcpfBwl8dV2J015yjxOULuTNmu+n6i1C2IMiFAqlZiYmOD+/ftYa3nWGWO4ePEizz//PLtp3kf7NgauRkn8X5wSHies3UmbNd9P1NoFMQZEKJVKTE5O0uv12N7e5ll1/vx5Ll26RKVS4SHtWzTPQfU2cDVK4r9zighPSVgPrgO3pOQhxvDQ2toa3377LdZanhXGGF544QXOnz/Pv6mi/T5qNQbejZK4wSkkPEVhPZgD/iKe54tneMhaS5qmtNttrLWcVcYYnn/+eXzfxxjDQ5r3UWtT4CbwcZTEKaeU8JSF9WAG+IsYE0jJYzdrLd1ul1arRa/X46wwxjA5OcmvfvUrjDE8pH2L9vsUbgMfRUkcc8oJp0BYD3zgL4jMmZIHIjwqyzLSNKXb7TKqyuUyk5OT+L6PMYaHtG/Rfp9CA/goSuIGI0I4RcJ68CFwQzwP8QyP0+v1WF9fZ21tjV6vx2lnjOH8+fNMTExw/vx5dtO+Rft9Cg3goyiJG4wY4ZQJ68EMcEuMzIjngQh76Xa7bGxs0O12sdZyWpTLZarVKhMTE5w/f56fUUX7FrWWwm3gTpTEDUaUcEqF9eBD4IZ4BvE89tPtdtnY2KDb7WKt5SRVKhUqlQrVapVqtUq5XOZRai3at6CaAreBm1ESx4w44RQL60EA3ACui+chnmEQW1tbZFlGr9dja2uLPM/p9XochTGGSqWC53lUKhVKpRLlcplqtcpe1FqwilpLoQHciZL4NmeIMALCejAH3ADmxDOIMSDCQVlr2draYrcsy9itWq2yW6lUolwuMyi1Fqyi1lJoAneAxSiJY84gYYSE9SAAbgALYsTHGMQYnipV1FrUKqhSaABfAItREsecccIICuuBDywA7wBzYgyIIEZAhGOjiqqCKmoVVCk0gQbwV6ARJXHKM0QYcWE98IEF4HVgDgjECIgBARHhByIMRJUdapUfqEUVUKUQA03ga6ARJXGDZ5xwxoT14MNsc/PG5tYmY+UxjDFUxsYwxvBvIojwA7XKI5pACsRAAjSBNEriBs4vlDh7GsCNVpqyl+r4ODsmqud4bnKyESXxGziHYjh7mtXxcZ4k29wk29xkfHycwh2cQzOcMVESpwzAGENlbIzCIs6hGZ5RE+fOUWhESZziHJrhjAnrQWCtZT+V8hiFv+IcieHsmdna3mY/Y2NjFBo4R2I4e97ayO6zn3KpRCHFORLDGRLWAx9Y2Lh/n/2USiWiJG7iHInhbFnINjf9PM9xTobhbLmxvtFlEHmeE9aDGZwjMZwRYT14f2t7O1jvdhlEL88pBDhHYjgDwnrgAze+b7cY1ObWJoXXcY7EcDb8aeP+fT/b3GRQG/fvU1jAORLDiAvrwZy19vp37RYHsbW9TZ7nQVgPruMcmmGEhfXAB261Oil5nnNQrU5K4QbOoRlG241sczPorK1xGOvdLtnmZhDWgz/hHIphRIX1YMZa+/7/fv8dR/G/33+Htfb9sB4s4ByYYXTd6qyvkec5R5HnOd+1WxRuhfVgBudAPEZQWA/e39revr763bcMw/b2NiKMV8fH36z5/p12J93EGYhhxIT1wAdufN9uMUytNGW92w2Av+AMzDB63t+4f9/PNjcZtu/aLfI8nwvrwQLOQAyj573v2i2Og7WWViel8A7OQAwjJKwHc1vb236e5xyXPM8p+DgDMYyW1DOG43Rh4jyFGGcghhESJXGzVCrFz01OclxKpRKFOzgDMYyeq79+vpY+NznJsFXGxqiOj1OIcQbiMWLanfSbmu8vnatW35w4d85XlO3tbY7qwvnzvPDr/4OIvBslcQNnIMIIC+vBdeCGtTbYuH+fbGuTPM/JNjfZjzGGytgYE9VzTJw7R6lUioEPoiRexBmYcAaE9WAGmANeB2aAwFrL1vY2j1MZG8MYQ6EBNIG/Rkm8iHNg/x9TJyY5daIEEwAAAABJRU5ErkJggg=="
  },
  {
    "width": 72,
    "height": 89,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 36,
    "height": 45,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAtCAYAAADGD8lQAAAAAklEQVR4AewaftIAAAU8SURBVM3BTYjcZx3A8e/vef47O7uZfZlM1iSMM7s7CagJKmkwgRJFEjGIeLE9tJQgRnuQHIoVPCgIvQhaBFtLL+JJUnLpwYJC1rpKwKakJAe3oFXz77xQNcvszv5nZ2fn7Xl+zuoUhiUxu3H25fMRtiGXnf4kwpNi7McRpkBSoBOA8F8KEoEuoVr0zi+I6i/DUnGRLRIeIped/qZY+xWET4tIBhHDVqmiquvAX9Xr23j3Ulgs/pn/QXiA3PTMd8WaZ0XkOCIMgnpdQ/1b2nEvhaXir7kPYZNcJjsmgb0qxnwZEcMOUNWadtzLYSH/fTax9MllsmMSBG+KtecREXaIiMTEyOPJicnZysrKr+hj6XMwlfqNWPNZuhKJBJcvX+bixYtkMhmq1SpRFDEwIkZEPjU5MTleWVmZo8fSk5uZ/Ymx5hlEiMViXLlyhdnZWUZHR0mn05w5c4aZmRnu3LnDwIgIIo8lx8bzlShaoMvQlctkj4uRryPChkuXLpFOp+mnqhQKBVSVQRKRuAT2e/QYusTaH4gxSbrOnj3LyZMn6ee9Z25ujuvXr7MTROREbnrmBboMG4x8np4LFy4gIvS7ffs2c3Nz7BgRxJqv0mVymezTIpKh69y5c0xNTdGvXC5z7do1dpzIiVwm+yWDtecRYcPp06fZbH5+Hu89O01EDNY+YcTIMbpGRkZIp9P0W1pa4ubNm+wWMeZjBiRF16lTpxgaGqLf3bt32V2aMaDjdB09epTN8vk8u0okYegZHh7Ge0+/MAzZTQLj9mAy+ZyIJBcWFpifn6dcLrMhCAJu3LhBu91mF1k5ljt2S4x8hv1AtW5Aq+wTqlSNqobsG7pq6Pg7qLIvKCUDelVVa+wDqv5dE5aKq8Df2GOq6nD+qqFLvb/FXlP9S1gq3jJscP5VVBvsJe9/R5ehKywV/6SqC+wR9b6szr9Al6FHnXsdVfaCen09LBWX6TL0hIXCj1S1wC5T7/M49216DH3U+zdQdoyq4pzjQ6ra0o57MSwV1+kx9HP+eVVf6HQ6VCoVWq0Wg6CqNBoN7t27R7PZ5D9UwfnXwmLhVfpY+lSqkU+OT8RsYL9Qq9VkcXER5xzGGKy1iAjboao0m02WlpYol8s450ilUhhjUK9v3s2//wSbWDapRCt/TE4mPzcUi81GUUSz2WR1dZVqtcoGVWWDquK9x3uP9x7vPd57nHM451hfX6dcLrO8vEyr1WLD4cOHicfjqHN/0I67WKlGnk2E+8hlssdlKPjtaq02s7i4yCBMTU0xMT6u6v0b2nFPhqVih/uw3EelGi0nE2PvDY/EvxgEwYF6vc6jstZy5MgREgcSkTr30zCff7ZSjTwPYHmASjX6ezIx9l58ZOTxRCIxaYyh0WiwVSJCKpXi0KFDneFY7Ia2O98Ki4Vf8BDCQ+Qy2eMS2Fcw5rxzbqjRaFCv16nVanjv+ZAxhng8zujoKLFYjOGh2Jox5h117udhsfAaWyRsUS6bfVqs/Roip0TkI4jgvcd7jxGDiHjQfwHvq/Nv4/0rYamYZ5uER3DoYKrQcZ1sLBgiMXrgZUTfQeX3YanwAf+ngEfgnTMrUcTk+Pg/w1L5OQbIsE3TH818o9lupemyxrYYMMM25DLZYK2+9p21el3oanfah3OZ6QsMkGEbGq3Wz6q12ifoqdZq8dX62o9zmWzAgBi2KJfJHlxvrD/VarXot1KNHmu0mi8yIIata1sbrFpr6RfYAGNsxIAI25DLZNPNdvv5Tqd9ot3u2CAIWsPDw2+V/vHBDxmQfwP/z2G3SDfFKwAAAABJRU5ErkJggg=="
  },
  {
    "width": 18,
    "height": 23,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAXCAYAAAAGAx/kAAAAAklEQVR4AewaftIAAAJaSURBVKXBvWsTcRgH8O/zu4s58sa1aY3WFpIoEvsm6RZwcFKc6ipIJl/QzUmoFfwDsgjaxU2HIohLcdBsGSqKBHFQUDiaNiGmUC9nXsi9PibYoUhq0/TzIfwjGU/cIUGXQHQaQBRAEH+1wLzNzN/g8SuttPEaexB2JePxLAnxkIjOgAj/w8wumD+z4y5pm6V36JLQlYwnbpAkPZ6bnz+ZXlhAtVqFbdvYDxEJIpqAEJdHIupX3aj/kJKTU1GSpZfTMzNj2WwWqVQKqVQK6+vrOAgRBUFI67q+IuCTl0mIU4uLi/D7/Wg2m1hdXcWgiGg6mUg8EkR0IZPJIBaLoSefz6NSqWBgRCASVwSIJmZnZ9Gj6zoKhQIOjRAXAAKqqqKnVqthSKoMwM7lckin05BlGcMgQJIB1Jl5vFgsYlgMNAWYSzi6mmDmDzgiZv4iYDtPmNnAkJjZhus+F1p56yeY32NYzAWtVFoT6GLXXfE8r2PbNg7CzDBNE67rgpm32XaW0SWhSzeM76PqSLpuGNPtdhtEBCJCDzODmeF5HizLQr1eR7vdRjgUMtjj+9pmaQ1dMnaxbd8Oh8Jnd37tzFUqFewnHA4jOhots+ctaRsbL7CLsEdycuqcJ4lnpmVlWq2WaDQaYGb4fD4Eg0EofkVXFOWtcN0HWnlLwx6EPpLx+F3X8265rnfeJ8sfSYgqwJ9gO0+18paOw1AjkTehQMDAgAT6mIiduGpa1kXbcULHx8bvYQACfXRM81rHNAOmZYlOp3MdA5DRhxoK3Tzmk4uO40YURcn/bjZwkD/qbBC7QXYd3QAAAABJRU5ErkJggg=="
  },
  {
    "width": 9,
    "height": 12,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAMCAYAAACwXJejAAAAAklEQVR4AewaftIAAAEOSURBVH3BvUrDUBgG4PecpA2tYF0zxJBsjnbSNZudXZz1HlTQxV28hU4VvAMJdBDsPeiQHpQM0gaT1KT56TmfDhmK0D4Pwx/XcW4Y56cA9gF0AOQgBERqFEynD8x1nLuTweDaNE19OBxiHRFVpNQttyzrzPM8PQxD/McYazPOz/lhv28WRQHf97GBrc1ms0shhBHHMTYgDiAUQmCLL05EE2xBRC8cq9V9WZTzqqqglAIRQUqJLMugpHxHVV9p30ky39vtrbI8P46iyIiiCFLKut1qvbY07SL4/HhjaLi2fZQtl4/dTveJMTwHQozR0NFI0sVB+rOwyqKM4zQZY42ORm+nO+KM1YbRnsRpgnW/kJuEhrDJ/OwAAAAASUVORK5CYII="
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
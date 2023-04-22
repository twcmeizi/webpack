import test from './test';
import imgsrc from '../../image/1.jpg'
import imgsrc2 from '../../image/2.jpeg'
import text from './text.txt'
import './index.css'
import './index.less'
test();
const img=document.createElement('img')
img.src=imgsrc;
document.body.appendChild(img)
const img2=document.createElement('img')
img2.src=imgsrc2;
document.body.appendChild(img2)

const block=document.createElement('div')
block.classList.add('block-bg')
block.textContent=text
document.body.appendChild(block)

const span=document.createElement('span')
span.classList.add('icon')
span.innerHTML='&#xe61d;'
document.body.appendChild(span)
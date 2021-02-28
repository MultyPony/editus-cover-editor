// 'use strict';

var canvas = new fabric.Canvas('c', {
    width: 435, 
    height: 645,
    backgroundColor: 'rgb(100,100,200)',
    // backgroundImage: '02.jpg',
    // backgroundImage: imgElement,
    // selectionColor: 'blue',
    selectionLineWidth: 2
  });
  

  // var imgElement = document.getElementById('my-image');
  // var imgInstance = new fabric.Image(imgElement, {
  //   left: 100,
  //   top: 100,
  //   angle: 0,
  //   opacity: 0.85
  // });
  // // canvas.add(imgInstance);

  // var rect = new fabric.Rect({
  //   left: 100,
  //   top: 100,
  //   fill: 'red',
  //   width: 40,
  //   height: 40
  // });
  // canvas.add(rect);
  // rect.set({ left: 20, top: 50 });
  // // canvas.renderAll();
  // rect.set({ strokeWidth: 5, stroke: 'rgba(100,200,200,0.5)' });
  // rect.set('selectable', false);
  // canvas.selection = false;

  // fabric.Image.fromURL('my_image.jpg', function(oImg) {
  //   oImg.scale(0.5).set('flipX', true);
  //   canvas.add(oImg);
  // });
  // var text = new fabric.Text('hello world', { left: 100, top: 100 });
  // var OiText = new fabric.Text("I'm in Comic Sans", {
  //   fontFamily: 'Oi'
  // });
  // var interText = new fabric.IText("Interactivochka", {
  //   fontFamily: 'Oi'
  // });
  // canvas.add(text);
  // canvas.add(OiText);
  // canvas.add(interText);

  var circle = new fabric.Circle({
radius: 100,
fill: '#eef',
scaleY: 0.5,
originX: 'center',
originY: 'center'
});

var text = new fabric.Text('ТОП-10', {
fontSize: 30,
originX: 'center',
originY: 'center'
});

var group = new fabric.Group([ circle, text ], {
left: 150,
top: 100,
angle: -10
});

var bookName = new fabric.Text('Война и мир', {
fontSize: 40,
top: 40,
// left: 20,
});

var bookAuthor = new fabric.Text('Л. Толстой', {
fill: 'white',

fontSize: 30,
top: 550,
textAlign: 'center',
});


canvas.add(group);
canvas.add(bookName);
canvas.add(bookAuthor);
bookName.centerH();
bookAuthor.centerH();




let fontFamily = new SlimSelect({
    select: '.ff-select',
    showSearch: false,
    onChange: (info) => {
      console.log(info)
    },
    data: [
      {text: 'Times New Roman'},
      {text: 'Oi'},
      {text: 'Anoter Font'}
    ],
});

let fontSize = new SlimSelect({
    select: '.fs-select',
    showSearch: false,
    onChange: (info) => {
      console.log(info);
      let obj = canvas.getActiveObject();
      if (obj.get('type')==="text") {
        obj.set("fontSize", info.value);
        canvas.renderAll();
        console.log(obj);
      }
    },
    data: [
      {text: '14'},
      {text: '16'},
      {text: '18'}
    ],
});




let fileTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png'
];

let bgButton = document.querySelector('.btn-bg-img');
let bgFileInput = document.querySelector('#bg-file-input');
let imgButton = document.querySelector('.btn-add-img');
let imgFileInput = document.querySelector('#add-img-input');

bgButton.addEventListener('click', () => {
  bgFileInput.click();
});

imgButton.addEventListener('click', () => {
  imgFileInput.click();
});

imgFileInput.onchange = function() {
  if (this.files.length === 0) {
    return;
  }

  let file = this.files[0];

  if (!validFileType(file)) {
    alert('Выберите картинку типа: jpg, png.');
    return;
  }

  var reader = new FileReader();
  
  reader.onloadend = function (event) {    
    var center = canvas.getCenter();
    var data = event.target.result;                    
    fabric.Image.fromURL(data, function(img, isError) {
      img.set({
        left: 0, top: 0, scaleX: 0.2, scaleY: 0.2,  
      });
      canvas.add(img);
    });
 }
  reader.readAsDataURL(file);
}

bgFileInput.onchange = function() {
  if (this.files.length === 0) {
    return;
  }

  let file = this.files[0];

  if (!validFileType(file)) {
    alert('Выберите картинку типа: jpg, png.');
    return;
  }

  let bgPicker = document.querySelector('.background-picker');
  var reader = new FileReader();
  
  reader.onloadend = function (event) {
    bgPicker.style.backgroundImage = `url('${reader.result}')`;
    
    var center = canvas.getCenter();
    var data = event.target.result;                    
    fabric.Image.fromURL(data, function(img, isError) {
      img.set({
        scaleX: canvas.width / img.width,
        scaleY: canvas.height / img.height,

        // scaleX: 1,
        // scaleY: 1,
        // left: center.left,
        // top: center.top,
        // originX: 'center', 
        // originY: 'center'

        // width: canvas.width,
        // height: canvas.height,
      });
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    });
 }
  reader.readAsDataURL(file); 
}

function validFileType(file) {
  for(let i = 0; i < fileTypes.length; i++) {
    if(file.type === fileTypes[i]) {
      return true;
    }
  }
  return false;
}

let bgColorBtn = document.querySelector('.btn-bg-color');

bgColorBtn.onchange = changeBgColor;
bgColorBtn.oninput = changeBgColor;

function changeBgColor() {
  canvas.setBackgroundColor(this.value, canvas.renderAll.bind(canvas));
} 

function onObjectSelected(e) {
  console.log(e.target.get('type'));
}
// canvas.on('object:selected', onObjectSelected);
// canvas.on('mouse:down', function(options) {
//   if (options.target) {
//     console.log('an object was clicked! ', options.target.type);
//   }
// });

canvas.on('selection:created', function(options) {
  if (options.target.type === 'text') {
    console.log('Text!');
    // console.log(options.target);
    enableFontOptions();
  }
});

canvas.on('selection:cleared', function(options){
  console.log('CLEARED!');
  disableFontOptions();
});

function disableFontOptions() {
  let fontOptionsDiv = document.querySelector('.font-options');
  let fontColor = document.querySelector('.color-input');
  fontColor.setAttribute('disabled', 'disabled');
  fontFamily.disable();
  fontSize.disable();
  fontOptionsDiv.classList.add('disabled');
}

function enableFontOptions() {
  let fontOptionsDiv = document.querySelector('.font-options');
  let fontColor = document.querySelector('.color-input');
  fontColor.removeAttribute('disabled');
  fontFamily.enable();
  fontSize.enable();
  fontOptionsDiv.classList.remove('disabled');
}

disableFontOptions();
window.canvas = canvas;
window.dfo = disableFontOptions;
window.efo = enableFontOptions;
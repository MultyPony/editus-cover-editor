'use strict';
const { jsPDF } = window.jspdf;

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


var fonts = ["Roboto", "Lora", "Roboto Slab"];

function loadAndUse(font) {
  var myfont = new FontFaceObserver(font)
  myfont.load()
    .then(function() {
      // when font is loaded, use it.
      canvas.getActiveObject().set("fontFamily", font);
      canvas.requestRenderAll();
    }).catch(function(e) {
      console.log(e)
      alert('Ошибка при загрузке шрифта ' + font);
    });
}

let fontFamily = new SlimSelect({
    select: '.ff-select',
    showSearch: false,
    onChange: (info) => {
      console.log(info);
      let obj = canvas.getActiveObject();
      if (obj.get('type')==="text" || obj.get('type')==="i-text") {
        if (fonts.includes(info.value)) {
          loadAndUse(info.value);
        } else {
          obj.set("fontFamily", info.value);
          canvas.renderAll();
        }
        // console.log(obj);
      }
    },
    data: [
      {text: 'Times New Roman'},
      {text: 'Arial'},
      {text: 'Courier New'},
      {text: 'Roboto'},
      {text: 'Roboto Slab'},
      {text: 'Lora'},
    ],
});

let fontSize = new SlimSelect({
    select: '.fs-select',
    showSearch: false,
    onChange: (info) => {
      console.log(info);
      let obj = canvas.getActiveObject();
      if (obj.get('type')==="text" || obj.get('type')==="i-text") {
        obj.set("fontSize", info.value);
        canvas.renderAll();
        console.log(obj);
      }
    },
    data: [
      {text: '8'},
      {text: '9'},
      {text: '10'},
      {text: '11'},
      {text: '12'},
      {text: '14'},
      {text: '16'},
      {text: '18'},
      {text: '24'},
      {text: '30'},
      {text: '36'},
      {text: '48'},
      {text: '60'},
      {text: '72'},
      {text: '96'},
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
  if (options.target.type === 'text' || options.target.type === 'i-text') {
    console.log('Text!');
    // console.log(options.target);
    enableFontOptions();
  }
});

canvas.on('selection:cleared', function(options){
  console.log('CLEARED!');
  disableFontOptions();
});

let fontColor = document.querySelector('.color-input');

fontColor.oninput = changeTextColor;
fontColor.onchange = changeTextColor;

function changeTextColor() {
  let obj = canvas.getActiveObject();
    if (obj.get('type')==="text" || obj.get('type')==="i-text") {
      obj.set("fill", this.value);
      canvas.renderAll();
      console.log(obj);
    }
}

function disableFontOptions() {
  let fontOptionsDiv = document.querySelector('.font-options');
  fontColor.setAttribute('disabled', 'disabled');
  fontFamily.disable();
  fontSize.disable();
  fontOptionsDiv.classList.add('disabled');
}

function enableFontOptions() {
  let fontOptionsDiv = document.querySelector('.font-options');
  fontColor.removeAttribute('disabled');
  fontFamily.enable();
  fontSize.enable();
  fontOptionsDiv.classList.remove('disabled');
}

disableFontOptions();
// window.canvas = canvas;
// window.dfo = disableFontOptions;
// window.efo = enableFontOptions;


let buttonAddText = document.querySelector('.btn-add-text');
buttonAddText.onclick = function() {
  console.log('Txt added!');
  let text = new fabric.IText('Ваш текст');
  canvas.add(text);
  text.centerH();
  text.centerV();
}

let btnClearBgImg = document.querySelector('.btn-remove-bg-img');
btnClearBgImg.onclick = function() {
  console.log('clicked');
  bgFileInput.value = '';
  canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas));
  
  let bgPicker = document.querySelector('.background-picker');
  
  bgPicker.style.backgroundImage = 'none';
}

let buttonClearAll = document.querySelector('.btn-clear-all');
buttonClearAll.onclick = function() {
  bgFileInput.value = '';
  imgFileInput.value = '';

  canvas.clear();
  let bgPicker = document.querySelector('.background-picker');
  
  bgPicker.style.backgroundImage = 'none';

  canvas.add(bookAuthor);
  canvas.add(bookName);
}

let btnSave = document.querySelector('.btn-save');
btnSave.onclick = function() {
  let img = canvas.toDataURL({
    format: 'jpeg',
    quality: 1,
    enableRetinaScaling: true,
    multiplier: 5,
  });
  // console.log(img);
  img = img.replace('data:image/jpeg;base64,', '');
  const imgForm = document.querySelector('#img-form');
  const imgInput = document.querySelector('#image-data');

  imgInput.value = img;
  imgForm.action = window.location.href + 'image.php';
  imgForm.submit();

  // let fD = new FormData();
  // fD.append('name', img);
  // $.ajax('/image.php',
  // {
  //   method: 'POST',
  //   data: fD,
  //   processData: false,
  //   contentType: false,
  //   success: function(data){
  //     makeNsavePdf(data);
  //     console.log(data)
  //   },
  //   error: function(data){
  //     console.log('EROR AJAX');
  //   }
  // });

  // let doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  // const page = doc.getCurrentPageInfo();
  // const scale = 72 / 25.4; // convert mm to pt (boxes use use pt)
  // page.pageContext.trimBox = {
  //               bottomLeftX: 2,
  //               bottomLeftY: 2,
  //               topRightX:   8,
  //               topRightY:   8,
  // };
  // page.pageContext.bleedBox = {
  //             bottomLeftX: 2 * scale,
  //             bottomLeftY: 2 * scale,
  //             topRightX:   8 * scale,
  //             topRightY:   8 * scale
  // };

  // page.pageContext.trimBox = { ... };
  // page.pageContext.artBox = { ... };

  // doc.addImage(img, "JPEG", 0, 0, 210, 297, 'NONE');
  // doc.save();

  // doc.output('pdfobjectnewwindow', {filename: 'Zhopka'});
  // console.log(doc.output('blob',{filename: 'Zhopka.pdf'}));
  // console.log(doc.output());
}

function makeNsavePdf(data) {
  let doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const page = doc.getCurrentPageInfo();
  page.pageContext.trimBox = {
                  bottomLeftX: 2,
                  bottomLeftY: 2,
                  topRightX:   8,
                  topRightY:   8,
  };
  doc.addImage(data, "JPEG", 0, 0, 210, 297, 'NONE');
  doc.save();
}
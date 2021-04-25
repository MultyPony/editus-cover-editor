'use strict';
const { jsPDF } = window.jspdf;

var canvas = new fabric.Canvas('c', {
    width: 600, 
    height: 430,
    backgroundColor: 'rgb(100,100,200)',
    // backgroundImage: '02.jpg',
    // backgroundImage: imgElement,
    // selectionColor: 'blue',
    selectionLineWidth: 2,
    controlsAboveOverlay: true,
    preserveObjectStacking: true,
  });
  
  var frontCover = new fabric.Rect({
    width: 290,
    height: 427,
    top: 0,
    left: canvas.width/2 + 7,
    fill: '#eef',
    originX: 'left',
    originY: 'top',
    lockMovementX: true,
    lockMovementY: true,
    selectable: false,
    hoverCursor: 'arrow',
    
    // hasBorder: true,
    // borderColor: 'red',
});

var backCover = new fabric.Rect({
  width: 291,
  height: 431,
  top: -1,
  left: -1,
  fill: '#eef',
  originX: 'left',
  originY: 'top',
  lockMovementX: true,
  lockMovementY: true,
  selectable: false,
  hoverCursor: 'arrow',
});

var bookName = new fabric.Text('Война и мир', {
  fontFamily: 'Times New Roman',
  fontSize: 40,
  top: 40,
  textAlign: 'center',
});

var bookAuthor = new fabric.Text('Л. Толстой', {
  fontFamily: 'Times New Roman',
  fontSize: 30,
  top: 300,
  textAlign: 'center',
});


canvas.add(frontCover);
canvas.add(backCover);

canvas.add(bookName);
canvas.add(bookAuthor);

bookName.centerH();
bookAuthor.centerH();

// Zooming

// canvas.on('mouse:wheel', function(opt) {
//   var delta = opt.e.deltaY;
//   var zoom = canvas.getZoom();
//   zoom *= 0.999 ** delta;
//   if (zoom > 20) zoom = 20;
//   if (zoom < 0.01) zoom = 0.01;
//   canvas.setZoom(zoom);
//   opt.e.preventDefault();
//   opt.e.stopPropagation();
// })

// canvas.on('selection:created', options => {
//   options.target.bringToFront();
// });

canvas.on({
  // 'selection:created': onCoverSelect,
  // 'selection:updated': onCoverSelect,
  'mouse:down': onCoverSelect,
});

let isFrontPicked = false;
let isBackPicked = false;

function onCoverSelect(options) {
  if (options.target == frontCover) {
    if (isBackPicked) {
      isBackPicked = false;
      backCover.set('strokeWidth', 0);
    }
    console.log('popadanie');
    frontCover.set('stroke', '#9b2a28');
    frontCover.set('strokeWidth', 3);
    isFrontPicked = true;    
  } 
  else if (options.target == backCover) {
    if (isFrontPicked) {
      isFrontPicked = false;
      frontCover.set('strokeWidth', 0);
    }
    console.log('popadanie');
    backCover.set('stroke', '#9b2a28');
    backCover.set('strokeWidth', 3);
    isBackPicked = true;
  }
  else {
    // frontCover.set('stroke', '#9b2a28');
    frontCover.set('strokeWidth', 0);
  }
}

const fonts = [
	'Alexandra Zeferino Three', 
	'Andantino script', 
	'Aquarelle', 
	'Arial Black', 
	'Arial Narrow Bold Italic', 
	'Arial Narrow Bold', 
	'Arial Narrow Italic', 
	'Arial Narrow', 
	'Arial', 
	'Arialbd', 
	'Arialbi', 
	'Ariali', 
	'Ariston', 
	'B52', 
	'BadScript-Regular', 
	'BebasNeue Bold', 
	'BebasNeue Book', 
	'BebasNeue Regular', 
	'Cambria Bold', 
	'Cambria Italic', 
	'Cambria', 
	'Cambriaz', 
	'Cassandra', 
	'CometaCTT', 
	'Corinthia', 
	'Cormorant-Bold', 
	'Cormorant-Italic', 
	'Cormorant-Light', 
	'Cormorant-LightItalic', 
	'Cormorant-Medium', 
	'Cormorant-MediumItalic', 
	'Cormorant-Regular', 
	'Cormorant-SemiBoldItalic', 
	'Courier Bold Italic', 
	'Courier Bold', 
	'Courier Italic', 
	'Courier New', 
	'CyrillicBrush-Medium', 
	'CyrillicOld', 
	'Deutsch Gothic', 
	'Didona Regular', 
	'Ekaterina Velikaya One', 
	'Ekaterina Velikaya Two', 
	'Garamond Bold', 
	'Garamond Italic', 
	'Garamond', 
	'Georgia Bold Italic', 
	'Georgia Bold', 
	'Georgia Italic', 
	'Georgia', 
	'Good Vibes Pro', 
	'HelveticaNeueCyr-Black', 
	'HelveticaNeueCyr-BlackItalic', 
	'HelveticaNeueCyr-Bold', 
	'HelveticaNeueCyr-BoldItalic', 
	'HelveticaNeueCyr-Italic', 
	'HelveticaNeueCyr-Light', 
	'HelveticaNeueCyr-LightItalic', 
	'HelveticaNeueCyr-Medium', 
	'HelveticaNeueCyr-Roman', 
	'HelveticaNeueCyr-Thin', 
	'HelveticaNeueCyr-ThinItalic', 
	'HelveticaNeueCyr-UltraLight', 
	'HelveticaNeueCyr-UltraLightItalic', 
	'Impact', 
	'Inspiration', 
	'Journalism', 
	'Lemon Tuesday', 
	'Liana', 
	'Lifehack Sans Medium', 
	'Lighthaus', 
	'Literaturnaya Bold', 
	'Literaturnaya Italic', 
	'Literaturnaya', 
	'Lobster', 
	'Lobster', 
	'Lobster', 
	'Lobster', 
	'Lobster', 
	'MarkerFelt', 
	'Martina scriptC', 
	'Maya', 
	'Maya', 
	'Maya', 
	'Maya', 
	'Maya', 
	'Medieval English', 
	'Minion Pro Bold Italic', 
	'MinionPro-Bold', 
	'MinionPro-Italic', 
	'MinionPro-MediumIt', 
	'MinionPro-Regular', 
	'Mon Amour One', 
	'Monotype Corsiva', 
	'Noteworthy-Bold', 
	'Noteworthy-Light', 
	'Philosopher-Bold', 
	'Philosopher-Regular', 
	'Pobeda Regular', 
	'Rex Bold', 
	'Roboto-Black', 
	'Roboto-BlackItalic', 
	'Roboto-Bold', 
	'Roboto-BoldItalic', 
	'Roboto-Italic', 
	'Roboto-Light', 
	'Roboto-LightItalic', 
	'Roboto-Medium', 
	'Roboto-MediumItalic', 
	'Roboto-Regular', 
	'RobotoSlabBold', 
	'RobotoSlabLight', 
	'RobotoSlabRegular', 
	'Roboto-Thin', 
	'Roboto-ThinItalic', 
	'RodchenkoC', 
	'Rosa Marena', 
	'Snell Roundhand', 
	'Sunday-Regular',  
];

function loadAndUse(font, obj) {
  var myfont = new FontFaceObserver(font)
  myfont.load()
    .then(function() {
      // when font is loaded, use it.
      obj.set("fontFamily", font);
      canvas.requestRenderAll();
    }).catch(function(e) {
      console.log(e)
      alert('Ошибка при загрузке шрифта ' + font);
    });
}

function changeFont(font, textObj) {
  if (fonts.includes(font)) {
    loadAndUse(font, textObj);
  } else {
    textObj.set("fontFamily", font);
    canvas.renderAll();
  }
}

let fontFamily = new SlimSelect({
    select: '.ff-select',
    showSearch: false,
    onChange: (info) => {
      console.log(info);
      let obj = canvas.getActiveObject();
      if (obj.type === 'activeSelection') {
        obj.forEachObject((curObj, index, array) => {
          changeFont(info.value, curObj);
        });
      } else if (obj.get('type')==="text" || obj.get('type')==="i-text") {
          changeFont(info.value, obj);
      }
    },
    data: [
      {text: 'Alexandra Zeferino Three'},
      {text: 'Andantino script'},
      {text: 'Aquarelle'},
      {text: 'Arial Black'},
      {text: 'Arial Narrow Bold Italic'},
      {text: 'Arial Narrow Bold'},
      {text: 'Arial Narrow Italic'},
      {text: 'Arial Narrow'},
      {text: 'Arial'},
      {text: 'Arialbd'},
      {text: 'Arialbi'},
      {text: 'Ariali'},
      {text: 'Ariston'},
      {text: 'B52'},
      {text: 'BadScript-Regular'},
      {text: 'BebasNeue Bold'},
      {text: 'BebasNeue Book'},
      {text: 'BebasNeue Regular'},
      {text: 'Cambria Bold'},
      {text: 'Cambria Italic'},
      {text: 'Cambria'},
      {text: 'Cambriaz'},
      {text: 'Cassandra'},
      {text: 'CometaCTT'},
      {text: 'Corinthia'},
      {text: 'Cormorant-Bold'},
      {text: 'Cormorant-Italic'},
      {text: 'Cormorant-Light'},
      {text: 'Cormorant-LightItalic'},
      {text: 'Cormorant-Medium'},
      {text: 'Cormorant-MediumItalic'},
      {text: 'Cormorant-Regular'},
      {text: 'Cormorant-SemiBoldItalic'},
      {text: 'Courier Bold Italic'},
      {text: 'Courier Bold'},
      {text: 'Courier Italic'},
      {text: 'Courier New'},
      {text: 'CyrillicBrush-Medium'},
      {text: 'CyrillicOld'},
      {text: 'Deutsch Gothic'},
      {text: 'Didona Regular'},
      {text: 'Ekaterina Velikaya One'},
      {text: 'Ekaterina Velikaya Two'},
      {text: 'Garamond Bold'},
      {text: 'Garamond Italic'},
      {text: 'Garamond'},
      {text: 'Georgia Bold Italic'},
      {text: 'Georgia Bold'},
      {text: 'Georgia Italic'},
      {text: 'Georgia'},
      {text: 'Good Vibes Pro'},
      {text: 'HelveticaNeueCyr-Black'},
      {text: 'HelveticaNeueCyr-BlackItalic'},
      {text: 'HelveticaNeueCyr-Bold'},
      {text: 'HelveticaNeueCyr-BoldItalic'},
      {text: 'HelveticaNeueCyr-Italic'},
      {text: 'HelveticaNeueCyr-Light'},
      {text: 'HelveticaNeueCyr-LightItalic'},
      {text: 'HelveticaNeueCyr-Medium'},
      {text: 'HelveticaNeueCyr-Roman'},
      {text: 'HelveticaNeueCyr-Thin'},
      {text: 'HelveticaNeueCyr-ThinItalic'},
      {text: 'HelveticaNeueCyr-UltraLight'},
      {text: 'HelveticaNeueCyr-UltraLightItalic'},
      {text: 'Impact'},
      {text: 'Inspiration'},
      {text: 'Journalism'},
      {text: 'Lemon Tuesday'},
      {text: 'Liana'},
      {text: 'Lifehack Sans Medium'},
      {text: 'Lighthaus'},
      {text: 'Literaturnaya Bold'},
      {text: 'Literaturnaya Italic'},
      {text: 'Literaturnaya'},
      {text: 'Lobster'},
      {text: 'Lobster'},
      {text: 'Lobster'},
      {text: 'Lobster'},
      {text: 'Lobster'},
      {text: 'MarkerFelt'},
      {text: 'Martina scriptC'},
      {text: 'Maya'},
      {text: 'Maya'},
      {text: 'Maya'},
      {text: 'Maya'},
      {text: 'Maya'},
      {text: 'Medieval English'},
      {text: 'Minion Pro Bold Italic'},
      {text: 'MinionPro-Bold'},
      {text: 'MinionPro-Italic'},
      {text: 'MinionPro-MediumIt'},
      {text: 'MinionPro-Regular'},
      {text: 'Mon Amour One'},
      {text: 'Monotype Corsiva'},
      {text: 'Noteworthy-Bold'},
      {text: 'Noteworthy-Light'},
      {text: 'Philosopher-Bold'},
      {text: 'Philosopher-Regular'},
      {text: 'Pobeda Regular'},
      {text: 'Rex Bold'},
      {text: 'Roboto-Black'},
      {text: 'Roboto-BlackItalic'},
      {text: 'Roboto-Bold'},
      {text: 'Roboto-BoldItalic'},
      {text: 'Roboto-Italic'},
      {text: 'Roboto-Light'},
      {text: 'Roboto-LightItalic'},
      {text: 'Roboto-Medium'},
      {text: 'Roboto-MediumItalic'},
      {text: 'Roboto-Regular'},
      {text: 'RobotoSlabBold'},
      {text: 'RobotoSlabLight'},
      {text: 'RobotoSlabRegular'},
      {text: 'Roboto-Thin'},
      {text: 'Roboto-ThinItalic'},
      {text: 'RodchenkoC'},
      {text: 'Rosa Marena'},
      {text: 'Snell Roundhand'},
      {text: 'Sunday-Regular'},
      {text: 'Times New Roman'},
    ],
});

let fontSize = new SlimSelect({
    select: '.fs-select',
    showSearch: false,
    onChange: (info) => {
      console.log(info);
      let obj = canvas.getActiveObject();
      if (obj.type === 'activeSelection') {
        obj.forEachObject((curObj) => {
          curObj.set("fontSize", info.value);
          canvas.renderAll();
        });
      } else if (obj.get('type')==="text" || obj.get('type')==="i-text") {
        obj.set("fontSize", info.value);
        canvas.renderAll();
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
let btnClearBgImg = document.querySelector('.btn-remove-bg-img');

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
    // console.log(data);
    if (isFrontPicked) {
      fabric.Image.fromURL(data, function(img, isError) {
        img.set({
          left: canvas.width/2 + 7,
          top: 0,
          // width: 290,
          // height: 427,
          // skewY: 25,
          // skewX: 25,
          scaleX: 0.2,
          scaleY: 0.2,
          clipPath: new fabric.Rect({
            width: 1000,
            height: 1000,
            // dirty: true,
            top: 0,
            left: 0,
            originX: 'center',
            originY: 'center',
            // absolutePositioned: true,
          }),
          // originX: 'center',
          // originY: 'center',

        });
        canvas.add(img);
        canvas.bringForward(img);
        img.scaleToHeight(427, false);
        // img.scaleToWidth(290, false);
        img.centerV();
      });
      canvas.renderAll();


      // var frontCover = new fabric.Rect({
      //   width: 290,
      //   height: 427,
      //   top: 0,
      //   left: canvas.width/2 + 7,
      //   fill: '#eef',
      //   originX: 'left',
      //   originY: 'top',
      //   lockMovementX: true,
      //   lockMovementY: true,
      //   selectable: false,
      //   hoverCursor: 'arrow',
        
        // hasBorder: true,
    //     // borderColor: 'red',
    // });





    }
    else if (isBackPicked) {
      canvas.renderAll();
    }
    else return;                 
    // fabric.Image.fromURL(data, function(img, isError) {
    //   img.set({
    //     scaleX: canvas.width / img.width,
    //     scaleY: canvas.height / img.height,

    //     // scaleX: 1,
    //     // scaleY: 1,
    //     // left: center.left,
    //     // top: center.top,
    //     // originX: 'center', 
    //     // originY: 'center'

    //     // width: canvas.width,
    //     // height: canvas.height,
    //   });
      
      
      // canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas)); // На весь канвас
    // });
 }
  reader.readAsDataURL(file);
  btnClearBgImg.classList.remove('hidden');
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

let removeBtn = document.querySelector('.btn-remove-selected');

removeBtn.onclick = function() {
  let activeObj = canvas.getActiveObject();
  if(activeObj.type === 'activeSelection') {
    activeObj.forEachObject(curObj => {
      canvas.remove(curObj);
    });
    canvas.renderAll();
  } else {
    canvas.remove(activeObj)
    canvas.renderAll();
  }
  hideRemoveBtn();
}

function showRemoveBtn() {
  removeBtn.classList.remove('hidden');
}

function hideRemoveBtn() {
  removeBtn.classList.add('hidden');
}

canvas.on('selection:created', function(options) {
  showRemoveBtn();
  if (options.target.type == 'activeSelection') {
    for(let k in options.selected) {
      if (options.selected[k].type !== 'text' && options.selected[k].type !== 'i-text') {
        return;
      }
    }
    enableFontOptions();
  }
  else if (options.target.type === 'text' || options.target.type === 'i-text') {
    enableFontOptions();
  }
  else {
    disableFontOptions();
  }
});

canvas.on('selection:updated', function(options){
  if (options.target.type == 'activeSelection') {
    console.log('activeSelection');
  }
  if (options.target.type === 'text' || options.target.type === 'i-text') {
    console.log('Text!');
    enableFontOptions();
  }
  else {
    disableFontOptions();
  }
});

canvas.on('selection:cleared', function(options){
  disableFontOptions();
  hideRemoveBtn();
});

let fontColor = document.querySelector('.color-input');

fontColor.oninput = changeTextColor;
fontColor.onchange = changeTextColor;

function changeTextColor() {
  let obj = canvas.getActiveObject();
    if (obj.type === 'activeSelection') {
      obj.forEachObject((curObj) => {
        curObj.set("fill", this.value);
        canvas.renderAll();
      });
    } else if (obj.get('type')==="text" || obj.get('type')==="i-text") {
      obj.set("fill", this.value);
      canvas.renderAll();
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

  let activeObj = canvas.getActiveObject();

  if (activeObj.type === 'text' || activeObj.type === 'i-text') {
    fontFamily.set(activeObj.get("fontFamily"));
    fontColor.value = activeObj.get("fill");
  }
}

disableFontOptions();


let buttonAddText = document.querySelector('.btn-add-text');
buttonAddText.onclick = function() {
  console.log('Txt added!');
  let text = new fabric.IText('Ваш текст');
  canvas.add(text);
  text.centerH();
  text.centerV();
}

btnClearBgImg.onclick = function() {
  console.log('clicked');
  bgFileInput.value = '';
  canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas));
  
  let bgPicker = document.querySelector('.background-picker');
  
  bgPicker.style.backgroundImage = 'none';
  btnClearBgImg.classList.add('hidden');
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
  btnClearBgImg.classList.add('hidden');
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
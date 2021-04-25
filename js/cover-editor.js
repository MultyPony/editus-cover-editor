'use strict';
const { jsPDF } = window.jspdf;

const ORDERID = 123456789;

const SCALE = 0.83;
// const SCALE = 1;

const DOC_WIDTH_MM = 306; // в мм
const DOC_WIDTH_PX = fabric.util.parseUnit(DOC_WIDTH_MM + 'mm'); // в px
const DOC_WIDTH = DOC_WIDTH_PX * SCALE;

const DOC_HEIGHT_MM = 216; // в мм
const DOC_HEIGHT_PX = fabric.util.parseUnit(DOC_HEIGHT_MM + 'mm'); // в px
const DOC_HEIGHT = DOC_HEIGHT_PX * SCALE;

const DOC_SPINE_MM = 20; // в мм
const DOC_SPINE_PX = fabric.util.parseUnit(DOC_SPINE_MM + 'mm'); // в px
const DOC_SPINE = DOC_SPINE_PX * SCALE;

const BOOK_NAME = "Игра престолов";
const BOOK_AUTHOR = "Мартин";

const SPINE_COLOR = '#b0b0b0';
const COVER_COLOR = '#e8e8e8';

const COVER_BLEED_MM = 3; // в мм
// const COVER_BLEED_MM = 17; // в мм
const COVER_BLEED_PX = fabric.util.parseUnit(COVER_BLEED_MM + 'mm'); // в px
const COVER_BLEED = COVER_BLEED_PX * SCALE;

const COVER_MARGIN_MM = 15; // в мм
const COVER_MARGIN_PX = fabric.util.parseUnit(COVER_MARGIN_MM + 'mm'); // в px
const COVER_MARGIN = COVER_MARGIN_PX * SCALE;

const COVER_SPINE_GAP_MM = 6; // в мм
const COVER_SPINE_GAP_PX = fabric.util.parseUnit(COVER_SPINE_GAP_MM + 'mm'); // в px
const COVER_SPINE_GAP = COVER_SPINE_GAP_PX * SCALE;

const LIMIT = COVER_MARGIN + COVER_BLEED;
console.log(LIMIT);

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
  'MarkerFelt',
  'Martina scriptC',
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

const front = {
  bgImg: 'none',
  bgColor: COVER_COLOR,
};


front.canvas = new fabric.Canvas('c-r', {
  // width: fabric.util.parseUnit((DOC_WIDTH_MM - DOC_SPINE_MM) / 2 + 'mm') / 1.2,
  // height: fabric.util.parseUnit(DOC_HEIGHT_MM + 'mm') / 1.2,
  width: ((DOC_WIDTH - DOC_SPINE) / 2),
  height: (DOC_HEIGHT),
  backgroundColor: front.bgColor,
  selectionLineWidth: 2
});

front.bookName = new fabric.Text(BOOK_NAME, {
  fontFamily: 'Arial Black',
  fontSize: 40,
  // top: fabric.util.parseUnit((COVER_BLEED_MM + COVER_MARGIN_MM) + 'mm'),
  top: (COVER_BLEED + COVER_MARGIN),
  textAlign: 'center',
});

function getAuthorBottomMargin() {
  // let docHeight = fabric.util.parseUnit(DOC_HEIGHT_MM + 'mm') / 1.2;
  // let coverMargin = fabric.util.parseUnit(COVER_MARGIN_MM + 'mm') / 1.2;
  // let coverBleed = fabric.util.parseUnit(COVER_BLEED_MM + 'mm') / 1.2;
  // let total = docHeight - (coverMargin + coverBleed) * 2;

  let docHeight = (DOC_HEIGHT);
  let coverMargin = (COVER_MARGIN);
  let coverBleed = (COVER_BLEED);
  let total = docHeight - (coverMargin + coverBleed) * 2;

  return total;
}

front.bookAuthor = new fabric.Text(BOOK_AUTHOR, {
  fontFamily: 'Arial Black',
  fontSize: 30,
  top: getAuthorBottomMargin(),
  textAlign: 'center',
});

front.canvas.add(front.bookName);
front.canvas.add(front.bookAuthor);
front.bookName.centerH();
front.bookAuthor.centerH();


window.activeCanvas = null;



const back = {
  bgImg: 'none',
  bgColor: COVER_COLOR,
};

back.canvas = new fabric.Canvas('c-l', {
  // width: 435,
  // width: fabric.util.parseUnit((DOC_WIDTH_MM - DOC_SPINE_MM) / 2 + 'mm') / 1.2,
  width: ((DOC_WIDTH - DOC_SPINE) / 2),
  // height: fabric.util.parseUnit(DOC_HEIGHT_MM + 'mm') / 1.2,
  height: (DOC_HEIGHT),
  backgroundColor: 'rgb(232,232,232)',
  selectionLineWidth: 2
});

const spine = {
  bgImg: 'none',
  bgColor: SPINE_COLOR,
};

spine.canvas = new fabric.Canvas('c-m', {
  width: (DOC_SPINE),
  // width: fabric.util.parseUnit(DOC_SPINE_MM + 'mm') / 1.2,
  // height: fabric.util.parseUnit(DOC_HEIGHT_MM + 'mm') / 1.2,
  height: (DOC_HEIGHT),
  backgroundColor: SPINE_COLOR,
  selectionLineWidth: 2
});

selectFront();

function selectFront(options) {
  activeCanvas = front;
  if (activeCanvas.canvas.backgroundImage == null) {
    $('.btn-remove-bg-img').addClass('hidden');
    // $('.background-picker').css('background-image', 'none');
  } else {
    $('.btn-remove-bg-img').removeClass('hidden');
  }
  $('.background-picker').css('background-image', activeCanvas.bgImg);

  $('.btn-bg-color').val(activeCanvas.bgColor);

  $(activeCanvas.canvas.contextContainer.canvas).parent().addClass('canvas_selected');
  $(activeCanvas.canvas.contextContainer.canvas).parent().attr('data-content', 'Лицевая сторона обложки');
  $(spine.canvas.contextContainer.canvas).parent().removeClass('canvas_selected');
  $(back.canvas.contextContainer.canvas).parent().removeClass('canvas_selected');

}
front.canvas.on('mouse:down', selectFront);

back.canvas.on('mouse:down', function (options) {
  activeCanvas = back;
  if (activeCanvas.canvas.backgroundImage == null) {
    $('.btn-remove-bg-img').addClass('hidden');
    // $('.background-picker').css('background-image', 'none');
  } else {
    $('.btn-remove-bg-img').removeClass('hidden');
  }
  $('.background-picker').css('background-image', activeCanvas.bgImg);

  $('.btn-bg-color').val(activeCanvas.bgColor);

  $(activeCanvas.canvas.contextContainer.canvas).parent().addClass('canvas_selected');
  $(activeCanvas.canvas.contextContainer.canvas).parent().attr('data-content', 'Обратная сторона обложки');
  $(spine.canvas.contextContainer.canvas).parent().removeClass('canvas_selected');
  $(front.canvas.contextContainer.canvas).parent().removeClass('canvas_selected');
});

spine.canvas.on('mouse:down', function (options) {
  activeCanvas = spine;
  if (activeCanvas.canvas.backgroundImage == null) {
    $('.btn-remove-bg-img').addClass('hidden');
    // $('.background-picker').css('background-image', 'none');
  } else {
    $('.btn-remove-bg-img').removeClass('hidden');
  }
  $('.background-picker').css('background-image', activeCanvas.bgImg);

  $('.btn-bg-color').val(activeCanvas.bgColor);

  $(activeCanvas.canvas.contextContainer.canvas).parent().addClass('canvas_selected');
  $(activeCanvas.canvas.contextContainer.canvas).parent().attr('data-content', 'Корешок');
  $(back.canvas.contextContainer.canvas).parent().removeClass('canvas_selected');
  $(front.canvas.contextContainer.canvas).parent().removeClass('canvas_selected');
});


function loadAndUse(font, obj) {
  var myfont = new FontFaceObserver(font)
  myfont.load()
    .then(function () {
      // when font is loaded, use it.
      obj.set("fontFamily", font);
      front.canvas.requestRenderAll();
      back.canvas.requestRenderAll();
      spine.canvas.requestRenderAll();
    }).catch(function (e) {
      console.log(e)
      alert('Ошибка при загрузке шрифта ' + font);
    });
}

function changeFont(font, textObj) {
  if (fonts.includes(font)) {
    loadAndUse(font, textObj);
  } else {
    textObj.set("fontFamily", font);
    front.canvas.renderAll();
    back.canvas.renderAll();
    spine.canvas.renderAll();
  }
}

/**
 * UI
 */

let fontFamily = new SlimSelect({
  select: '.ff-select',
  showSearch: false,
  onChange: (info) => {
    console.log(info);
    let obj = activeCanvas.canvas.getActiveObject();
    if (obj.type === 'activeSelection') {
      obj.forEachObject((curObj, index, array) => {
        changeFont(info.value, curObj);
      });
    } else if (obj.get('type') === "text" || obj.get('type') === "i-text") {
      changeFont(info.value, obj);
    }
  },
  data: [
    { text: 'Alexandra Zeferino Three' },
    { text: 'Andantino script' },
    { text: 'Aquarelle' },
    { text: 'Arial Black' },
    { text: 'Arial Narrow Bold Italic' },
    { text: 'Arial Narrow Bold' },
    { text: 'Arial Narrow Italic' },
    { text: 'Arial Narrow' },
    { text: 'Arial' },
    { text: 'Arialbd' },
    { text: 'Arialbi' },
    { text: 'Ariali' },
    { text: 'Ariston' },
    { text: 'B52' },
    { text: 'BadScript-Regular' },
    { text: 'BebasNeue Bold' },
    { text: 'BebasNeue Book' },
    { text: 'BebasNeue Regular' },
    { text: 'Cambria Bold' },
    { text: 'Cambria Italic' },
    { text: 'Cambria' },
    { text: 'Cambriaz' },
    { text: 'Cassandra' },
    { text: 'CometaCTT' },
    { text: 'Corinthia' },
    { text: 'Cormorant-Bold' },
    { text: 'Cormorant-Italic' },
    { text: 'Cormorant-Light' },
    { text: 'Cormorant-LightItalic' },
    { text: 'Cormorant-Medium' },
    { text: 'Cormorant-MediumItalic' },
    { text: 'Cormorant-Regular' },
    { text: 'Cormorant-SemiBoldItalic' },
    { text: 'Courier Bold Italic' },
    { text: 'Courier Bold' },
    { text: 'Courier Italic' },
    { text: 'Courier New' },
    { text: 'CyrillicBrush-Medium' },
    { text: 'CyrillicOld' },
    { text: 'Deutsch Gothic' },
    { text: 'Didona Regular' },
    { text: 'Ekaterina Velikaya One' },
    { text: 'Ekaterina Velikaya Two' },
    { text: 'Garamond Bold' },
    { text: 'Garamond Italic' },
    { text: 'Garamond' },
    { text: 'Georgia Bold Italic' },
    { text: 'Georgia Bold' },
    { text: 'Georgia Italic' },
    { text: 'Georgia' },
    { text: 'Good Vibes Pro' },
    { text: 'HelveticaNeueCyr-Black' },
    { text: 'HelveticaNeueCyr-BlackItalic' },
    { text: 'HelveticaNeueCyr-Bold' },
    { text: 'HelveticaNeueCyr-BoldItalic' },
    { text: 'HelveticaNeueCyr-Italic' },
    { text: 'HelveticaNeueCyr-Light' },
    { text: 'HelveticaNeueCyr-LightItalic' },
    { text: 'HelveticaNeueCyr-Medium' },
    { text: 'HelveticaNeueCyr-Roman' },
    { text: 'HelveticaNeueCyr-Thin' },
    { text: 'HelveticaNeueCyr-ThinItalic' },
    { text: 'HelveticaNeueCyr-UltraLight' },
    { text: 'HelveticaNeueCyr-UltraLightItalic' },
    { text: 'Impact' },
    { text: 'Inspiration' },
    { text: 'Journalism' },
    { text: 'Lemon Tuesday' },
    { text: 'Liana' },
    { text: 'Lifehack Sans Medium' },
    { text: 'Lighthaus' },
    { text: 'Literaturnaya Bold' },
    { text: 'Literaturnaya Italic' },
    { text: 'Literaturnaya' },
    { text: 'Lobster' },
    { text: 'MarkerFelt' },
    { text: 'Martina scriptC' },
    { text: 'Maya' },
    { text: 'Medieval English' },
    { text: 'Minion Pro Bold Italic' },
    { text: 'MinionPro-Bold' },
    { text: 'MinionPro-Italic' },
    { text: 'MinionPro-MediumIt' },
    { text: 'MinionPro-Regular' },
    { text: 'Mon Amour One' },
    { text: 'Monotype Corsiva' },
    { text: 'Noteworthy-Bold' },
    { text: 'Noteworthy-Light' },
    { text: 'Philosopher-Bold' },
    { text: 'Philosopher-Regular' },
    { text: 'Pobeda Regular' },
    { text: 'Rex Bold' },
    { text: 'Roboto-Black' },
    { text: 'Roboto-BlackItalic' },
    { text: 'Roboto-Bold' },
    { text: 'Roboto-BoldItalic' },
    { text: 'Roboto-Italic' },
    { text: 'Roboto-Light' },
    { text: 'Roboto-LightItalic' },
    { text: 'Roboto-Medium' },
    { text: 'Roboto-MediumItalic' },
    { text: 'Roboto-Regular' },
    { text: 'RobotoSlabBold' },
    { text: 'RobotoSlabLight' },
    { text: 'RobotoSlabRegular' },
    { text: 'Roboto-Thin' },
    { text: 'Roboto-ThinItalic' },
    { text: 'RodchenkoC' },
    { text: 'Rosa Marena' },
    { text: 'Snell Roundhand' },
    { text: 'Sunday-Regular' },
    { text: 'Times New Roman' },
  ],
});

let fontSize = new SlimSelect({
  select: '.fs-select',
  showSearch: false,
  onChange: (info) => {
    console.log(info);
    let obj = activeCanvas.canvas.getActiveObject();
    if (obj.type === 'activeSelection') {
      obj.forEachObject((curObj) => {
        curObj.set("fontSize", info.value);
        activeCanvas.canvas.renderAll();
      });
    } else if (obj.get('type') === "text" || obj.get('type') === "i-text") {
      obj.set("fontSize", info.value);
      activeCanvas.canvas.renderAll();
    }
  },
  data: [
    { text: '8' },
    { text: '9' },
    { text: '10' },
    { text: '11' },
    { text: '12' },
    { text: '14' },
    { text: '16' },
    { text: '18' },
    { text: '24' },
    { text: '30' },
    { text: '36' },
    { text: '48' },
    { text: '60' },
    { text: '72' },
    { text: '96' },
  ],
});

let fileTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png'
];











let fontColor = document.querySelector('.color-input');

fontColor.oninput = changeTextColor;
fontColor.onchange = changeTextColor;

function changeTextColor() {
  let obj = activeCanvas.canvas.getActiveObject();
  if (obj.type === 'activeSelection') {
    obj.forEachObject((curObj) => {
      curObj.set("fill", this.value);
      activeCanvas.canvas.renderAll();
    });
  } else if (obj.get('type') === "text" || obj.get('type') === "i-text") {
    obj.set("fill", this.value);
    activeCanvas.canvas.renderAll();
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

  let activeObj = activeCanvas.canvas.getActiveObject();

  if (activeObj.type === 'text' || activeObj.type === 'i-text') {
    fontFamily.set(activeObj.get("fontFamily"));
    fontColor.value = activeObj.get("fill");
  }
}

disableFontOptions();






let buttonClearAll = document.querySelector('.btn-clear-all');
buttonClearAll.onclick = function () {
  bgFileInput.value = '';
  imgFileInput.value = '';

  front.canvas.clear();
  back.canvas.clear();
  spine.canvas.clear();
  let bgPicker = document.querySelector('.background-picker');

  bgPicker.style.backgroundImage = 'none';

  front.canvas.add(bookAuthor);
  front.canvas.add(bookName);
  $('.btn-remove-bg-img').addClass('hidden');
  // btnClearBgImg.classList.add('hidden');
}

/**
 * Кнопка Проверить макеты
 * При нажатии должны сгенерироваться 3 изображения с 3-х канвасов
 *  
 * */
let btnSave = document.querySelector('.btn-save');
btnSave.onclick = function () {
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

function exportCanvasToJPEG(canvas) {
  let img = canvas.toDataURL({
    format: 'jpeg',
    quality: 1,
    enableRetinaScaling: true,
    multiplier: 5,
  });
  img = img.replace('data:image/jpeg;base64,', '');

  return img;
}

btnSave.onclick = sendData;

function sendData() {
  let frontImg = exportCanvasToJPEG(front.canvas);
  let backImg = exportCanvasToJPEG(back.canvas);
  let spineImg = exportCanvasToJPEG(spine.canvas);


  // var formData = new FormData();
  // formData.append('picture', firstImg);
  let jsonData = JSON.stringify([backImg, spineImg, frontImg]);

  let resultImg = null;

  $('.loading-container').show();

  $.post("./cover-editor.php",
    {
      orderid: ORDERID,
      images: jsonData,
      bleed: COVER_BLEED_MM,
      margin: COVER_MARGIN_MM,
      spine: DOC_SPINE_MM,
      width: DOC_WIDTH_MM,
      height: DOC_HEIGHT_MM,
    },
    function (data) {
      var a = document.createElement("a"); //Create <a>
      a.href = 'data:application/octet-stream;base64,' + data; //Image Base64 Goes here
      a.download = "cover.pdf"; //File name Here
      a.click(); //Downloaded file

      // var blob = new Blob([data], { type: 'application/pdf' });
      // console.log(typeof data);
      // var a = document.createElement('a');
      // var url = window.URL.createObjectURL(data);
      // var url = window.URL.createObjectURL(blob);
      // a.href = url;
      // a.download = 'myfile.pdf';
      // document.body.append(a);
      // a.click();
      // a.remove();
      // window.URL.revokeObjectURL(url);
      // console.log(data)

      // let doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [DOC_WIDTH_MM, DOC_HEIGHT_MM] });
      // doc.addImage(data, "JPEG", 0, 0, DOC_WIDTH_MM, DOC_HEIGHT_MM, 'NONE');
      // doc.save();
      $('.loading-container').hide();
    });


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
}

window.sendData = sendData;


function makeNsavePdf(data) {
  let doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const page = doc.getCurrentPageInfo();
  page.pageContext.trimBox = {
    bottomLeftX: 2,
    bottomLeftY: 2,
    topRightX: 8,
    topRightY: 8,
  };
  doc.addImage(data, "JPEG", 0, 0, 210, 297, 'NONE');
  doc.save();
}




/**
 * Фоновое изображение
 */

$('.btn-bg-img').click(function () {
  $('#bg-file-input').click();
});
$('#bg-file-input').change(addBackgroundImage);

function addBackgroundImage() {
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
    activeCanvas.bgImg = `url('${reader.result}')`;
    bgPicker.style.backgroundImage = activeCanvas.bgImg;

    var center = activeCanvas.canvas.getCenter();
    var data = event.target.result;
    fabric.Image.fromURL(data, function (img, isError) {
      img.set({
        scaleX: activeCanvas.canvas.width / img.width,
        scaleY: activeCanvas.canvas.height / img.height,

        // scaleX: 1,
        // scaleY: 1,
        // left: center.left,
        // top: center.top,
        // originX: 'center', 
        // originY: 'center'

        // width: canvas.width,
        // height: canvas.height,
      });
      activeCanvas.canvas.setBackgroundImage(img, activeCanvas.canvas.renderAll.bind(activeCanvas.canvas));
    });
  }
  reader.readAsDataURL(file);
  $('.btn-remove-bg-img').removeClass('hidden');
  // btnClearBgImg.classList.remove('hidden');
}

/**
 * Очистить фоновое изображение
 */

$('.btn-remove-bg-img').click(clearBackgroundImage);

function clearBackgroundImage() {
  $('#bg-file-input').val('');
  activeCanvas.bgImg = 'none';
  activeCanvas.canvas.setBackgroundImage(null, activeCanvas.canvas.renderAll.bind(activeCanvas.canvas));
  $('.background-picker').css('background-image', 'none');
  $('.btn-remove-bg-img').addClass('hidden');
}

/**
 * Фоновый цвет
 */

// Установить цвет ввод в стартовое значение
$('.btn-bg-color').val('#e8e8e8');

$('.btn-bg-color').on('input', changeBackgroundColor);
$('.btn-bg-color').change(changeBackgroundColor);

function changeBackgroundColor() {
  // console.log(this.value);
  activeCanvas.bgColor = this.value;
  activeCanvas.canvas.setBackgroundColor(this.value, activeCanvas.canvas.renderAll.bind(activeCanvas.canvas));
}

/**
 * Вставить текст
 */

$('.btn-add-text').click(addText);

function addText() {
  console.log('Txt added!');
  let text = new fabric.IText('Ваш текст');
  activeCanvas.canvas.add(text);
  text.centerH();
  text.centerV();
}

/**
 * Вставить изображение
 */

$('.btn-add-img').click(function () {
  $('#add-img-input').click();
});
$('#add-img-input').change(addImage);

function addImage() {
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
    var center = activeCanvas.canvas.getCenter();
    var data = event.target.result;
    fabric.Image.fromURL(data, function (img, isError) {
      img.set({
        left: 0, top: 0, scaleX: 0.1, scaleY: 0.1,
      });
      activeCanvas.canvas.add(img);
      img.center();
    });
  }
  reader.readAsDataURL(file);
}


/**
 * Удалить выбранный элемент
 */

$('.btn-remove-selected').click(removeSelected);

function removeSelected() {
  let activeObj = activeCanvas.canvas.getActiveObject();
  if (activeObj.type === 'activeSelection') {
    activeObj.forEachObject(curObj => {
      activeCanvas.canvas.remove(curObj);
    });
    activeCanvas.canvas.renderAll();
  } else {
    activeCanvas.canvas.remove(activeObj);
    activeCanvas.canvas.renderAll();
  }
  $('.btn-remove-selected').addClass('hidden');
}

function showRemoveBtn() {
  removeBtn.classList.remove('hidden');
}






function validFileType(file) {
  for (let i = 0; i < fileTypes.length; i++) {
    if (file.type === fileTypes[i]) {
      return true;
    }
  }
  return false;
}


front.canvas.on('selection:created', selectionCreated);
back.canvas.on('selection:created', selectionCreated);
spine.canvas.on('selection:created', selectionCreated);

function selectionCreated(options) {
  $('.btn-remove-selected').removeClass('hidden');
  if (options.target.type == 'activeSelection') {
    for (let k in options.selected) {
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
}

front.canvas.on('selection:updated', selectionUpdated);
back.canvas.on('selection:updated', selectionUpdated);
spine.canvas.on('selection:updated', selectionUpdated);

function selectionUpdated(options) {
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
}

front.canvas.on('selection:cleared', selectionCleared);
back.canvas.on('selection:cleared', selectionCleared);
spine.canvas.on('selection:cleared', selectionCleared);

function selectionCleared(options) {
  disableFontOptions();
  $('.btn-remove-selected').addClass('hidden');
}


/**
 * Добавить вылеты под обрез (мягкая обложка)
 *                 под загиб (твердая обложка)
 */

function addBleeds() {
  // Обратная сторона обложки
  $('#c-l').parent().append('<div class="top-bleed"></div>');
  $('#c-l').parent().append('<div class="left-bleed"></div>');
  $('#c-l').parent().append('<div class="bottom-bleed"></div>');

  $('.top-bleed').css('height', `${COVER_BLEED}px`);
  $('.bottom-bleed').css('height', `${COVER_BLEED}px`);
  $('.left-bleed').css('height', `calc(100% - ${COVER_BLEED * 2}px)`);
  $('.left-bleed').css('width', `${COVER_BLEED}px`);
  $('.left-bleed').css('top', `${COVER_BLEED}px`);

  // Лицевая сторона обложки
  $('#c-r').parent().append('<div class="top-bleed"></div>');
  $('#c-r').parent().append('<div class="right-bleed"></div>');
  $('#c-r').parent().append('<div class="bottom-bleed"></div>');

  $('.top-bleed').css('height', `${COVER_BLEED}px`);
  $('.bottom-bleed').css('height', `${COVER_BLEED}px`);
  $('.right-bleed').css('height', `calc(100% - ${COVER_BLEED * 2}px)`);
  $('.right-bleed').css('width', `${COVER_BLEED}px`);
  $('.right-bleed').css('top', `${COVER_BLEED}px`);
}

addBleeds();

/**
 * Добавить отступы от края обложки
 */

function addMargins() {
  // Обратная сторона обложки
  $('#c-l').parent().append('<div class="top-margin"></div>');
  $('#c-l').parent().append('<div class="left-margin"></div>');
  $('#c-l').parent().append('<div class="right-margin"></div>');
  $('#c-l').parent().append('<div class="bottom-margin"></div>');

  // Лицевая сторона обложки
  $('#c-r').parent().append('<div class="top-margin"></div>');
  $('#c-r').parent().append('<div class="left-margin"></div>');
  $('#c-r').parent().append('<div class="right-margin"></div>');
  $('#c-r').parent().append('<div class="bottom-margin"></div>');

  $('.top-margin').css('width', `calc(100% - ${COVER_BLEED}px)`);
  $('.top-margin').css('height', `${COVER_MARGIN}px`);
  $('.top-margin').css('top', `${COVER_BLEED}px`);
  $('#c-l ~ .top-margin').css('left', `${COVER_BLEED}px`);
  $('#c-r ~ .top-margin').css('right', `${COVER_BLEED}px`);

  $('.left-margin').css('width', `${COVER_MARGIN}px`);
  $('.left-margin').css('height', `calc(100% - ${(COVER_BLEED * 2) + (COVER_MARGIN * 2)}px)`);
  $('.left-margin').css('top', `${COVER_BLEED + COVER_MARGIN}px`);
  $('#c-l ~ .left-margin').css('left', `${COVER_BLEED}px`);
  $('#c-r ~ .left-margin').css('left', `0`);

  $('.bottom-margin').css('width', `calc(100% - ${COVER_BLEED}px)`);
  $('.bottom-margin').css('height', `${COVER_MARGIN}px`);
  $('#c-l ~ .bottom-margin').css('left', `${COVER_BLEED}px`);
  $('#c-r ~ .bottom-margin').css('right', `${COVER_BLEED}px`);
  $('.bottom-margin').css('bottom', `${COVER_BLEED}px`);

  $('.right-margin').css('width', `${COVER_MARGIN}px`);
  $('.right-margin').css('height', `calc(100% - ${(COVER_BLEED * 2) + (COVER_MARGIN * 2)}px)`);
  $('.right-margin').css('top', `${COVER_BLEED + COVER_MARGIN}px`);
  $('#c-r ~ .right-margin').css('right', `${COVER_BLEED}px`);
}

addMargins();

/**
 * Добавить отставы для корешка
 */

function addSpineGaps() {
  $('#c-m').parent().append('<div class="left-bleed"></div>');
  $('#c-m').parent().append('<div class="right-bleed"></div>');

  // $('#c-m ~ .left-bleed').css('width', `${COVER_SPINE_GAP_MM}mm`);
  $('#c-m ~ .left-bleed').css('width', `${COVER_SPINE_GAP}px`);
  $('#c-m ~ .left-bleed').css('height', `100%`);
  $('#c-m ~ .right-bleed').css('width', `${COVER_SPINE_GAP}px`);
  $('#c-m ~ .right-bleed').css('height', `100%`);

  $('#c-m ~ .left-bleed').css('background', `#777776`);
  $('#c-m ~ .right-bleed').css('background', `#777776`);

}

addSpineGaps();


/**
 * Добавить ШТРИХ-КОД
 */

function addBarcode() {
  $('#c-l').parent().append('<div class="barcode"></div>');

  $('.barcode').css('bottom', `${COVER_BLEED + COVER_MARGIN}px`);
  $('.barcode').css('right', `${COVER_MARGIN}px`);
}

addBarcode();



/**
 * ОГРАНИЧЕНИЯ ПО ПЕРИМЕТРУ КАНВАСА
 */

back.canvas.on('object:moving', function (e) {
  var obj = e.target;
  // if object is too big ignore
  var width = obj.width * obj.scaleX;
  var height = obj.height * obj.scaleY;

  // if (height > obj.canvas.height - 80 || width > obj.canvas.width - 100) {
  //     obj.width = width / obj.scaleX;
  //     obj.height = height / obj.scaleY;
  //     obj.scaleX = 1;
  //     obj.scaleY = 1;
  //     back.canvas.requestRenderAll();
  //     return;
  // }
  obj.setCoords();

  // top corner
  if (obj.getBoundingRect().top < LIMIT) {
    obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top) + LIMIT;
  }
  // left  corner
  if (obj.getBoundingRect().left < LIMIT) {
    obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left) + LIMIT;
  }
  // bot corner
  if ((obj.getBoundingRect().top + obj.getBoundingRect().height) + LIMIT > obj.canvas.height) {
    obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top) - LIMIT;
  }

  // right corner
  if ((obj.getBoundingRect().left + obj.getBoundingRect().width) + (LIMIT - COVER_BLEED) > obj.canvas.width) {
    obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left) - (LIMIT - COVER_BLEED);
  }
});

front.canvas.on('object:moving', function (e) {
  var obj = e.target;
  // if object is too big ignore
  var width = obj.width * obj.scaleX;
  var height = obj.height * obj.scaleY;

  // if (height > obj.canvas.height - 80 || width > obj.canvas.width - 100) {
  //     obj.width = width / obj.scaleX;
  //     obj.height = height / obj.scaleY;
  //     obj.scaleX = 1;
  //     obj.scaleY = 1;
  //     front.canvas.requestRenderAll();
  //     return;
  // }
  obj.setCoords();

  // top corner
  if (obj.getBoundingRect().top < LIMIT) {
    obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top) + LIMIT;
  }
  // left  corner
  if (obj.getBoundingRect().left < (LIMIT - COVER_BLEED)) {
    obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left) + (LIMIT - COVER_BLEED);
  }
  // bot corner
  if ((obj.getBoundingRect().top + obj.getBoundingRect().height) + LIMIT > obj.canvas.height) {
    obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top) - LIMIT;
  }

  // right corner
  if ((obj.getBoundingRect().left + obj.getBoundingRect().width) + LIMIT > obj.canvas.width) {
    obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left) - LIMIT;
  }
});


$( document ).ready(function () {
  $('.loading-container').hide();
});
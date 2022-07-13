// Method to upload a valid excel file
function upload() {
  var files = document.getElementById("file_upload").files;
  if (files.length == 0) {
    alert("Please choose any file...");
    return;
  }
  var filename = files[0].name;
  var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
  if (extension == ".XLS" || extension == ".XLSX") {
    excelFileToJSON(files[0]);
  } else {
    alert("Please select a valid excel file.");
  }
}

//Method to read excel file and convert it into JSON
function excelFileToJSON(file) {
  try {
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function (e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: "binary",
      });
      var result = {};
      workbook.SheetNames.forEach(function (sheetName) {
        var roa = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheetName]
        );
        if (roa.length > 0) {
          result[sheetName] = roa;
        }
      });
      //displaying the json result
      var resultEle = document.getElementById("json-result");
      resultEle.value = JSON.stringify(result, null, 4);
      resultEle.style.display = "block";
    };
  } catch (e) {
    console.error(e);
  }
}

// ** Start Code to jquery

// console.log(Products);

var getCanvas; // global variable
var element = $("#imageDIV"); // global variable

$("#download").on("click", function () {
    $("#Image-1").hide();

    let productName = $(".productName").val(),
      price = $(".price").val();
    $("#capture").append(
      `
      <div id="Image-1" class="image-container">
            <div class="card">
              <div class="card-header">
                <div class="k-logo">
                  <img src="./arabic & english home kit logo (2).png" alt="" />
                </div>
                <div class="h-logo">
                  <img src="./alhowaiml.png" alt="" />
                </div>
              </div>
              <div class="card-body">
                <h3 class="title">${productName}</h3>
                <h3 class="price">${price} ريال</h3>
              </div>
            </div>
          </div>
        `
    );

  }); 

$("document").ready(function () {
  html2canvas(document.querySelector("#capture")).then((canvas) => {
    document.body.appendChild(canvas);
    console.log(canvas);
  });

  function capture() {
    const captureElement = document.querySelector("#capture");
    html2canvas(captureElement)
      .then((canvas) => {
        canvas.style.display = "none";
        document.body.appendChild(canvas);
        return canvas;
      })
      .then((canvas) => {
        const image = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        const a = document.createElement("a");
        a.setAttribute("download", "my-image.png");
        a.setAttribute("href", image);
        a.click();
        canvas.remove();
      });
  }

  const btn = document.querySelector("#download");
  btn.addEventListener("click", capture);

 

  // $.each(Products, function (i, item) {
  //   // console.log(i.);
  //   setTimeout(() => {
  //     $("#capture").append(
  //       `
  //   <div id="${i}" class="image-container">
  //         <div class="card">
  //           <div class="card-header">
  //             <div class="k-logo">
  //               <img src="./arabic & english home kit logo (2).png" alt="" />
  //             </div>
  //             <div class="h-logo">
  //               <img src="./alhowaiml.png" alt="" />
  //             </div>
  //           </div>
  //           <div class="card-body">
  //             <h3 class="title">${item.__EMPTY}</h3>
  //             <h3 class="price">${item.__EMPTY_21} ريال</h3>
  //           </div>
  //         </div>
  //       </div>

  //     `
  //     );

  //     // $("#download").click();
  //     $(`#${i}`).hide();
  //   }, 5000);
  // });
});

localStorage.setItem("isOpen", true); // 存储开启状态

window.addEventListener("beforeunload", function () { //当页面关闭时清除开启状态
  localStorage.removeItem("isOpen");
})

window.addEventListener("storage", function () { // 监控 storage 事件
  updateView();
})

window.onload = function () {
  updateView();

  // 清空所有
  document.querySelector(".deleteAll").onclick = function () {
    localStorage.removeItem("musicData");
    updateView();
  }

  // 清除勾选项
  document.querySelector(".deleteItem").onclick = function () {
    let inputs = document.querySelectorAll(".exchange input");
    let musicData = JSON.parse(localStorage.getItem("musicData")) || [];
    inputs.forEach((v, k) => {
      if (v.checked) {
        musicData.splice(k, 1);
      }
    })
    localStorage.setItem("musicData", JSON.stringify(musicData));
    updateView();
  }
}

// 更新视图
function updateView() {
  let musicData = localStorage.getItem("musicData");
  if (musicData) {
    musicData = JSON.parse(musicData);
    let innerContent = "";
    musicData.forEach(v => {
      let str = `<ul class="myul">
                        <input type="checkbox" />
                        <li>${v.songName}</li>    
                        <li>${v.singer}</li>  
                        <li>${v.time}</li>          
                       </ul>`;
      innerContent += str;
    })
    document.querySelector(".exchange").innerHTML = innerContent;
  } else {
    document.querySelector(".exchange").innerHTML = "";
  }
}
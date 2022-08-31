const $siteList = $(".siteList");
var input = document.querySelector("input");
var marker = document.getElementById("marker");
input.addEventListener("click", () => {
  marker.style.display = "block";
  $(document).unbind("keypress");//input聚焦状态取消快捷跳转
});

input.addEventListener("blur", ()=>{
  marker.style.display = "none";
});
$siteList.display = "none";
const $lastLi = $siteList.find("li.last");
const hashTable = JSON.parse(localStorage.getItem("hashTable")); //获取localStorage，第一次执行的为空
const hashMap = hashTable || [
  { logo: "A", url: "https://www.acfun.cn" },
  { logo: "B", url: "https://www.bilibili.com" },
];
//简化url
const simplifyUrl = (url) => {
  //删除网址前缀,简化url
  return url
    .replace("https://", "") //replace后会产生新的字符串，故不能直接return原来的url
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //删除斜杆后面的内容——  / \ /.*/   /为斜杆，\为反斜杆，反斜杆为转义字符，表示斜杆用：\ /  ,表示斜杆后面的所有内容： /.*
};
//渲染hash生成模板
const render = () => {
  $siteList.find("li:not(.last)").remove(); //移除已有网址防止重新渲染
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
          <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
              <svg class="icon">
                <use xlink:href="#icon-close"></use>
              </svg>
            </div>
          </div>
        </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); //阻止close事件冒泡到卡片open事件
      hashMap.splice(index, 1);
      render();
    });
  });
};
render(); //初始化渲染

$(".addButton").on("click", () => {
  //添加点击事件，新增网址卡片
  let url = prompt("请输入你要新增网站的网址：");
  if (url.indexOf("https") !== 0) {
    url = "https://" + url; //用户体验：兼容用户输入的url
  }

  hashMap.push({
    //将新增网址内容插入哈希数组  读档
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
  });
  render(); // 重新渲染哈希数组以读档
});
window.onbeforeunload = () => {
  //页面要关闭之前
  const hashTable = JSON.stringify(hashMap); //将哈希数组从对象转化为字符串
  localStorage.setItem("hashTable", hashTable);
};
$(document).on("keypress", (e) => {
  //监听键盘事件
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    //遍历哈希，找到键盘按下的键与之对应的哈希
    // if(input.blur){
    //     return
    // }
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});

(function () {
const $16b5ad875ae907e2f7f79e7b8fe116cc$var$$siteList = $('.siteList');
var $16b5ad875ae907e2f7f79e7b8fe116cc$var$put = document.querySelector("input");
var $16b5ad875ae907e2f7f79e7b8fe116cc$var$d = document.getElementById("marker");
$16b5ad875ae907e2f7f79e7b8fe116cc$var$put.addEventListener("click", $16b5ad875ae907e2f7f79e7b8fe116cc$var$f1);
$16b5ad875ae907e2f7f79e7b8fe116cc$var$put.addEventListener("click", $16b5ad875ae907e2f7f79e7b8fe116cc$var$f2);
function $16b5ad875ae907e2f7f79e7b8fe116cc$var$f1() {
    $16b5ad875ae907e2f7f79e7b8fe116cc$var$d.style.display = "block";
}
function $16b5ad875ae907e2f7f79e7b8fe116cc$var$f2() {
}
$16b5ad875ae907e2f7f79e7b8fe116cc$var$$siteList.display = "none";
$16b5ad875ae907e2f7f79e7b8fe116cc$var$put.addEventListener("blur", function() {
    $16b5ad875ae907e2f7f79e7b8fe116cc$var$d.style.display = "none";
});
const $16b5ad875ae907e2f7f79e7b8fe116cc$var$$lastLi = $16b5ad875ae907e2f7f79e7b8fe116cc$var$$siteList.find('li.last');
const $16b5ad875ae907e2f7f79e7b8fe116cc$var$x = localStorage.getItem('x')//获取localStorage，第一次执行的为空
;
const $16b5ad875ae907e2f7f79e7b8fe116cc$var$xObject = JSON.parse($16b5ad875ae907e2f7f79e7b8fe116cc$var$x)//将localStorage从字符串转化为对象
;
const $16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap = $16b5ad875ae907e2f7f79e7b8fe116cc$var$xObject || [
    {
        logo: 'A',
        url: 'https://www.acfun.cn'
    },
    {
        logo: 'B',
        url: 'https://www.bilibili.com'
    }
];
const $16b5ad875ae907e2f7f79e7b8fe116cc$var$simplifyUrl = (url)=>{
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); //删除斜杆后面的内容——  / \ /.*/   /为斜杆，\为反斜杆，反斜杆为转义字符，表示斜杆用：\ /  ,表示斜杆后面的所有内容： /.*
};
const $16b5ad875ae907e2f7f79e7b8fe116cc$var$render = ()=>{
    $16b5ad875ae907e2f7f79e7b8fe116cc$var$$siteList.find('li:not(.last)').remove(); //移除已有网址防止重新渲染
    $16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap.forEach((node, index)=>{
        const $li = $(`<li>\n          <div class="site">\n            <div class="logo">${node.logo}</div>\n            <div class="link">${$16b5ad875ae907e2f7f79e7b8fe116cc$var$simplifyUrl(node.url)}</div>\n            <div class="close">\n              <svg class="icon">\n                <use xlink:href="#icon-close"></use>\n              </svg>\n            </div>\n          </div>\n        </li>`).insertBefore($16b5ad875ae907e2f7f79e7b8fe116cc$var$$lastLi);
        console.log($li);
        $li.on('click', ()=>{
            window.open(node.url);
        });
        $li.on('click', '.close', (e)=>{
            e.stopPropagation(); //阻止冒泡到close按钮
            $16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap.splice(index, 1);
            $16b5ad875ae907e2f7f79e7b8fe116cc$var$render();
        });
    });
};
$16b5ad875ae907e2f7f79e7b8fe116cc$var$render(); //先全部渲染一遍
$('.addButton').on('click', ()=>{
    let url = prompt('请输入你要新增网站的网址：');
    if (url.indexOf('https') !== 0) url = 'https://' + url;
    $16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap.push({
        logo: $16b5ad875ae907e2f7f79e7b8fe116cc$var$simplifyUrl(url)[0].toUpperCase(),
        url: url
    });
    $16b5ad875ae907e2f7f79e7b8fe116cc$var$render(); // 重新渲染哈希数组以读档
});
window.onbeforeunload = ()=>{
    const myStorage = JSON.stringify($16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap)//将哈希数组从对象转化为字符串
    ;
    localStorage.setItem('x', myStorage);
};
$(document).on('keypress', (e)=>{
    const { key: key  } = e;
    for(let i = 0; i < $16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap.length; i++)if ($16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap[i].logo.toLowerCase() === key) window.open($16b5ad875ae907e2f7f79e7b8fe116cc$var$hashMap[i].url);
});

})();
//# sourceMappingURL=index.4b6fd05b.js.map

const $siteList = $('.siteList')
var put = document.querySelector("input")
var d = document.getElementById("marker")
put.addEventListener("click", f1)
put.addEventListener("click", f2)

function f1() {
    d.style.display = "block";
}

function f2() {}
$siteList.display = "none"

put.addEventListener("blur", function() {
    d.style.display = "none"
})

const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x') //获取localStorage，第一次执行的为空
const xObject = JSON.parse(x) //将localStorage从字符串转化为对象
const hashMap = xObject || [ //渲染哈希，或逻辑，如果xObject有内容则渲染，无则渲染后者
    { logo: 'A', url: 'https://www.acfun.cn' },
    { logo: 'B', url: 'https://www.bilibili.com' }
]
const simplifyUrl = (url) => { //删除网址前缀,简化url
    return url.replace('https://', '') //replace后会产生新的字符串，故不能直接return原来的url
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') //删除斜杆后面的内容——  / \ /.*/   /为斜杆，\为反斜杆，反斜杆为转义字符，表示斜杆用：\ /  ,表示斜杆后面的所有内容： /.*
}
const render = () => { //声明渲染函数
    $siteList.find('li:not(.last)').remove() //移除已有网址防止重新渲染
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
        </li>`).insertBefore($lastLi)
        console.log($li);
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() //阻止冒泡到close按钮
            hashMap.splice(index, 1)
            render()

        })
    })
}
render() //先全部渲染一遍

$('.addButton')
    .on('click', () => { //添加点击事件，新增网址卡片
        let url = prompt('请输入你要新增网站的网址：')
        if (url.indexOf('https') !== 0) {
            url = 'https://' + url
        }

        hashMap.push({ //将新增网址内容插入哈希数组读档
            logo: simplifyUrl(url)[0].toUpperCase(),
            url: url,
        });
        render() // 重新渲染哈希数组以读档
    });
window.onbeforeunload = () => {
    const myStorage = JSON.stringify(hashMap) //将哈希数组从对象转化为字符串
    localStorage.setItem('x', myStorage)
}
$(document).on('keypress', (e) => { //监听键盘事件
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) { //遍历哈希，找到键盘按下的键与之对应的哈希
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})
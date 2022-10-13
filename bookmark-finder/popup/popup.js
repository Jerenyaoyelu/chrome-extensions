const container = document.getElementById('__bk-list-container');

let bookmarks = [];

let list = [];

// 获取书签列表
chrome.bookmarks.getTree(function (nodes) {
  console.log(nodes);
  bookmarks = nodes[0].children;
  list = nodes[0].children;
  generateBkList();
});

// 生成书签列表
function generateBkList() {
  const el = container || document.body;
  list.forEach((node) => {
    el.appendChild(createItemWrapper(node));
  });
}

// 模糊搜索书签todo
// function search

// 获取网站favicon

function createItemWrapper(node) {
  const ul = document.createElement('ul');
  const title = document.createElement('h4');
  title.innerText = node.title;
  ul.appendChild(title);
  node.children.forEach((item) => {
    ul.appendChild(createItem(item));
  });
  return ul;
}

function createItem(leaf) {
  const li = document.createElement('li');
  li.className = '__bk-item';
  const a = document.createElement('a');
  a.innerText = leaf.title;
  a.href = leaf.url;
  a.setAttribute('target', '__blank');
  a.className = '__bk-item-name';
  li.appendChild(a);
  return li;
}

// 输入框绑定事件
var input = document.getElementById('__bk-input');
if (input) {
  input.onchange = handleChange;
}

function handleChange(v) {
  chrome.tts.speak('Hello' + v.target.value);
}

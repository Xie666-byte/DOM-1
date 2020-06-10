//封装DOM
window.dom={
    //创建节点
    create(string){//相当于window.dom.create,string是要传入的节点
        const container = document.createElement("template");
        container.innerHTML=string.trim();//将要传入的节点传给目标节点，上面目标节点是template，这个标签可以容纳任意的元素;trim()可以去掉目标节点中的空格
        return container.content.firstChild;
        //创建节点时，在id为test的div外面加一个div才有有效，否则就会报错，具体原因未知
    },
    //新增一个弟弟,在node节点后面加node2节点
    after(node,node2){
        node.parentNode.insertBefore(node2,node.nextSibling);
    },
    //新增一个哥哥，把node2加到node前面
    before(node,node2){
        node.parentNode.insertBefore(node2,node);
    },
    //新增儿子
    append(parent,node){
        parent.appendChild(node)
    },
    //新增爸爸
    wrap(node,parent){
        //先把parent放入到node节点前面，然后把node放到parent节点里面
        dom.before(node,parent)
        dom.append(parent,node)
    },
    //删除节点
    remove(node){
        node.parentNode.removeChild(node)
        return node
    },
    //删除所有子节点
    empty(node){
        const {childNodes} = node;//等价于const childNodes = node.childNodes;
        const array = []
        let x = node.firstChild //第一个节点
        //当第一个节点x存在，就把x移除放在空数组里面
        while(x){
            array.push(dom.remove(node.firstChild))
            x=node.firstChild
        }
        return array
    },
    //读写（改）属性
    attr(node,name,value){
        //重载：根据参数的个数，写不同的代码
        if(arguments.length===3){
            node.setAttribute(name,value)
        }else if(arguments.length===2){
            return node.getAttribute(name)
        }
    },
    //读写（改）标签的文本内容
    text(node,string){
        //node.innerText = string 适用于ie
        //node.textContent = string 适用于firefox、chrome
        //为了功能可以在所有的浏览器中使用，可以做一个检测，这种方式叫做适配
        if('innerText' in node){
            node.innerText = string
        }else{
            node.textContent = string
        }
    },
    //改html内容
    html(node,string){
        if(arguments.length===2){
            node.innerHTML = string
        }else if(arguments.length===1){
            return node.innerHTML
        }
    },
    //修改style属性，下面是修改node节点的属性
    style(node,name,value){
        if(arguments.length===3){
            //dom.style(div,'color','red')
            node.style[name] = value
        }else if(arguments===2){
            if(typeof name ==='string'){
                //dom.style(div,'color')
                return node.style[name]
            }else if(name instanceof Object){
                const object = name
                //遍历name
        for(let key in object){
            node.style[key] = object[key]
        }
            }
        }
        
    },
    //添加class
    class:{
        add(node,className){
            node.classList.add(className)
        }
    },
    //删除class
    remove(node,className){
        node.classList.remove(className)
    },
    //想知道有没有class
    has(node,className){
        return node.classList.contains(className)
    },
    on(node,eventName,fn){
        node.addEventListener(eventName,fn)
    },
    off(node,eventName,fn){
        node.removeEventListener(eventName,fn)
    },
    find(selector, scope){
        return (scope || document).querySelectorAll(selector)
      },
      parent(node){
        return node.parentNode
      },
      children(node){
        return node.children
      },
      siblings(node){
        return Array.from(node.parentNode.children)
        .filter(n=>n!==node)
      },
      next(node){
        let x = node.nextSibling
        while(x && x.nodeType === 3){
          x = x.nextSibling
        }
        return x
      },
      previous(node){
        let x = node.previousSibling
        while(x && x.nodeType === 3){
          x = x.previousSibling
        }
        return x
      },
      each(nodeList, fn){
        for(let i=0;i<nodeList.length;i++){
          fn.call(null, nodeList[i])
        }
      },
      index(node){
        const list = dom.children(node.parentNode)
        let i
        for(i=0;i<list.length;i++){
          if(list[i] === node){
            break
          }
        }
        return i
      }
};
!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),r=document.querySelector("body");t.addEventListener("click",(function(){n=setInterval(o,1e3),a(t,e)})),e.addEventListener("click",(function(){clearInterval(n),a(t,e)}));var n=null;function a(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];var n=!0,a=!1,o=void 0;try{for(var l,c=e[Symbol.iterator]();!(n=(l=c.next()).done);n=!0){var i=l.value;i.hasAttribute("disabled")?i.removeAttribute("disabled"):i.setAttribute("disabled","")}}catch(t){a=!0,o=t}finally{try{n||null==c.return||c.return()}finally{if(a)throw o}}}function o(){r.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}}();
//# sourceMappingURL=01-color-switcher.b60bc301.js.map
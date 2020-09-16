const t=({h:t,s:e,v:o,a:s})=>{const r=(200-e)*o/100;return{h:t,s:r>0&&r<200?e*o/100/(r<=100?r:200-r)*100:0,l:r/2,a:s}},e=e=>{const{h:o,s:s,l:r}=t(e);return`hsl(${o}, ${s}%, ${r}%)`},o=e=>{const{h:o,s:s,l:r,a:n}=t(e);return`hsla(${o}, ${s}%, ${r}%, ${n})`},s=(t,e)=>{if(t===e)return!0;for(const o in t)if(t[o]!==e[o])return!1;return!0},r=t=>{const e=document.createElement("template");return e.innerHTML=t,e},n=(t,e)=>{const o=t.shadowRoot||t.attachShadow({mode:"open"});return o.appendChild(e.content.cloneNode(!0)),o};const i=t=>t>1?1:t<0?0:t,a=r('\n<style>#interactive{position:absolute;left:0;top:0;width:100%;height:100%;touch-action:none;user-select:none;-webkit-user-select:none}[part=pointer]{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;transform:translate(-50%, -50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}[part=pointer]::after{display:block;content:"";position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit;background-color:currentColor}</style>\n<div id="interactive"><div part="pointer"></div></div>\n'),h=(t,e)=>{const o=e instanceof MouseEvent?e:e.touches[0];return{left:i((o.pageX-(t.left+window.pageXOffset))/t.width),top:i((o.pageY-(t.top+window.pageYOffset))/t.height)}};class c extends HTMLElement{constructor(){super(),this.pointer=n(this,a).querySelector("[part=pointer]").style,this.addEventListener("mousedown",this),this.addEventListener("touchstart",this)}set dragging(t){const e=t?document.addEventListener:document.removeEventListener;e("mousemove",this),e("touchmove",this),e("mouseup",this),e("touchend",this)}handleEvent(t){switch(t.type){case"mousedown":case"touchstart":if(t instanceof MouseEvent&&0!==t.button)return;this.onMove(t),this.dragging=!0;break;case"mousemove":case"touchmove":t.preventDefault(),this.onMove(t);break;case"mouseup":case"touchend":this.dragging=!1}}onMove(t){this.dispatchEvent(new CustomEvent("move",{bubbles:!0,detail:this.getMove(h(this.getBoundingClientRect(),t))}))}setStyles(t){for(const e in t)this.pointer.setProperty(e,t[e])}}const l=r("<style>:host{position:relative;bottom:0;left:0;right:0;height:24px;background:linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)}[part=pointer]{top:50%;z-index:2}</style>");customElements.define("vc-hue",class extends c{constructor(){super(),n(this,l)}connectedCallback(){if(this.hasOwnProperty("hue")){const t=this.hue;delete this.hue,this.hue=t}}set hue(t){this.setStyles({left:t/360*100+"%",color:e({h:t,s:100,v:100,a:1})})}getMove(t){return{h:360*t.left}}});const d=r('<style>:host{display:block;position:relative;flex-grow:1;border-bottom:12px solid #000;border-radius:8px 8px 0 0}:host::after,:host::before{content:"";position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;border-radius:inherit}:host::before{background:linear-gradient(to right, #fff, rgba(255, 255, 255, 0))}:host::after{background:linear-gradient(to top, #000, rgba(0, 0, 0, 0));box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part=pointer]{z-index:3}</style>');customElements.define("vc-saturation",class extends c{constructor(){super(),n(this,d)}connectedCallback(){if(this.hasOwnProperty("hsva")){const t=this.hsva;delete this.hsva,this.hsva=t}}set hsva(t){this.style.backgroundColor=e({h:t.h,s:100,v:100,a:1}),this.setStyles({top:100-t.v+"%",left:t.s+"%",color:e(t)})}getMove(t){return{s:100*t.left,v:Math.round(100-100*t.top)}}});const u=r('\n<style>:host{display:flex;flex-direction:column;position:relative;width:200px;height:200px;user-select:none;-webkit-user-select:none;cursor:default}:host([hidden]){display:none !important}[part]:last-child{border-radius:0 0 8px 8px}</style>\n<vc-saturation part="saturation" exportparts="pointer: saturation-pointer"></vc-saturation>\n<vc-hue part="hue" exportparts="pointer: hue-pointer"></vc-hue>\n');class p extends HTMLElement{constructor(){super();const t=n(this,u);t.addEventListener("move",this),this._s=t.children[1],this._h=t.children[2]}static get observedAttributes(){return["color"]}get color(){return this._color}set color(t){if(!this._isSame(t)){const e=this.colorModel.toHsva(t);this._render(e),this._change(t,e)}}connectedCallback(){if(this.hasOwnProperty("color")){const t=this.color;delete this.color,this.color=t}else this.color||(this.color=this.colorModel.defaultColor)}attributeChangedCallback(t,e,o){const s=this.colorModel.fromAttr(o);this._isSame(s)||(this.color=s)}handleEvent(t){const e=Object.assign({},this._hsva,t.detail);let o;this._render(e),s(e,this._hsva)||this._isSame(o=this.colorModel.fromHsva(e))||this._change(o,e)}_isSame(t){return this.color&&this.colorModel.equal(t,this.color)}_render(t){this._s.hsva=t,this._h.hue=t.h}_change(t,e){this._color=t,this._hsva=e,this.dispatchEvent(new CustomEvent("color-changed",{detail:{value:t}}))}}const f=r('<style>:host{position:relative;height:24px;background-color:#fff}:host::after{content:"";box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}:host::after,#gradient{position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;border-radius:inherit}:host,[part=pointer]{background-color:#fff;background-image:url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><rect x="8" width="8" height="8"/><rect y="8" width="8" height="8"/></svg>\')}</style><div id="gradient"></div>');customElements.define("vc-alpha",class extends c{constructor(){super(),this.gradient=n(this,f).querySelector("#gradient")}connectedCallback(){if(this.hasOwnProperty("hsva")){const t=this.hsva;delete this.hsva,this.hsva=t}}set hsva(t){const e=o({...t,a:0}),s=o({...t,a:1});this.gradient.style.backgroundImage=`linear-gradient(to right, ${e}, ${s}`,this.setStyles({top:"50%",left:100*t.a+"%",color:o(t)})}getMove(t){return{a:t.left}}});const g=r('<vc-alpha part="alpha" exportparts="pointer: alpha-pointer"></vc-alpha>');class v extends p{constructor(){super(),this._a=n(this,g).lastElementChild}_render(t){super._render(t),this._a.hsva=t}}const b={defaultColor:{r:0,g:0,b:0,a:1},toHsva:({r:t,g:e,b:o,a:s})=>{const r=Math.max(t,e,o),n=r-Math.min(t,e,o),i=n?r===t?(e-o)/n:r===e?2+(o-t)/n:4+(t-e)/n:0;return{h:Math.round(60*(i<0?i+6:i)),s:Math.round(r?n/r*100:0),v:Math.round(r/255*100),a:s}},fromHsva:({h:t,s:e,v:o,a:s})=>{t=t/360*6,e/=100,o/=100;const r=Math.floor(t),n=o*(1-e),i=o*(1-(t-r)*e),a=o*(1-(1-t+r)*e),h=r%6;return{r:Math.round(255*[o,i,n,n,a,o][h]),g:Math.round(255*[a,o,o,i,n,n][h]),b:Math.round(255*[n,n,a,o,o,i][h]),a:s}},equal:s,fromAttr:t=>JSON.parse(t)};class m extends v{get colorModel(){return b}}customElements.define("rgba-color-picker",class extends m{});const x=()=>{const t=document.createElement("canvas");return t.width=64,t.height=64,t};let w,y,M;const k=t=>(y||(y=x(),M=(()=>{const t=x(),e=t.getContext("2d");return e.beginPath(),e.arc(32,32,28,0,2*Math.PI,!1),e.closePath(),e.shadowColor="rgba(0, 0, 0, 0.4)",e.shadowOffsetY=1,e.shadowBlur=6,e.fillStyle="#fff",e.fill(),t})()),function(t,e,o,s){var r,n=!1,i=0;function a(){r&&clearTimeout(r)}function h(){for(var h=arguments.length,c=new Array(h),l=0;l<h;l++)c[l]=arguments[l];var d=this,u=Date.now()-i;function p(){i=Date.now(),o.apply(d,c)}function f(){r=void 0}n||(s&&!r&&p(),a(),void 0===s&&u>t?p():!0!==e&&(r=setTimeout(s?f:p,void 0===s?t-u:t)))}return"boolean"!=typeof e&&(s=o,o=e,e=void 0),h.cancel=function(){a(),n=!0},h}(500,()=>{if(!(window.innerWidth<768&&w)){const e=y.getContext("2d");e.clearRect(0,0,64,64),e.drawImage(M,0,0),e.beginPath(),e.arc(32,32,22,0,2*Math.PI,!1),e.closePath(),e.fillStyle=t,e.fill();const o=document.createElement("link");o.rel="shortcut icon",o.href=y.toDataURL("image/x-icon"),w&&document.head.removeChild(w),document.head.appendChild(o),w=o}})),E=document.querySelector("rgba-color-picker");E.addEventListener("color-changed",t=>{const e=t.detail.value,o=`rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`;document.body.style.backgroundColor=o;const s=(({r:t,g:e,b:o})=>(299*t+587*e+114*o)/1e3)(e)>128||e.a<.5?"#000":"#fff";document.body.style.setProperty("--contrast",s),k(o)()}),E.color={r:30,g:136,b:229,a:1};

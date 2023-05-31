import{d as l,p as r,a as i,c as g,g as d,b as k}from"./common-cbdaf4f0.js";console.log("joke.ts loaded");const n=document.querySelector(`[${l}="joke"]`);j();function u(){r("getJoke");const e=new URLSearchParams(window.location.search).get("slug");console.log("slug",e);const s=String(d(k)),t=JSON.parse(s);console.log("data",t);const a=t.jokes.filter(c=>c.slug===e)[0];return console.log("joke",a),a}function j(){r("renderJoke");const o=u();if(o&&n){const{title:e,text:s,created_at:t}=o;n.innerHTML=`
        <section>
          <h2 class="section__title">${e}</h2>

          <div class="joke-content">${s.replace(/(?:\r\n|\r|\n)/g,"<br>")}</div>

          <p class="joke-date">Written on: ${i(t).format(g)}</p>
        </section>
    `}}

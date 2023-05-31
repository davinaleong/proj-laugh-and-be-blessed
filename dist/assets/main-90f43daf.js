import{d,p as c,a as n,g as y,n as r,s as w,b as h,c as L}from"./common-cbdaf4f0.js";console.log("main.ts loaded");const S="SUCCESS",Y=14,J="https://davinas-cms.herokuapp.com/api/davdevs/jokes?perPage=1000&column=name",i=2023,l=document.querySelector(`[${d}="jokes-list"]`),p=document.querySelector(`[${d}="copyright-year"]`),f=document.querySelector(`[${d}="search-form"] input`),g=await $();k(g);j(g);v();async function $(){c("getJokes");let e={jokes:[],timestamp:n().unix()};const t=y(h);t&&(e=JSON.parse(String(t)));const s=n(e.timestamp),a=n(r.unix()).diff(s,"days");if(e.jokes.length<=0||a>Y){console.log("Fetch new jokes");const u=await(await window.fetch(J)).json();u.status===S&&(e={jokes:u?.jokes?.data,timestamp:r.unix()},w(h,JSON.stringify(e)))}return e.jokes}async function k(e){if(c("renderJokesList"),console.log("jokes",e),l&&e&&e.length>0){l.innerHTML="";let t="";e.forEach(({slug:s,title:o,created_at:a},m)=>{t+=`
          <a href="./joke?slug=${s}" class="card shadow-v-br-400">
            <h3 class="card__title">${m+1}) ${o}</h3>
            <p class="card__date">Written on: ${n(a).format(L)}</p>
          </a>
        `}),l.innerHTML=`
        <section>
          <div class="card-grid">${t}</div>
        </section>
      `}}function j(e){c("searchJokes"),f&&f.addEventListener("input",function(t){t.preventDefault();const s=t.target.value;let o=e;s&&s!==""&&(console.log("search",s),o=e.filter(({name:a})=>a.toLowerCase().includes(s.toLowerCase()))),console.log("thisJokes",o),k(o)})}function v(){if(c("renderCopyrightYear"),p){const e=Number(r.format("YYYY"))!==i?`${i} &ndash; ${r.format("YYYY")}`:`${i}`;p.innerHTML=e}}

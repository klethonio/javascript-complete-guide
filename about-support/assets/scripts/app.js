(()=>{const e=document.querySelector("button"),o=document.querySelector("p");e.addEventListener("click",(()=>{const e=o.textContent,t=new Promise((()=>{}));console.log(t),navigator.clipboard?navigator.clipboard.writeText(e).then((e=>{console.log(e)})).catch((e=>{console.log(e)})):alert("Feature not available, please copy manually!")}))})();
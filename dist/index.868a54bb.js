class t{static getTasks(t){let a=e().find(e=>e.columnId===t);return a?a.tasks:[]}static insertTask(t,s){let n=e(),d=n.find(e=>e.columnId==t),l={taskId:Math.floor(1e5*Math.random()),content:s};return d.tasks.push(l),a(n),l}static updateTask(t,s){let n=e(),[d,l]=function(){for(let e of n){let a=e.tasks.find(e=>e.taskId==t);if(a)return[a,e]}}();console.log(d);let i=n.find(t=>t.columnId==s.columnId);d.content=s.content,l.tasks.splice(l.tasks.indexOf(d)),i.tasks.push(d),a(n)}static deleteTask(t){let s=e();return s.map(e=>{let a=e.tasks.find(e=>e.taskId==t);console.log(a),a&&e.tasks.splice(e.tasks.indexOf(a),1)}),a(s),s}static getAllTasks(){let t=e();return s(),[t[0].tasks,t[1].tasks,t[2].tasks]}}function e(){let t=localStorage.getItem("data");return t?JSON.parse(t):[{columnId:0,tasks:[]},{columnId:1,tasks:[]},{columnId:2,tasks:[]}]}function a(t){localStorage.setItem("data",JSON.stringify(t)),s()}const s=function(){let t=e();document.querySelector("span.todo").textContent=t[0].tasks.length,document.querySelector("span.pending").textContent=t[1].tasks.length,document.querySelector("span.completed").textContent=t[2].tasks.length},n=[document.querySelector(".cards.todo"),document.querySelector(".cards.pending"),document.querySelector(".cards.completed")],d=function(t,e){let a=document.createElement("form");return a.className="card",a.draggable=!0,a.dataset.id=t.taskId,a.innerHTML=`
    <input
      value="${t.content}"
      type="text"
      name="task"
      autocomplete="off"
      disabled="disabled"
    />
    <div>
      <span class="task-id">#${t.taskId}</span>
      <span>
        <button class="bi bi-pencil edit" data-id="${t.taskId}" data-column="${e}"></button>
        <button
          class="bi bi-check-lg update hide"
          data-id="${t.taskId}" data-column="${e}"
        ></button>
        <button class="bi bi-trash3 delete" data-id="${t.taskId}"></button>
      </span>
    </div>
    `,n[e].appendChild(a),e};t.getAllTasks().forEach((t,e)=>{t.forEach(t=>{d(t,e)})}),console.log(t.getAllTasks()),document.querySelectorAll(".add").forEach(e=>{e.addEventListener("submit",a=>{a.preventDefault(),d(t.insertTask(e.submit.dataset.id,e.task.value.trim()),e.submit.dataset.id),e.reset()})}),n.forEach(e=>{e.addEventListener("click",e=>{e.preventDefault();let a=e.target.parentElement.parentElement.previousElementSibling;if(e.target.classList.contains("edit")&&(a.removeAttribute("disabled"),e.target.classList.add("hide"),e.target.nextElementSibling.classList.remove("hide")),e.target.classList.contains("update")){a.setAttribute("disabled","disabled"),e.target.classList.add("hide"),e.target.previousElementSibling.classList.remove("hide");let s=e.target.dataset.id,n=e.target.dataset.column,d=a.value;console.log(s,n,d),t.updateTask(s,{columnId:n,content:d})}e.target.classList.contains("delete")&&(e.preventDefault(),a.parentElement.remove(),t.deleteTask(e.target.dataset.id))}),e.addEventListener("dragstart",t=>{t.target.classList.contains("card")&&t.target.classList.add("dragging")}),e.addEventListener("dragover",t=>{let a=document.querySelector(".dragging");e.appendChild(a)}),e.addEventListener("dragend",e=>{if(e.target.classList.contains("card")){e.target.classList.remove("dragging");let a=e.target.dataset.id,s=e.target.parentElement.dataset.id,n=e.target.task.value;t.updateTask(a,{columnId:s,content:n})}})});
//# sourceMappingURL=index.868a54bb.js.map

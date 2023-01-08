window.addEventListener('load',()=>{
    const form = document.querySelector("#new-task-form");   
    const input = document.querySelector("#new-task-input");   
    
  
    fetchdata()
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const task=input.value;
  
      if(!task){
          alert("Plaese fill out the task")
      }else{
          let obj={
              task:task,
              status:true
          }
         handleadd(obj) 
      }
   })
  
  })
  
  async function fetchdata(){
      try {
          let res=await fetch("https://reqres.in/api/users")
          res=await res.json()
          appenddata(res.data)
      } catch (err) {
          alert(`Error while fetching your todos ${err}`) 
      }
  }
  
  async function handleadd(obj){
      try {
          let res=await fetch("https://reqres.in/api/users",{
              method:"POST",
              body:JSON.parse(obj)
  
          })
          res=await res.json()
          appenddata(res.data)
      } catch (err) {
          alert(`Error while fetching your todos ${err}`) 
      } 
   }
  
  function appenddata(data){
      const list_el = document.querySelector("#tasks");
      list_el.innerHTML=""
      data.forEach((el)=>{
      const task =document.createElement("div");
      task.className="task"
      const task_content=  document.createElement("div");
      task_content.className="content"
      const task_input=document.createElement("input");
      task_input.type="text"
      task_input.className="text";
      task_input.setAttribute('value',el.email)
      task_input.setAttribute('readonly', true);
      task_content.appendChild(task_input)
      const task_action= document.createElement("div");
      task_action.className="action"
      const task_status=document.createElement('button');
      task_status.className="status"
      task_status.innerText="Status"
      const task_edit=document.createElement('button');
      task_edit.className="edit"
      task_edit.innerText="Edit"
      task_edit.addEventListener("click",()=>{
          if(task_edit.innerText=="Edit"){
              task_input.removeAttribute("readonly")
          task_input.focus();
          // let val=task_input.value
          // task_input.value=""
          // task_input.placeholder=val;
          task_edit.innerText="Save";
          }else{
              task_input.setAttribute('readonly', true);
              patchdata()
              task_edit.innerText="Edit";
          }
          
      })
      const task_delete=document.createElement('button')
      task_delete.className="delete"
      task_delete.innerText="Delete"
      task_delete.addEventListener("click",()=>{
          task.remove()
          Deletedata(el.__id)
      })
      task_action.append(task_status,task_edit,task_delete)
      task.append(task_content,task_action)
      list_el.appendChild(task)    
  })
      
  }
  
  async function Deletedata(id){
      try {
          let res=await fetch("https://reqres.in/api/users/id",{
              method:"DELETE"
          })
          res=await res.json()
          appenddata(res.data)
      } catch (err) {
          alert(`Error while Deleting your todos ${err}`) 
      } 
  }
  
  async function patchdata(id){
      try {
          let res=await fetch("https://reqres.in/api/users/id",{
              method:"DELETE"
          })
          res=await res.json()
          appenddata(res.data)
      } catch (err) {
          alert(`Error while Updating your todos ${err}`) 
      } 
  }
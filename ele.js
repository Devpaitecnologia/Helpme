

    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
        import { getDatabase, ref, set, remove, onChildAdded, onChildRemoved } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

    const firebaseConfig = {
    apiKey: "AIzaSyDhURTGDUqOuuvbClVqMRiEcYYvfDt_FPU",
    authDomain: "code-fb13e.firebaseapp.com",
    projectId: "code-fb13e",
    storageBucket: "code-fb13e.appspot.com",
    messagingSenderId: "749917957333",
    appId: "1:749917957333:web:6fc820b2bebb8e8234465c"
  };

        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);

        // variables
        var locali = document.getElementById('locali');
    var msgn = document.getElementById('contacto');
      var msgd = document.getElementById('detalhes');
     var msgdi = document.getElementById('disponi');
     
        var sender;
        if(sessionStorage.getItem('sender')){
            sender = sessionStorage.getItem('sender');
        } else {
            sender = prompt('INSIRA O SEU NOME');
            sessionStorage.setItem('sender',sender);
        }
      // TO SEND MESSAGES
        module.sendMsg = function sendMsg(){
            var lc = locali.value;
            var mn = msgn.value;
            var md = msgd.value;
         var mdi = msgdi.value;
         
            var timestamp = new Date().getTime();
            set(ref(db,"messag/"+timestamp),{
                lc : lc,
                mn : mn,
                md : md,
                mdi : mdi,
                sender : sender
            })

            locali.value="";
          msgn.value="";
            msgd.value="";
            msgdi.value="";
        }
     // TO RECEIVE MSG
        onChildAdded(ref(db,"messag"), (data)=>{
            if(data.val().sender == sender){
                contact.innerHTML = "<div class=contact><img src='img/m.jpg'/><div class=detalh><span>"+data.val().lc+"</span><h2>"+data.val().mn+"</h2></div><svg fill=green opacity=1.0 baseProfile=0 width='40' height='40' viewBox='0 0 24.00 24.00'><path d='M20 11.998a8 8 0 1 1-8-8c.763 0 1.5.114 2.2.314l1.572-1.572A9.96 9.96 0 0 0 12 1.998c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10M7.913 10.084L6.5 11.498l4.5 4.5 10-10-1.414-1.414L11 13.17l-3.086-3.086z'/></svg></div><details><p>Localização detalhada: "+data.val().md+"</p><p>Nome:"+data.val().sender+"</p><p>Disponibilidade: "+data.val().mdi+"</p></details>" 
          } else {
              contact.innerHTML += "<div class=contact><img src='img/m.jpg'/><div class=detalh><span>"+data.val().lc+"</span><h2>"+data.val().mn+"</h2></div><svg fill=green opacity=1.0 baseProfile=0 width='40' height='40' viewBox='0 0 24.00 24.00'><path d='M20 11.998a8 8 0 1 1-8-8c.763 0 1.5.114 2.2.314l1.572-1.572A9.96 9.96 0 0 0 12 1.998c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10M7.913 10.084L6.5 11.498l4.5 4.5 10-10-1.414-1.414L11 13.17l-3.086-3.086z'/></svg></div><details><p>Localização detalhada: "+data.val().md+"</p><p>Nome:"+data.val().sender+"</p><p>Disponibilidade: "+data.val().mdi+"</p></details>" 
              }
        })
var reset= document.querySelector("#reset");
var detail=document.querySelector("#detail");
var submit=document.querySelector("#submit");
var at=document.querySelector("#at");
var bt=document.querySelector("#bt");
var EntryDisplay=document.querySelector("#dis");
var tableBody=document.querySelector("tbody");
var gnattBody=document.querySelector("#gnattbody");
var gc=document.querySelector("#gc");
var options=document.querySelector("#options");
var fcfs=document.querySelector("#fcfs");
var sjf=document.querySelector("#sjf");
var wtdisplay=document.querySelector("#wtdisplay");
var tatdisplay=document.querySelector("#tatdisplay");
var table2=document.querySelector("#table2");
var i=1;
var data=[];
var maindata=[];
var maxat=0;
var rq=[];
var time=0;
var y;
var added=0;
var sjfdata;



var wt=[];
var tat=[];
var st=[];
var totalwt=0;
var totaltat=0;
var rt=[]




reset.addEventListener("click",function(){
    detail.style.display="block";
    i=1;
    data=[];
    maindata=[];
    maxat=0;
    rq=[];
    time=0;
    added=0;
    wt=[];
    tat=[];
    st=[];
    rt=[];
    totalwt=0;
    totaltat=0;
    tableBody.innerHTML="";
    gnattBody.innerHTML="<tr id='row1'><td>Process</td></tr><tr id='row2'><td>Time</td></tr>";
    gnattBody.style.display="none";
    options.style.display="none";
    table2.style.display="none";

});

submit.addEventListener("click",function(){
    data.push([parseInt(i),parseInt(at.value),parseInt(bt.value)]);
    maindata.push([parseInt(i),parseInt(at.value),parseInt(bt.value)]);
   
    var row=tableBody.insertRow(i-1);
    var cell0=row.insertCell(0);
    var cell1=row.insertCell(1);
    var cell2=row.insertCell(2);
    cell0.innerHTML="<span class='el pval'>P"+i+"</span";
    cell1.innerHTML="<span class='atval el'>"+at.value+"</span>";
    cell2.innerHTML="<span class='btval el'>"+bt.value+"</span>";
    i=i+1;
    EntryDisplay.innerHTML="Enter Details of process "+i+"";

});
gc.addEventListener("click",function(){
    for(var j=0;j<data.length;j++){
        wt.push(0);
        tat.push(0);
        st.push(0);
        rt.push(data[j][2]);
    }
    options.style.display="block";
    fcfs.style.display="inline";
    sjf.style.display="inline";

    
});
fcfs.addEventListener("click",function(){
    sjf.style.display="none";
    gnattBody.style.display="inline";
    var fcfsdata=data;

    t=true;

    while(t){
        if(find(time)){
        pushTime(time);
        }
        if(rq.length==0){
            time=parseInt(time)+1;
        }
        else{
            var x=rq.shift()[0]-1;
            while(fcfsdata[x][2]>0){
                make(parseInt(x+1),parseInt(time));
                time=parseInt(time)+1;
                fcfsdata[x][2]=fcfsdata[x][2]-1;
                if(find(time)){
                    pushTime(time); 
                }
            }
            if(btTotal(fcfsdata)<=0){
                console.log("end");
                t=false;
                break;
            }
        }
        
    }
    
    table2.style.display="inline";
    var n = data.length;
    console.log(wt,tat);
    findAVGfcfs(maindata,n);
    console.log(totalwt      ,totaltat);
    wtdisplay.innerHTML=totalwt;
    tatdisplay.innerHTML=totaltat;
  


});



sjf.addEventListener("click",function(){
    fcfs.style.display="none";
    gnattBody.style.display="inline";
    sjfdata=data;
    t=true;
    while(t){
        if(find(time)){
            pushTime(time);
        }
        if(rq.length==0){
            time=parseInt(time)+1;
        }
        else{
            y=minBT();
            if(y!=100){
                make(y+1,time);
                time=parseInt(time)+1;
                sjfdata[y][2]=parseInt(sjfdata[y][2])-1;
            }
            else{
                time=parseInt(time)+1;
            }

        }
        if(btTotal(sjfdata)<=0 && added==data.length){
            console.log("end");
            t=false;
            break;
        }

    }

 
    table2.style.display="inline";
    var n=data.length;
    findAVGsjf(maindata,n);
    console.log(totalwt      ,totaltat);
    wtdisplay.innerHTML=totalwt;
    tatdisplay.innerHTML=totaltat;
  

});
function btTotal(datacopy){
    var BT=0;
    for(var i=0;i<datacopy.length;i++){
        BT=BT+datacopy[i][2];
    }
    return BT;
}


function make(p,t){
    var row1=document.querySelector("#row1");
    var row2=document.querySelector("#row2");
    var x=row1.insertCell(-1);
    var y=row2.insertCell(-1);
    x.innerHTML="P"+p;
    y.innerHTML=t;
}
function find(time){
    
    for(var i=0;i<data.length;i++)
    {   
        if(time==data[i][1]){
            return i+1;
        }    
    }
    return false;
}
function pushTime(time){
    for(var i=0;i<data.length;i++){
        if(time==data[i][1]){
            rq.push(data[i]);
            added=parseInt(added)+1;
        }
    }
}
function minBT(){
    var min=[100,100,100];
    for(var i=0;i<rq.length;i++){
        if(sjfdata[rq[i][0]-1][2]<min[2]  && sjfdata[rq[i][0]-1][2]>0){
            min=rq[i];
        }
    }
    return min[0]-1;
}

//FCFSFCFSFCFSFCFSFCFS
function findAVGfcfs(maindata,n){
    findwttimefcfs(maindata,wt,n);
    findtattimefcfs(maindata,tat,n,wt);
    console.log(wt,tat);

    for(var i=0;i<n;i++){
        totalwt=totalwt+wt[i];
        totaltat=totaltat+tat[i];
    }
    totalwt=totalwt/n;
    totaltat=totaltat/n;
}
function  findwttimefcfs(maindata,wt,n){
    for (var i = 1; i < n ; i++) 
    { 
        
        // Add burst time of previous processes 
        st[i] = st[i-1] + maindata[i-1][2]; 
        // Find waiting time for current process = 
        // sum - at[i] 
        wt[i] = st[i] - maindata[i][1]; 
        
        // If waiting time for a process is in negative 
        // that means it is already in the ready queue 
        // before CPU becomes idle so its waiting time is 0 
        if (wt[i] < 0) 
            wt[i] = 0;
    } 
    // console.log(wt);
}

function findtattimefcfs(maindata,tat,n,wt){
    for (var i = 0; i < n ; i++) 
        tat[i] = maindata[i][2] + wt[i]; 

}

//FCFSFCFSFCFSFCFSFCFS



//SJFSJFSJFSJFSJFSJF

function findAVGsjf(maindata,n){

    findwttimesjf(maindata,n,wt);

    findtattimesjf(maindata,n,wt,tat);

    for(var j=0;j<n;j++){
       totalwt=totalwt+wt[j]; 
       totaltat=totaltat+tat[j]; 
    }
    totalwt=totalwt/n;
    totaltat=totaltat/n;


}
function findwttimesjf(maindata,n,wt){

    var complete = 0; 
    var t = 0; 
    var minm = 999; 
    var shortest = 0;
    var finish_time; 
    var check = false; 
  
    while (complete != n) { 
  
        // Find process with minimum 
        // remaining time among the 
        // processes that arrives till the 
        // current time` 
        for (var j = 0; j < n; j++) { 
            if ((maindata[j][1] <= t) && (rt[j] < minm) && rt[j] > 0) { 
                minm = rt[j]; 
                shortest = j; 
                check = true; 
            } 
        } 
  
        if (check == false) { 
            t++; 
            continue; 
        } 
  
        // Reduce remaining time by one 
        rt[shortest]--; 
  
        // Update minimum 
        minm = rt[shortest]; 
        if (minm == 0) 
            minm = 999; 
  
        // If a process gets completely 
        // executed 
        if (rt[shortest] == 0) { 
  
            // Increment complete 
            complete++; 
            check = false; 
  
            // Find finish time of current 
            // process 
            finish_time = t + 1; 
  
            // Calculate waiting time 
            wt[shortest] = finish_time - 
                        maindata[shortest][2] - 
                        maindata[shortest][1]; 
  
            if (wt[shortest] < 0) 
                wt[shortest] = 0; 
        } 
        // Increment time 
        t++; 
    } 
console.log(wt);
}

function findtattimesjf(maindata,n,wt,tat){
    // calculating turnaround time by adding 
    // bt[i] + wt[i] 
    for (var i = 0; i < n; i++) 
        tat[i] = maindata[i][2] + wt[i]; 
}


//SJFSJFSJFSJFSJFSJF

 const reg='https://docs.google.com/forms/d/e/1FAIpQLSfwXQaohFujNo0yMpYqpIKGVHXNXdBd_Xs24hb4dHRWicJcig/viewform'; const title='קדמה — בין פער להזדמנות | יום עיון מקצועי'; const locationText='המכללה האקדמית גליל מערבי, עכו'; const details='יום עיון מקצועי | 13.10.2026 | 09:00–14:00'; document.getElementById('gcal').href='https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent(title)+'&dates=20261013T060000Z/20261013T110000Z&details='+encodeURIComponent(details)+'&location='+encodeURIComponent(locationText); document.getElementById('ics').addEventListener('click',()=>{ const rows=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Kadma 2026//HE','CALSCALE:GREGORIAN','BEGIN:VEVENT','UID:kadma-20261013@western-galilee','DTSTAMP:20260913T000000Z','DTSTART;TZID=Asia/Jerusalem:20261013T090000','DTEND;TZID=Asia/Jerusalem:20261013T140000','SUMMARY:'+title,'DESCRIPTION:'+details,'LOCATION:'+locationText,'STATUS:CONFIRMED','END:VEVENT','END:VCALENDAR']; const blob=new Blob([rows.join('\r\n')],{type:'text/calendar;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='kadma-2026.ics';document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url); }); 
(function(){
  const timeline=document.querySelector('.timeline');
  if(!timeline) return;
  const slots=[...timeline.querySelectorAll('.slot')];
  let ticking=false;
  function updateTimeline(){
    ticking=false;
    const rect=timeline.getBoundingClientRect();
    const viewFocus=Math.min(window.innerHeight*0.56,520);
    const total=Math.max(1,rect.height-44);
    const travelled=Math.min(total,Math.max(0,viewFocus-rect.top-22));
    const progress=travelled/total;
    timeline.style.setProperty('--timeline-progress',(progress*100).toFixed(2)+'%');
    let current=-1;
    slots.forEach((slot,i)=>{
      const r=slot.getBoundingClientRect();
      if(r.top+r.height*.5<=viewFocus) current=i;
    });
    if(current<0 && progress>0) current=0;
    slots.forEach((slot,i)=>{
      slot.classList.toggle('is-passed',i<current);
      slot.classList.toggle('is-current',i===current && progress>0 && progress<1);
      slot.classList.toggle('is-upcoming',i>current);
    });
    if(progress>=1 && slots.length){
      slots.forEach((slot,i)=>{slot.classList.toggle('is-passed',i<slots.length-1);slot.classList.toggle('is-current',i===slots.length-1);slot.classList.remove('is-upcoming');});
    }
  }
  function requestUpdate(){if(!ticking){ticking=true;requestAnimationFrame(updateTimeline)}}
  addEventListener('scroll',requestUpdate,{passive:true});
  addEventListener('resize',requestUpdate,{passive:true});
  updateTimeline();
})();

'use client'
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useTypewriter } from "react-simple-typewriter";

const Home =  () => {
  const router = useRouter()
  const text  = useTypewriter({
    words:  ["Organize Your Life", "Boost Productivity", "Stay Organized", "Manage Tasks Effortlessly"],
    loop: true,
    typeSpeed: 100,
    deleteSpeed: 80
  })

  const [notificationEnabled, setNotificationEnabled] = useState(false);

  const sendNotification = () => {
    if("Notification" in window && Notification.permission === 'granted'){
      new Notification("Hello",{
        body: "This boss"
      })
    }
  }

  const toggleNotification = useCallback(() => {
    setNotificationEnabled((prev) => !prev);
  }, []);

  const requestNotification = useCallback(() => {
    if("Notification" in window){
      Notification.requestPermission().then((result)=>{
        if(result === "granted"){
          console.log('User granted notification permission');
          sendNotification();
        }else if (result === "denied") {
          console.log("Notification permission denied by the user.");
          console.log("You can enable notifications by adjusting your browser settings.");
          setTimeout(async () => {
            const rePermission = await Notification.requestPermission();
            if (rePermission === "granted") {
              console.log("Notification permission re-granted by the user.");
            } else {
              console.log("User still denied notification permission.");
            }
          }, 100);
        } else {
          console.log("Notification permission has not been granted yet.");
          console.log("To enable notifications, click the lock icon next to the URL, and check notification settings.");
        }
      })
    }
  }, [])

  useEffect(() => {
    if("Notification" in window){
      requestNotification();
    }
  }, [requestNotification])
  return (
    <>
    <button onClick={toggleNotification} className="btn">
        {notificationEnabled ? "Turn Off Notifications" : "Turn On Notifications"}
      </button>
    <button onClick={sendNotification} className="btn" >trigger</button>
      <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center ">
        <h1 className="text-7xl mb-1 font-bold text-center overflow-hidden">Taskify</h1>
        <h1 className="text-2xl  text-center overflow-hidden">{text[0]}</h1>
        <button onClick={() => router.push('/auth/login')} className="btn btn-primary px-7 mt-10">Login</button>
      </div>
    </>
  );
};

export default Home;

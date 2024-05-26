import React, { Dispatch, SetStateAction } from "react";

const ShowNotificationCard = ({setShowCard}: {setShowCard: Dispatch<SetStateAction<boolean>>}) => {

 const handleEnableNotifications = () => {
  Notification.requestPermission().then(permission => {
    if(permission === 'granted'){
      new Notification('Notification Enabled', {
        body: 'You will be notified when your tasks are ready.'
      })
      setShowCard(false)
    }
  })
 }

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black z-40 bg-opacity-50">
      <div className="card w-96 z-50 bg-base-300">
        <div className="card-body">
          <h2 className="card-title">Enable Task Notifications</h2>
          <p>
            Stay updated by enabling notifications. We will notify you when your
            tasks are ready.
          </p>
          <div className="card-actions justify-end">
            <button onClick={handleEnableNotifications}  className="btn btn-primary">Allow Notifications</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowNotificationCard;

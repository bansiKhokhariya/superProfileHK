'use client';
import React, { useEffect } from 'react';
import Main from '@/components/superprofile/listData/Main';
// import { toast } from 'react-hot-toast';

export default function Page() {
  // useEffect(() => {
  //   // Initialize Facebook Pixel
  //   !(function (f, b, e, v, n, t, s) {
  //     if (f.fbq) return;
  //     n = f.fbq = function () {
  //       n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  //     };
  //     if (!f._fbq) f._fbq = n;
  //     n.push = n;
  //     n.loaded = !0;
  //     n.version = '2.0';
  //     n.queue = [];
  //     t = b.createElement(e);
  //     t.async = !0;
  //     t.src = v;
  //     s = b.getElementsByTagName(e)[0];
  //     s.parentNode.insertBefore(t, s);
  //   })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  //   fbq('init', '446057858329236');
  //   fbq('track', 'PageView');
  // }, []);

  // const callFacebookEvent = () => {
  //   const eventData = {
  //     eventName: 'super',
  //     message: 'Custom event message',
  //     additionalData: 'Additional data if any'
  //   };

  //   try {
  //     fbq('track', eventData.eventName, { message: eventData.message, additionalData: eventData.additionalData });
  //     toast.success('Facebook event successfully called!');
  //   } catch (error) {
  //     toast.error('Failed to call Facebook event.');
  //   }
  // };

  return (
    <>
      {/* <button onClick={callFacebookEvent}>Call Facebook Event</button> */}
      <Main />
    </>
  );
}

"use client";
import React, { useState, useEffect, useRef } from 'react'; 
import { trackLinkedInConversion, LI_CONVERSION_CALL_BOOKED } from '@libs/analytics/components/linkedinTracking';

function getCalApi(embedUrl = "https://app.cal.com/embed/embed.js") {
  let qPush = function (cal, args) {
    cal.q.push(args);
  };
  
  window.Cal = window.Cal || function () {
    let cal = window.Cal;
    let args = arguments;
    
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      let script = document.createElement("script");
      script.src = embedUrl;
      document.head.appendChild(script);
      cal.loaded = true;
    }
    
    if (args[0] === "init") {
      let initFn = function () {
        qPush(initFn, arguments);
      };
      let namespace = args[1];
      initFn.q = initFn.q || [];
      
      if (typeof namespace === "string") {
        cal.ns[namespace] = cal.ns[namespace] || initFn;
        qPush(cal.ns[namespace], args);
        qPush(cal, ["initNamespace", namespace]);
      } else {
        qPush(cal, args);
      }
      return;
    }
    qPush(cal, args);
  };
  return window.Cal;
}

const Cal = function(props) {
  const {
    calLink,
    calOrigin,
    namespace = "",
    config,
    initConfig = {},
    embedJsUrl,
    ...rest
  } = props;
  
  if (!calLink) throw Error("calLink is required");
  const initialized = useRef(false);
  const calApi = (function useCalApi(url) {
    const [api, setApi] = useState();
    useEffect(() => {
      setApi(() => getCalApi(url));
    }, [url]);
    return api;
  })(embedJsUrl);
  
  const containerRef = useRef(null);
  useEffect(() => {
    if (!calApi || initialized.current || !containerRef.current) return;
    initialized.current = true;
    
    const element = containerRef.current;
    if (namespace) {
      calApi("init", namespace, { ...initConfig, origin: calOrigin });
      calApi.ns[namespace]("inline", { elementOrSelector: element, calLink, config });
    } else {
      calApi("init", { ...initConfig, origin: calOrigin });
      calApi("inline", { elementOrSelector: element, calLink, config });
    }
  }, [calApi, calLink, config, namespace, calOrigin, initConfig]);
  
  return calApi ? <div ref={containerRef} {...rest} /> : null;
};

export function CalBookingModal({ visible = true }) {
  useEffect(() => {
    (async () => {
      const loadCalNamespace = (options) => {
        const { namespace = "", embedJsUrl } = typeof options === "string" 
          ? { embedJsUrl: options } 
          : (options ?? {});
          
        return new Promise(function check(resolve) {
          const api = getCalApi(embedJsUrl);
          api("init", namespace);
          const nsApi = namespace ? api.ns[namespace] : api;
          
          if (nsApi) {
            resolve(nsApi);
          } else {
            setTimeout(() => { check(resolve); }, 50);
          }
        });
      };

      const cal = await loadCalNamespace({ namespace: "intro" });
      cal("ui", { theme: "dark", hideEventTypeDetails: false, layout: "month_view" });
      
      if (visible) {
        cal("on", { action: "bookingSuccessful", callback: handleBookingSuccessful });
      }
    })();
  }, [visible]);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    visibility: visible ? "visible" : "hidden",
    position: visible ? "relative" : "absolute",
    pointerEvents: visible ? "auto" : "none"
  };

  return (
    <div style={containerStyle}>
      <Cal
        namespace="intro"
        calLink="good-fella/discovery-call"
        calOrigin="https://cal.eu"
        embedJsUrl="https://cal.eu/embed/embed.js"
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view", theme: "dark" }}
      />
    </div>
  );
}

function handleBookingSuccessful() {
  trackLinkedInConversion(LI_CONVERSION_CALL_BOOKED);
}
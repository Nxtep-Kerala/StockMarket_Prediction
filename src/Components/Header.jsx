import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext"; // Import the AuthContext
import { getDatabase, ref, get, set } from "firebase/database";
import { Phone, X } from 'lucide-react';

export default function Header() {
  const { logout, auth } = useAuth(); // Get the logout function from the context
  const [state, setState] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [showWhatsAppContact, setShowWhatsAppContact] = useState(false);
  const [currentWhatsAppNumber, setCurrentWhatsAppNumber] = useState("");

  useEffect(() => {
    // Add listener for when user tries to navigate back/forward
    window.addEventListener('popstate', preventBackNavigation);
    
    return () => {
      window.removeEventListener('popstate', preventBackNavigation);
    };
  }, []);

  const preventBackNavigation = (e) => {
    if (!auth.currentUser) {
      // If user is logged out, prevent navigation
      window.history.pushState(null, '', window.location.pathname);
      e.preventDefault();
    }
  };

  const handleLogout = async () => {
    try {
      // First, clear the history state
      const currentPath = window.location.pathname;
      window.history.pushState(null, '', currentPath);
      
      // Replace the current history entry
      window.history.replaceState(null, '', currentPath);
      
      // Perform the logout
      await logout();
      
      // Redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const getPremiumStatus = async () => {
      const db = getDatabase();
      const uid = auth.currentUser?.uid;
      const premiumRef = ref(db, "users/" + uid + "/premium");
      if (uid) {
        const data = await get(premiumRef);
        setIsPremium(data.exists());
      }
    };

    getPremiumStatus();
  }, []);

  const whatsAppNumbers = [
    "+1234567890",
    "+0987654321",
    "+1122334455",
    "+5566778899",
  ];

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);

  const handleNav = () => {
    window.location.href =
      "https://stockanalysisgit-k2ocpbsszxcyaap887ad3z.streamlit.app/";
  };

  const simulateRazorpayPayment = () => {
    return new Promise((resolve) => {
      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.backgroundColor = "rgba(0,0,0,0.5)";
      modal.style.display = "flex";
      modal.style.alignItems = "center";
      modal.style.justifyContent = "center";
      modal.style.zIndex = "9999";

      const content = document.createElement("div");
      content.style.backgroundColor = "white";
      content.style.padding = "20px";
      content.style.borderRadius = "10px";
      content.innerHTML = `
        <h2 style="margin-bottom: 20px;">Razorpay Trial Payment</h2>
        <p>Amount: ₹500</p>
        <p>This is a simulated payment for trial purposes.</p>
        <button id="completePayment" style="background-color: #528FF0; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin-top: 20px;">Complete Payment</button>
      `;

      modal.appendChild(content);
      document.body.appendChild(modal);

      document.getElementById("completePayment").onclick = () => {
        document.body.removeChild(modal);
        resolve({ success: true });
      };
    });
  };

  const handlePremiumClick = async () => {
    if (!isPremium) {
      const result = await simulateRazorpayPayment();
      if (result.success) {
        const db = getDatabase();
        const uid = auth.currentUser?.uid;
        const premiumRef = ref(db, "users/" + uid + "/premium");
        await set(premiumRef, true);
        setIsPremium(true);
        alert("Trial payment successful! You are now a premium user.");
      }
    } else {
      const randomIndex = Math.floor(Math.random() * whatsAppNumbers.length);
      setCurrentWhatsAppNumber(whatsAppNumbers[randomIndex]);
      setShowWhatsAppContact(true);
    }
  };

  const Brand = () => (
    <div className="flex items-center justify-between py-5 md:block">
      <div className="flex items-center gap-4">
        <a href="javascript:void(0)">
          <img src="/logo.png" width={120} height={50} alt="Float UI logo" />
        </a>
        <div className="animate-blink text-red-500 font-semibold text-sm max-w-[200px] md:max-w-none">
          ⚠️ Caution: Stock market predictions are not guaranteed. Trade at your own risk.
        </div>
      </div>
      <div className="md:hidden">
        <button
          className="menu-btn text-gray-400 hover:text-gray-300"
          onClick={() => setState(!state)}
        >
          {state ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <style>
        {`
          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0.4; }
            100% { opacity: 1; }
          }
          
          .animate-blink {
            animation: blink 2s ease-in-out infinite;
          }
        `}
      </style>
      <style>
        {`
          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0.4; }
            100% { opacity: 1; }
          }
          
          .animate-blink {
            animation: blink 2s ease-in-out infinite;
          }

          @keyframes slideDown {
            0% { transform: translateY(-20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }

          .modal-animate {
            animation: slideDown 0.3s ease-out forwards;
          }

          .whatsapp-button {
            transition: all 0.3s ease;
          }

          .whatsapp-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
          }
        `}
      </style>
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <header className="flex-grow">
        <div className={`md:hidden ${state ? "mx-2 pb-5" : "hidden"}`}>
          <Brand />
        </div>
        <nav
          className={`pb-5 md:text-sm ${
            state
              ? "absolute z-20 top-0 inset-x-0 bg-gray-800 rounded-xl mx-2 mt-2 md:mx-0 md:mt-0 md:bg-transparent"
              : ""
          }`}
        >
          <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
            <Brand />
            <div
              className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
                state ? "block" : "hidden"
              }`}
            >
              <ul className="flex-1 justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                <li>
                  <a
                    href="https://stockanalysisgit-k2ocpbsszxcyaap887ad3z.streamlit.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-sky-500 hover:bg-sky-400 active:bg-sky-600 duration-150 rounded-full md:inline-flex"
                  >
                    Get started
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <button
                    onClick={handlePremiumClick}
                    className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 duration-150 rounded-full md:inline-flex"
                  >
                    {isPremium ? "Contact Professional" : "Get Premium (Trial)"}
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout} // Logout button
                    className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 duration-150 rounded-full md:inline-flex"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      {showWhatsAppContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="modal-animate bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Professional Contact
                </h3>
              </div>
              <button
                onClick={() => setShowWhatsAppContact(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Connect with our professional expert for personalized assistance and guidance.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Available WhatsApp Contact:
                </p>
                <a
                  href={`https://wa.me/${currentWhatsAppNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-button flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bf5b] text-white py-3 px-4 rounded-xl font-medium"
                >
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
                <p className="text-gray-600 dark:text-gray-400 text-center mt-4 text-lg font-semibold">
                  {currentWhatsAppNumber}
                </p>
              </div>
              
              <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Available during business hours
                </p>
                <p className="mt-2 text-xs">
                  Note: Response time may vary based on availability
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="relative flex-grow">
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-28 md:px-8">
          <div className="space-y-5 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl text-white font-extrabold mx-auto md:text-5xl">
              Stock Market Prediction
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400">
            The stock market is a dynamic and ever-changing environment, where prices fluctuate based on a variety of factors. Investors and traders have long sought ways to predict market movements to maximize their returns. With the advancement of technology, stock market forecasting has become a key area of interest, utilizing complex algorithms and historical data to anticipate future trends. By analyzing patterns in market behavior, machine learning models can identify signals that may indicate future price movements, helping investors make data-driven decisions. However, despite the potential of these models, predicting stock market prices remains a complex and challenging task, influenced by numerous unpredictable variables such as market sentiment, political events, and economic indicators.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="justify-center items-center gap-x-3 sm:flex"
            >
              <button
                className="flex items-center justify-center gap-x-2 py-2.5 px-4 mt-3 w-full text-sm text-white font-medium bg-sky-500 hover:bg-sky-400 active:bg-sky-600 duration-150 rounded-lg sm:mt-0 sm:w-auto"
                onClick={handleNav}
              >
                Get started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
        <div
          className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 100, 100, 0.5) 0%, rgba(255, 200, 100, 0.5) 50%, rgba(100, 200, 255, 0.5) 100%)",
          }}
        ></div>
      </section>
    </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext"; // Import the AuthContext
import { getDatabase, ref, get, set } from "firebase/database";

export default function Header() {
  const { logout, auth } = useAuth(); // Get the logout function from the context
  const [state, setState] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [showWhatsAppContact, setShowWhatsAppContact] = useState(false);
  const [currentWhatsAppNumber, setCurrentWhatsAppNumber] = useState("");

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
      <a href="javascript:void(0)">
        <img src="/logo.png" width={120} height={50} alt="Float UI logo" />
      </a>
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
                    onClick={logout} // Logout button
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">WhatsApp Contact</h3>
            <p className="mb-4">Contact our professional at:</p>
            <a
              href={`https://wa.me/${currentWhatsAppNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {currentWhatsAppNumber}
            </a>
            <button
              onClick={() => setShowWhatsAppContact(false)}
              className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Close
            </button>
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
  );
}

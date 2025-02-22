import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { getDatabase, ref, get, set } from "firebase/database";
import { Phone, X, Users, User, LogOut, Award, Bell, ArrowRight, Shield, DollarSign, ChevronDown, CalendarIcon,CheckIcon  } from 'lucide-react';

export default function Header() {
  const { logout, auth } = useAuth();
  const [state, setState] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [showWhatsAppContact, setShowWhatsAppContact] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [username, setUsername] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      const emailFirstLetters = 
        auth.currentUser.email.charAt(0).toUpperCase() +
        auth.currentUser.email.charAt(1).toUpperCase();
      
      if (auth.currentUser.providerData[0]?.providerId === "google.com" && 
          auth.currentUser.photoURL) {
        setProfileImageUrl(auth.currentUser.photoURL);
        setUsername(auth.currentUser.displayName);
      } else {
        setProfileImageUrl(
          `https://ui-avatars.com/api/?name=${emailFirstLetters}&background=0D2438&color=ffffff&size=150`
        );
        setUsername(auth.currentUser.email.split("@")[0]);
      }
    }
  }, [auth.currentUser]);

  const professionals = [
    {
      name: "Abhijith Suresh",
      role: "Senior Market Analyst",
      whatsapp: "+919400403932",
      specialization: "Technical Analysis",
      experience: "8+ years",
      photo: "/api/placeholder/80/80"
    },
    {
      name: "Sarah Johnson",
      role: "Portfolio Manager",
      whatsapp: "+0987654321",
      specialization: "Long-term Investment",
      experience: "10+ years",
      photo: "/api/placeholder/80/80"
    },
    {
      name: "Michael Chen",
      role: "Risk Management Specialist",
      whatsapp: "+1122334455",
      specialization: "Risk Assessment",
      experience: "7+ years",
      photo: "/api/placeholder/80/80"
    },
    {
      name: "Emma Williams",
      role: "Cryptocurrency Expert",
      whatsapp: "+5566778899",
      specialization: "Digital Assets",
      experience: "5+ years",
      photo: "/api/placeholder/80/80"
    }
  ];

  useEffect(() => {
    window.addEventListener('popstate', preventBackNavigation);
    return () => {
      window.removeEventListener('popstate', preventBackNavigation);
    };
  }, []);

  const preventBackNavigation = (e) => {
    if (!auth.currentUser) {
      window.history.pushState(null, '', window.location.pathname);
      e.preventDefault();
    }
  };

  const handleLogout = async () => {
    try {
      const currentPath = window.location.pathname;
      window.history.pushState(null, '', currentPath);
      window.history.replaceState(null, '', currentPath);
      await logout();
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

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn") && !target.closest(".notification-btn") && !target.closest(".notification-panel")) {
        setState(false);
        setShowNotification(false);
      }
    };
  }, []);

  const handleNav = () => {
    window.location.href = "https://stockanalysisgit-k2ocpbsszxcyaap887ad3z.streamlit.app/";
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
      content.style.position = "relative";
      content.style.maxWidth = "400px";
      content.style.width = "90%";

      // Add close button
      const closeButton = document.createElement("button");
      closeButton.innerHTML = "×";
      closeButton.style.position = "absolute";
      closeButton.style.right = "10px";
      closeButton.style.top = "10px";
      closeButton.style.background = "none";
      closeButton.style.border = "none";
      closeButton.style.fontSize = "24px";
      closeButton.style.cursor = "pointer";
      closeButton.style.color = "#666";
      closeButton.style.padding = "5px";
      closeButton.style.lineHeight = "1";
      closeButton.style.display = "flex";
      closeButton.style.alignItems = "center";
      closeButton.style.justifyContent = "center";
      closeButton.style.width = "30px";
      closeButton.style.height = "30px";
      closeButton.style.borderRadius = "50%";
      closeButton.style.transition = "background-color 0.2s";

      closeButton.onmouseover = () => {
        closeButton.style.backgroundColor = "#f0f0f0";
      };
      closeButton.onmouseout = () => {
        closeButton.style.backgroundColor = "transparent";
      };

      closeButton.onclick = () => {
        document.body.removeChild(modal);
        resolve({ success: false });
      };

      content.innerHTML = `
        <h2 style="margin: 0 0 20px; font-weight: bold; padding-right: 40px;">Razorpay Premium Subscription</h2>
        <div style="display: flex; justify-content: space-between; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
          <span>Premium Membership (Monthly)</span>
          <span style="font-weight: bold;">₹500</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
          <span>GST (18%)</span>
          <span>₹90</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px; font-weight: bold;">
          <span>Total</span>
          <span>₹590</span>
        </div>
        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
          <div style="flex: 1; padding: 10px; background-color: #f8f9fa; border-radius: 5px; font-size: 14px;">
            <div style="font-weight: bold; margin-bottom: 5px;">✓ Professional Support</div>
            <div>Direct access to market experts</div>
          </div>
        </div>
        <button id="completePayment" style="width: 100%; background-color: #528FF0; color: white; padding: 12px 20px; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">Complete Payment</button>
        <div style="text-align: center; margin-top: 10px; font-size: 12px; color: #6c757d;">Secured by Razorpay Payment Gateway</div>
      `;

      content.insertBefore(closeButton, content.firstChild);
      modal.appendChild(content);
      document.body.appendChild(modal);

      // Close modal when clicking outside
      modal.onclick = (e) => {
        if (e.target === modal) {
          document.body.removeChild(modal);
          resolve({ success: false });
        }
      };

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
        alert("Payment successful! You are now a premium user.");
      }
    } else {
      setShowWhatsAppContact(true);
    }
  };

  const Brand = () => (
    <div className="flex items-center justify-between py-5 md:block">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setShowProfile(true)}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="relative">
            <img 
              src={profileImageUrl} 
              alt="Profile" 
              className="w-10 h-10 rounded-full border-2 border-indigo-600 shadow-md"
            />
            {isPremium && (
              <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1 border-2 border-gray-900">
                <Award className="w-3 h-3 text-gray-900" />
              </div>
            )}
          </div>
          <div className="hidden md:block">
            <span className="text-white text-sm font-medium block">{username}</span>
            <span className="text-gray-400 text-xs">{isPremium ? "Premium Member" : "Basic User"}</span>
          </div>
        </button>
        <div className="flex items-center bg-red-900/30 border border-red-500/30 rounded-lg px-3 py-1.5 max-w-[220px] md:max-w-none">
          <svg className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <span className="text-red-400 text-xs font-medium">Caution: Stock market predictions are not guaranteed. Invest at your own risk.</span>
        </div>
      </div>
      <div className="md:hidden flex items-center gap-2">
        <button
          onClick={() => setShowNotification(!showNotification)}
          className="notification-btn relative text-gray-400 hover:text-gray-300 transition-colors"
        >
          <Bell className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
            3
          </span>
        </button>
        <button
          className="menu-btn text-gray-400 hover:text-gray-300 transition-colors"
          onClick={() => setState(!state)}
        >
          {state ? (
            <X className="w-6 h-6" />
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

  const ProfileModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="modal-animate bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-900/50 p-2 rounded-full">
              <User className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              My Profile
            </h3>
          </div>
          <button
            onClick={() => setShowProfile(false)}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <img 
                src={profileImageUrl} 
                alt="Profile" 
                className="w-24 h-24 rounded-full border-4 border-indigo-600/30"
              />
              {isPremium && (
                <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-1.5 border-2 border-gray-900">
                  <Award className="w-4 h-4 text-gray-900" />
                </div>
              )}
            </div>
            <h4 className="text-xl font-semibold text-white">
              {username}
            </h4>
            <p className="text-indigo-400 text-sm">
              {auth.currentUser?.email}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
              <p className="text-xs text-gray-400 mb-1">Account Status</p>
              <div className="flex items-center gap-2">
                {isPremium ? (
                  <>
                    <Shield className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-white">Premium</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-white">Basic</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
              <p className="text-xs text-gray-400 mb-1">Member Since</p>
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-medium text-white">
                  {new Date(auth.currentUser?.metadata.creationTime).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {isPremium ? (
            <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 p-4 rounded-xl border border-indigo-700/30">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <h5 className="text-base font-medium text-white">Premium Benefits</h5>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-green-500" />
                  <span className="text-gray-300">Professional advisor access</span>
                </li>
              </ul>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-gray-800/40 to-gray-700/40 p-4 rounded-xl border border-gray-700/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-indigo-400" />
                  <h5 className="text-base font-medium text-white">Upgrade to Premium</h5>
                </div>
                <span className="text-xs font-medium bg-indigo-900/50 text-indigo-300 py-1 px-2 rounded">50% OFF</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Get exclusive access to market experts and premium analysis tools.
              </p>
              <button
                onClick={() => {
                  setShowProfile(false);
                  handlePremiumClick();
                }}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                Upgrade Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 mt-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
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
          
          .notification-panel {
            animation: slideDown 0.2s ease-out forwards;
          }
          
          .hero-gradient {
            background: linear-gradient(135deg, rgba(45, 49, 77, 0.4) 0%, rgba(62, 46, 87, 0.4) 100%);
          }
          
          .hero-card {
            backdrop-filter: blur(8px);
            background: rgba(17, 25, 40, 0.75);
            border: 1px solid rgba(255, 255, 255, 0.125);
          }
        `}
      </style>
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex flex-col">
        <header className="border-b border-gray-800">
          <div className={`md:hidden ${state ? "mx-2 pb-5" : "hidden"}`}>
            <Brand />
          </div>
          <nav
            className={`pb-3 md:text-sm ${
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
                  <li className="hidden md:block">
                    
                    
                    {/* {showNotification && (
                      <div className="notification-panel absolute right-16 mt-3 w-80 bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-50">
                        <div className="p-3 border-b border-gray-700 flex justify-between items-center">
                          <h3 className="text-sm font-medium text-white">Notifications</h3>
                          <span className="text-xs bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded-full">3 new</span>
                        </div>
                        <div className="max-h-72 overflow-y-auto">
                          {notifications.map(notification => (
                            <div key={notification.id} className="p-3 border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                              <div className="flex items-start gap-2">
                                <div className={`mt-0.5 p-1.5 rounded-full flex-shrink-0 ${
                                  notification.type === 'alert' ? 'bg-red-900/20 text-red-400' :
                                  notification.type === 'update' ? 'bg-green-900/20 text-green-400' :
                                  'bg-blue-900/20 text-blue-400'
                                }`}>
                                  {notification.type === 'alert' ? (
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                    </svg>
                                  ) : notification.type === 'update' ? (
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                    </svg>
                                  ) : (
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm text-gray-300">{notification.message}</p>
                                  <p className="text-xs text-gray-500 mt-0.5">{notification.time}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="p-3">
                          <button className="text-xs text-indigo-400 hover:text-indigo-300 w-full text-center">
                            View all notifications
                          </button>
                        </div>
                      </div>
                    )} */}
                  </li>
                  <li>
                    <a
                      href="https://stockanalysisgit-k2ocpbsszxcyaap887ad3z.streamlit.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 duration-150 rounded-xl md:inline-flex"
                    >
                      Dashboard
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
                      className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 active:from-yellow-700 active:to-yellow-600 duration-150 rounded-xl md:inline-flex shadow-lg shadow-yellow-600/20"
                    >
                      {isPremium ? (
                        <>
                          <Users className="w-5 h-5" />
                          <span>Expert Support</span>
                        </>
                      ) : (
                        <>
                          <Award className="w-5 h-5" />
                          <span>Get Premium</span>
                        </>
                      )}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        {showProfile && <ProfileModal />}
        {showWhatsAppContact && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
    <div className="modal-animate bg-gray-900 rounded-2xl p-8 max-w-3xl w-full mx-4 shadow-2xl border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-900/50 p-2 rounded-full">
            <Users className="w-6 h-6 text-indigo-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">
            Our Professional Team
          </h3>
        </div>
        <button
          onClick={() => setShowWhatsAppContact(false)}
          className="text-gray-400 hover:text-gray-300 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <p className="text-gray-300 mb-6">
        Connect with our expert professionals for personalized assistance and guidance.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {professionals.map((professional, index) => (
          <div key={index} className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
            <div className="mb-3">
              <h4 className="text-lg font-semibold text-white">
                {professional.name}
              </h4>
              <p className="text-sm text-indigo-400">
                {professional.role}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Specialization: {professional.specialization}
              </p>
            </div>
            
            <a
              href={`https://wa.me/${professional.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-button flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bf5b] text-white py-2 px-4 rounded-xl font-medium text-sm"
            >
              <svg
                className="w-5 h-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat with {professional.name.split(' ')[0]}
            </a>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-sm text-gray-400">
        <p className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Professionals available during business hours
        </p>
        <p className="mt-2 text-xs text-gray-500">
          Note: Response times may vary based on availability
        </p>
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
          className="flex items-center justify-center gap-x-2 py-2.5 px-4 mt-3 w-full text-sm text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 duration-150 rounded-lg sm:mt-0 sm:w-auto"
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
        "linear-gradient(135deg, rgba(79, 70, 229, 0.4) 0%, rgba(99, 102, 241, 0.3) 50%, rgba(129, 140, 248, 0.2) 100%)",
    }}
  ></div>
</section>
    </div>
    </>
  );
}

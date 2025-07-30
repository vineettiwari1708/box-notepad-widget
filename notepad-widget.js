document.addEventListener("DOMContentLoaded", function () {
  // === Reopen Floating Icon ===
  const openBtn = document.createElement("button");
  openBtn.id = "open-notepad-widget";
  openBtn.innerHTML = `<i class="fas fa-sticky-note"></i>`;
  Object.assign(openBtn.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    fontSize: "24px",
    zIndex: "99999",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    cursor: "pointer"
  });
  document.body.appendChild(openBtn);

  // === Notepad Panel ===
  const widget = document.createElement("div");
  widget.id = "notepad-widget";
  Object.assign(widget.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "300px",
    height: "300px",
    zIndex: "99998",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
    backgroundColor: "#ffffff",
    transition: "opacity 0.5s ease",
    opacity: "0",
    display: "none",
    flexDirection: "column"
  });

  widget.innerHTML = `
    <div style="padding: 10px; background: #f8f9fa; display: flex; justify-content: space-between; align-items: center;">
      <strong>Notepad</strong>
      <button id="close-notepad-widget" style="
        background: rgba(0,0,0,0.6);
        color: white;
        border: none;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        font-size: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      ">&times;</button>
    </div>
    <textarea id="notepad-textarea" style="
      flex: 1;
      border: none;
      padding: 10px;
      font-size: 14px;
      resize: none;
      outline: none;
    " placeholder="Type your notes here..."></textarea>
  `;
  document.body.appendChild(widget);

  // === Load from localStorage ===
  const textarea = widget.querySelector("#notepad-textarea");
  textarea.value = localStorage.getItem("notepadContent") || "";

  // Save on input
  textarea.addEventListener("input", () => {
    localStorage.setItem("notepadContent", textarea.value);
  });

  // === Open/Close Logic ===
  const closeBtn = widget.querySelector("#close-notepad-widget");

  openBtn.addEventListener("click", () => {
    widget.style.display = "flex";
    requestAnimationFrame(() => {
      widget.style.opacity = "1";
    });
    openBtn.style.display = "none";
  });

  closeBtn.addEventListener("click", () => {
    widget.style.opacity = "0";
    setTimeout(() => {
      widget.style.display = "none";
      openBtn.style.display = "block";
    }, 300);
  });

  // Hover effect for close button
  closeBtn.addEventListener("mouseenter", () => {
    closeBtn.style.background = "#fff";
    closeBtn.style.color = "#000";
  });
  closeBtn.addEventListener("mouseleave", () => {
    closeBtn.style.background = "rgba(0,0,0,0.6)";
    closeBtn.style.color = "#fff";
  });
});

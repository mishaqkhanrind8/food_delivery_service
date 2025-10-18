  let deferredPrompt;

  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent the mini info bar from appearing
    e.preventDefault();
    deferredPrompt = e;

    // Show your custom install button
    const installBtn = document.createElement("button");
    installBtn.textContent = "Install Le Catering App";
    installBtn.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #D4AF37;
      color: #000;
      border: none;
      padding: 12px 24px;
      border-radius: 30px;
      font-size: 16px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      z-index: 9999;
    `;
    document.body.appendChild(installBtn);

    installBtn.addEventListener("click", async () => {
      installBtn.remove(); // Hide button
      deferredPrompt.prompt(); // Show the browser install prompt

      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      deferredPrompt = null;
    });
  });

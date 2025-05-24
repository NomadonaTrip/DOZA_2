//  The special header and footer starts here
class SpecialHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <section class="responsive-header">
        <header>
            <div class="inner-header">
                <div class="logo-container">
                    <a href="index.html"><img src="assets/images/dozmi-logo-light.png"/></a>
                    
                </div>
                
                
                <ul class="navigation">
                    <a href="index.html"><li>Home</li></a>
                    <a href="about-us.html"><li>About Us</li></a>
                    <a href="our-ministries.html"><li>Our Ministries</li></a>
                    <a href="give.html"><li>Give</li></a>
                    <a id="call-button" href=""><li><button>Contact Us</button></li></a>
                </ul>
                <label class="hamburger-menu">
                    <input type="checkbox">
                </label>
                <aside class="sidebar">
                    <nav>
                        <div><a href="index.html">Home</a></div>
                        <div><a href="about-us.html">About Us</a></div>
                        <div><a href="contact-us.html">Contact Us</a></div>
                        
                    </nav>
                </aside>         
            </div>
        </header>
        <div class="mobile-call-button">
            <a href="tel:1-365-994-8961"><button>Contact Us</button></a>
        </div>
       
    </section>
    
    <style>
      #call-button button {
        background-color: black;
      }
    </style>
    `;
  }
}

customElements.define("special-header", SpecialHeader);
// The special footer starts here

class SpecialFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <!-- Footer section -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Contact Us</h3>
          <p>1275 Mississauga Valley Blv.<br>
          Mississauga, ON 12345</p>
          <p>Phone: (555) 123-4567<br>
          Email: info@revivalcentercanada.ca</p>
        </div>
        <div class="footer-section">
          <h3>Service Times</h3>
          <p>Sunday Service: 10:00 AM<br>
          Wednesday Prayer: 7:00 PM<br>
          Monthly Revival: First Friday 6:00 PM</p>
        </div>
        <div class="footer-section">
          <h3>Connect With Us</h3>
          <p>
            <a href="#">Facebook</a><br>
            <a href="#">YouTube</a><br>
            <a href="#">Instagram</a><br>
            <a href="#">Twitter</a>
          </p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 The Revival Center. All rights reserved.</p>        
        <p class="credits">Built by Orban Forest Inc.</p>
      </div>
    </footer>
    `;
  }
}

customElements.define("special-footer", SpecialFooter);

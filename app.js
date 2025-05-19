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
                    <a href="contact-us.html"><li>Contact Us</li></a>
                    <a id="call-button" href="https://wa.me/+13659948961"><li><button>Call Us</button></li></a>
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
            <a href="tel:1-365-994-8961"><button>Call us</button></a>
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

customElements.define('special-header', SpecialHeader);
//  The special header and footer starts here
class SpecialHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <section class="responsive-header">
        <header>
            <div class="inner-header">
                <div class="logo-container">
                    <a href="index.html"><img src="assets/images/dozmi-logo-light_1.png"/></a>
                    
                </div>
                
                
                <ul class="navigation">
                    <a href="index.html"><li>Home</li></a>
                    <a href="about-us.html" title="Learn about our Holy Spirit-filled church mission in the GTA"><li>About Us</li></a>
                    <a href="our-ministries.html" title="Discover our bible-believing healing, deliverance and discipleship ministries in Mississauga"><li>Our Ministries</li></a>
                    <a href="give.html"><li>Give</li></a>
                    <a id="call-button" href="contact-us.html"><li><button>reach out</button></li></a>
                </ul>
                <label class="hamburger-menu">
                    <input type="checkbox">
                </label>
                <aside class="sidebar">
                    <nav>
                        <div><a href="index.html">Home</a></div>
                        <div><a href="about-us.html">About Us</a></div>
                        <div><a href="our-ministries.html">Our Ministries</a></div>
                        <div><a href="give.html">Give</a></div>
                        <div><a href="contact-us.html">reach out</a></div>
                        
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
    <div class = container>
      <div class="footer-content">
        <div class="footer-section">
          <h3>Contact Us</h3>
          <p>1560 Dundas St. W, <br>Mississauga, 
          Ontario L5C 1E5 <br> (Erindale Presbyterian Church Building). 
          </p>
          <p>Phone: +1 647 520 6905.<br>
          Email: info@dozmi-revivalcenter.ca</p>
        </div>
        <div class="footer-section">
          <h3>Service Times</h3>
          <p>Sunday Service: 6:30 PM<br>
          Wednesday Prayer: 6:30 PM<br>
          
        </div>
        <div class="footer-section">
          <h3>Connect With Us</h3>
          <p>
            
            <a href="https://www.facebook.com/dozmica" target="_blank" rel="noopener noreferrer">Facebook</a><br>
            <a href="https://www.youtube.com/@dozmitherevivalcenter" target="_blank" rel="noopener noreferrer"> YouTube</a><br>
            <a href="https://www.instagram.com/dozmi.therevivalcenter/" target="_blank" rel="noopener noreferrer">Instagram</a><br>
            
          </p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 The Revival Center. All rights reserved.</p>        
        <a href="http://orbanforest.ca" target="_blank" rel="noopener noreferrer" class="credits">Built by Orban Forest Inc.</a>
      </div>
      </div>
    </footer>
    `;
  }
}

customElements.define("special-footer", SpecialFooter);

// Calendar dropdown script

// Step 1: Extract event details from HTML
function extractEventData(eventId) {
  console.log(`🔍 Extracting data for event: ${eventId}`);

  // Find the event card by data-event-id
  const eventCard = document.querySelector(`[data-event-id="${eventId}"]`);
  if (!eventCard) {
    console.error(`❌ Event card not found: ${eventId}`);
    return null;
  }

  // Step 2: Extract each field using data-field attributes
  const title = eventCard
    .querySelector('[data-field="title"]')
    ?.textContent?.trim();
  const dateText = eventCard
    .querySelector('[data-field="date"]')
    ?.textContent?.trim();
  const startTimeText = eventCard
    .querySelector('[data-field="start-time"]')
    ?.textContent?.trim();
  const endTimeText = eventCard
    .querySelector('[data-field="end-time"]')
    ?.textContent?.trim();
  const location = eventCard
    .querySelector('[data-field="location"]')
    ?.textContent?.trim();
  const description =
    eventCard
      .querySelector('[data-field="description"]')
      ?.textContent?.trim() || "";

  console.log(`📋 Raw extracted data:`, {
    title,
    dateText,
    startTimeText,
    endTimeText,
    location,
    description,
  });

  // Step 3: Parse and format dates
  const { startDate, endDate } = parseDateAndTime(
    dateText,
    startTimeText,
    endTimeText
  );

  const eventData = {
    title,
    startDate,
    endDate,
    location,
    description,
    isRecurring: dateText?.toLowerCase().includes("every"),
  };

  console.log(`✅ Processed event data:`, eventData);
  return eventData;
}

// Step 4: Parse date and time strings into Date objects
function parseDateAndTime(dateText, startTimeText, endTimeText) {
  let startDate, endDate;

  if (dateText.toLowerCase().includes("every monday")) {
    // Handle recurring events - get next Monday
    const nextMonday = getNextMonday();
    startDate = parseTimeToDate(nextMonday, startTimeText);
    endDate = parseTimeToDate(nextMonday, endTimeText);
  } else {
    // Handle single events
    const eventDate = new Date(dateText);
    startDate = parseTimeToDate(eventDate, startTimeText);
    endDate = parseTimeToDate(eventDate, endTimeText);
  }

  return { startDate, endDate };
}

// Helper: Convert time string to full Date object
function parseTimeToDate(baseDate, timeString) {
  const [time, period] = timeString.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  const date = new Date(baseDate);
  date.setHours(hours, minutes || 0, 0, 0);
  return date;
}

// Helper: Get next Monday
function getNextMonday() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek; // 0 = Sunday
  const nextMonday = new Date(today);
  nextMonday.setDate(today.getDate() + daysUntilMonday);
  return nextMonday;
}

// Step 5: Generate calendar URLs from extracted data
function createCalendarUrls(eventData) {
  const { title, startDate, endDate, description, location, isRecurring } =
    eventData;

  // Format dates for different calendar services
  const startFormatted =
    startDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const endFormatted =
    endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const duration = String(
    Math.floor((endDate - startDate) / (1000 * 60))
  ).padStart(4, "0");

  // URL encode parameters
  const titleEncoded = encodeURIComponent(title);
  const descriptionEncoded = encodeURIComponent(description);
  const locationEncoded = encodeURIComponent(location);

  // Build recurrence rule for recurring events
  const recurrenceRule = isRecurring ? "&recur=RRULE:FREQ=WEEKLY;BYDAY=MO" : "";
  const recurrenceRuleICS = isRecurring ? "%0ARRULE:FREQ=WEEKLY;BYDAY=MO" : "";

  return {
    google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titleEncoded}&dates=${startFormatted}/${endFormatted}&details=${descriptionEncoded}&location=${locationEncoded}${recurrenceRule}`,
    outlook: `https://outlook.live.com/calendar/0/deeplink/compose?subject=${titleEncoded}&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}&body=${descriptionEncoded}&location=${locationEncoded}`,
    apple: `data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0APRODNAME:-//Dynamic Calendar//EN%0ABEGIN:VEVENT%0ADTSTART:${startFormatted}%0ADTEND:${endFormatted}%0ASUMMARY:${titleEncoded}%0ADESCRIPTION:${descriptionEncoded}%0ALOCATION:${locationEncoded}${recurrenceRuleICS}%0AEND:VEVENT%0AEND:VCALENDAR`,
    yahoo: `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${titleEncoded}&st=${startFormatted}&dur=${duration}&desc=${descriptionEncoded}&in_loc=${locationEncoded}`,
  };
}

// Step 6: Generate and populate dropdown with calendar links
function generateCalendarDropdown(eventId) {
  console.log(`🚀 Generating calendar dropdown for: ${eventId}`);

  // Extract event data from HTML
  const eventData = extractEventData(eventId);
  if (!eventData) return;

  // Generate calendar URLs
  const urls = createCalendarUrls(eventData);

  // Update debug display
  document.getElementById("debug-output").textContent = JSON.stringify(
    eventData,
    null,
    2
  );

  // Find dropdown menu - check if it exists
  const dropdownMenu = document.getElementById(`dropdown-${eventId}`);
  if (!dropdownMenu) {
    console.warn(
      `⚠️ No dropdown found for ${eventId}. Calendar URLs generated but not displayed.`
    );
    console.log("📋 Generated URLs:", urls);
    return;
  }

  // Create dropdown HTML
  dropdownMenu.innerHTML = `
                <a href="${urls.google}" target="_blank" class="dropdown-item" onclick="closeDropdown('dropdown-${eventId}')">
                    <span class="calendar-icon">📊</span>
                    Google Calendar
                </a>
                <a href="${urls.outlook}" target="_blank" class="dropdown-item" onclick="closeDropdown('dropdown-${eventId}')">
                    <span class="calendar-icon">📧</span>
                    Outlook Calendar
                </a>
                <a href="${urls.apple}" class="dropdown-item" onclick="closeDropdown('dropdown-${eventId}')">
                    <span class="calendar-icon">🍎</span>
                    Apple Calendar
                </a>
                <a href="${urls.yahoo}" target="_blank" class="dropdown-item" onclick="closeDropdown('dropdown-${eventId}')">
                    <span class="calendar-icon">🌐</span>
                    Yahoo Calendar
                </a>
            `;

  // Show the dropdown
  toggleDropdown(`dropdown-${eventId}`);
}

// UI Management Functions
function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  const button = dropdown.previousElementSibling;
  const arrow = button.querySelector(".dropdown-arrow");
  const overlay = document.querySelector(".dropdown-overlay");

  // Close all other dropdowns first
  const allDropdowns = document.querySelectorAll(".dropdown-menu");
  allDropdowns.forEach((dd) => {
    if (dd.id !== dropdownId) {
      dd.classList.remove("show");
      const otherButton = dd.previousElementSibling;
      const otherArrow = otherButton.querySelector(".dropdown-arrow");
      otherButton.setAttribute("aria-expanded", "false");
      otherArrow.classList.remove("rotated");
    }
  });

  // Toggle current dropdown
  const isOpen = dropdown.classList.contains("show");

  if (isOpen) {
    dropdown.classList.remove("show");
    button.setAttribute("aria-expanded", "false");
    arrow.classList.remove("rotated");
    overlay.classList.remove("show");
  } else {
    dropdown.classList.add("show");
    button.setAttribute("aria-expanded", "true");
    arrow.classList.add("rotated");
    overlay.classList.add("show");
  }
}

function closeDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  const button = dropdown.previousElementSibling;
  const arrow = button.querySelector(".dropdown-arrow");
  const overlay = document.querySelector(".dropdown-overlay");

  dropdown.classList.remove("show");
  button.setAttribute("aria-expanded", "false");
  arrow.classList.remove("rotated");
  overlay.classList.remove("show");
}

function closeAllDropdowns() {
  const allDropdowns = document.querySelectorAll(".dropdown-menu");
  const allButtons = document.querySelectorAll(".mark-calendar-btn");
  const allArrows = document.querySelectorAll(".dropdown-arrow");
  const overlay = document.querySelector(".dropdown-overlay");

  allDropdowns.forEach((dropdown) => dropdown.classList.remove("show"));
  allButtons.forEach((button) => button.setAttribute("aria-expanded", "false"));
  allArrows.forEach((arrow) => arrow.classList.remove("rotated"));
  overlay.classList.remove("show");
}

// Event listeners
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeAllDropdowns();
  }
});

document.querySelectorAll(".dropdown-menu").forEach((menu) => {
  menu.addEventListener("click", function (event) {
    event.stopPropagation();
  });
});

console.log("✅ Dynamic Calendar Event Extractor loaded successfully!");

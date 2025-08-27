function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("main").style.marginLeft = "300px";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }


  


//background colorchanger from label
const COLOR_STORAGE_KEY = 'backgroundColor';
const colorInput = document.getElementById('customBackgroundColor');
const saveButton = document.querySelector('.Save-button');

// Apply a color to page (body + CSS var)
function applyBackgroundColor(color) {
    if (!color) return;
    try {
        document.body.style.backgroundColor = color;
        document.documentElement.style.setProperty('--clr', color);
    } catch (e) {
        console.warn('Failed to apply background color', e);
    }
}

// Persist color to localStorage and apply it
function saveBackgroundColor(color) {
    if (!color) return;
    try {
        localStorage.setItem(COLOR_STORAGE_KEY, color);
    } catch (e) {
        console.warn('Failed to save color', e);
    }
    applyBackgroundColor(color);
}

// Public API used by the preset select
function changeBackgroundColor(backgroundColor) {
    // apply immediately and persist the choice
    applyBackgroundColor(backgroundColor);
    saveBackgroundColor(backgroundColor);
}

// Initialize: load saved color and wire events (safe checks)
function initBackgroundColorControls() {
    // Load saved color if present
    try {
        const saved = localStorage.getItem(COLOR_STORAGE_KEY);
        if (saved) {
            applyBackgroundColor(saved);
            if (colorInput) colorInput.value = saved;
        }
    } catch (e) {
        console.warn('Failed to load saved background color', e);
    }

    if (colorInput) {
        // live preview while picking a color
        colorInput.addEventListener('input', (e) => {
            applyBackgroundColor(e.target.value);
        });
    }

    if (saveButton) {
        saveButton.addEventListener('click', () => {
            const value = (colorInput && colorInput.value) ? colorInput.value : '';
            if (value) saveBackgroundColor(value);
        });
    }
}

// Run init on DOMContentLoaded (if not already in DOM ready flow)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBackgroundColorControls);
} else {
    initBackgroundColorControls();
}






document.addEventListener("keydown", function(event) {
  if (event.key === "`") {
      event.preventDefault(); // Prevent the default "/" input in the search bar
      document.getElementById("searchInput").focus();
  }
});









        
function updateDate() {
  const now = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  let dayName = days[now.getDay()];
  let monthName = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();

  document.getElementById("dateText").innerText = `${dayName}, ${monthName} ${date}, ${year}`;
}

updateDate(); // Run on page load




























//costomizations of buttons


const buttonsContainer = document.getElementById("buttons-container");
const editModeToggle = document.getElementById("editModeToggle");

const editPanel = document.getElementById("editPanel");
const buttonSelect = document.getElementById("buttonSelect");
const buttonNameInput = document.getElementById("buttonName");
const buttonLinkInput = document.getElementById("buttonLink");
const saveChanges = document.getElementById("saveChanges");
const addButton = document.getElementById("addButton");
const deleteButton = document.getElementById("deleteButton");


const defaultButtons = [
    { name: "Chat Gtp", link: "https://chat.openai.com/" }, // ChatGPT
    { name: "Youtube", link: "https://youtube.com/" },
    { name: "Amazon", link: "https://www.amazon.in/" },
    { name: "Flipkart", link: "https://www.flipkart.com/" },
    { name: "Makerbazar", link: "https://makerbazar.in/" }, // Added
    { name: "Translate", link: "https://translate.google.com/" },
    { name: "Microsoft", link: "https://www.office.com/" }, // Renamed from Office
    { name: "Songs", link: "file:///C:/Users/heman/OneDrive/Desktop/my_spotify.html" }, // was Spotify
    { name: "Bing", link: "https://www.bing.com/" },
    { name: "Gemini", link: "https://gemini.google.com/" }, // Added
    { name: "Deepseek", link: "https://deepseek.com/" }, // Added
    { name: "Grok", link: "https://grok.com/" } // Added
];


// Load buttons from localStorage or use default
let buttons = JSON.parse(localStorage.getItem("buttons")) || defaultButtons;

// Render buttons on page load
renderButtons();


editModeToggle.addEventListener("click", toggleEditPanel);
buttonSelect.addEventListener("change", populateForm);
saveChanges.addEventListener("click", saveButtonState);
addButton.addEventListener("click", handleAddButton);
deleteButton.addEventListener("click", handleDeleteButton);
document.addEventListener("keydown", handleKeyboardShortcut);





// Populate form with selected button's data
function populateForm() {
    const selectedButton = buttons[buttonSelect.value];
    if (selectedButton) {
        buttonNameInput.value = selectedButton.name;
        buttonLinkInput.value = selectedButton.link;
    }
}

// Save button state to localStorage
function saveButtonState() {
    const index = buttonSelect.value;
    if (index >= 0 && index < buttons.length) {
        buttons[index].name = buttonNameInput.value;
        buttons[index].link = buttonLinkInput.value;
        localStorage.setItem("buttons", JSON.stringify(buttons));
        renderButtons();
    }
}

// Add a new button
function handleAddButton() {
    const newButton = { name: "New Button", link: "https://example.com" };
    buttons.push(newButton);
    localStorage.setItem("buttons", JSON.stringify(buttons));
    renderButtons();
    buttonSelect.value = buttons.length - 1;
    populateForm();
}

// Delete a button
function handleDeleteButton() {
    if (confirm("Are you sure you want to delete this button?")) {
        buttons.splice(buttonSelect.value, 1);
        localStorage.setItem("buttons", JSON.stringify(buttons));
        renderButtons();
        populateForm();
    }
}

// Render buttons in the container
function renderButtons() {
    buttonsContainer.innerHTML = "";
    buttonSelect.innerHTML = "";

    buttons.forEach((button, index) => {
        // Create button element
        const btn = document.createElement("button");
        btn.className = "button";
        btn.innerHTML = `
            ${button.name}
            
        `;
        btn.onclick = () => window.open(button.link, "_blank");
        btn.id = `button${index + 1}`;
        buttonsContainer.appendChild(btn);

        // Add option to select dropdown
        const option = document.createElement("option");
        option.value = index;
        option.textContent = button.name;
        buttonSelect.appendChild(option);
    });
}

// Handle keyboard shortcuts
function handleKeyboardShortcut(event) {
    const shortcutMap = {
        'Shift+Z': 0,
        'Shift+z': 0,
        'Shift+X': 1,
        'Shift+x': 1,
        'Shift+C': 2,
        'Shift+c': 2,
        'Shift+V': 3,
        'Shift+v': 3,
        'Shift+B': 4,
        'Shift+b': 4,
        'Shift+N': 5,
        'Shift+n': 5,
        'Shift+M': 6,
        'Shift+m': 6,
        'Ctrl+,': 7,
        'Ctrl+.': 8,
        'Shift+G': 9,
        'Shift+g': 9,
        'Shift+D': 10,
        'Shift+d': 10,
        'Shift+F': 11,
        'Shift+f': 11,
    };

    const key = `${event.shiftKey ? 'Shift+' : ''}${event.ctrlKey ? 'Ctrl+' : ''}${event.key}`;
    const index = shortcutMap[key];

    if (typeof index !== "undefined" && buttons[index]) {
        window.open(buttons[index].link, "_blank");
    }
}





// Modified Edit Mode Toggle and OK Button
const okButton = document.getElementById('okButton');

function toggleEditPanel() {
    editPanel.style.display = editPanel.style.display === 'none' ? 'block' : 'none';
    editModeToggle.textContent = editPanel.style.display === 'none' ? 'Edit Mode' : 'Close Edit';
}

function handleOkButton() {
    toggleEditPanel();
   }

// Update event listeners
editModeToggle.addEventListener('click', toggleEditPanel);
okButton.addEventListener('click', handleOkButton);

// Update your edit panel HTML to include OK button:
/*
<div id="editPanel" style="display:none;">
    <h3>Edit Buttons</h3>
    <button id="okButton">OK</button>
    ...
</div>
*/ 




document.querySelectorAll('.ripple-button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Get mouse position relative to the button
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Create ripple element
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        // Remove ripple after animation
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });

        // Add ripple to button
        button.appendChild(ripple);
    });
});



















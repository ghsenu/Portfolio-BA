# Gihansa Buwanayake — Business Analyst Portfolio

A single-page personal portfolio website with an external CSS/JS structure.

## Project structure

```
BA portfolio/
├── index.html          # Main page (semantic HTML only)
├── css/
│   └── styles.css      # All styles
├── js/
│   └── main.js         # All interactivity (nav, reveals, skill bars, stats, form, tilt)
├── assets/
│   └── portrait.jpg    # Hero portrait image
└── README.md
```

## Running it

Just open `index.html` in any browser, or serve the folder with a static server:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then visit http://localhost:8000.

## Notes

- Fonts (Space Grotesk, Inter, Space Mono) are loaded from Google Fonts.
- The contact form opens the visitor's email client with a pre-filled message (mailto).
- To add the CV download, drop `Gihansa_Buwanayake_Business_Analyst_CV.pdf` into the root folder.
- Case-study links (`hotel-booking-case-study.html`, `online-shopping-case-study.html`) expect those pages in the root folder.
- Animations respect `prefers-reduced-motion`.

# Integration Logos Folder

This folder is for storing logo images for the various integrations displayed in the UI.

## Required Logo Files

Please add the following logo files to this folder:

1. `zendesk-logo.png` - Zendesk logo
2. `gong-logo.png` - Gong logo
3. `intercom-logo.png` - Intercom logo

## Image Guidelines

- **Format**: PNG with transparency is preferred
- **Size**: Aim for around 100x100px (they will be displayed at smaller sizes but keeping higher resolution helps with retina displays)
- **Style**: Company logos with transparent backgrounds work best
- **Fallback**: The UI already includes fallback SVG icons if images fail to load

## How the Images are Used

These images are used in the sidebar integration section of the application:
- In the expanded sidebar view (larger, with more details)
- In the collapsed sidebar view (compact icons only)

The application will automatically handle displaying either format depending on the sidebar state. 
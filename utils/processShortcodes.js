/**
 * Process shortcodes in markdown content
 * 
 * Supported shortcodes:
 * [cta_button url="https://example.com" text="Click Me"]
 * [cta_box title="Title" text="Description" url="https://example.com" button_text="Click Me"]
 */

const processShortcodes = (content) => {
  // Process CTA buttons
  content = content.replace(
    /\[cta_button url="([^"]+)" text="([^"]+)"\]/g,
    (match, url, text) => {
      return `
<div style="text-align: center; margin: 32px 0;">
  <a href="${url}" style="display: inline-block; background-color: #4f46e5; color: white; font-weight: 700; padding: 12px 24px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); transition: all 0.3s ease;">${text}</a>
</div>
      `;
    }
  );

  // Process CTA boxes
  content = content.replace(
    /\[cta_box title="([^"]+)" text="([^"]+)" url="([^"]+)" button_text="([^"]+)"\]/g,
    (match, title, text, url, buttonText) => {
      return `
<div style="background-color: #f8f9fa; padding: 24px; margin: 32px 0; border-radius: 12px; border-left: 4px solid #4f46e5; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
  <h4 style="margin-top: 0; font-size: 1.25rem; font-weight: 700;">${title}</h4>
  <p style="margin-bottom: 16px;">${text}</p>
  <div style="text-align: center;">
    <a href="${url}" style="display: inline-block; background-color: #4f46e5; color: white; font-weight: 700; padding: 12px 24px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); transition: all 0.3s ease;">${buttonText}</a>
  </div>
</div>
      `;
    }
  );

  return content;
};

module.exports = processShortcodes; 